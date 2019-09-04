import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeDialogComponent } from './mode-dialog.component';

describe('ModeDialogComponent', () => {
  let component: ModeDialogComponent;
  let fixture: ComponentFixture<ModeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
