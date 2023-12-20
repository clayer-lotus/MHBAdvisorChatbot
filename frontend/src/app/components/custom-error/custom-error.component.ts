import { Component, OnDestroy } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';


@Component({
  selector: 'app-custom-error',
  templateUrl: './custom-error.component.html',
  styleUrls: ['./custom-error.component.css']
})
export class CustomErrorComponent extends SimpleModalComponent<null, null> implements OnDestroy  {

  constructor(private SimpleModalService: SimpleModalService) {
    super();
  }

  ngOnDestroy() {
    console.log('I was destroyed');
  }
}
