import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings/settings.service';
import { Settings } from '../settings/settings.model';
import { LangService } from '../core/lang.service';

@Component({
  selector: 'zga-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  localSettings: Settings;

  lang: any;

  constructor(
    private settingsService: SettingsService,
    private langService: LangService) { }

  ngOnInit() {
    this.localSettings = this.settingsService.localSettings();
    this.langService.props(this.localSettings.appLanguage)
      .subscribe(data => this.lang = data);
  }
}
