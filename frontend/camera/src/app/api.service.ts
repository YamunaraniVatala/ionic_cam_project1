import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { promises, resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  films:any;
  dologinurl ='http://localhost:5000/login';

  saveuserurl ='http://localhost:5000/register';

  myapiurl ='http://localhost:5000/usersList';

  savestudentapiurl ='http://localhost:5000/savestudent';

  getstudentdetailsapiurl ='http://localhost:5000/getstudentdetails';

  data:any;

  constructor(
    public http: HttpClient
  ) { }

  getUserInfo(email:string,password:string){
    return new Promise(resolve => {
      this.http.post(this.dologinurl,{email,password},{headers:new HttpHeaders().set('Content-Type','application/JSON')}).subscribe(data => {
        resolve(data);
        console.log(data);
      }
      ,(err: any) => {
        console.log(err);
      });
    })
  }
saveUser(username:string,email:string,password:string,gender:string,mobilenumber:any,){
  return new Promise(resolve => {
    this.http.post(this.saveuserurl,{username,email,password,gender,mobilenumber},{headers:new HttpHeaders().set('Content-Type','application/JSON')}).subscribe (data => {
      resolve(data);
      console.log(data);
    
    (err:any) => {
      console.log(err);
    }
    })
  })
} 
getUserDetails(){
  return new Promise(resolve=> {
    this.http.get(this.myapiurl).subscribe(data =>{
      resolve(data);
      console.log(data);
    }
    ,(err:any)=>{
      console.log(err);
    }
    )
  })
}


getStudentDetails(){
  return new Promise(resolve=> {
    this.http.get(this.getstudentdetailsapiurl).subscribe(data =>{
      resolve(data);
      console.log(data);
    }
    ,(err:any)=>{
      console.log(err);
    }
    )
  })
}

saveStudent(name:string,email:any,age:any,Class:string,section:string,rollno:number,phone:any,gender:string,selectedImage:any){
  return new Promise(resolve => {
    this.http.post(this.savestudentapiurl,{name,email,age,Class,section,rollno,phone,gender,selectedImage},
      {headers:new HttpHeaders().set('Content-Type','application/JSON')}).subscribe (data => {
      resolve(data);
      console.log(data);
    
    (err:any) => {
      console.log(err);
    }
    })
  })
}

}
