import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerNavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: SeekerNavigationComponent;
  let fixture: ComponentFixture<SeekerNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeekerNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekerNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
