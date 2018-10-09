import { Component, OnInit } from '@angular/core';
import { Settings } from './settings.model';
import { SettingsService } from './settings.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'zga-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  personalSettings: Settings;

  formSettings: FormGroup;

  private saved: boolean = false;

  constructor(
    private settingsService: SettingsService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.personalSettings = this.settingsService.personalSettings();
    this.formSettings = this.formBuilder.group({
      appLanguage: this.personalSettings.appLanguage,
      skillTitleLanguage: this.personalSettings.skillTitleLanguage,
      skillDescriptionLanguage: this.personalSettings.skillDescriptionLanguage
    })
  }

  save() {
    this.settingsService.savePersonalSettings(this.formSettings.value);
    this.saved = true;
  }

  changeStatus() {
    this.saved = false;
  }

}
