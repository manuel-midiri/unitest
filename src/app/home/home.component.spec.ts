import { AppModule } from './../app.module';
import { JsonPlaceholderService } from './../services/jsonPlaceholder.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import * as Rx from 'rxjs';

import { HomeComponent } from './home.component';
import { FormModel, User } from '../models/jsonPlaceholder';
import { delay } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: JsonPlaceholderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [AppModule, ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    service = TestBed.inject(JsonPlaceholderService)
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let email = component.userForm.controls['email']; (1)
    expect(email.valid).toBeFalsy(); (2)
  });

  it('name field validity min lenght', () => {
    let name = component.userForm.controls['name'];
    // name.setValue('Sa');
    name.setValue('Sandro');
    expect(name.valid).toBeTruthy(); (1)
  });

  it('email field validity', () => {
    let email = component.userForm.controls['email'];
    email.setValue("test@test.it");
    // email.setValue("test");

    expect(email.valid).toBeTruthy(); (1)
  });

  it('submitting a form emits a user', () => {
    expect(component.userForm.valid).toBeFalsy();
    component.userForm.controls['name'].setValue('Sandro');
    component.userForm.controls['surname'].setValue('Piccinini');
    component.userForm.controls['email'].setValue('sandro@piccini.it');
    component.userForm.controls['number'].setValue('3216549879');

    let userForm: FormModel = {} as FormModel;
    // Subscribe to the Observable and store the user in a local variable.
    component.getUserForm.subscribe(user => userForm = user);

    // Trigger the login function
    component.onSubmit();

    // Now we can check to make sure the emitted value is correct
    if (userForm) {
      expect(userForm.name).toBe('Sandro');
      // expect(userForm.name).toBe('');
      expect(userForm.surname).toBe('Piccinini');
      expect(userForm.email).toBe('sandro@piccini.it');
      expect(userForm.number).toBe('3216549879');
    };

  });

  //TESTING SERVICE
  it('should call ngOnInit', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.debugElement.componentInstance;
    let spy_getPostDetails = spyOn(component,"getUsersDetails").and.returnValue([]);
    component.ngOnInit();
    expect(component.usersDetail).toEqual([]);
  });

  it('should call getUsersDetails and get response as empty array', fakeAsync(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(JsonPlaceholderService);
    let spy_getPosts = spyOn(service,"getUsers").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.getUsersDetails();
    tick(100);
    expect(component.usersDetail).toEqual([]);
  }));

  it('should call getUsersDetails and get response as array', fakeAsync(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(JsonPlaceholderService);
    let spy_getPosts = spyOn(service,"getUsers").and.callFake(() => {
      return Rx.of([
        {
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
          address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874",
            geo: {
              lat: "-37.3159",
              lng: "81.1496",
            },
          },
          phone: "1-770-736-8031 x56442",
          website: "hildegard.org",
          company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets",
          },
        }
      ]);
    });
    tick(1000);
    expect(component.showLoadingIndicator).toEqual(true);
    component.getUsersDetails();
    tick(1000);
    expect(component.showLoadingIndicator).toEqual(false);
    expect(component.usersDetail).toEqual([{
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    }]);
  }));

});
