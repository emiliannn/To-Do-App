import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Task } from './model/task';
import { TaskService } from './services/task.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  response: any;
  tasks: Task[];
  error: any;

  constructor(private taskService: TaskService) {

  }

  ngOnInit() {
    this.getTasks();
  }


  getTasks() {
    this.taskService.get()
      .subscribe(
        data => {
          this.response = data;
          if (this.response.result !== 'error') {
            if (this.response.value !== undefined && this.response.value.length > 0) {
              this.tasks = this.response.value;
            } else {
              this.tasks = [];
            }
          }
          else {
            console.log(this.response.message);
            alert(this.response.message);
          }
        }
      )
  }

  addTask(event: any) {
    const task = new Task(event);
    this.taskService.save(task)
      .subscribe(data => {
        this.response = data;
        if (this.response.result !== 'error') {
          this.getTasks();
        } else {
          console.log(this.response.message);
          alert(this.response.message);
        }
      }
      )
  }
}

