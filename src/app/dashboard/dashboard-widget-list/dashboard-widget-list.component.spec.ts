import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWidgetListComponent } from './dashboard-widget-list.component';

describe('DashboardWidgetListComponent', () => {
  let component: DashboardWidgetListComponent;
  let fixture: ComponentFixture<DashboardWidgetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardWidgetListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardWidgetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
