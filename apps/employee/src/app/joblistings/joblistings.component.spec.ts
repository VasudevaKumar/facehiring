import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoblistingsComponent } from './joblistings.component';

describe('JoblistingsComponent', () => {
  let component: JoblistingsComponent;
  let fixture: ComponentFixture<JoblistingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoblistingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoblistingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
