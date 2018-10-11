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
  printOption: string;

  constructor(
    private survivorService: SurvivorService,
    private settingsService: SettingsService,
    private langService: LangService,
    private skillService: SkillService) { }

  ngOnInit() {
    this.localSettings = this.settingsService.localSettings();
    this.langService.props(this.localSettings.appLanguage)
      .subscribe(data => {
        this.lang = data;
        this.setPrintOptionOnlySurvivorsSaved();
      });
    this.survivorService.localSurvivors()
      .subscribe(data => {
        this.survivors = data;
        this.sliceGroupOfSurvivors();
      });
  }

  private setPrintOptionAllSurvivors() {
    this.printOption = this.lang['text9'];
  }

  private setPrintOptionOnlySurvivorsSaved() {
    this.printOption = this.lang['text10'];
  }

  private sliceGroupOfSurvivors() {
    for (let i = 0; i < this.survivors.length; i = i + 4) {
      this.groupSurvivors.push(this.survivors.slice(i, i + 4));
    }
  }

  downloadPdf() {
    const doc = new jsPDF();
    const i = 0;
    this.savePdf(i, doc);
  }

  savePdf(i: number, doc: jsPDF) {
    html2canvas(document.querySelector('#content' + i)).then(canvas => {
      doc.addImage(canvas.toDataURL('image/png'), 'JPEG', 0, 0);
      i++;
      if (i < this.groupSurvivors.length) {
        doc.addPage();
        this.savePdf(i, doc);
      } else {
        doc.save(this.printOption + '.pdf');
      }
    });
  }

  addAllSurvivors() {
    this.survivorService.survivors()
      .subscribe(data => {
        this.survivors = data;
        this.survivors.forEach(survivor => this.loadSkillsSurvivor(survivor));
        this.groupSurvivors = [];
        this.sliceGroupOfSurvivors();
        this.setPrintOptionAllSurvivors();
      });
  }

  addOnlySurvivorsSaved() {
    this.survivorService.localSurvivors()
      .subscribe(data => {
        this.survivors = data;
        this.groupSurvivors = [];
        this.sliceGroupOfSurvivors();
        this.setPrintOptionOnlySurvivorsSaved();
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
