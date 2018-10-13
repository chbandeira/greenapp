import { Component, OnInit, Input } from '@angular/core';
import { SkillContent } from './skill-content.model';
import { Settings } from '../settings/settings.model';
import { SkillDetail } from './skill-detail.model';
import { SkillService } from './skill.service';
import { LocalSkills } from './local-skills.model';
import { SkillLevel } from './skill-level.model';

@Component({
  selector: 'zga-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  @Input() localSettings: Settings;
  @Input() skillContent: SkillContent;
  @Input() survivorName: string;
  @Input() colorLevel: string;
  @Input() lang: any;

  skillDetail: SkillDetail;

  constructor(private skillService: SkillService) { }

  ngOnInit() {

    this.skillDetail = new SkillDetail();

    this.localSettings.skillTitleLanguage === 'en' ?
      this.skillDetail.title = this.skillContent.en.title :
      this.skillDetail.title = this.skillContent.pt.title;

    if (this.localSettings.skillDescriptionLanguage === 'en') {
      this.skillDetail.description = this.skillContent.en.description;
      this.skillDetail.gameEffect = this.skillContent.en.gameEffect;
    } else {
      this.skillDetail.description = this.skillContent.pt.description;
      this.skillDetail.gameEffect = this.skillContent.pt.gameEffect;
    }
  }

  isChecked(): boolean {
    if (this.colorLevel === 'blue') { return true; }

    const survivorLocalSkills: LocalSkills = this.skillService.loadSurvivalLocalSkills(this.survivorName);
    return survivorLocalSkills.skillLevels.some(item => {
      return item.color === this.colorLevel && item.skill === this.skillContent.en.title;
    });
  }

  isDisabled(): boolean {
    return this.colorLevel === 'blue';
  }

  checkSkill(event) {
    const skillLevel: SkillLevel = new SkillLevel();
    skillLevel.color = this.colorLevel;
    skillLevel.skill = this.skillContent.en.title;
    if (event.target.checked) {
      this.skillService.saveLocalSkill(this.survivorName, skillLevel);
    } else {
      this.skillService.deleteLocalSkill(this.survivorName, skillLevel);
    }
  }
}
