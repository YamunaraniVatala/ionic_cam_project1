import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastController } from '@ionic/angular'
@Component({ 
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username:any;
  email:any;
  password:any;
  confirmpassword:any;
  gender:any;
  mobilenumber:any;
  isEnabled:boolean=false;

  constructor(
    private router:Router,
    public apiService:ApiService,
    private toastController:ToastController,
  ) { }

  checkboxClick(e:any){
    var statement = true;
    if(statement){
      e.checked = true;
      
    }
    this.isEnabled =e.target.checked
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


  doRegister(){
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);



    if(this.email=='' || this.email==undefined  ||regexp.test(this.email)==false){
      this.presentToast('top','please enter valid email address','danger')

    }
    else if (this.password=='' || this.password==undefined ||this.password.toString().length<=7){
      this.presentToast('top','Number of charcters in password must be greater than 7 ','danger')
    }
    else if( this.password !== this.confirmpassword){
      this.presentToast('top','password and confirmpassword must be same ','danger')
    }

    else if( this.mobilenumber ==''|| this.mobilenumber==undefined ||this.mobilenumber.toString().length!==10){
      this.presentToast('top','Number of characters in mobile number must be 10 ','danger')
    }


    else {
      this.apiService.saveUser(
        this.username,
        this.email,
        this.password,
        this.gender,
        this.mobilenumber,
        ).then((res:any)=>{
                          if(res.status==100){
                            // alert(res.message)
                            this.router.navigate(['/login'])
                            this.presentToast('top',res.message,'success')

                          }
                          else if(res.status==403 || res.status==404){
                            this.presentToast('top',res.message,'danger')
                          }
                          else{
                            this.presentToast('top','API Error','danger')
                          }
                        })
      // this.router.navigate(['/home'])
      

    }

  }
  
  ngOnInit() {
  }

}
