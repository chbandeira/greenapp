import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Character } from './character.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  characters() {
    return this.http.get<Character[]>(environment.db).pipe(
      map(data => data['characters'])
    )
  }

  personalSurvivals(): Character[] {
    let survivals: Character[] = JSON.parse(localStorage.getItem('survivals'));
    if (!survivals) {
      survivals = [];
      localStorage.setItem('survivals', JSON.stringify(survivals));
    }
    return survivals;
  }

  save(survival: Character) {
    let survivals: Character[] = JSON.parse(localStorage.getItem('survivals'));
    survivals.push(survival);
    localStorage.setItem('survivals', JSON.stringify(survivals));
  }

  saveAll(survivals: Character[]) {
    localStorage.setItem('survivals', JSON.stringify(survivals));
  }

}
