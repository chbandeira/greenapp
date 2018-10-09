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

  saved: boolean = false;

  lang = {
    "settings": "Settings",
    "appLanguage": "App Language",
    "skillTitleLanguage": "Skill title language",
    "skillDescriptionLanguage": "Skill description language",
    "english": "English",
    "portuguese": "Portuguese",
    "save": "Save",
    "cancel": "Cancel",
    "msg": "Settings was saved!",
    "update": "Update"
  }

  constructor(
    private settingsService: SettingsService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.personalSettings = this.settingsService.personalSettings();
    this.formSettings = this.formBuilder.group({
      appLanguage: this.personalSettings.appLanguage,
      skillTitleLanguage: this.personalSettings.skillTitleLanguage,
      skillDescriptionLanguage: this.personalSettings.skillDescriptionLanguage
    });

    if (this.personalSettings.appLanguage == 'pt') {
      this.lang = {
        "settings": "Configurações",
        "appLanguage": "Idioma do App",
        "skillTitleLanguage": "Idioma do título da habilidade",
        "skillDescriptionLanguage": "Idioma da descrição da habilidade",
        "english": "Inglês",
        "portuguese": "Português",
        "save": "Salvar",
        "cancel": "Cancelar",
        "msg": "As configurações foram salvas!",
        "update": "Atualizar"
      }
    }
  }

  save() {
    this.settingsService.savePersonalSettings(this.formSettings.value);
    this.saved = true;
  }

  changeStatus() {
    this.saved = false;
  }

}
