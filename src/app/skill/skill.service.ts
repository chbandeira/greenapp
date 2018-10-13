import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalSkills } from './local-skills.model';
import { SkillLevel } from './skill-level.model';
import { Skill } from './skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private _dataSkill = '../../assets/data/skills.json';

  constructor(private http: HttpClient) { }

  skills(skills: string[]): Observable<Skill[]> {
    return this.http.get(this._dataSkill).pipe(
      map(data => data['skills']
        .filter(skill => skills.includes(skill['name']))));
  }

  loadSurvivalLocalSkills(survivorName: string): LocalSkills {
    const localSkills: LocalSkills[] = this.loadLocalSkills();
    const survivorLocalSkills: LocalSkills = localSkills.find(item => item.name === survivorName);
    if (!survivorLocalSkills.skillLevels) { survivorLocalSkills.skillLevels = []; }
    return survivorLocalSkills;
  }

  saveSurvivorLocalSkill(survivorName: string) {
    const localSkills: LocalSkills[] = this.loadLocalSkills();
    const survivorLocalSkills: LocalSkills = new LocalSkills();
    survivorLocalSkills.name = survivorName;
    localSkills.push(survivorLocalSkills);
    localStorage.setItem('skills', JSON.stringify(localSkills));
  }

  deleteSurvivorLocalSkill(survivorName: string) {
    const localSkills: LocalSkills[] = this.loadLocalSkills();
    const survivorLocalSkills: LocalSkills = localSkills.find(item => item.name === survivorName);
    localSkills.splice(localSkills.indexOf(survivorLocalSkills), 1);
    localStorage.setItem('skills', JSON.stringify(localSkills));
  }

  loadLocalSkills(): LocalSkills[] {
    let localSkills: LocalSkills[] = JSON.parse(localStorage.getItem('skills'));
    if (!localSkills) { localSkills = []; }
    return localSkills;
  }

  saveLocalSkill(survivorName: string, skillLevel: SkillLevel) {
    const localSkills: LocalSkills[] = this.loadLocalSkills();
    const survivorLocalSkills: LocalSkills = localSkills.find(item => item.name === survivorName);
    if (!survivorLocalSkills.skillLevels) { survivorLocalSkills.skillLevels = []; }
    survivorLocalSkills.skillLevels.push(skillLevel);
    localStorage.setItem('skills', JSON.stringify(localSkills));
  }

  deleteLocalSkill(survivorName: string, skillLevel: SkillLevel) {
    const localSkills: LocalSkills[] = this.loadLocalSkills();
    const survivorLocalSkills: LocalSkills = localSkills.find(item => item.name === survivorName);
    survivorLocalSkills.skillLevels.splice(survivorLocalSkills.skillLevels.indexOf(skillLevel), 1);
    localStorage.setItem('skills', JSON.stringify(localSkills));
  }

  resetLocalSkills() {
    localStorage.setItem('skills', JSON.stringify([]));
  }
}
