import { Component, OnInit, Output } from '@angular/core';
import { Survivor } from './survivor.model';
import { FormGroup, FormBuilder } from "@angular/forms";
import { SettingsService } from '../settings/settings.service';
import { Settings } from '../settings/settings.model';
import { SurvivorService } from './survivor.service';
import { SkillService } from '../skill/skill.service';

@Component({
  selector: 'zga-survivor',
  templateUrl: './survivor.component.html',
  styleUrls: ['./survivor.component.css']
})
export class SurvivorComponent implements OnInit {

  formSurvivors: FormGroup;

  localSettings: Settings;

  survivors: Survivor[];

  survivorsSelected: Survivor[];
  comboboxSurvivors: string[] = [];

  lang = {
    "survivors": "Survivors",
    "add": "Add",
    "remove": "Remove"
  }

  constructor(
    private survivorService: SurvivorService,
    private skillService: SkillService,
    private settingsService: SettingsService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.clearComboboxSurvivors();
    this.localSettings = this.settingsService.localSettings();
    this.survivorService.survivors()
      .subscribe(data => {
        this.survivors = data;
        this.survivors.forEach(survivor => this.comboboxSurvivors.push(survivor['name']));
        this.comboboxSurvivors.sort();
      });
    this.survivorsSelected = this.survivorService.localSurvivors();
    this.survivorsSelected.forEach(survivorSelected => this.loadSkillsSurvivor(survivorSelected));

    if (this.localSettings.appLanguage == 'pt') {
      this.lang = {
        "survivors": "Sobreviventes",
        "add": "Adicionar",
        "remove": "Remover"
      }
    }

    //remove
    this.testLoadSkillsSurvivor();
  }

  private clearComboboxSurvivors() {
    this.formSurvivors = this.formBuilder.group({
      comboboxSurvivors: ''
    })
  }

  addSurvivor() {
    let survivor: Survivor = this.survivors
      .find(value => value['name'] == this.formSurvivors.value['comboboxSurvivors']);

    if (survivor) {
      let survivorFound = this.survivorsSelected.find(item => item.name == survivor.name);
      if (survivor && !survivorFound) {
        this.survivorsSelected.push(survivor);
        this.survivorService.save(survivor);
        this.loadSkillsSurvivor(survivor);
      }
      this.clearComboboxSurvivors();
    }
  }

  removeSurvivor(survivor: Survivor) {
    this.survivorsSelected.splice(this.survivorsSelected.indexOf(survivor), 1);
    this.skillService.deleteSurvivorLocalSkill(survivor.name);
    this.survivorService.saveAll(this.survivorsSelected);
  }

  isComboboxSurvivorClean(): boolean {
    return this.formSurvivors.value['comboboxSurvivors'] == '';
  }

  private loadSkillsSurvivor(survivor: Survivor) {
    if (!survivor.level.skillBlue) survivor.level.skillBlue = [];
    this.skillService.skills(survivor.level.blue)
      .subscribe(dataDetail => dataDetail
        .forEach(detail => survivor.level.skillBlue
          .push(detail['content'])));

    if (!survivor.level.skillYellow) survivor.level.skillYellow = [];
    this.skillService.skills(survivor.level.yellow)
      .subscribe(dataDetail => dataDetail
        .forEach(detail => survivor.level.skillYellow
          .push(detail['content'])));

    if (!survivor.level.skillOrange) survivor.level.skillOrange = [];
    this.skillService.skills(survivor.level.orange)
      .subscribe(dataDetail => dataDetail
        .forEach(detail => survivor.level.skillOrange
          .push(detail['content'])));

    if (!survivor.level.skillRed) survivor.level.skillRed = [];
    this.skillService.skills(survivor.level.red)
      .subscribe(dataDetail => dataDetail
        .forEach(detail => survivor.level.skillRed
          .push(detail['content'])));
  }

  //remover
  private testLoadSkillsSurvivor() {

    console.log('testing...');

    this.survivorService.survivors()
      .subscribe(data => data.forEach(survivor => {
        if (!survivor.level.skillBlue) survivor.level.skillBlue = [];
        this.skillService.skills(survivor.level.blue)
          .subscribe(dataDetail => {
            let skillFound: string[] = [];
            dataDetail
              .forEach(detail => {
                skillFound.push(detail['name']);
                survivor.level.skillBlue.push(detail['content']);
              });
            survivor.level.blue.forEach(value => {
              if (!skillFound.includes(value)) console.log(value);
            });
          });

        if (!survivor.level.skillYellow) survivor.level.skillYellow = [];
        this.skillService.skills(survivor.level.yellow)
          .subscribe(dataDetail => {
            let skillFound: string[] = [];
            dataDetail
              .forEach(detail => {
                skillFound.push(detail['name']);
                survivor.level.skillYellow.push(detail['content']);
              });
            survivor.level.yellow.forEach(value => {
              if (!skillFound.includes(value)) console.log(value);
            });
          });

        if (!survivor.level.skillOrange) survivor.level.skillOrange = [];
        this.skillService.skills(survivor.level.orange)
          .subscribe(dataDetail => {
            let skillFound: string[] = [];
            dataDetail
              .forEach(detail => {
                skillFound.push(detail['name']);
                survivor.level.skillOrange.push(detail['content']);
              });
            survivor.level.orange.forEach(value => {
              if (!skillFound.includes(value)) console.log(value);
            });
          });

        if (!survivor.level.skillRed) survivor.level.skillRed = [];
        this.skillService.skills(survivor.level.red)
          .subscribe(dataDetail => {
            let skillFound: string[] = [];
            dataDetail
              .forEach(detail => {
                skillFound.push(detail['name']);
                survivor.level.skillRed.push(detail['content']);
              });
            survivor.level.red.forEach(value => {
              if (!skillFound.includes(value)) console.log(value);
            });
          });
      }));
  }
}
