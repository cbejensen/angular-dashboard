import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHeaderUiComponent } from './dashboard-header-ui.component';

describe('DashboardHeaderUiComponent', () => {
  let component: DashboardHeaderUiComponent;
  let fixture: ComponentFixture<DashboardHeaderUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardHeaderUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHeaderUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
