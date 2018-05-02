import {Component, OnInit} from '@angular/core'
import {AuthenticationService} from "../../services/authentication.service";


@Component({
    selector: 'm-navbar',
    templateUrl : './navbar.component.html',
    moduleId: module.id
})
export class MNavBarComponent implements OnInit
{

    OrganisationName:string;
    UserName:string;
    constructor(private _authService:AuthenticationService)
    {

    }
    ngOnInit(): void
    {
        //Added Organization name on the top bar.
        this.OrganisationName=this._authService.tokenData.orgName;
        //Added Username on the top bar drop down.
        this.UserName=this._authService.tokenData.userName;
    }

    logout()
    {
        this._authService.logout();
    }
}