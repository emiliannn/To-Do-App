import { TaskStatus } from "../enums/enum";
const { v4: uuidv4 } = require('uuid');

export class Task{
    id: any;
    name: String;
    taskStatus: TaskStatus;
    constructor(name:String){
        this.id = uuidv4();
        this.name = name;
        this.taskStatus = TaskStatus.Active
    }
}