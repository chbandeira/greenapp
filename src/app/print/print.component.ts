import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SurvivorService } from '../survivor/survivor.service';
import { Survivor } from '../survivor/survivor.model';
import { SkillService } from '../skill/skill.service';
import { Settings } from '../settings/settings.model';
import { SettingsService } from '../settings/settings.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { LangService } from '../core/lang.service';

@Component({
  selector: 'zga-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  groupSurvivors = [];
  survivors: Survivor[];
  localSettings: Settings;
  lang: any;

  constructor(
    private survivorService: SurvivorService,
    private settingsService: SettingsService,
    private langService: LangService,
    private skillService: SkillService) { }

  ngOnInit() {
    this.localSettings = this.settingsService.localSettings();
    this.langService.props(this.localSettings.appLanguage)
      .subscribe(data => this.lang = data);
    this.survivors = this.survivorService.localSurvivors();
    this.survivors.forEach(survivor => this.loadSkillsSurvivor(survivor));
    this.sliceGroupOfSurvivors();
  }

  private sliceGroupOfSurvivors() {
    if (this.survivors.length > 4) {
      this.groupSurvivors.push(this.survivors.slice(0, 4));
      // TODO better than this
      if (this.survivors.slice(4, 8).length > 0) { this.groupSurvivors.push(this.survivors.slice(4, 8)); }
      if (this.survivors.slice(8, 12).length > 0) { this.groupSurvivors.push(this.survivors.slice(8, 12)); }
    } else {
      this.groupSurvivors.push(this.survivors);
    }
  }

  download(i: number) {
    html2canvas(document.querySelector('#content' + i)).then(canvas => {
      const doc = new jsPDF();
      doc.addImage(canvas.toDataURL('image/png'), 'JPEG', 0, 0);
      doc.save('my_survivors.pdf');
    });
  }

  private loadSkillsSurvivor(survivor: Survivor) {
    if (!survivor.level.skillBlue) { survivor.level.skillBlue = []; }
    this.skillService.skills(survivor.level.blue)
      .subscribe(dataDetail => dataDetail
        .forEach(detail => survivor.level.skillBlue
          .push(detail['content'])));

    if (!survivor.level.skillYellow) { survivor.level.skillYellow = []; }
    this.skillService.skills(survivor.level.yellow)
      .subscribe(dataDetail => dataDetail
        .forEach(detail => survivor.level.skillYellow
          .push(detail['content'])));

    if (!survivor.level.skillOrange) { survivor.level.skillOrange = []; }
    this.skillService.skills(survivor.level.orange)
      .subscribe(dataDetail => dataDetail
        .forEach(detail => survivor.level.skillOrange
          .push(detail['content'])));

    if (!survivor.level.skillRed) { survivor.level.skillRed = []; }
    this.skillService.skills(survivor.level.red)
      .subscribe(dataDetail => dataDetail
        .forEach(detail => survivor.level.skillRed
          .push(detail['content'])));
  }
}
