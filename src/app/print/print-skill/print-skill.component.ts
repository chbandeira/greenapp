import { Component, OnInit, Input } from '@angular/core';
import { SkillDetail } from '../../skill/skill-detail.model';
import { Settings } from '../../settings/settings.model';
import { SkillContent } from '../../skill/skill-content.model';


@Component({
  selector: 'zga-print-skill',
  templateUrl: './print-skill.component.html',
  styleUrls: ['./print-skill.component.css']
})
export class PrintSkillComponent implements OnInit {

  @Input() skillContent: SkillContent;
  @Input() localSettings: Settings;
  @Input() colorLevel: string;
  skillDetail: SkillDetail;

  constructor() { }

  ngOnInit() {
    this.skillDetail = new SkillDetail();

    this.localSettings.skillTitleLanguage === 'en' ?
      this.skillDetail.title = this.skillContent.en.title :
      this.skillDetail.title = this.skillContent.pt.title;

    this.localSettings.skillDescriptionLanguage === 'en' ?
      this.skillDetail.description = this.skillContent.en.description :
      this.skillDetail.description = this.skillContent.pt.description;
  }

}
