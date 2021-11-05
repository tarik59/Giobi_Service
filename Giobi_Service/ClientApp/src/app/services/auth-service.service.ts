import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'oidc-client';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }
  public isLoggedUser:boolean=false;
  appUrl:string="https://localhost:44303/";
  public currentUserSource=new ReplaySubject<User>()
 public currentUser$=this.currentUserSource.asObservable();
  register(model:any)
  {
  return this.http.post(this.appUrl+'api/account/register',model).pipe(
      map((user:any)=>{
        this.isLoggedUser=true;
        if(user)
        {
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }
  login(model:any)
  {
  return this.http.post(this.appUrl+'api/account/login',model).pipe(
      map((user:any)=>{
        this.isLoggedUser=true;
        if(user)
        {
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }
  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
