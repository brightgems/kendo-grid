import { Injectable } from '@angular/core';
import { Http , Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

import 'rxjs/add/operator/map';

import {
    GetUsersRequest, CreateUserRequest, UpdateUserRequest, CheckLoginIdRequest,
    DeleteUserRequest, ResetPasswordRequest
} from "../Models/createuser.model";

import {HttpService, ServiceResponse} from "./httpHelper.service";
import {MessageAreaMessageType, MessageAreaService} from "../message-area/message-area.service";


@Injectable()
export class UsersService {

    users: any; // holds the latest value of users
    constructor(private http: Http, private auth: AuthenticationService , private _httpService:HttpService,private _messageService:MessageAreaService) {

    }

    //Fetching users
    getUsers(): Observable<any> {

        //add authorization header with jwt token
        let userRequest = new GetUsersRequest();
        userRequest.showDisabled = false;
        var jsonString = JSON.stringify(userRequest);
        return this._httpService.Post("GetUsers", jsonString).map((x: ServiceResponse): ServiceResponse => {
                if (x.Success) {
                    return this.readUsers(x.Message);
                } else {
                    this._messageService.addMessage(MessageAreaMessageType.ERROR,"Unable to fetch Users");
                    return this.readUsers(null);
                }
            }
        );
    }

//Fetching Disabled User
    getDisabledUsers(): Observable<any> {

        //add authorization header with jwt token
        let userRequest = new GetUsersRequest();
        userRequest.showDisabled = true;
        var jsonString = JSON.stringify(userRequest);
        return this._httpService.Post("GetUsers", jsonString).map((x: ServiceResponse): ServiceResponse => {
                if (x.Success) {
                    return this.readUsers(x.Message);
                } else {
                    this._messageService.addMessage(MessageAreaMessageType.ERROR,"Unable to fetch Users");
                    return this.readUsers(null);
                }
            }
        );
    }


    //Creating New User
    createUser(newUser: CreateUserRequest): Observable<any> {
        var jsonString = JSON.stringify(newUser);
        return this._httpService.Post("CreateUser", jsonString).map((x: ServiceResponse): ServiceResponse => {
                if (x.Success) {
                    return x.Message;
                } else {
                    return x.Message;
                }
            }
        );

    }

//Updating existing User
    updateUser(user: CreateUserRequest): Observable<any> {
        var jsonString = JSON.stringify(user);
        return this._httpService.Post("UpdateUser", jsonString).map((x: ServiceResponse): ServiceResponse => {
                if (x.Success) {
                    return x.Message;
                } else {
                    return x.Message;
                }
            }
        );
    }

//check login availability
    checkLoginAvailability(checkLoginIdAvailabilityRequest: CheckLoginIdRequest): Observable<any> {
        var jsonString = JSON.stringify(checkLoginIdAvailabilityRequest);
        return this._httpService.Post("CheckLoginId", jsonString).map((x: ServiceResponse): ServiceResponse => {
                if (x.Success) {
                    return x.Message;
                } else {
                    return x.Message;
                }
            }
        );
    }

//Deleting User
    deleteUser(user: DeleteUserRequest): Observable<any> {
        var requestData = JSON.stringify(user);
        return this._httpService.Post("DeleteUser", requestData).map((x: ServiceResponse): ServiceResponse => {
                if (x.Success) {
                    return x.Message;
                } else {
                    return x.Message;
                }
            }
        );
    }

//Reset User Password
    resetUserPassword(resetRequest: ResetPasswordRequest): Observable<any> {
        var requestData = JSON.stringify(resetRequest);
        return this._httpService.Post("ResetPassword", requestData).map((x: ServiceResponse): ServiceResponse => {
                if (x.Success) {
                    return x.Message;
                } else {
                    return x.Message;
                }
            }
        );
    }
    //method for fetching admin email
    getAdminEmail():Observable<any>
    {
        return this._httpService.Get("GetCurrentUserInfo").map((x:ServiceResponse):ServiceResponse=>
        {
           return x.Message;
        });
    }


    private readUsers(result: any): any {
        // read result if result has list of users or not
        // set users as result.users or null

        if (result != null && result.Users != null) {
            this.users = result.Users;
        } else {
            this.users = null;
        }
        return this.users;
    }

    IsAdminUser(user:any):boolean{
        if(user!=null && user.LoginId!=null){
            return user.LoginId === this.auth.getAdminLoginId();
        }
        return false;
    }

    IsAdminLogin():boolean{
        return this.auth.isAdminLogin();
    }
}