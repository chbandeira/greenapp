import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  constructor(private http: HttpClient) { }

  props(lang: string): Observable<any> {
    if (lang === 'en') {
      return this.http.get(environment.lang_en);
    } else {
      return this.http.get(environment.lang_pt);
    }
  }
}
