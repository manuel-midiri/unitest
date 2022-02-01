import { MatRadioGroup, MatRadioModule } from '@angular/material/radio';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import { MatRadioGroupHarness } from '@angular/material/radio/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { RadioBtnComponent } from './radio-btn.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('RadioBtnComponent', () => {
  let component: RadioBtnComponent;
  let fixture: ComponentFixture<RadioBtnComponent>;
  let loader: HarnessLoader;

  // beforeAll(() => {
  //   TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  // });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatRadioModule, ReactiveFormsModule],
      declarations: [ RadioBtnComponent ]
    }).compileComponents();
    fixture = TestBed.createComponent(RadioBtnComponent);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  }));

  // beforeEach(() => {
  //   component = fixture.componentInstance;
  // });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all radio-group harnesses',async () => {
    const groups = await loader.getAllHarnesses(MatRadioGroupHarness);
    expect(groups.length).toBe(1);
  });

  it('should get name of radio-group', async () => {
    const group = await loader.getHarness(MatRadioGroupHarness);
    const name = await group.getName();
    expect(name).toBe('flavors');
  });
});
