import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";
import {RolesService} from "../services/roles.service";
import {Role} from "../Models/role.model";
import 'rxjs/add/operator/map';
import {DeleteUserRequest, CreateUserRequest, UpdateUserRequest} from "../Models/createuser.model";
import {UserFormsService} from "../services/userForms.service";
import {Router} from "@angular/router";
import {Report} from "../Models/report.model";
import {UserReportsService} from "../services/user-reports.services";
import {MessageAreaService, MessageAreaMessageType} from "../message-area/message-area.service";
import { Title }     from '@angular/platform-browser';
import {RefreshService} from "../services/list.refresh.service";
import $ from 'jquery';

@Component({
    moduleId: module.id,
    templateUrl : './roles-add.component.html',
    providers:[]
})

export class RolesAddComponent implements OnInit {


    roles: Array<Role> = [];
    role: Role = new Role();
    Forms: Array<any>;
    Reports: Array<Report>;
    ShowMainDiv:boolean=false;
    loadingIndicator : boolean = true;

    constructor(private  _rolesService: RolesService,
                private _userFormsService: UserFormsService,
                private _userReportService: UserReportsService,
                private _router: Router,
                private messageService:MessageAreaService,
                private titleService: Title,
                private _refreshService:RefreshService) {
    }

    ngOnInit(): void {
        this.openModal();
        this.GetReports();
        this.GetForms();
        this.titleService.setTitle("MobilizeOn-New Role");
    }
    //add title on browser's tab
    public setTitle( newTitle: string) {
        this.titleService.setTitle( newTitle );
    }

    openModal(){
        $("#openNewRolesModal").click();
    }

    GetReports() {
        this._userReportService.getUserReports().subscribe((result: Array<Report>) => {
            // all available reports
            this.Reports = result;
        });

    }

    GetForms() {
        this._userFormsService.getUserForms().subscribe((forms: any) => {

            this.loadingIndicator = false;
                this.Forms = forms.filter(x => x.FormType == "MobiForm");//all mobiforms

            this.ShowMainDiv=true;
        });

    }

    private typeOfSubmit : string;

    SaveRoles() {
        if(this.typeOfSubmit == 'SaveRoles') {
            this._rolesService.createRole(this.role).subscribe(
                (x) => {
                    console.log(x);
                    if (x.Success) {
                        this._refreshService.refresh.next(RefreshService.RoleType);
                        $("#dismissModalButton").click();
                        this._router.navigate(['/home/roles/list']);
                        this.messageService.addMessage(MessageAreaMessageType.SUCCESS, "Role added successfully !!!");

                    }
                    else {
                        this.messageService.addSingleMessage(MessageAreaMessageType.ERROR, x.Message);
                    }
                    console.log(x);
                },
                error => {
                    this.messageService.addSingleMessage(MessageAreaMessageType.ERROR,"Unable to add Role.");
                }
            )
        }else{
            this._rolesService.createRole(this.role).subscribe(
                (x) => {
                    console.log(x);
                    if (x.Success) {
                        this._refreshService.refresh.next(RefreshService.RoleType);
                        this.messageService.addMessage(MessageAreaMessageType.SUCCESS, "Role added successfully !!!");
                        this.role = new Role();
                    }
                    else {
                        this.messageService.addSingleMessage(MessageAreaMessageType.ERROR, x.Message);
                    }
                    console.log(x);
                },
                error => {
                    this.messageService.addSingleMessage(MessageAreaMessageType.ERROR,"Unable to add Role.");
                }
            )
        }

    }

    // returning to roles list page
    cancel(){
        this._router.navigate(['/home/roles/list']);
    };


    ToggleForm(x: any) {
        if (x == null || this.role == null) {
            return;
        }
        if (this.role.Forms == null) {
            // if there were no roles assigned to user
            this.role.Forms = [];
        }
        // search for role in roleIds list assigned to user
        var index = this.role.Forms.findIndex(y => y == x.FormName);
        if (index == -1) {
            //"Role assigned to user "
            this.role.Forms.push(x.FormName);
        }
        else {
            //"Role un assigned to user"
            this.role.Forms.splice(index, 1);
        }
    }

    IsFormSelected(x: any): boolean {
        //  is the role assigned to current user or not
        if (x == null || this.role == null || this.role.Forms == null) {
            return false;
        }
        let item: any = this.role.Forms.findIndex(y => y == x.FormName);
        return item !== -1;
    }

    ToggleReport(x: Report) {
        if (x == null || this.role == null) {
            return;
        }
        if (this.role.Reports == null) {
            // if there were no roles assigned to user
            this.role.Reports = [];
        }
        // search for role in roleIds list assigned to user
        var index = this.role.Reports.findIndex(y => y == x.Name);
        if (index == -1) {
            //"Role assigned to user "
            this.role.Reports.push(x.Name);
        }
        else {
            //"Role un assigned to user"
            this.role.Reports.splice(index, 1);
        }
    }

    IsReportSelected(x: Report): boolean {
        //  is the role assigned to current user or not
        if (x == null || this.role == null || this.role.Reports == null) {
            return false;
        }
        let item: any = this.role.Reports.findIndex(y => y == x.Name);
        return item !== -1;
    }

    closeButtonOnModal(){
        this._router.navigate(['/home/roles/list']);
    }
    closeModalAndHideOverlay()
    {
        $("#dismissModalButton").click();
        this._router.navigate(['/home/roles/list']);
    }
    KeyUpp(event)
    {
        if(event.keyCode==27)
        {
            this.closeModalAndHideOverlay();
        }
    }
}