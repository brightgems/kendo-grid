import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";

import 'rxjs/add/operator/map';
import {NavigationExtras, Router} from "@angular/router";
import * as $ from 'jquery';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';

@Component({
    templateUrl : '/app/users/disable-user-list.component.html'

})

export class DisableUserListComponent implements OnInit
    {

    loadingIndicator : boolean = true;
    Users: any;
    ShowKendo : boolean = false;


    ngOnInit(): void
    {
        this.getDisableUser();
        this.setKendoGridHeight(window.innerHeight);
        this.setKendoGridWidth(window.innerWidth,window.innerHeight);
    }


    constructor(private _usersService: UsersService,private _router:Router)
    {


    }
    getDisableUser()
    {

        this._usersService.getDisabledUsers().subscribe(
            (result:any)=>
        {
          this.Users=result;
            this.loadProducts();
            this.loadingIndicator = false;
            this.ShowKendo = true;
            this.SaveDisabledUsersToLocal(this.Users);
        });
    }
    SaveDisabledUsersToLocal(users:any)
    {
        localStorage.setItem("DisableUserData",JSON.stringify(users));
    }
    editUserClick(user)
    {
        this._router.navigateByUrl(`/home/users/list/(editUser:edit/${user.UserId})`);
    }
    newUserClick()
    {
        let redirect = '/home/users/list/create';

        // Redirect the user
        this._router.navigate([redirect]);
    }
    enableUsersClick()
    {
        let redirect='home/users/list';
        this._router.navigate([redirect]);
    }
    detailUserClick(user)
    {
        this._router.navigateByUrl(`/home/users/list/(detailUser:detail/${user.UserId})`);
    }

    private gridView: GridDataResult;

    private pageSize: number = 10;
    private skip: number = 0;
    protected pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.loadProducts();
    }

    private loadProducts(): void {
        this.gridView = {
            data: this.Users.slice(this.skip, this.skip + this.pageSize),
            total: this.Users.length
        };
    }

    public kendoHeight:number;
    onResize(event){
        if(event!=null){
            var w = event.target.innerWidth;
            var h = event.target.innerHeight;
            console.log("height : ",h);
            this.setKendoGridHeight(h);
            this.setKendoGridWidth(w,h);
        }
    }


    setKendoGridWidth(width,height){
        if(width<=767){
            if (height >= 860){
                this.kendoHeight = 590;
                this.pageSize = 16;
            }
            if (height >= 830 && height <= 859){
                this.kendoHeight = 560;
                this.pageSize = 15;
            }
            if (height >= 810 && height <= 829){
                this.kendoHeight = 540;
                this.pageSize = 15;
            }
            if(height >= 790 && height <= 809){
                this.kendoHeight = 518;
                this.pageSize = 14;
            }
            if(height >= 770 && height <= 789){
                this.kendoHeight = 500;
                this.pageSize = 14;
            }
            if(height >= 750 && height <= 769){
                this.kendoHeight = 480;
                this.pageSize = 13;
            }
            if(height >= 730 && height <= 749){
                this.kendoHeight = 460;
                this.pageSize = 13;
            }
            if(height >= 710 && height <= 729) {
                this.kendoHeight = 441;
                this.pageSize = 12;
            }
            if(height >= 690 && height <= 709) {
                this.kendoHeight = 421;
                this.pageSize = 12;
            }
            if(height >= 670 && height <= 689) {
                this.kendoHeight = 400;
                this.pageSize = 12;
            }
            if(height >= 650 && height <= 669) {
                this.kendoHeight = 381;
                this.pageSize = 12;
            }
            if(height >= 630 && height <= 649) {
                this.kendoHeight = 361;
                this.pageSize = 10;
            }
            if(height >= 610 && height <= 629) {
                this.kendoHeight = 341;
                this.pageSize = 10;
            }
            if(height >= 590 && height <= 609) {
                this.kendoHeight = 321;
                this.pageSize = 9;
            }
            if(height >= 570 && height <= 589) {
                this.kendoHeight = 300;
                this.pageSize = 8;
            }
            if(height >= 540 && height <= 569) {
                this.kendoHeight = 271;
                this.pageSize = 8;
            }
            //for come on 1st page
            this.skip=0;
        }
    }

    setKendoGridHeight(height){
        console.log("Height Set " , height);
        if (height >= 860){
            this.kendoHeight = 590;
            this.pageSize = 16;
        }
        if (height >= 830 && height <= 859){
            this.kendoHeight = 604;
            this.pageSize = 15;
        }
        if (height >= 810 && height <= 829){
            this.kendoHeight = 587;
            this.pageSize = 15;
        }
        if(height >= 790 && height <= 809){
            this.kendoHeight = 565;
            this.pageSize = 14;
        }
        if(height >= 770 && height <= 789){
            this.kendoHeight = 545;
            this.pageSize = 14;
        }
        if(height >= 750 && height <= 769){
            this.kendoHeight = 525;
            this.pageSize = 13;
        }
        if(height >= 730 && height <= 749){
            this.kendoHeight = 503;
            this.pageSize = 13;
        }
        if(height >= 710 && height <= 729) {
            this.kendoHeight = 485;
            this.pageSize = 12;
        }
        if(height >= 690 && height <= 709) {
            this.kendoHeight = 463;
            this.pageSize = 12;
        }
        if(height >= 670 && height <= 689) {
            this.kendoHeight = 445;
            this.pageSize = 12;
        }
        if(height >= 650 && height <= 669) {
            this.kendoHeight = 425;
            this.pageSize = 12;
        }
        if(height >= 630 && height <= 649) {
            this.kendoHeight = 404;
            this.pageSize = 10;
        }
        if(height >= 610 && height <= 629) {
            this.kendoHeight = 382;
            this.pageSize = 10;
        }
        if(height >= 590 && height <= 609) {
            this.kendoHeight = 362;
            this.pageSize = 9;
        }
        if(height >= 570 && height <= 589) {
            this.kendoHeight = 342;
            this.pageSize = 8;
        }
        if(height >= 540 && height <= 569) {
            this.kendoHeight = 315;
            this.pageSize = 8;
        }
        //for come on 1st page
        this.skip=0;
        // this.loadProducts();
    }
}
