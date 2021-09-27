import { Component, OnInit } from '@angular/core';
import { PersonalService } from './services/personal.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  data:any;
  bosses:any[] = [];
  // bosses:any;

  public f = this.form.group({
    name:['',[Validators.required]],
    type:['',[Validators.required]],
    boss:['',[Validators.required]]

  });

  formSubmitted = false;

  constructor(private personalService:PersonalService,
              private form:FormBuilder){}

  ngOnInit(){

    this.personalService.getPersonal().subscribe(resp =>{

    this.data = Object.values(resp);  

    for(const i in this.data){

        if(this.data[i].type == "boss"){
          this.bosses.push(this.data[i].name);
        }
     }
   },err => console.error(err));
  }
    
  //title = 'frontPersonal';

  savePerson(){

    this.formSubmitted = true;
    if(this.f.invalid){
      return;
    }
     
    let person = {
      name:this.f.controls.name.value,
      type:this.f.controls.type.value,
      boss:this.f.controls.boss.value
    }

    this.personalService.savePerson(person).subscribe(resp=>{

      Swal.fire({
        title: 'Success',
        text: "User saved",
        icon: 'success',
        confirmButtonColor: '#075de8',
        confirmButtonText: 'Ok'
      }).then((result) => {
        window.location.reload();
      })

    },err =>{console.error(err)}
    );
 
    }

  invalidField(field:string){

    if(this.formSubmitted && this.f.controls[field].invalid){

      return true;

    }else{

      return false;

    }
  }

  deletePerson(id:any){
    
    this.personalService.deletePerson(id).subscribe(resp=>{

      console.log('resp :>> ', resp);

       Swal.fire({
        title: 'Success',
        text: "User deleted",
        icon: 'success',
        confirmButtonColor: '#075de8',
        confirmButtonText: 'Ok',
        timer:10000
      }).then((result) => {
        window.location.reload();
      })
  

     },err=>{console.error(err)}
    );
  }
}
