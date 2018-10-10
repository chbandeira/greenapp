import { Component, OnInit, Input } from '@angular/core';
import { Settings } from '../settings/settings.model';
import { SettingsService } from '../settings/settings.service';
import { SurvivorService } from '../survivor/survivor.service';
import { Survivor } from '../survivor/survivor.model';

@Component({
  selector: 'zga-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  localSettings: Settings;
  survivors: Survivor[];
  nameSurvivors: string;

  lang = {
    "about": "About",
    "versionapp": "APP Version",
    "text1": "This application was developed to speed up reading the abilities of each survivor who is in the board games Zombicide Green Horde and Zombicide Black Plague.",
    "text2": "Settings and survivor information are saved directly in the local storage of the device browser.",
    "by": "Developed by",
    "icons": "Icons",
    "text3": "If you'd like to include any official survivor that are not in the App, please send an email with the data as shown in the example:",
    "text4": "List of all the survivors available on the App:",
    "example": "Example"
  }

  sample = `
  "name": "Rolf",
  "level": {
    "blue": "Bloodlust: Melee",
    "yellow": "+1 Action",
    "orange": [
      "+1 free Melee Action",
      "Jump"
    ],
    "red": [
      "+1 free Combat Action",
      "Battle rage",
      "Shove"
    ]
  }`

  version = "1.0.0-beta";

  constructor(
    private settingsService: SettingsService,
    private survivorService: SurvivorService) { }

  ngOnInit() {

    this.localSettings = this.settingsService.localSettings();

    this.survivorService.survivors()
      .subscribe(data => this.fillNameSurvivors(data)); 

    if (this.localSettings.appLanguage == 'pt') {
      this.lang = {
        "about": "Sobre",
        "versionapp": "Versão do APP",
        "text1": "Este aplicativo foi desenvolvido para agilizar a leitura das habilidades de cada sobrevivente que o jogador esteja utilizando nos jogos Zombicide Green Horde e Zombicide Black Plague.",
        "text2": "As configurações e informações de sobreviventes são salvas diretamente no armazenamento local do navegador do dispositivo.",
        "by": "Desenvolvido por",
        "icons": "Ícones",
        "text3": "Caso queira incluir algum sobrevivente oficial que não está no App, envie um email com os dados como mostrado no exemplo:",
        "text4": "Lista de todos os sobreviventes disponíveis no App:",
        "example": "Exemplo"
      }
    }
  }

  private fillNameSurvivors(survivors: Survivor[]) {
    let nameSurvivors: string[] = [];
    survivors.forEach(survivor => nameSurvivors.push(survivor['name']));
    this.nameSurvivors = nameSurvivors.sort().join(", ");
  }
}
