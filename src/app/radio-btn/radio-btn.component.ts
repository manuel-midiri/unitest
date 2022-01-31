import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-radio-btn',
  templateUrl: './radio-btn.component.html',
  styleUrls: ['./radio-btn.component.scss']
})
export class RadioBtnComponent implements OnInit {

  radioBtn: FormControl = new FormControl();
  valueRadio: string = '';

  constructor() { }

  ngOnInit() {
    this.radioBtn.setValue('chocolate');
  }

  getValueRadio(){
    this.valueRadio = this.radioBtn.value;
  }

}
