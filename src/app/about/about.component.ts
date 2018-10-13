import { Component, OnInit, Input } from '@angular/core';
import { Settings } from '../settings/settings.model';
import { SettingsService } from '../settings/settings.service';
import { SurvivorService } from '../survivor/survivor.service';
import { Survivor } from '../survivor/survivor.model';
import { LangService } from '../core/lang.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'zga-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  version = '1.0.0-beta';
  localSettings: Settings;
  survivors: Survivor[];
  nameSurvivors: string;
  lang: any;
  sample: any;

  constructor(
    private settingsService: SettingsService,
    private survivorService: SurvivorService,
    private langService: LangService) { }

  ngOnInit() {
    this.localSettings = this.settingsService.localSettings();
    this.langService.props(this.localSettings.appLanguage)
      .subscribe(data => this.lang = data);
    this.survivorService.survivors()
      .subscribe(data => this.fillNameSurvivors(data));
  }

  private fillNameSurvivors(survivors: Survivor[]) {
    const nameSurvivors: string[] = [];
    survivors.forEach(survivor => {
      nameSurvivors.push(survivor['name']);
      if (survivor['name'] === 'Rolf') {
        this.sample = survivor;
      }
    });
    this.nameSurvivors = `(${nameSurvivors.length}) ` + nameSurvivors.sort().join(', ');
  }
}
