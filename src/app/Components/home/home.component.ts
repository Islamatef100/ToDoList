import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ToDoService } from '../../Services/to-do.service';
import { ToDoTask } from '../../Models/to-do-task';
import { NgIf } from '@angular/common';
import { AddTaskComponent } from '../Shared Components/add-task/add-task.component';
@Component({
  selector: 'app-home',
  imports: [
    ChartModule,
    FormsModule,
    AddTaskComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private api: ToDoService){}
  newtask : string = "";
  newTaskDate: string = "";
  error : string = "";
  AllTasks:ToDoTask[] = []
  copletedPersentage:number = 0;
  futureTasks:number = 0;
  passedTasks:number = 0;
  chartData:number[] = []
   ngOnInit(){
    this.GetTasks();
    //this.GetTasksInformations()
  }
  GetTasks(){
    this.api.GetToDoList().subscribe((res)=>{
      this.AllTasks = res;
    } , (error)=>{console.log('error in get all tasks in home page')})
  }
  // GetTasksInformations(){
  //   const completed = this.AllTasks.filter(task=>task.completed)
  //   const Future = this.AllTasks.filter(task=>!task.completed).filter(task=>task.taskDate!=='').filter(task=>this.isFutureDate(task.taskDate!));
  //   const passed = this.AllTasks.length - Future.length - completed.length ; 
  //   this.copletedPersentage =  Math.round((completed.length+1 / this.AllTasks.length) * 100);
  //   this.futureTasks =  Math.round((Future.length+1 / this.AllTasks.length) * 100);
  //   this.passedTasks =  Math.round((passed +1 / this.AllTasks.length) * 100);
  //   if(this.copletedPersentage==0 && this.futureTasks == 0 && this.passedTasks ==0)
  //     this.chartData = [0,100,0]
  //   else
  //   this.chartData = [this.copletedPersentage, this.futureTasks, this.passedTasks];
   
  // }
  isFutureDate(date: string): boolean {
    const inputDate = new Date(date);
    const today = new Date();

    // Reset time part to compare only the date
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate > today;
}
    
  ActiveAddTask(){
    return this.newtask.trim() !="" ? false : true;
  }
getData():number[]{
  var completed = Math.random() * 50;
  var fuuture = Math.random() * 50;
  var missed = 100 - (completed + fuuture);
  return [completed , fuuture ,missed ]
  
}
  data = {
    labels: ['Completed', 'Future Tasks', 'Missed the deadline'],
    datasets: [
      {
        // data:[...this.chartData],
        // data:[20,70,10],
        data:this.getData(),
        backgroundColor: ['blue', 'green', 'black'], // Colors for each slice
        hoverBackgroundColor: ['#45A049', '#FB8C00', '#1E88E5']
      }
    ]
  };
  options = {
    responsive: true, // Makes the chart responsive
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' // Moves the legend to the bottom
      }
    }
  };
}
