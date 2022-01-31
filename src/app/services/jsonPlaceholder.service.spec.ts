import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
/* tslint:disable:no-unused-variable */

import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { delay } from 'rxjs';
import * as Rx from 'rxjs';
import { HomeComponent } from '../home/home.component';
import { JsonPlaceholderService } from './jsonPlaceholder.service';

describe('Service: JsonPlaceholder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonPlaceholderService],
      imports: [HttpClientModule]
    });
  });

  it('should ...', inject([JsonPlaceholderService], (service: JsonPlaceholderService) => {
    expect(service).toBeTruthy();
  }));

});
