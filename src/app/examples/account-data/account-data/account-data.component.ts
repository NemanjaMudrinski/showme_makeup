import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { FormErrorService } from 'app/examples/utils/formErrorService';
import { MustMatch } from 'app/examples/utils/must-match-validator.directive';

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.scss']
})
export class AccountDataComponent implements OnInit {

  @Input() public parrentForm: FormGroup;
  public accountDataForm : FormGroup;

  constructor(private formBuilder: FormBuilder,  public formError: FormErrorService) { }

  ngOnInit() {
    this.accountDataForm = this.formBuilder.group({
      username: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      email: ['', {validators: [Validators.required, Validators.email]}],
      password: ['', {validators: [Validators.required, Validators.minLength(8)]}],
      confirmPassword: [''],
    }, {
      validators: [MustMatch('password', 'confirmPassword')]
    });

    this.parrentForm.addControl("accountData", this.accountDataForm);
  }

  
}
