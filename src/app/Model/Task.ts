import { ParentTask } from './ParentTask';

export class Task{  
task_ID :number;
Parent_ID :number;
projectId :number;
taskName :string;
startDate :string;
endDate :string;
priorityValue :number;
 Status :string
IsParentTaskSelected :boolean;
parentTask:ParentTask;

}