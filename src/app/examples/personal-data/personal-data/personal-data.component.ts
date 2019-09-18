import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormErrorService } from 'app/examples/utils/formErrorService';
import { mimeTypeValidator } from 'app/examples/utils/mime-type-validator.directive';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {

  @Input() public parrentForm: FormGroup;
  public personalDataForm : FormGroup;
  imagePreview: string;

  constructor(private formBuilder: FormBuilder, public formError: FormErrorService) { }

  ngOnInit() {
    this.personalDataForm = this.formBuilder.group({
      firstName: ['', {validators: [Validators.required, Validators.pattern('[a-zA-Z]{3,}')]}],
      lastName: ['', {validators: [Validators.required, Validators.pattern('[a-zA-Z]{3,}')]}],
      phoneNumber: ['', {validators: [Validators.required, Validators.pattern('[0-9]{9,}')]}],
      profileImagePath: [''],
      profileImage: ['', {asyncValidators: [mimeTypeValidator]}],
    });
    this.parrentForm.addControl("personalData", this.personalDataForm);
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if(file){
      this.personalDataForm.patchValue({ profileImage: file });
      this.personalDataForm.get("profileImage").updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;;
      };
      reader.readAsDataURL(file);
    }
  }
}
