import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PortalModule } from '@angular/cdk/portal';
import { ReactiveComponentModule } from '@ngrx/component';
import { GridsterModule } from 'angular-gridster2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardHeaderComponent } from './dashboard/dashboard-header/dashboard-header.component';
import {
  DashboardHeaderDirective,
  DashboardWidgetListDirective,
} from './dashboard/directives';
import { DashboardWidgetsComponent } from './dashboard/dashboard-widgets/dashboard-widgets.component';
import { WidgetComponent } from './widgets/widget/widget.component';
import { HelloWorldWidgetComponent } from './widgets/hello-world-widget/hello-world-widget.component';
import { NumberWidgetComponent } from './widgets/number-widget/number-widget.component';
import { WidgetGridComponent } from './widgets/widget-grid/widget-grid.component';
import { DashboardHeaderUiComponent } from './dashboard/ui/dashboard-header-ui/dashboard-header-ui.component';
import { TodoListWidgetComponent } from './widgets/todo-list-widget/todo-list-widget.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { WidgetDirective } from './widgets/directives';
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';
import { AddWidgetDialogComponent } from './widgets/add-widget-dialog/add-widget-dialog.component';
import {
  WIDGET_COMPONENTS,
  WIDGET_COMPONENTS_TOKEN,
} from './widgets/WIDGET_COMPONENTS';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardHeaderDirective,
    DashboardWidgetListDirective,
    DashboardHeaderUiComponent,
    WidgetGridComponent,
    WidgetComponent,
    HelloWorldWidgetComponent,
    NumberWidgetComponent,
    TodoListWidgetComponent,
    WidgetDirective,
    DashboardPageComponent,
    DashboardWidgetsComponent,
    AddWidgetDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    PortalModule,
    ReactiveComponentModule,
    GridsterModule,
  ],
  providers: [
    { provide: WIDGET_COMPONENTS_TOKEN, useValue: WIDGET_COMPONENTS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
