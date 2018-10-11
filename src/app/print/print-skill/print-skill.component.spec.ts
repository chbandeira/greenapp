import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSkillComponent } from './print-skill.component';

describe('PrintSkillComponent', () => {
  let component: PrintSkillComponent;
  let fixture: ComponentFixture<PrintSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
