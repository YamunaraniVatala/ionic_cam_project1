import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastController } from '@ionic/angular'
import { Camera, CameraResultType } from '@capacitor/camera';
import { CameraSource } from '@capacitor/camera/dist/esm/definitions';
import { Capacitor } from '@capacitor/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.page.html',
  styleUrls: ['./student-details.page.scss'],
})
export class StudentDetailsPage implements OnInit {
  email:any;
  name:string='';
  age:Number=NaN;
  Class:string='';
  section:string='';
  rollno:number=NaN;
  phone:number=NaN;
  gender:string='';
  selectedImage:any;


  constructor(
    private router:Router,
    public apiService:ApiService,
    private toastController:ToastController,
    public storage:StorageService,
  ) {

    this.storage.get('auth').then(res=>{
      if(!res){
        this.router.navigate(['/login'])
      }
    }) 

   }

   checkPlatformForWeb() {
    if(Capacitor.getPlatform() == 'web' || Capacitor.getPlatform() == 'ios') return true;
    return false;
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

  async getPicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      source: CameraSource.Prompt,
      width: 600,
      resultType: this.checkPlatformForWeb() ? CameraResultType.DataUrl : CameraResultType.Uri
    });
    this.selectedImage = image;
    if(this.checkPlatformForWeb()) this.selectedImage.webPath = image.dataUrl;
  }


  

  AddStudent(){
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);



    if(this.email=='' || this.email==undefined  ||regexp.test(this.email)==false){
      this.presentToast('top','please enter valid email address','danger')

    }
    else if (this.name=='' || this.name==undefined ){
      this.presentToast('top','please enter student name','danger')
    }
    else if( this.age == 0 || this.age == undefined ){
      this.presentToast('top','please enter student age ','danger')
    }

    else if( this.Class ==''|| this.Class==undefined ){
      this.presentToast('top','please select student Class','danger')
    }
    else if( this.rollno ==0|| this.rollno==undefined ){
      this.presentToast('top','please select student Roll No','danger')
    }
    else if( this.section ==''|| this.section==undefined ){
      this.presentToast('top','please select student class','danger')
    }
    else if( this.phone ==0|| this.phone==undefined || this.phone.toString().length !==10 ){
      this.presentToast('top','please enter student Mobile Number ','danger')
    }
    else if( this.gender ==''|| this.gender==undefined ){
      this.presentToast('top','please select student gender','danger')
    }
    else if( this.selectedImage == null|| this.selectedImage==undefined ){
      this.presentToast('top','please insert student photo','danger')
    }

    else {
        this.apiService.saveStudent(
            this.name,
            this.email,
            this.age,
            this.Class,
            this.section,
            this.rollno,
            this.phone,
            this.gender,
            this.selectedImage.dataUrl
            ).then((res:any)=>{
                                if(res.status==100){
                                  // alert(res.message)
                                  this.presentToast('top',res.message,'success')
                                    this.router.navigate(['/home'])

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

  doLogout(){
    this.storage.set('auth',false)
    this.storage.set('email','')
    this.router.navigate(['/login'])
   }

}
