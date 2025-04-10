import { Component } from '@angular/core';
import { ToDoTask } from '../../Models/to-do-task';
import { ToDoService } from '../../Services/to-do.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FileService } from '../../Services/file.service';

@Component({
  selector: 'app-completed-tasks',
  imports: [
    MatCheckbox,
    MatIcon,
    FormsModule,
    NgIf,
  ],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.css'
})
export class CompletedTasksComponent {
  constructor(private api : ToDoService, private fileApi:FileService ){}
completedTasks : ToDoTask[] = []
ngOnInit(){
  this.GetAllTasks()
}
GetAllTasks(){
  this.api.GetToDoList().subscribe((res)=>{
    this.completedTasks = res.filter(task=> task.completed && task.UserId == localStorage.getItem('SignedIn')) ;
  }, (err)=>{console.log("error in get completed tasks: " , err)})
}
DeleteCompletedTask(item : ToDoTask,id : number){
  this.api. DeleteToDo(item.id).subscribe(( )=>{
    this.completedTasks.splice(id , 1);
  },(err)=>{
    console.log("can not delete completed task",err)
  })

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
