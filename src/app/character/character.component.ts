import { Component, OnInit, Output } from '@angular/core';
import { Character } from './character.model';
import { FormGroup, FormBuilder } from "@angular/forms";
import { SettingsService } from '../settings/settings.service';
import { Settings } from '../settings/settings.model';
import { CharacterService } from './character.service';
import { SkillService } from '../skill/skill.service';

@Component({
  selector: 'zga-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  formSurvivals: FormGroup;

  personalSettings: Settings;

  characters: Character[];

  survivals: Character[];
  comboboxSurvivals: string[] = [];

  lang = {
    "survivals": "Survivals",
    "add": "Add",
    "remove": "Remove"
  }

  constructor(
    private characterService: CharacterService,
    private skillService: SkillService,
    private settingsService: SettingsService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.clearComboboxSurvivals();
    this.personalSettings = this.settingsService.personalSettings();
    this.loadCharacters();
    this.survivals = this.characterService.personalSurvivals();

    if (this.personalSettings.appLanguage == 'pt') {
      this.lang = {
        "survivals": "Sobreviventes",
        "add": "Adicionar",
        "remove": "Remover"
      }
    }
  }

  private loadCharacters() {
    this.characterService.characters().subscribe(data => {
      data.forEach(item => {
        this.skillService.skills([item.card.blue])
          .subscribe(dataDetail => item.card.skillBlue = dataDetail[0]['content']);

        this.skillService.skills([item.card.yellow])
          .subscribe(dataDetail => item.card.skillYellow = dataDetail[0]['content']);

        if (!item.card.skillOrange) item.card.skillOrange = [];
        this.skillService.skills(item.card.orange)
          .subscribe(dataDetail => dataDetail
            .forEach(detail => item.card.skillOrange
              .push(detail['content'])));

        if (!item.card.skillRed) item.card.skillRed = [];
        this.skillService.skills(item.card.red)
          .subscribe(dataDetail => dataDetail
            .forEach(detail => item.card.skillRed
              .push(detail['content'])));
      });
      this.characters = data;
      this.fillComboboxSurvivals(this.characters);
    });
  }

  private fillComboboxSurvivals(characters: Character[]) {
    characters.forEach(character => this.comboboxSurvivals.push(character['name']));
    this.comboboxSurvivals.sort();
  }

  private clearComboboxSurvivals() {
    this.formSurvivals = this.formBuilder.group({
      comboboxSurvivals: ''
    })
  }

  addSurvival() {
    let survival: Character = this.characters
      .find(value => value['name'] == this.formSurvivals.value['comboboxSurvivals']);

    if (survival) {
      let survivalFound = this.survivals
        .find(item => item.name == survival.name);
  
      if (survival && !survivalFound) {
        this.survivals.push(survival);
        this.characterService.save(survival);
      }
  
      this.clearComboboxSurvivals();
    }  
  }

  removeSurvival(survival: Character) {
    this.survivals.splice(this.survivals.indexOf(survival), 1);
    this.characterService.saveAll(this.survivals);
  }

  isComboboxSurvivalClean(): boolean {
    return this.formSurvivals.value['comboboxSurvivals'] == '';
  }

}
