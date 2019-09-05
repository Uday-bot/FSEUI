import {User} from 'src/app/Model/User';

export class Projectview {
    projectId :number;
    projectName :string;
    priority :number;
    manager :User;
    startDate:string;
    endDate:string;
    noOfTasks:number;
    completed:number;
    isActive:boolean;
    userId:number;
    managerName:string;
    userInfoes:User;
}


//         endDate: "2019-04-06T00:00:00"
// managerName: "Boominathan"
// priority: null
// projectId: 11
// projectName: "test"
// startDate: "2019-04-05T00:00:00"
// userId: 92

