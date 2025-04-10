import { Component } from '@angular/core';
import { ToDoTask } from '../../Models/to-do-task';
import { ToDoService } from '../../Services/to-do.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FileService } from '../../Services/file.service';
@Component({
  selector: 'app-today-tasks',
  imports: [
    MatCheckbox,
   MatIcon,
    FormsModule,
    NgIf,
  ],
  templateUrl: './to-day-tasks.component.html',
  styleUrl: './to-day-tasks.component.css'
})
export class ToDayTasksComponent {
constructor(private api : ToDoService , private fileApi:FileService){}
AllTasks : ToDoTask[] = []
ngOnInit(){
  this.GetAllTasks()
}
GetAllTasks(){
  this.api.GetToDoList().subscribe((res)=>{
    this.AllTasks = res.filter(task=>task.UserId == localStorage.getItem('SignedIn'));
    var todayTasks = [];
    for(var i=0;i<this.AllTasks.length ; i++){
      if(this.idsodatTask(i)){
        todayTasks.push(this.AllTasks[i]);
      }
    }
    this.AllTasks = todayTasks;
  }, (err)=>{console.log("error in get completed tasks: " , err)})
}
DeleteCompletedTask(item : ToDoTask,id : number){
  this.api. DeleteToDo(item.id).subscribe(( )=>{
    this.AllTasks.splice(id , 1);
  },(err)=>{
    console.log("can not delete completed task",err)
  })
}
idsodatTask(id:number){
  const date = new Date()
  return this.AllTasks[id].taskDate == date.toISOString().split('T')[0];
}
TaskCompleted(task:ToDoTask , event:any) :void{
  task.completed = event.checked
  this.api.UpdateToDo(task).subscribe((res)=>{
  },(err)=>{console.log("error in update checkbox task is: " , err)})
}
DowenloadTaskFile(id:number,task:ToDoTask){;
  if(task.location !=''){
  this.fileApi.DowenloadFile(task.location!).subscribe(res=>{
    const fileBinary = new Blob([res],{type:res.type});
    const DowenloadUrl = window.URL.createObjectURL(fileBinary);
    const a = document.createElement('a'); 
    document.body.appendChild(a);
    a.href = DowenloadUrl;
    a.download = task.location?.split('/').pop()!;
    a.click();
    document.removeChild(a);
    window.URL.revokeObjectURL(DowenloadUrl)
  },err=>{console.log(err);
  })
  }
}
showFile(task : ToDoTask){
  if(task.location!=''){    
  const a = document.createElement('a'); 
  document.body.appendChild(a);
  a.target = '_blank'; 
  a.href = task.location!;
  a.click()
  document.removeChild(a);
  } 
}
}
