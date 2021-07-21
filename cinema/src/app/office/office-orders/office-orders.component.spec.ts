import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeOrdersComponent } from './office-orders.component';

describe('OfficeOrdersComponent', () => {
  let component: OfficeOrdersComponent;
  let fixture: ComponentFixture<OfficeOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
