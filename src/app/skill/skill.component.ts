import { Component, OnInit, Input } from '@angular/core';
import { SkillContent } from './skill-content.model';
import { Settings } from '../settings/settings.model';
import { SkillDetail } from './skill-detail.model';

@Component({
  selector: 'zga-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  @Input() personalSettings: Settings;
  @Input() skillContent: SkillContent;
  skillDetail: SkillDetail;

  constructor() { }

  ngOnInit() {

    this.skillDetail = new SkillDetail();

    this.personalSettings.skillTitleLanguage == 'en' ?
      this.skillDetail.title = this.skillContent.en.title :
      this.skillDetail.title = this.skillContent.pt.title;

    this.personalSettings.skillDescriptionLanguage == 'en' ?
      this.skillDetail.description = this.skillContent.en.description :
      this.skillDetail.description = this.skillContent.pt.description;
  }

}
