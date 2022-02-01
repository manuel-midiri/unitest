import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';

import { LoginComponent } from './login.component';

//JASMINE e KARMA
// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let service: AuthService;
//   let spy: any;

//   beforeEach(() => {
//     service = new AuthService();
//     component = new LoginComponent(service);
//   });

//   afterEach(() => { (2)
//     localStorage.removeItem('token');
//   });
  
//   //LOGIN COMPONENT
//   it('needsLogin returns true when the user has not been authenticated', () => {
//     expect(component.needsLogin()).toBeTruthy();
//   });

//   it('needsLogin returns false when the user has been authenticated', () => {
//     localStorage.setItem('token', '12345'); (3)
//     expect(component.needsLogin()).toBeFalsy();
//   });

//   it('needsLogin returns true when the user has not been authenticated', () => {
//     spy = spyOn(service, 'isAuthenticated').and.returnValue(false);
//     expect(component.needsLogin()).toBeTruthy();
//     expect(service.isAuthenticated).toHaveBeenCalled();
//   });

//   it('needsLogin returns false when the user has been authenticated', () => {
//       spy = spyOn(service, 'isAuthenticated').and.returnValue(true);
//       expect(component.needsLogin()).toBeFalsy();
//       expect(service.isAuthenticated).toHaveBeenCalled();
//   });
// });

//ATB
describe('Component: Login', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>; (1)
  let authService: AuthService;
  let el: DebugElement; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService]
    });
    // create component and test fixture
    fixture = TestBed.createComponent(LoginComponent); (2)
    // get test component from the fixture
    component = fixture.componentInstance;
    // UserService provided to the TestBed
    authService = TestBed.inject(AuthService); (4)
    //  get the "a" element by CSS selector (e.g., by class name)
    el = fixture.debugElement.query(By.css('a')); (3)
  });

  it('needsLogin returns true when the user has not been authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    expect(component.needsLogin()).toBeTruthy();
    expect(authService.isAuthenticated).toHaveBeenCalled();
  });
  
  it('needsLogin returns false when the user has been authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    expect(component.needsLogin()).toBeFalsy();
    expect(authService.isAuthenticated).toHaveBeenCalled();
  });

  it('login button hidden when the user is authenticated', () => {
    // To being with Angular has not done any change detection so the content is blank.
    expect(el.nativeElement.textContent.trim()).toBe('');

    // Trigger change detection and this lets the template update to the initial value which is Login since by
    // default we are not authenticated
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');

    // Change the authetication state to true
    spyOn(authService, 'isAuthenticated').and.returnValue(true);

    // The label is still Login! We need changeDetection to run and for angular to update the template.
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    // Which we can trigger via fixture.detectChange()
    fixture.detectChanges();

    // Now the label is Logout
    expect(el.nativeElement.textContent.trim()).toBe('Logout');
  });
});
