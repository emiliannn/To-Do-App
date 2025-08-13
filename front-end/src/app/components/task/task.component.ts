import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/model/task';
import { TaskStatus } from 'src/app/enums/enum';
import { BehaviorSubject } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import axios from 'axios';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {
  response: any;
  taskValue: any;
  readonly: Boolean = true;
  @Input() task: Task;
  @Output() taskEventEmitter = new EventEmitter();
  valueItem: any;


  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }


  changeTaskStatus(task: Task) {
    if (task.taskStatus == 1) {
      task.taskStatus = TaskStatus.Done

      this.taskService.update(task).subscribe(data => {
        this.response = data;
        if (this.response.result !== 'error') {
          // this.taskEventEmitter.emit();
          console.log(this.response.result);
        } else {
          console.log(this.response.message);
          alert(this.response.message);
        }
      })
    } else if (task.taskStatus == 2) {
      task.taskStatus = TaskStatus.Active;
      this.taskService.update(task).subscribe(data => {
        this.response = data;
        if (this.response.result !== 'error') {
          this.taskEventEmitter.emit();
          console.log(this.response.result);
        } else {
          console.log(this.response.message);
          alert(this.response.message);
        }
      })
    }
  }

  changeWritePermission(task: Task){
    if(this.readonly === true){
      this.readonly = false;
    }else{
      this.readonly = false;
    }
  }

  modifyTask(task: Task) {
    this.changeWritePermission(task);
    this.taskService.update(task).subscribe(data => {
      this.response = data;
      if (this.response.result !== 'error') {
        this.taskEventEmitter.emit();
        console.log(this.response.result);
        console.log("readonlyyy =>", this.readonly);
      } else {
        console.log(this.response.message);
        alert(this.response.message);

      }
    })

  }


  deleteTask(taskId: number) {
    this.taskService.delete(taskId).subscribe(data => {
      this.response = data;
      if (this.response.result !== 'error') {
        this.taskEventEmitter.emit();
        console.log(this.response.result);
      } else {
        console.log(this.response.message);
        alert(this.response.message);
      }
    })
  }
}
