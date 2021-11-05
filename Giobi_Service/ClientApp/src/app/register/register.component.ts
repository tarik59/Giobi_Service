import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/User';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model:any={};
  isLogged:boolean=false;
  constructor(private authService:AuthServiceService,private router: Router,private toastr:ToastrService) { }

  ngOnInit() {
  }
  register()
  {
    console.log(this.model);
    this.authService.register(this.model).subscribe(response=>{
      this.isLogged=true;
      this.router.navigateByUrl('/home');
      console.log(response);
     },error=>{
       this.toastr.error(error.error);
      console.log(error);
     })
  }

}
