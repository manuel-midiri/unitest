import { JsonPlaceholderService } from './../services/jsonPlaceholder.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { FormModel, User } from '../models/jsonPlaceholder';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userForm: FormGroup = new FormGroup({});
  getUserForm: Subject<FormModel> = new Subject<FormModel>();
  usersDetail: User[] = [];
  showLoadingIndicator: boolean = true;

  constructor(private fb: FormBuilder, private jsonPlaceholderService: JsonPlaceholderService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.getUsersDetails();
    this.showLoadingIndicator = true;
  }

  getUsersDetails(){
    this.jsonPlaceholderService.getUsers().subscribe((response: User[]) => {
      this.showLoadingIndicator = false;
      if (response && response.length > 0) {
        this.usersDetail = response;
      } else {
        this.usersDetail = [];
      }
    });

  }

  onSubmit(){
    if (this.userForm.valid) {
      this.getUserForm.next(this.userForm.value);
    };
    console.log(this.getUserForm);
    this.userForm.reset();
  }

}
