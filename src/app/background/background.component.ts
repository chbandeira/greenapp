import { Component, OnInit, Input } from '@angular/core';
import { Background } from './background.model';
import { Survivor } from '../survivor/survivor.model';
import { WikiService } from '../core/wiki.service';
import { BackgroundService } from './background.service';

@Component({
  selector: 'zga-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  @Input() survivor: Survivor;
  @Input() index: number;
  @Input() lang: any;
  background = new Background();

  constructor(
    private wikiService: WikiService,
    private backgroundService: BackgroundService) { }

  ngOnInit() {
  }

  backgroundSurvivor(survivor: Survivor) {
    this.background.text1 = this.lang['loading'];
    this.backgroundService.backgrounds(survivor.name)
      .subscribe(data => {
        this.background = data.find(item => survivor.name === item.nameSurvivor);
        if (!this.background) {
          let name = survivor['codename'];
          if (!name) {
            name = survivor['name'];
          }
          this.searchBackgroundOnWiki(name, survivor, 1);
        } else if (this.background.text1 === '') {
          this.background.text1 = this.lang['infoNotFound'];
        }
      });
  }

  searchBackgroundOnWiki(name: string, survivor: Survivor, attempts: number) {
    if (!this.background) {
      this.background = new Background();
    }
    this.wikiService.background(name).subscribe(
      data => {
        let fragment;
        const htmlObject = document.createElement('div');
        htmlObject.innerHTML = data;
        let object = htmlObject.getElementsByClassName('article-content mw-content ember-view')[0];
        if (object == null) {
          fragment = new DocumentFragment();
          fragment.appendChild(htmlObject);
          object = fragment.getElementById('mw-content-text');
        }
        const elements: any = object.getElementsByTagName('p');
        if (elements == null) {
          this.background.text1 = this.lang['infoNotFound'];
          this.background.text2 = '';
        } else {
          if (elements[0]) {
            this.background.text1 = elements[0].textContent;
          }
          if (elements[1]) {
            this.background.text2 = elements[1].textContent;
          }
        }
      },
      error => {
        this.background.text1 = this.lang['infoNotFound'];
        this.background.text2 = '';

        if (attempts === 1) {
          this.searchBackgroundOnWiki(survivor['name'], survivor, 0);
        }
      });
  }
}
