import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http : HttpClient) { }

  api:string = "https://api.escuelajs.co/api/v1/files";

  UploadFile(file:any): Observable<any>{
   return this.http.post<any>(`${this.api}/upload`, file)
  }

  DowenloadFile(FileLocation : string) : Observable<any>{
    return this.http.get(FileLocation , {responseType:'blob'})
  }
}
