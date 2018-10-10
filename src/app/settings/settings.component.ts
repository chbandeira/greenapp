import { Component, OnInit } from '@angular/core';
import { Settings } from './settings.model';
import { SettingsService } from './settings.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SurvivorService } from '../survivor/survivor.service';
import { LangService } from '../core/lang.service';

@Component({
  selector: 'zga-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  localSettings: Settings;

  formSettings: FormGroup;

  saved = false;

  lang: any;

  constructor(
    private settingsService: SettingsService,
    private survivorService: SurvivorService,
    private langService: LangService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.localSettings = this.settingsService.localSettings();
    this.formSettings = this.formBuilder.group({
      appLanguage: this.localSettings.appLanguage,
      skillTitleLanguage: this.localSettings.skillTitleLanguage,
      skillDescriptionLanguage: this.localSettings.skillDescriptionLanguage,
      textReset: 'no'
    });
    this.langService.props(this.localSettings.appLanguage)
      .subscribe(data => this.lang = data);
  }

  save() {
    this.localSettings.appLanguage = this.formSettings.value['appLanguage'];
    this.localSettings.skillTitleLanguage = this.formSettings.value['skillTitleLanguage'];
    this.localSettings.skillDescriptionLanguage = this.formSettings.value['skillDescriptionLanguage'];

    this.settingsService.saveLocalSettings(this.localSettings);
    if (this.formSettings.value['textReset'] === 'yes') {
      this.survivorService.resetLocalSurvivors();
    }
    this.saved = true;
  }

  changeStatus() {
    this.saved = false;
  }

}
