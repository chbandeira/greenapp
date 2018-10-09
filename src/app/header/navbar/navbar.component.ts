import { Component, OnInit, Input, Output } from '@angular/core';
import { Settings } from 'src/app/settings/settings.model';

@Component({
  selector: 'zga-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() personalSettings: Settings;

  lang = {
    "survivals": "Survivals",
    "settings": "Settings",
    "about": "About"
  };  

  constructor() { }

  ngOnInit() {
    if (this.personalSettings.appLanguage == 'pt') {
      this.lang = {
        "survivals": "Sobreviventes",
        "settings": "Configurações",
        "about": "Sobre"
      }; 
    }
  }

}
