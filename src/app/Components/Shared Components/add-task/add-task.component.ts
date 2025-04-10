import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ToDoTask } from '../../../Models/to-do-task';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FileService } from '../../../Services/file.service';
import { ToDoService } from '../../../Services/to-do.service';
@Component({
  selector: 'app-add-task',
  imports: [
    FormsModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
constructor(private ToDoAPI : ToDoService , private fileAPI : FileService){};
 @Input() operationName:string = "Add Task";
 @Input() newTaskTitle:string = "";
 @Input() editedId:number = -1
 @Output() AddOrEditeTaskEvent  = new EventEmitter<boolean>()
  newTaskDate:string = ""
  AllTasks : ToDoTask[] = [] ;
  error : string = "";
  fileSelected : boolean = false
  fileLocations:string = '';
  ngOnInit(){
    this.getAllTasks();
    this.newTaskDate = this.AllTasks[this.editedId].taskDate || "";
  }
  ActiveAddTask() : boolean{
      return this.newTaskTitle.trim() !="" ?  false : true;
  }
  addTask():void{    
     if( this.newTaskTitle.trim() !=""){ 
      if(this.editedId !=-1){
        this.ToDoAPI.UpdateToDo({title : this.newTaskTitle, id :this.AllTasks[this.editedId].id 
          ,completed:this.AllTasks[this.editedId].completed , taskDate:this.newTaskDate , 
          UserId:this.AllTasks[this.editedId].UserId})
        .subscribe((res)=>{
          this.AllTasks[this.editedId] = res;
          this.editedId = -1;
          this.newTaskTitle = "";
          this.operationName = "Add Task";
          this.AddOrEditeTaskEvent.emit(true);
        },(err)=>{console.log("error in update task is: " , err)})
      }
      else{
        const newTestTask : ToDoTask = {title :this.newTaskTitle  , completed : false ,
           id :Date.now().toString() , taskDate: this.newTaskDate , location:this.fileLocations ,
            UserId:localStorage.getItem('SignedIn')!} 
        this.ToDoAPI.createToDoTask(newTestTask).subscribe((res)=>{
          this.AllTasks.push(newTestTask);
          this.newTaskTitle = "";
          this.operationName = "Add Task";
          this.AddOrEditeTaskEvent.emit(true);
        } , 
      (err)=>{this.error = "can not add new task"})
      }
      this.AddOrEditeTaskEvent.emit(true);
      this.fileSelected = false;
      this.newTaskDate = '';
     }
  }
  getAllTasks(){
    this.ToDoAPI.GetToDoList().subscribe(res=>{
      this.AllTasks = res.filter(task=>task.UserId == localStorage.getItem('SignedIn'));
     // this.Alltasks = res.map(task=>task.title);
    }, err=>{console.log("can not get all lists and this the error bady: " , err)})
  }
  UploadTaskFile(event:any){
    console.log('i enetred to upload method event');
      const file = event.currentTarget.files[0];
      const fileBinary = new FormData();
      fileBinary.append('file',file);
      this.fileAPI.UploadFile(fileBinary).subscribe((res)=>{
      this.fileLocations = res.location;
      this.fileSelected = true;
      },err=>console.log("can not uplaod task file" , err));
  }
}
