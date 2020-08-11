import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectioncomponentComponent } from './connectioncomponent.component';

describe('ConnectioncomponentComponent', () => {
  let component: ConnectioncomponentComponent;
  let fixture: ComponentFixture<ConnectioncomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectioncomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectioncomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
