import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAndDownloadComponent } from './review-and-download.component';

describe('ReviewAndDownloadComponent', () => {
  let component: ReviewAndDownloadComponent;
  let fixture: ComponentFixture<ReviewAndDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewAndDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewAndDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
