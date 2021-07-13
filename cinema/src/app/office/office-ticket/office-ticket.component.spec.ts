import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeTicketComponent } from './office-ticket.component';

describe('OfficeTicketComponent', () => {
  let component: OfficeTicketComponent;
  let fixture: ComponentFixture<OfficeTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
