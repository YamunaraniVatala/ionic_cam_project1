import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  user:any;
  studentDetails:any=[];

  constructor(
    private router:Router,
    public navCtrl:NavController,
    public apiService:ApiService,
    public storage:StorageService,
  ) {
    
this.getStudentDetails()
    this.storage.get('auth').then(res=>{
      if(!res){
        this.router.navigate(['/login'])
      }
    }) 
    
    this.storage.get('email').then(res=>{
      console.log(res)
    }) 
    

  }

   getStudentDetails(){
    this.apiService.getStudentDetails().then((data:any)=>{
      data.map((o:any)=>o.profile_pic=`../../assets/${o.profile_pic_name
      }`)
      this.studentDetails=data;
      console.log(typeof(this.studentDetails))
    })
   }
   doLogout(){
    this.storage.set('auth',false)
    this.storage.set('email','')
    this.router.navigate(['/login'])
   }

  }

  

  
  
  // btnClicked(){
  //   alert('added successfully')
  // }
  


