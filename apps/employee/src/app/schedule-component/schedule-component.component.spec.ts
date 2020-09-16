import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleComponentComponent } from './schedule-component.component';

describe('ScheduleComponentComponent', () => {
  let component: ScheduleComponentComponent;
  let fixture: ComponentFixture<ScheduleComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
