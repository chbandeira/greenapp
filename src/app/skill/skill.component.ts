import { Component, OnInit, Input } from '@angular/core';
import { SkillContent } from './skill-content.model';

@Component({
  selector: 'zga-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  @Input() skillContent: SkillContent;
  @Input() settings: any;

  constructor() { }

  ngOnInit() {
  }

}
