import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WikiService {

  private _uri = 'http://zbp.wikia.com/wiki/';
  // change for above and excute this when running local: ng serve --proxy-config proxy.conf.json
  // private _uri = '/wiki/';

  constructor(private http: HttpClient) { }

  background(survivorName: string): Observable<any> {
    return this.http.get(this._uri + survivorName.replace(' ', '_'), { responseType: 'text' });
  }

}
