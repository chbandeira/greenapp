import { Component, OnInit, Input } from '@angular/core';
import { Survivor } from '../../survivor/survivor.model';

@Component({
  selector: 'zga-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {

  @Input() survivor: Survivor;

  constructor() { }

  ngOnInit() {
  }

}
