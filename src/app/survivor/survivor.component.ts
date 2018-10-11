import { Component, OnInit, Output } from '@angular/core';
import { Survivor } from './survivor.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SettingsService } from '../settings/settings.service';
import { Settings } from '../settings/settings.model';
import { SurvivorService } from './survivor.service';
import { SkillService } from '../skill/skill.service';
import { LangService } from '../core/lang.service';
import { WikiService } from '../core/wiki.service';

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
  lang: any;
  backgroundInfoSurvivor1: string;
  backgroundInfoSurvivor2: string;

  constructor(
    private survivorService: SurvivorService,
    private skillService: SkillService,
    private settingsService: SettingsService,
    private langService: LangService,
    private wikiService: WikiService,
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
    this.survivorService.localSurvivors()
      .subscribe(data => this.survivorsSelected = data);
    this.langService.props(this.localSettings.appLanguage)
      .subscribe(data => {
        this.lang = data;
        this.backgroundInfoSurvivor1 = this.lang['loading'];
        this.backgroundInfoSurvivor2 = '';
      });
  }

  private clearComboboxSurvivors() {
    this.formSurvivors = this.formBuilder.group({
      comboboxSurvivors: ''
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

  backgroundSurvivor(survivorName: string) {
    this.wikiService.background(survivorName).subscribe(
      data => {
        const htmlObject = document.createElement('div');
        htmlObject.innerHTML = data;
        const elements = htmlObject.getElementsByClassName('article-content mw-content ember-view')[0].getElementsByTagName('p');
        this.backgroundInfoSurvivor1 = this.lang['infoNotFound'];
        this.backgroundInfoSurvivor2 = this.lang['infoNotFound'];
        if (elements[0]) {
          this.backgroundInfoSurvivor1 = elements[0].textContent;
        }
        if (elements[1]) {
          this.backgroundInfoSurvivor2 = elements[1].textContent;
        }
      },
      error => {
        this.backgroundInfoSurvivor1 = this.lang['infoNotFound'];
        this.backgroundInfoSurvivor2 = '';
      });
  }

}
