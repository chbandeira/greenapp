import { Component, OnInit, Output } from '@angular/core';
import { Survivor } from './survivor.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SettingsService } from '../settings/settings.service';
import { Settings } from '../settings/settings.model';
import { SurvivorService } from './survivor.service';
import { SkillService } from '../skill/skill.service';
import { LangService } from '../core/lang.service';

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
  comboboxSurvivors = [];
  lang: any;
  items = Array(12);

  constructor(
    private survivorService: SurvivorService,
    private skillService: SkillService,
    private settingsService: SettingsService,
    private langService: LangService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.clearComboboxSurvivors();
    this.localSettings = this.settingsService.localSettings();
    this.survivorService.survivors()
      .subscribe(data => {
        this.survivors = data;
        this.survivors.forEach(survivor => {
          this.comboboxSurvivors.push({
            'name': survivor['name'],
            'box': survivor['box']['name'].replace('Zombicide: ', '')
          });
        });
        this.comboboxSurvivors.sort((a, b) => {
          if (a['name'] < b['name']) { return -1; }
          if (a['name'] > b['name']) { return 1; }
          return 0;
        });
      });
    this.survivorService.localSurvivors()
      .subscribe(data => this.survivorsSelected = data);
    this.langService.props(this.localSettings.appLanguage)
      .subscribe(data => this.lang = data);
  }

  private clearComboboxSurvivors() {
    this.formSurvivors = this.formBuilder.group({
      comboboxSurvivors: '',
      comboboxQuantity: ''
    });
  }

  addSurvivor() {
    const survivor: Survivor = this.survivors
      .find(value => value['name'] === this.formSurvivors.value['comboboxSurvivors']);

    if (survivor) {
      const survivorFound = this.survivorsSelected.find(item => item.name === survivor.name);
      if (survivor && !survivorFound) {
        this.survivorsSelected.push(survivor);
        this.survivorService.save(survivor);
        this.survivorService.loadSkillsSurvivor(survivor);
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
    return this.formSurvivors.value['comboboxSurvivors'] === '';
  }

  isQuantityEmpty(): boolean {
    return this.formSurvivors.value['comboboxQuantity'] === '';
  }

  randomSurvivor() {
    for (let i = 0; i < this.formSurvivors.value['comboboxQuantity'];) {
      const survivor = this.survivors[Math.floor(Math.random() * this.survivors.length)];
      const survivorFound = this.survivorsSelected.find(item => item.name === survivor.name);
      if (survivor && !survivorFound) {
        this.survivorsSelected.push(survivor);
        this.survivorService.save(survivor);
        this.survivorService.loadSkillsSurvivor(survivor);
        i++;
      }
    }
  }
}
