import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofilecomponentComponent } from './editprofilecomponent.component';

describe('EditprofilecomponentComponent', () => {
  let component: EditprofilecomponentComponent;
  let fixture: ComponentFixture<EditprofilecomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprofilecomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprofilecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
