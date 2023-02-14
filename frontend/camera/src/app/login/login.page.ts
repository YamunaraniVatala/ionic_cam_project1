import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ApiService } from '../api.service';
import { ToastController } from '@ionic/angular'
import { StorageService } from '../services/storage.service';






@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:any;
  password:any;

  constructor(
    private router:Router,
    public apiService:ApiService,
    private toastController:ToastController,
    public storage:StorageService
  ) { 
    
  }

// toast method
  async presentToast(position: 'top',message:any,color:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      color:color
    });
    await toast.present();
  }


  doLogin(){
    
    
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(this.email=='' || this.email==undefined || regexp.test(this.email) == false){
      this.presentToast('top','please enter valid email address','danger')

    }
    else if (this.password=='' || this.password==undefined || this.password.toString().length<=7){
      
      this.presentToast('top','Number of charcters in password must be greater than 7 ','danger')
    }
    else {
      this.apiService.getUserInfo(this.email,this.password).then((res:any)=>
        {
          if(res.status==100){
            this.storage.set('auth',true)
            this.storage.set('email',this.email)
            this.router.navigate(['/home'])
          
          }
          else if(res.status==403 || res.status==404){
            this.presentToast('top',res.message,'danger')
          }
          else{
            
            this.presentToast('top','API Error','danger')
          }
        }
        )
      // this.router.navigate(['/home'])
      

    }
   

    
    
  }

 

  ngOnInit() {
  }

}
