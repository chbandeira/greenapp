import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Background } from './background.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  private _dataBackground = './assets/data/backgrounds_en.json';

  constructor(private http: HttpClient) { }

  backgrounds(nameSurvivor: string): Observable<Background[]> {
    return this.http.get(this._dataBackground).pipe(
      map(data => data['backgrounds']
        .filter(item => item['nameSurvivor'] === nameSurvivor))
    );
  }

}
