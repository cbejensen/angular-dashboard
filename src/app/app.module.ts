import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {PortalModule} from '@angular/cdk/portal';
import { ReactiveComponentModule } from '@ngrx/component';
import { DragulaModule } from 'ng2-dragula';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { DashboardHeaderComponent } from './dashboard/dashboard-header/dashboard-header.component';
import { DashboardHeaderDirective, DashboardWidgetListDirective } from './dashboard/directives';
import { WidgetListComponent } from './widgets/widget-list/widget-list.component';
import { WidgetComponent } from './widgets/widget/widget.component';
import { HelloWorldWidgetComponent } from './widgets/hello-world-widget/hello-world-widget.component';
import { NumberWidgetComponent } from './widgets/number-widget/number-widget.component';
import { DashboardWidgetListComponent } from './dashboard/dashboard-widget-list/dashboard-widget-list.component';
import { DashboardHeaderUiComponent } from './dashboard/ui/dashboard-header-ui/dashboard-header-ui.component';
import { TodoListWidgetComponent } from './widgets/todo-list-widget/todo-list-widget.component';
import { DashboardComponent } from './dashboard/ui/dashboard/dashboard.component';
import { WidgetDirective } from './widgets/directives';
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardHeaderDirective,
    DashboardWidgetListDirective,
    DashboardWidgetListComponent,
    DashboardHeaderUiComponent,
    WidgetListComponent,
    WidgetComponent,
    HelloWorldWidgetComponent,
    NumberWidgetComponent,
    TodoListWidgetComponent,
    WidgetDirective,
    DashboardPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    PortalModule,
    ReactiveComponentModule
    // DragulaModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
