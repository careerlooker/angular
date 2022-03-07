import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCompaniesComponent } from './block-companies.component';

describe('BlockCompaniesComponent', () => {
  let component: BlockCompaniesComponent;
  let fixture: ComponentFixture<BlockCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
