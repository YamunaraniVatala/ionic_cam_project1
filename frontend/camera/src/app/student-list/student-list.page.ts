import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-list',
  templateUrl: 'student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {
  filterTerm :string='';
  user:any;
  userDetails:any=[];

  constructor(
    private router:Router,
    public apiService:ApiService,
    public storage:StorageService,
    ) {

      this.storage.get('auth').then(res=>{
        if(!res){
          this.router.navigate(['/login'])
        }
      }) 



    this.getUserdetails()
   }

   

  getUserdetails(){
    this.apiService.getUserDetails().then((data:any)=>{
     this.userDetails=data;
    })
   }

  ngOnInit() {
  }

  doLogout(){
    this.storage.set('auth',false)
    this.storage.set('email','')
    this.router.navigate(['/login'])
   }

}
