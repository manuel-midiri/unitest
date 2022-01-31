import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/jsonPlaceholder';

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceholderService {

constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

}
