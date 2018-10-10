import { Component, OnInit, Input, Output } from '@angular/core';
import { Settings } from 'src/app/settings/settings.model';
import { LangService } from 'src/app/core/lang.service';

@Component({
  selector: 'zga-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() localSettings: Settings;

  lang: any;

  constructor(private langService: LangService) { }

  ngOnInit() {
    this.langService.props(this.localSettings.appLanguage)
      .subscribe(data => this.lang = data);
  }
}
