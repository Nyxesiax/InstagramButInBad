import { AuthenticationService } from '../../Service/authentication.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {

  email: string;
  password: string;
  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authenticationService: AuthenticationService,
    public authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
) {
  this.createForm();
}

createForm() {
  this.registerForm = this.fb.group({
    email: ['', Validators.required ],
    password: ['', Validators.required]
  });
}

  tryRegister(value) {
    this.authenticationService.doRegister(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

  ngOnInit() {
  }



}
