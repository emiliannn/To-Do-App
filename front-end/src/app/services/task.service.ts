import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl : string = "http://localhost:3000";
  static get: any;

  constructor(private http: HttpClient) { }

  save(task: Task) {
    return this.http.post(this.apiUrl + '/task', task);
  }

  get() {
    return this.http.get(this.apiUrl + '/tasks');
  }

  delete(taskId: number) {
    return this.http.delete(this.apiUrl + `/task/${taskId}`, );
  }

  update(task: Task) {
    return this.http.put(this.apiUrl + '/task', task);
  }
}
