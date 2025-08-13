import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { TaskStatus } from 'src/app/enums/enum';
import { BehaviorSubject } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import axios from 'axios';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  taskList: any;
  response: any;
  private _tasks = new BehaviorSubject<Task[]>([]);
  
  @Input() set tasks(value: Task[]) {
    this._tasks.next(value);
  }
  get tasks() {
    return this._tasks.getValue();
  }

  constructor(private taskService : TaskService) { }

  ngOnInit(): void {
    this._tasks.subscribe(data => {
        this.taskList = data;
   })
  }

  getTasks() {
    this.taskService.get()
      .subscribe(
        data => {
          this.response = data;
          if (this.response.result !== 'error') {
            if (this.response.value !== undefined && this.response.value.length > 0) {
              this.taskList = this.response.value;
            } else {
              this.taskList = [];
            }
          }
          else {
            console.log(this.response.message);
            alert(this.response.message);
          }
        }
      )
  }
}
