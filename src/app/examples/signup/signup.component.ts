import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Client } from '../client/client';
import { ActivatedRoute } from '@angular/router';
import {CdkStepper} from '@angular/cdk/stepper';
import { FormErrorService } from '../utils/formErrorService';
import { ClientService } from '../client/client.service';
import { Directionality } from '@angular/cdk/bidi';
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends CdkStepper implements OnInit {
    
    private edit = false;
    private username : string;
    public client: Client = new Client();
    public form = new FormGroup({}); 
    
    constructor(private titleService: Title, dir: Directionality, changeDetectorRef: ChangeDetectorRef,private clientService: ClientService, private route: ActivatedRoute, public formErrorService: FormErrorService) { 
      super(dir, changeDetectorRef)
      this.titleService.setTitle("Showme_makeup: Register")
    }

    onClick(index: number): void {
      this.selectedIndex = index;
    }

    ngOnInit() {
        this.form = new FormGroup({
          
        });
        if (this.route.snapshot.paramMap.get("username")) {
            this.edit = true;
            this.username = this.route.snapshot.paramMap.get("username");
            this.clientService.getOneByUsername(this.username).subscribe((data: Client) => {
              this.client = data;
              this.form.patchValue(this.client);
            });
          }
        }
      
      
       onSave() {
        if (this.form.invalid) {
          this.formErrorService.markFormGroupTouched(this.form);
          // console.log("1")
        } else {
          const cl = this.form.value;
          delete cl['accountData']['confirmPassword'];
          delete cl['personalData']['profileImage'];
          // console.log("2")
          if (this.edit) {
            cl.accountData.id = this.client.accountData.id;
            cl.personalData.id = this.client.personalData
            this.client = cl;
            this.clientService.update(this.username, this.client, this.form.get('personalData').get('profileImage').value).subscribe();
            // console.log("3")
          } else {
            this.client = cl;
            this.clientService.add(this.client, this.form.get('personalData').get('profileImage').value).subscribe(_ => {
              // console.log("4")
              this.form.reset();
            });
          }
        }
      }

      
}
