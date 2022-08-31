import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Statistics} from '../models/foes/statistics';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public constructor(private http: HttpClient) {}

  public getFoeStatistics(
    foeName: string,
    chapter: number,
    template: string,
    specialTemplate: string,
    addMobTemplate: false,
    addEliteTemplate: false): Observable<Statistics> {
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'}).append('Access-Control-Allow-Origin', '*')
      };

      return this.http.post<Statistics>(`${environment.apiAddress}/foe`,
        {
          foeName,
          chapter,
          template,
          specialTemplate,
          addMobTemplate,
          addEliteTemplate
        }, httpOptions)
       .pipe(
         map(x => new Statistics().deserialize(x))
       );
  }

  public getFoes(
    classFilter: string,
    factionFilter: string,
    specialClassFilter: string): Observable<string[]> {

    const params = {};

    if (classFilter) { Object.assign(params, { classFilter }); }
    if (factionFilter) { Object.assign(params, { factionFilter }); }
    if (specialClassFilter) { Object.assign(params, { specialClassFilter }); }

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'})
        .append('Access-Control-Allow-Origin', '*'),
      params
    };

    return this.http.get<string[]>(`${environment.apiAddress}/foe`, httpOptions);
  }
}
