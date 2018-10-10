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

  localSettings: Settings;

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
    this.localSettings = this.settingsService.localSettings();
    this.formSettings = this.formBuilder.group({
      appLanguage: this.localSettings.appLanguage,
      skillTitleLanguage: this.localSettings.skillTitleLanguage,
      skillDescriptionLanguage: this.localSettings.skillDescriptionLanguage
    });

    if (this.localSettings.appLanguage == 'pt') {
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
    this.settingsService.saveLocalSettings(this.formSettings.value);
    this.saved = true;
  }

  changeStatus() {
    this.saved = false;
  }

}
