import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialExampleModule} from './material.module';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    TasksListComponent,
    TaskComponent
  ],
  imports: [
    HttpClientModule,
    MaterialExampleModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
