import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PointformsComponent } from './components/pointforms/pointforms.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { InputMaskModule } from '@ngneat/input-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SimpleModalModule, defaultSimpleModalOptions } from "ngx-simple-modal";
import { AlertComponent } from './components/alert/alert.component';
import { CustomErrorComponent } from './components/custom-error/custom-error.component';
import { BotComponent } from './components/bot/bot.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    PointformsComponent,
    AlertComponent,
    CustomErrorComponent,
    BotComponent
  ],
  imports: [
    BrowserModule,
    SimpleModalModule.forRoot({container: 'modal-container'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    HttpClientModule,
    GooglePlaceModule,
    InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
