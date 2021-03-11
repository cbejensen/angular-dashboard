import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloWorldWidgetComponent } from './hello-world-widget.component';

describe('HelloWorldWidgetComponent', () => {
  let component: HelloWorldWidgetComponent;
  let fixture: ComponentFixture<HelloWorldWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelloWorldWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloWorldWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
