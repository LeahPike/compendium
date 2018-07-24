import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Character} from './character';
import {Class, Classes} from './class';
import {Race, Races} from './race';
import {delay} from 'rxjs/operator/delay';

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

  getCharacter(realm: string, name: string): Observable<Character> {
    return new Observable<Character>((observer) => {
        const fields = 'fields=professions+quests+talents+feed+achievements';
        const url = this.baseUrl + '/character/' + realm + '/' + name + '?' + fields + '&' + this.apiKey;
        this.getData(realm + '/' + name, url).subscribe((result: Character) => {
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
            console.log('Loaded ' + key + ' from ' + url, result);
            observer.next(result);
          });
        } else {
          // We already have this data, return it
          const result = JSON.parse(localStorage.getItem(key));
          console.log('Loaded ' + key + ' from localStorage', result);
          observer.next(result);
        }
      }
    );
  }
}
