import $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService , User } from '../services/authentication.service';
import { Router,NavigationExtras } from '@angular/router';
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import { Title }     from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import {HelloMaterialComponent} from './hello-material.component'

@Component({
    selector: 'm-login',
    templateUrl: "/app/login/login.component.html",
})
export class LoginComponent implements OnInit {

    $ : any;
    user : User;
    error ='';
    successMessage = '';
    loadingIndicator : boolean = false;
    logoutMessage:string;
    showGetUnauthorizedMessage:boolean=false;
    errorMessage:boolean=false;
    errorShow:string;


   constructor(private authService: AuthenticationService , private router: Router , private titleService: Title )  {
       this.user = new User();
   }

    ngOnInit() {
        // reset login status
        this.getUnauthorizedMessage();
        this.authService.logout();
        this.titleService.setTitle("MobilizeOn-Login");

    }
    //add title on browser's tab
    public setTitle( newTitle: string) {
        this.titleService.setTitle( newTitle );
    }

    disableErrorMessage() {
       this.errorMessage = false;
        this.showGetUnauthorizedMessage = false;
    }


    //get unauthorized message from session storage and show in html file
    getUnauthorizedMessage(){
        this.logoutMessage = sessionStorage.getItem("logoutMessage");
        if(this.logoutMessage){
            this.showGetUnauthorizedMessage = true;
        }
        else{
            this.showGetUnauthorizedMessage = false;
        }
    }


      DoLogin() {

          this.loadingIndicator = true;
          this.authService.login(this.user.email , this.user.password)
              .subscribe(response => {
                  console.log(response);
                  //hide loading indicator
                  this.loadingIndicator = false;
                  if (response === true) {
                      //login success
                      this.successMessage = "Login Successful";

                      this.clearUnauthorizedUser();

                      // Get the redirect URL from our auth service
                      // If no redirect has been set, use the default
                      let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home/users/list';

                      // Set our navigation extras object
                      // that passes on our global query params and fragment
                      let navigationExtras: NavigationExtras = {
                          preserveQueryParams: true,
                          preserveFragment: true
                      };

                      // Redirect the user
                      this.router.navigate([redirect], navigationExtras);



                      // this.router.navigate(['home']);
                  } else {
                      //login failed
                      console.log('login failed');
                      this.error = "username or password is incorrect";


                  }
              }, error => {
                 this.error = <any>error;
                  this.loadingIndicator = false;
                  this.errorMessage = true;
                  this.errorShow = "Username or Password is incorrect";
                  // setTimeout(function() {
                  //     this.errorMessage = false;
                  // }.bind(this), 5000);


              })
      }

    //remove logout message from session storage
    clearUnauthorizedUser(){
        sessionStorage.removeItem('logoutMessage');
    }
    title = 'Hello World!';


}