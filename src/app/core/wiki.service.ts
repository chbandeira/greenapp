import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WikiService {

  constructor(private http: HttpClient) { }

  background(survivorName: string): Observable<any> {
    return this.http.get('/wiki/' + this.replaceName(survivorName), { responseType: 'text' });
  }

  private replaceName(survivorName: string): string {
    let name = survivorName;
    if (survivorName.includes('(Ultimate)')) {
      name = 'Ultimate_' + survivorName.replace(' (Ultimate)', '');
    }
    return name.replace(' ', '_');
  }
}
