import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditManageJobComponent } from './edit-manage-job.component';

describe('EditManageJobComponent', () => {
  let component: EditManageJobComponent;
  let fixture: ComponentFixture<EditManageJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditManageJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditManageJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
