import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { PointformsComponent } from './components/pointforms/pointforms.component';

const routes: Routes = [
  { path: '', component: PointformsComponent, pathMatch: 'full'},
  { path: 'chat', component: ChatComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
