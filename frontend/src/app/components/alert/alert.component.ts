import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface AlertModel {
  title?: string;
  message: string;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent extends SimpleModalComponent<AlertModel, null> implements AlertModel {
  title: string = "";
  message: string = "";

  currentValue: number = 15;
  incrementInterval: any;

  constructor() {
    super();
  }
  ngOnInit() {
    // Start incrementing the value every second
    this.startIncrement();
  }

  startIncrement() {
   
    // Update the value every second
    this.incrementInterval = setInterval(() => {
      if(this.currentValue <= 0 ){
        this.currentValue = 0;
      }else{

        this.currentValue--;
      }
    }, 1000);
  }

  ngOnDestroy() {
    // Stop the increment interval when the component is destroyed
    this.stopIncrement();
  }

  stopIncrement() {
    // Stop the increment interval
    clearInterval(this.incrementInterval);
  }
}
