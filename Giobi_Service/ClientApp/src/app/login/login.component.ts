import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model:any={};
  constructor(private authService:AuthServiceService,private router:Router,private toastr:ToastrService) { }

  ngOnInit() {
  }
  login()
  {
    console.log(this.model);
    this.authService.login(this.model).subscribe(response=>{
      this.router.navigateByUrl('/home');
      console.log(response);
     },error=>{
       this.toastr.error(error.error);
      console.log(error);
     })
  }
}
