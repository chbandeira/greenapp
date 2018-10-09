import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'zga-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.settingsService.personalSettings();
  }
}
