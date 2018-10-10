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
    )
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
    let survivors: Survivor[] = JSON.parse(localStorage.getItem('survivors'));
    let survivorToSave = JSON.parse(JSON.stringify(survivor));
    survivorToSave.skillBlue = [];
    survivorToSave.skillYellow = [];
    survivorToSave.skillOrange = [];
    survivorToSave.skillRed = [];
    survivors.push(survivorToSave);
    localStorage.setItem('survivors', JSON.stringify(survivors));
    this.skillService.saveSurvivorLocalSkill(survivor.name);
  }

  saveAll(survivors: Survivor[]) {
    localStorage.setItem('survivors', JSON.stringify(survivors));
  }

}
