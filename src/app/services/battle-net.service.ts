import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Character} from '../data/character';
import {CharacterMedia} from '../data/character-media';
import {CharacterProfessions} from '../data/character-professions';
import {CharacterProfession} from '../data/character-profession';
import {CharacterProfessionTier} from '../data/character-profession-tier';
import {Achievement} from '../data/achievement';
import {CharacterAchievements} from '../data/character-achievements';
import {CharacterAchievement} from '../data/character-achievement';
import {AchievementMedia} from '../data/achievement-media';
import {CharacterAchievementChildCriteria} from '../data/character-achievement-child-criteria';

@Injectable()
export class BattleNetService {

  private baseUrl = 'https://eu.api.blizzard.com/';
  private accessToken = '';

  constructor(private httpClient: HttpClient) {
  }

  getToken(): Observable<any> {
    return new Observable<any>((observer) => {

      // https://develop.battle.net/
      const clientId = '8f8cf4a7f94a4733a09d47addb435041';
      const clientSecret = 'aX1aYNI0rZmrC2U4nnukESOqL4FebOZn';
      const url = 'https://eu.battle.net/oauth/token';

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        })
      };

      this.httpClient.post<any>(url, 'grant_type=client_credentials', httpOptions).subscribe((result: any) => {
        this.accessToken = result.access_token;
        observer.next(this.accessToken);
      });
    });
  }

  getAchievement(achievementId: number): Observable<Achievement> {
    return new Observable<Achievement>((observer) => {

      if (localStorage.getItem('achievement' + achievementId) == null) {

        const url = this.baseUrl + 'data/wow/achievement/' + achievementId + '?namespace=static-eu&locale=en_GB';
        this.getData(url).subscribe((achievement: Achievement) => {

          this.getData(achievement.media.key.href).subscribe((achievementMedia: AchievementMedia) => {

            achievement.icon = achievementMedia.assets.find((e) => e.key === 'icon').value;

            // save
            localStorage.setItem('achievement' + achievementId, JSON.stringify(achievement));

            observer.next(achievement);
            observer.complete();

          });
        });

      } else {
        // We already have this data, return it
        const result = JSON.parse(localStorage.getItem('achievement' + achievementId));
        observer.next(result);
        observer.complete();
      }
    });
  }

  getCharacter(realmCharacter: string, achievementIds: number[]): Observable<Character> {
    return new Observable<Character>((observer) => {

        if (localStorage.getItem(realmCharacter) == null) {

          const url = this.baseUrl + 'profile/wow/character/' + realmCharacter + '?namespace=profile-eu&locale=en_GB';

          this.getData(url).subscribe((resultCharacter: Character) => {

            const character = new Character();
            character.name = resultCharacter.name;
            character.level = resultCharacter.level;
            character.faction.name = resultCharacter.faction.name;
            character.active_spec.name = resultCharacter.active_spec.name;
            character.race.name = resultCharacter.race.name;
            character.character_class.name = resultCharacter.character_class.name;
            character.achievement_points = resultCharacter.achievement_points;
            character.experience = resultCharacter.experience;

            const observableBatch = [];

            observableBatch.push(this.getData(resultCharacter.media.href));
            observableBatch.push(this.getData(resultCharacter.professions.href));
            observableBatch.push(this.getCharacterAchievements(character, resultCharacter.achievements.href, achievementIds));

            Observable.forkJoin(observableBatch).subscribe((result: any[]) => {

              const resultMediaObject: CharacterMedia = result[0];
              character.mediaObject.bust_url = resultMediaObject.bust_url;
              character.mediaObject.avatar_url = resultMediaObject.avatar_url;
              character.mediaObject.render_url = resultMediaObject.render_url;

              const resultProfessionsObject: CharacterProfessions = result[1];
              for (const resultCharacterProfession of resultProfessionsObject.primaries) {

                const characterProfession = new CharacterProfession();
                characterProfession.profession.name = resultCharacterProfession.profession.name;
                character.professionsObject.primaries.push(characterProfession);

                for (const resultCharacterProfessionTier of resultCharacterProfession.tiers) {
                  const characterProfessionTier = new CharacterProfessionTier();
                  characterProfessionTier.skill_points = resultCharacterProfessionTier.skill_points;
                  characterProfessionTier.max_skill_points = resultCharacterProfessionTier.max_skill_points;
                  characterProfessionTier.tier.name = resultCharacterProfessionTier.tier.name;
                  characterProfession.tiers.push(characterProfessionTier);
                }
              }
              for (const resultCharacterProfession of resultProfessionsObject.secondaries) {

                const characterProfession = new CharacterProfession();
                characterProfession.profession.name = resultCharacterProfession.profession.name;
                character.professionsObject.secondaries.push(characterProfession);

                if (characterProfession.profession.name === 'Archaeology') {
                  const characterProfessionTier = new CharacterProfessionTier();
                  characterProfessionTier.skill_points = resultCharacterProfession.skill_points;
                  characterProfessionTier.max_skill_points = resultCharacterProfession.max_skill_points;
                  characterProfessionTier.tier.name = resultCharacterProfession.profession.name;
                  characterProfession.tiers.push(characterProfessionTier);
                } else {
                  for (const resultCharacterProfessionTier of resultCharacterProfession.tiers) {
                    const characterProfessionTier = new CharacterProfessionTier();
                    characterProfessionTier.skill_points = resultCharacterProfessionTier.skill_points;
                    characterProfessionTier.max_skill_points = resultCharacterProfessionTier.max_skill_points;
                    characterProfessionTier.tier.name = resultCharacterProfessionTier.tier.name;
                    characterProfession.tiers.push(characterProfessionTier);
                  }

                }
              }

              // save
              localStorage.setItem(realmCharacter, JSON.stringify(character));

              observer.next(character);
              observer.complete();

            });
          });

        } else {

          // We already have this data, return it
          const result = JSON.parse(localStorage.getItem(realmCharacter));
          observer.next(result);
          observer.complete();

        }
      }
    );
  }

  private getCharacterAchievements(character: Character, href: string, achievementIds: number[]): Observable<any> {
    return new Observable<any>((observer) => {

      character.achievementsObject = new CharacterAchievements();

      this.getData(href).subscribe((resultAchievementObject) => {

        for (const resultCharacterAchievement of resultAchievementObject.achievements) {
          if (achievementIds.indexOf(resultCharacterAchievement.id) >= 0) {

            const characterAchievement = new CharacterAchievement();
            characterAchievement.id = resultCharacterAchievement.id;
            characterAchievement.completed_timestamp = resultCharacterAchievement.completed_timestamp;
            characterAchievement.criteria.id = resultCharacterAchievement.criteria.id;
            characterAchievement.criteria.is_completed = resultCharacterAchievement.criteria.is_completed;
            character.achievementsObject.achievements.push(characterAchievement);

            if (resultCharacterAchievement.criteria.child_criteria) {
              for (const resultChildCriteria of resultCharacterAchievement.criteria.child_criteria) {
                const childCriteria = new CharacterAchievementChildCriteria();
                childCriteria.id = resultChildCriteria.id;
                childCriteria.amount = resultChildCriteria.amount;
                childCriteria.is_completed = resultChildCriteria.is_completed;
                characterAchievement.criteria.child_criteria.push(childCriteria);
              }
            }
          }
        }

        observer.next();
        observer.complete();
      });
    });
  }

  private getData(url: string): Observable<any> {
    return new Observable<any>((observer) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + this.accessToken
          })
        };
        // We don't have a copy of this data, so fetch it from battle.net
        this.httpClient.get<any>(url, httpOptions).subscribe((result: any) => {
          observer.next(result);
          observer.complete();
        });
      }
    );
  }
}
