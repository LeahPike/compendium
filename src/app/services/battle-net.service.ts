import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Character} from '../data/character';
import {Class, Classes} from '../data/class';
import {Race, Races} from '../data/race';
import {Achievement, Achievements} from '../data/achievement';

@Injectable()
export class BattleNetService {

  // Avatar: http://render-us.worldofwarcraft.com/character/lightbringer/110/115539310-avatar.jpg
  // Main: http://render-us.worldofwarcraft.com/character/lightbringer/110/115539310-main.jpg
  // Inset: http://render-us.worldofwarcraft.com/character/lightbringer/110/115539310-inset.jpg

  private renderUrl = 'http://render-eu.worldofwarcraft.com';
  private baseUrl = 'https://eu.api.blizzard.com/';
  private apiKey = 'namespace=static-eu&locale=en_GB';
  private accessToken = '';

  constructor(private httpClient: HttpClient) {
  }

  getClasses(): Observable<Class[]> {
    return new Observable<Class[]>((observer) => {
        const url = this.baseUrl + 'wow/data/character/classes?' + this.apiKey;
        this.getData('classes', url).subscribe((result: Classes) => {
          observer.next(result.classes);
          observer.complete();
        });
      }
    );
  }

  getRaces(): Observable<Race[]> {
    return new Observable<Race[]>((observer) => {
        const url = this.baseUrl + 'wow/data/character/races?' + this.apiKey;
        this.getData('races', url).subscribe((result: Races) => {
          observer.next(result.races);
          observer.complete();
        });
      }
    );
  }

  getAchievement(achievementId: number): Observable<Achievement> {
    return new Observable<Achievement>((observer) => {
        const url = this.baseUrl + 'wow/achievement/' + achievementId + '?' + this.apiKey;
        this.getData('achievement' + achievementId, url).subscribe((result: Achievement) => {
          observer.next(result);
          observer.complete();
        });
      }
    );
  }

  // getAchievements(): Observable<Achievement[]> {
  //   return new Observable<Achievement[]>((observer) => {
  //       const url = this.baseUrl + '/data/character/achievements?' + this.apiKey;
  //       this.getData('achievements', url).subscribe((result: Achievements) => {
  //         observer.next(result.achievements);
  //         observer.complete();
  //       });
  //     }
  //   );
  // }

  getCharacter(character: string): Observable<Character> {
    return new Observable<Character>((observer) => {
        const fields = 'fields=professions+quests+talents+feed+achievements+class';
        const url = this.baseUrl + 'wow/character/' + character + '?' + fields + '&' + this.apiKey;
        this.getData(character, url).subscribe((result: Character) => {
          observer.next(result);
          observer.complete();
        });
      }
    );
  }

  getToken(): Observable<any> {
    return new Observable<any>((observer) => {
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

  private getData(key: string, url: string): Observable<any> {
    return new Observable<any>((observer) => {

        if (localStorage.getItem(key) == null) {
          const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + this.accessToken
            })
          };

          // We don't have a copy of this data, so fetch it from battle.net
          this.httpClient.get<any>(url, httpOptions).subscribe((result: any) => {
            localStorage.setItem(key, JSON.stringify(result));
            console.log('Loaded ' + key + ' from ' + url, result);
            observer.next(result);
            observer.complete();
          });

        } else {
          // We already have this data, return it
          const result = JSON.parse(localStorage.getItem(key));
          console.log('Loaded ' + key + ' from localStorage', result);
          observer.next(result);
          observer.complete();
        }
      }
    );
  }
}
