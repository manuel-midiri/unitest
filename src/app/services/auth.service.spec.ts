import { TestBed } from '@angular/core/testing';
import { LoginComponent } from '../login/login.component';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let component: LoginComponent;
  let service: AuthService;


  //Viene chiamato prima di ogni IT
  beforeEach(() => { (1)
    service = new AuthService();
    component = new LoginComponent(service);
  });
  //Viene chiamato dopo ogni IT
  afterEach(() => { (2)
    localStorage.removeItem('token');
  });

  it('should return true from isAuthenticated when there is a token', () => { (1)
    localStorage.setItem('token', '1234'); (2)
    expect(service.isAuthenticated()).toBeTruthy(); (3)
  });

  it('should return false from isAuthenticated when there is no token', () => {
    expect(service.isAuthenticated()).toBeFalsy();
  });
});
