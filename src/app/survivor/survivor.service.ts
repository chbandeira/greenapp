import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Survivor } from './survivor.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SkillService } from '../skill/skill.service';

@Injectable({
  providedIn: 'root'
})
export class SurvivorService {

  constructor(
    private http: HttpClient,
    private skillService: SkillService) { }

  survivors(): Observable<Survivor[]> {
    return this.http.get(environment.db).pipe(
      map(data => data['survivors'])
    );
  }

  localSurvivors(): Survivor[] {
    let survivors: Survivor[] = JSON.parse(localStorage.getItem('survivors'));
    if (!survivors) {
      survivors = [];
      localStorage.setItem('survivors', JSON.stringify(survivors));
    }
    return survivors;
  }

  save(survivor: Survivor) {
    const survivors: Survivor[] = JSON.parse(localStorage.getItem('survivors'));
    survivors.push(this.cleanSkillsToSave(JSON.parse(JSON.stringify(survivor))));
    localStorage.setItem('survivors', JSON.stringify(survivors));
    this.skillService.saveSurvivorLocalSkill(survivor.name);
  }

  saveAll(survivors: Survivor[]) {
    const survivorsToSave = JSON.parse(JSON.stringify(survivors));
    survivorsToSave.forEach(survivor => this.cleanSkillsToSave(survivor));
    localStorage.setItem('survivors', JSON.stringify(survivorsToSave));
  }

  resetLocalSurvivors() {
    localStorage.setItem('survivors', JSON.stringify([]));
    this.skillService.resetLocalSkills();
  }

  private cleanSkillsToSave(survivorToSave: Survivor) {
    survivorToSave.level.skillBlue = [];
    survivorToSave.level.skillYellow = [];
    survivorToSave.level.skillOrange = [];
    survivorToSave.level.skillRed = [];
    return survivorToSave;
  }
}
