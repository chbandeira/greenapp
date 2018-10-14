import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Survivor } from './survivor.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SkillService } from '../skill/skill.service';

@Injectable({
  providedIn: 'root'
})
export class SurvivorService {

  private _dataSurvivors = './assets/data/survivors.json';

  constructor(
    private http: HttpClient,
    private skillService: SkillService) { }

  survivors(): Observable<Survivor[]> {
    return this.http.get(this._dataSurvivors).pipe(
      map(data => data['survivors']
        .filter(survivor => survivor['box']['code'] !== 'XX'))
    );
  }

  localSurvivors(): Observable<Survivor[]> {
    let survivors: Survivor[] = JSON.parse(localStorage.getItem('survivors'));
    if (!survivors) {
      survivors = [];
      localStorage.setItem('survivors', JSON.stringify(survivors));
    }
    survivors.forEach(survivor => this.loadSkillsSurvivor(survivor));
    return of(survivors);
  }

  loadSkillsSurvivor(survivor: Survivor) {
    if (!survivor.level.skillBlue) { survivor.level.skillBlue = []; }
    this.skillService.skills(survivor.level.blue)
      .subscribe(skills => skills
        .forEach(skill => survivor.level.skillBlue
          .push(skill['content'])));

    if (!survivor.level.skillYellow) { survivor.level.skillYellow = []; }
    this.skillService.skills(survivor.level.yellow)
      .subscribe(skills => skills
        .forEach(skill => survivor.level.skillYellow
          .push(skill['content'])));

    if (!survivor.level.skillOrange) { survivor.level.skillOrange = []; }
    this.skillService.skills(survivor.level.orange)
      .subscribe(skills => skills
        .forEach(skill => survivor.level.skillOrange
          .push(skill['content'])));

    if (!survivor.level.skillRed) { survivor.level.skillRed = []; }
    this.skillService.skills(survivor.level.red)
      .subscribe(skills => skills
        .forEach(skill => survivor.level.skillRed
          .push(skill['content'])));
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
