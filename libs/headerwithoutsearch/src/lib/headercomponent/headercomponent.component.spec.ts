import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadercomponentComponent } from './headercomponent.component';

describe('HeadercomponentComponent', () => {
  let component: HeadercomponentComponent;
  let fixture: ComponentFixture<HeadercomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadercomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadercomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
