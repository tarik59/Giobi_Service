import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.css"],
})
export class CreateUserComponent implements OnInit {
  model: any = {};
  users: any = [];
  searchString: string = "all_data";
  editMode:boolean=false;
  constructor(private dataService: DataService,private toastr:ToastrService) {}

  ngOnInit() {
    //this.users.push({ username: "Tarik", email: "test@test.com" });
    this.getUsers(this.searchString);
  }
  editUser(model)
  {
    this.model=model;
    this.editMode=true;
  }
  cancelUpdating()
  {
    this.model={};
    this.editMode=false;
  }
  updateUser()
  {
    this.dataService.updateUser(this.model).subscribe(
      (response) => {
        this.model={};
        this.getUsers(this.searchString);
      },
      (error) => {
        this.toastr.error(error.error);
        console.log(error);
      }
    );
  }
  deleteUser(id)
  {
    this.dataService.deleteUser(id).subscribe(
      (response) => {

        
      },
      (error) => {
        this.toastr.error(error.error);
        console.log(error);
      }
    );
  }
  createUser() {
    this.dataService.createUser(this.model).subscribe(
      (response) => {
        this.model={};
        this.getUsers(this.searchString);
        console.log(response);
      },
      (error) => {
        this.toastr.error(error.error);
        console.log(error);
      }
    );
  }
  onSearchChange(search:string)
  {
    this.getUsers(search);
  }
  getUsers(search:string) {
    this.dataService.getUsers(search).subscribe(
      (response) => {
        this.users = response;
        console.log(response);
      },
      (error) => {
        this.toastr.error(error.error);
        console.log(error);
      }
    );
  }
}
