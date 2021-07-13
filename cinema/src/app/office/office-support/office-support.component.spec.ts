import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeSupportComponent } from './office-support.component';

describe('OfficeSupportComponent', () => {
  let component: OfficeSupportComponent;
  let fixture: ComponentFixture<OfficeSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
