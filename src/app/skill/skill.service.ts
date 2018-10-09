import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SkillContent } from '../skill/skill-content.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  skills(skills: string[]): Observable<SkillContent[]> {
    return this.http.get(environment.db).pipe(
      map(data => data['skills']
        .filter(skill => skills.includes(skill['name']))));
  }
}
