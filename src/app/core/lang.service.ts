import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  private _dataLangEn = './assets/data/lang_en.json';
  private _dataLangPt = './assets/data/lang_pt.json';

  constructor(private http: HttpClient) { }

  props(lang: string): Observable<any> {
    if (lang === 'en') {
      return this.http.get(this._dataLangEn);
    } else {
      return this.http.get(this._dataLangPt);
    }
  }
}
