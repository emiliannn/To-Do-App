import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit{
  @Output() addTaskEventEmitter = new EventEmitter();
  value: any;
  placeholder: string = "Add a task...";

  constructor(private formBuilder:FormBuilder){
  }

  ngOnInit(): void {
  }

  addTask(){
    if(this.value){
      this.addTaskEventEmitter.emit(this.value)
      this.value = null;
    }else{
      alert('Please enter required field!') 
    }
  }
}
