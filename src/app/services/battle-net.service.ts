import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Character} from '../data/character';
import {Class, Classes} from '../data/class';
import {Race, Races} from '../data/race';
import {Achievement, Achievements} from '../data/achievement';

@Injectable()
export class BattleNetService {

  private renderUrl = 'http://render-eu.worldofwarcraft.com';
  private baseUrl = 'https://eu.api.battle.net/wow';
  private apiKey = 'locale=en_GB&apikey=yanbcy336j7653gbfm3mkq7sb8443e4q';

  constructor(private httpClient: HttpClient) {
  }

  getClasses(): Observable<Class[]> {
    return new Observable<Class[]>((observer) => {
        const url = this.baseUrl + '/data/character/classes?' + this.apiKey;
        this.getData('classes', url).subscribe((result: Classes) => {
          observer.next(result.classes);
          observer.complete();
        });
      }
    );
  }

  getRaces(): Observable<Race[]> {
    return new Observable<Race[]>((observer) => {
        const url = this.baseUrl + '/data/character/races?' + this.apiKey;
        this.getData('races', url).subscribe((result: Races) => {
          observer.next(result.races);
          observer.complete();
        });
      }
    );
  }

  getAchievement(achievementId: number): Observable<Achievement> {
    return new Observable<Achievement>((observer) => {
        const url = this.baseUrl + '/achievement/' + achievementId + '?' + this.apiKey;
        this.getData('achievement' + achievementId, url).subscribe((result: Achievement) => {
          observer.next(result);
          observer.complete();
        });
      }
    );
  }

  getAchievements(): Observable<Achievement[]> {
    return new Observable<Achievement[]>((observer) => {
        const url = this.baseUrl + '/data/character/achievements?' + this.apiKey;
        this.getData('achievements', url).subscribe((result: Achievements) => {
          observer.next(result.achievements);
          observer.complete();
        });
      }
    );
  }

  getCharacter(character: string): Observable<Character> {
    return new Observable<Character>((observer) => {
        const fields = 'fields=professions+quests+talents+feed+achievements';
        const url = this.baseUrl + '/character/' + character + '?' + fields + '&' + this.apiKey;
        this.getData(character, url).subscribe((result: Character) => {

          // https://dev.battle.net/docs/read/community_apis/world_of_warcraft/Character_Renders
          result.imageInset = 'http://render-eu.worldofwarcraft.com/character/' + result.thumbnail.replace('avatar', 'insert');
          result.imageMain = 'http://render-eu.worldofwarcraft.com/character/' + result.thumbnail.replace('avatar', 'main');
          result.imageAvatar = 'http://render-eu.worldofwarcraft.com/character/' + result.thumbnail;

          observer.next(result);
          observer.complete();
        });
      }
    );
  }

  private getData(key: string, url: string): Observable<any> {
    return new Observable<any>((observer) => {
        if (localStorage.getItem(key) == null) {
          // We don't have a copy of this data, so fetch it from battle.net
          this.httpClient.get<any>(url).subscribe((result: any) => {
            localStorage.setItem(key, JSON.stringify(result));
            // console.log('Loaded ' + key + ' from ' + url, result);
            observer.next(result);
          });
        } else {
          // We already have this data, return it
          const result = JSON.parse(localStorage.getItem(key));
          // console.log('Loaded ' + key + ' from localStorage', result);
          observer.next(result);
        }
      }
    );
  }
}
