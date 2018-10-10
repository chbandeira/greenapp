import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings/settings.service';
import { Settings } from '../settings/settings.model';

@Component({
  selector: 'zga-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  localSettings: Settings;

  lang = {
    "text1": "App for Zombicide Green Horde (and Black Plague too).",
    "text2": "Go to the Settings in the menu above to configure the language.",
    "text3": "See your Survivor(s) in the menu above."
  }

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.localSettings = this.settingsService.localSettings();

    if (this.localSettings.appLanguage == 'pt') {
      this.lang = {
        "text1": "App para Zombicide Green Horde (e Black Plague também).",
        "text2": "Vá para as Configurações no menu acima para configurar o idioma.",
        "text3": "Veja seu(s) Sobrevinente(s) no menu acima."
      }
    }
  }
}
