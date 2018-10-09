import { Injectable } from '@angular/core';
import { Settings } from './settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  personalSettings(): Settings {
    let settings: Settings = JSON.parse(localStorage.getItem('settings'));
    if (!settings) {
      settings = new Settings();
      this.savePersonalSettings(settings);
    }
    return settings;
  }

  savePersonalSettings(settings: Settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}
