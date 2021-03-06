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
  loading = '';
  styleProgress: string;
  valuenowProgress: number;
  downloadPdfDisabled: boolean;

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
    this.downloadPdfDisabled = false;
  }

  private setPrintOptionOnlySurvivorsSaved() {
    this.printOption = this.lang['text10'];
    this.downloadPdfDisabled = false;
  }

  private sliceGroupOfSurvivors() {
    for (let i = 0; i < this.survivors.length; i = i + 4) {
      this.groupSurvivors.push(this.survivors.slice(i, i + 4));
    }
  }

  downloadPdf() {
    this.valuenowProgress = 0;
    this.styleProgress = '0%';
    this.loading = this.lang['loading'];
    const doc = new jsPDF('p', 'mm', 'a4');
    const i = 0;
    this.savePdf(i, doc);
  }

  savePdf(i: number, doc: jsPDF) {
    this.valuenowProgress = Math.trunc(((i + 1) / this.groupSurvivors.length * 100));
    this.styleProgress = `${this.valuenowProgress}%`;
    html2canvas(document.querySelector('#content' + i)).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/jpeg');
      doc.addImage(contentDataURL, 'JPEG', 0, 1, imgWidth, imgHeight);
      i++;
      if (i < this.groupSurvivors.length) {
        doc.addPage();
        this.savePdf(i, doc);
      } else {
        this.loading = '';
        doc.save(this.printOption + '.pdf');
      }
    });
  }

  addAllSurvivors() {
    this.downloadPdfDisabled = true;
    this.survivorService.survivors()
      .subscribe(data => {
        this.survivors = [];
        data.forEach(item => {
          if (item['box']['name'] !== '?') {
            this.survivors.push(item);
          }
        });
        this.survivors.forEach(survivor => this.loadSkillsSurvivor(survivor));
        this.groupSurvivors = [];
        this.sliceGroupOfSurvivors();
        this.setPrintOptionAllSurvivors();
      });
  }

  addOnlySurvivorsSaved() {
    this.downloadPdfDisabled = true;
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
