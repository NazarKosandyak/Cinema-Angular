import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBuffetComponent } from './admin-buffet.component';

describe('AdminBuffetComponent', () => {
  let component: AdminBuffetComponent;
  let fixture: ComponentFixture<AdminBuffetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBuffetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBuffetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
