import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ToDoService } from '../../Services/to-do.service';
import { ToDoTask } from '../../Models/to-do-task';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddTaskComponent } from "../Shared Components/add-task/add-task.component";
import { FileService } from '../../Services/file.service';
@Component({
  selector: 'app-to-do',
  imports: [
    FormsModule,
    NgIf,
    MatCheckboxModule,
    MatIconModule,
    AddTaskComponent,
],
  templateUrl: './to-to.component.html',
  styleUrl: './to-to.component.css'
})
export class ToDoComponent {
  constructor(private ToDoAPI : ToDoService , private fileApi:FileService){}
  title : string = "To Do List Application" ; 
  imageUrl : string = "https://www.amitree.com/wp-content/uploads/2021/08/the-pros-and-cons-of-paper-to-do-lists.jpeg";
  newtask : string = ""
  newTaskDate:string = ""
  //Alltasks : string[] = [];
  operationName:string = "Add Task"
  editedId :number = -1;
  AllTasks : ToDoTask[] = [] ;
  error : string = "";
  ngOnInit(){
    this.getAllTasks();
  }
  ActiveAddTask() : boolean{
      return this.newtask.trim() !="" ?  false : true;
  }
  EditTask(id : number  , jsonId:string):void{
    this.newtask = this.AllTasks[id].title;
    this.operationName = "Edit"
    this.editedId = id;
  }
  deleteTask(id:number , jsonId:string):void{
   this.ToDoAPI.DeleteToDo(jsonId).subscribe((res)=>{
    console.log("response of delete task is: " , res)
    this.AllTasks.splice(id , 1);
  }, err=>console.log("error for delete task: " , err))

  }
  getAllTasks(){
    this.ToDoAPI.GetToDoList().subscribe(res=>{
      this.AllTasks = res.filter(task=>task.UserId == localStorage.getItem('SignedIn'))
     // this.Alltasks = res.map(task=>task.title);
    }, err=>{console.log("can not get all lists and this the error bady: " , err)})
  }
  TaskCompleted(task:ToDoTask , event:any) :void{
    console.log("i here when click at check box the vaie is: " , event.checked)
    task.completed = event.checked
    this.ToDoAPI.UpdateToDo(task).subscribe((res)=>{
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
      window.URL.revokeObjectURL(DowenloadUrl)
      document.removeChild(a);
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
