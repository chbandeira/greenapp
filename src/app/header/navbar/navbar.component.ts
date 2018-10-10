import { Component, OnInit, Input, Output } from '@angular/core';
import { Settings } from 'src/app/settings/settings.model';

@Component({
  selector: 'zga-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() localSettings: Settings;

  lang = {
    "survivors": "Survivors",
    "settings": "Settings",
    "about": "About"
  };  

  constructor() { }

  ngOnInit() {
    if (this.localSettings.appLanguage == 'pt') {
      this.lang = {
        "survivors": "Sobreviventes",
        "settings": "Configurações",
        "about": "Sobre"
      }; 
    }
  }

}
