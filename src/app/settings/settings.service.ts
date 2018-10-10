import { Injectable } from '@angular/core';
import { Settings } from './settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  localSettings(): Settings {
    let settings: Settings = JSON.parse(localStorage.getItem('settings'));
    if (!settings) {
      settings = new Settings();
      this.saveLocalSettings(settings);
    }
    return settings;
  }

  saveLocalSettings(settings: Settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}
