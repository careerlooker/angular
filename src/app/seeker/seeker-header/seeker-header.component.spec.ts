import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerHeaderComponent } from './seeker-header.component';

describe('SeekerHeaderComponent', () => {
  let component: SeekerHeaderComponent;
  let fixture: ComponentFixture<SeekerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeekerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
