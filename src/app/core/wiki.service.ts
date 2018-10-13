import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WikiService {

  constructor(private http: HttpClient) { }

  background(survivorName: string): Observable<any> {
    return this.http.get('/wiki/' + survivorName.replace(' ', '_'), { responseType: 'text' });
  }

}
