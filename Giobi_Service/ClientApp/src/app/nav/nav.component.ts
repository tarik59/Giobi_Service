import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentUser$: Observable<User>;
  username:string;
  constructor(public authService:AuthServiceService,private router:Router) { }

  ngOnInit() {
    var user=(this.authService.currentUser$ as any)
    this.username=user.source._events[0].email;
  }
  logout()
  {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
