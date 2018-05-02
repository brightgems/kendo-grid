import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";
import {RolesService} from "../services/roles.service";
import {Role} from "../Models/role.model";
import 'rxjs/add/operator/map';
import {DeleteUserRequest, CreateUserRequest, UpdateUserRequest} from "../Models/createuser.model";
import {UserFormsService} from "../services/userForms.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserReportsService} from "../services/user-reports.services";
import {Report} from "../Models/report.model";
import { Title }     from '@angular/platform-browser';
import * as $ from 'jquery';

@Component({
    moduleId: module.id,
    templateUrl : './roles-detail.component.html',
    providers:[]
})

export class RolesDetailComponent implements OnInit
{
    roles: Array<Role> = [];
    role: Role = new Role();
    Forms: Array<any>;
    Reports: Array<Report>;
    sub:any;
    id:any;
    ShowMainDiv:boolean=false;
    loadingIndicator:boolean=true;

    constructor(private  _rolesService: RolesService,
                private _userFormsService: UserFormsService,
                private _userReportService: UserReportsService,
                private _route:ActivatedRoute,
                private _router:Router,
                private titleService: Title) {
    }

    ngOnInit(): void
    {
        this.sub=this._route.params.subscribe(params=>
        {
            // (+) converts string 'id' to a number
            this.id=+params['id'];
            this.getRoleById(this.id);
        });
        this.titleService.setTitle("MobilizeOn-Role Detail");
        this.openModal();
    }
    //add title on browser's tab
    public setTitle( newTitle: string) {
        this.titleService.setTitle( newTitle );
    }

    ngOnDestroy()
    {
        this.sub.unsubscribe();
    }

    openModal(){
        $("#openRoleDetailModal").click();
    }

    UpdateRoleOnClick() {
        this._rolesService.updateRole(this.role).subscribe(
            (x)=> {
                console.log(x);
                if(x.Success)
                {
                    this._router.navigate(['/home/roles/list']);
                }
            }
        );
    }
    /*

     updateCheckedOptions(option, event) {
     alert(option);
     }
     */


    updateRoles(role) {
        this._userReportService.getUserReports().subscribe((result: Array<Report>) => {
            // all available reports
            this.Reports = result;
        });
        this._userFormsService.getUserForms().subscribe((forms: any)=> {
            this.loadingIndicator = false;
            this.Forms = forms.filter(x=> x != null && x.FormType == "MobiForm");//all mobiforms
            this.role = role;
            this.ShowMainDiv=true;
        });
    }

    ToggleForm(x: any) {
        if (x == null || this.role == null) {
            return;
        }
        if (this.role.Forms == null) {
            // if there were no roles assigned to user
            this.role.Forms = [];
        }
        // search for role in roleIds list assigned to user
        var index = this.role.Forms.findIndex(y=>y == x.FormName);
        if (index == -1) {
            //"Role assigned to user "
            this.role.Forms.push(x);
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
        let item: any = this.role.Forms.findIndex(y=>y == x.FormName);
        return item !== -1;
    }

    getRoleById(id:any)
    {
        let roles=JSON.parse(localStorage.getItem("RolesData"));
        let role=roles.filter(x=>x.RoleId==id)[0];
        this.updateRoles(role);
        console.log(role);
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

    EditRoleOnClick(role){
        {
            $("#dismissModalButton").click();

            // let redirect='/home/roles/list/edit';
            // this._router.navigate([redirect,role.RoleId]);

            this._router.navigateByUrl(`/home/roles/list/(editRole:edit/${role.RoleId})`);
        }
    }
    closeButtonOnModal(){
        this._router.navigate(['/home/roles/list']);
    }

    IsAdminRole(role: Role):boolean {
        return this._rolesService.IsAdminRole(role);
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