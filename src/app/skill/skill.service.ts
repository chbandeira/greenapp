import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SkillContent } from '../skill/skill-content.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { LocalSkills } from './local-skills.model';
import { SkillLevel } from './skill-level.model';

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

  loadSurvivalLocalSkills(survivorName: string): LocalSkills {
    let localSkills: LocalSkills[] = this.loadLocalSkills();
    let survivorLocalSkills: LocalSkills = localSkills.find(item => item.name == survivorName);
    if (!survivorLocalSkills.skillLevels) survivorLocalSkills.skillLevels = [];
    return survivorLocalSkills;
  }

  saveSurvivorLocalSkill(survivorName: string) {
    let localSkills: LocalSkills[] = this.loadLocalSkills();
    let survivorLocalSkills: LocalSkills = new LocalSkills();
    survivorLocalSkills.name = survivorName;
    localSkills.push(survivorLocalSkills);
    localStorage.setItem('skills', JSON.stringify(localSkills));
  }

  deleteSurvivorLocalSkill(survivorName: string) {
    let localSkills: LocalSkills[] = this.loadLocalSkills();
    let survivorLocalSkills: LocalSkills = localSkills.find(item => item.name == survivorName);
    localSkills.splice(localSkills.indexOf(survivorLocalSkills), 1);
    localStorage.setItem('skills', JSON.stringify(localSkills));
  }

  loadLocalSkills(): LocalSkills[] {
    let localSkills: LocalSkills[] = JSON.parse(localStorage.getItem('skills'));
    if (!localSkills) localSkills = [];
    return localSkills;
  }

  saveLocalSkill(survivorName: string, skillLevel: SkillLevel) {
    let localSkills: LocalSkills[] = this.loadLocalSkills();
    let survivorLocalSkills: LocalSkills = localSkills.find(item => item.name == survivorName);
    if (!survivorLocalSkills.skillLevels) survivorLocalSkills.skillLevels = [];
    survivorLocalSkills.skillLevels.push(skillLevel);
    localStorage.setItem('skills', JSON.stringify(localSkills));
  }

  deleteLocalSkill(survivorName: string, skillLevel: SkillLevel) {
    let localSkills: LocalSkills[] = this.loadLocalSkills();
    let survivorLocalSkills: LocalSkills = localSkills.find(item => item.name == survivorName);
    survivorLocalSkills.skillLevels.splice(survivorLocalSkills.skillLevels.indexOf(skillLevel), 1);
    localStorage.setItem('skills', JSON.stringify(localSkills));
  }
}
