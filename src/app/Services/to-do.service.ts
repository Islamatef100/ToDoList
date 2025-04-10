import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoTask } from '../Models/to-do-task';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  constructor(private http : HttpClient) { }
  api :string = "http://localhost:3000/ToDoList";
  createToDoTask(task : ToDoTask) : Observable<ToDoTask[]>{
    return this.http.post<ToDoTask[]>(this.api , JSON.stringify(task))
  }
  GetToDoList() : Observable<ToDoTask[]>{
    return this.http.get<ToDoTask[]>(this.api)
  }
  GetToDo(id:string) : Observable<ToDoTask>{
    return this.http.get<ToDoTask>(`${this.api}/${id}`)
  }
  UpdateToDo(editedTask : ToDoTask) : Observable<ToDoTask>{
    return this.http.put<ToDoTask>(`${this.api}/${editedTask.id}` , JSON.stringify(editedTask));
  }
  DeleteToDo(id:string) : Observable<void>{
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
