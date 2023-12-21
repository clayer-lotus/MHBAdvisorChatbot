import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { PointformsComponent } from './components/pointforms/pointforms.component';
import { BotComponent } from './components/bot/bot.component';

const routes: Routes = [
  { path: '', component: PointformsComponent, pathMatch: 'full'},
  { path: 'chat', component: ChatComponent, pathMatch: 'full'},
  { path: 'bot', component: BotComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
