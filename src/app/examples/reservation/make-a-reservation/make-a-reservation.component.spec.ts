import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAReservationComponent } from './make-a-reservation.component';

describe('MakeAReservationComponent', () => {
  let component: MakeAReservationComponent;
  let fixture: ComponentFixture<MakeAReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeAReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeAReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
