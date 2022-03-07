import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoMatchProfileComponent } from './auto-match-profile.component';

describe('AutoMatchProfileComponent', () => {
  let component: AutoMatchProfileComponent;
  let fixture: ComponentFixture<AutoMatchProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoMatchProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoMatchProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
