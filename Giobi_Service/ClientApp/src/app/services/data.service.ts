import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DataService {
  appUrl: string = "https://localhost:44303/";
  constructor(private http: HttpClient) {}

  createUser(model) {
    model.id="";
    return this.http.post(this.appUrl + "api/Users/createUser", model).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
  updateUser(model) {
    model.password="";
    return this.http.put(this.appUrl + "api/Users/updateUser", model).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  deleteUser(id) {
    return this.http.delete(this.appUrl + "api/Users/deleteUser/"+id).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  getUsers(searchString: string) {
    if (searchString == "") searchString = "all_data";
    return this.http
      .get(this.appUrl + "api/Users/getUsers/" + searchString)
      .pipe(
        map((users: any) => {
          return users;
        })
      );
  }
}
