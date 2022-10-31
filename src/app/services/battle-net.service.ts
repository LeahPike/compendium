import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
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

  getToken(): Observable<string> {
    return new Observable<string>((observer) => {

      // https://develop.battle.net/
      const clientId = '8f8cf4a7f94a4733a09d47addb435041';
      const clientSecret = 'aX1aYNI0rZmrC2U4nnukESOqL4FebOZn';
      const url = 'https://eu.battle.net/oauth/token';

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret)
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

        console.log('- achievement:' + achievementId, '... loaded from API');

        const url = this.baseUrl + 'data/wow/achievement/' + achievementId + '?namespace=static-eu&locale=en_GB';
        this.getData(url).subscribe((achievement: Achievement) => {

          this.getData(achievement.media.key.href).subscribe((achievementMedia: AchievementMedia) => {

            const icon = achievementMedia.assets.find((e) => e.key === 'icon');
            if (icon != null) {
              achievement.icon = icon.value;
            }

            // save
            localStorage.setItem('achievement' + achievementId, JSON.stringify(achievement));

            observer.next(achievement);
            observer.complete();

          });
        });

      } else {

        console.log('- achievement:' + achievementId, '... loaded from storage');

        // We already have this data, return it
        const achievementString = localStorage.getItem('achievement' + achievementId);
        if (achievementString != null) {
          const result: Achievement = JSON.parse(achievementString);
          observer.next(result);
        }
        observer.complete();
      }
    });
  }

  getCharacter(realmCharacter: string, achievementIds: number[]): Observable<Character> {
    return new Observable<Character>((observer) => {

        if (localStorage.getItem(realmCharacter) == null) {

          console.log('-', realmCharacter, '... loaded from API');

          const url = this.baseUrl + 'profile/wow/character/' + realmCharacter + '?namespace=profile-eu&locale=en_GB';

          this.getData(url).subscribe((resultCharacter: Character) => {

            const character = new Character();
            character.id = resultCharacter.id;
            character.name = resultCharacter.name;
            character.level = resultCharacter.level;
            character.faction.name = resultCharacter.faction.name;
            character.active_spec.name = resultCharacter.active_spec.name;
            character.race.name = resultCharacter.race.name;
            character.character_class.name = resultCharacter.character_class.name;
            character.achievement_points = resultCharacter.achievement_points;
            character.experience = resultCharacter.experience;
            character.realm = resultCharacter.realm;

            const observableBatch = [];

            observableBatch.push(this.getData(resultCharacter.media.href));
            observableBatch.push(this.getData(resultCharacter.professions.href));
            observableBatch.push(this.getCharacterAchievements(character, resultCharacter.achievements.href, achievementIds));

            forkJoin(observableBatch).subscribe((result: any[]) => {

              character.mediaObject = new CharacterMedia();
              for (const asset of result[0].assets) {
                switch (asset.key) {
                  case 'avatar':
                    character.mediaObject.avatar_url = asset.value;
                    break;
                  case 'inset':
                    character.mediaObject.inset_url = asset.value;
                    break;
                  case 'main':
                    character.mediaObject.main_url = asset.value;
                    break;
                  case 'main-raw':
                    character.mediaObject.main_raw_url = asset.value;
                    break;
                }
              }

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
          const characterString = localStorage.getItem(realmCharacter);
          if (characterString != null) {
            const result: Character = JSON.parse(characterString);
            console.log('-', realmCharacter, '... loaded from storage');
            observer.next(result);
          }
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
            if (resultCharacterAchievement.criteria) {
              characterAchievement.criteria.id = resultCharacterAchievement.criteria.id;
              characterAchievement.criteria.is_completed = resultCharacterAchievement.criteria.is_completed;
            }
            character.achievementsObject.achievements.push(characterAchievement);

            if (resultCharacterAchievement.criteria && resultCharacterAchievement.criteria.child_criteria) {
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
            Authorization: 'Bearer ' + this.accessToken
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
