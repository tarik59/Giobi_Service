import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit  {
  username:string="";
  constructor(public authService:AuthServiceService){}
  title = 'app';
  ngOnInit()
  {
    var user=(this.authService.currentUser$ as any)
    this.username=user.source._events[0].email;
  }
}
