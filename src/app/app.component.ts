import { Component } from '@angular/core';
import { SettingsService } from './settings/settings.service';
import { Settings } from './settings/settings.model';

@Component({
  selector: 'zga-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  localSettings: Settings;

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.localSettings = this.settingsService.localSettings();
  }
}
