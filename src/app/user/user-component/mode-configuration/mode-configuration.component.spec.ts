import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeConfigurationComponent } from './mode-configuration.component';

describe('ModeConfigurationComponent', () => {
  let component: ModeConfigurationComponent;
  let fixture: ComponentFixture<ModeConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
