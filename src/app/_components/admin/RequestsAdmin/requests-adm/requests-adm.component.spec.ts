import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsAdmComponent } from './requests-adm.component';

describe('RequestsAdmComponent', () => {
  let component: RequestsAdmComponent;
  let fixture: ComponentFixture<RequestsAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsAdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
