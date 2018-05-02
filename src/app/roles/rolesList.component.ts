import {Component, OnInit, ElementRef} from '@angular/core';
import {UsersService} from "../services/users.service";
import {RolesService} from "../services/roles.service";
import {Role} from "../Models/role.model";
import 'rxjs/add/operator/map';
import {UserFormsService} from "../services/userForms.service";
import {Router} from "@angular/router";
import {MessageAreaService, MessageAreaMessageType} from "../message-area/message-area.service";
import { Title }     from '@angular/platform-browser';
import {RefreshService} from "../services/list.refresh.service";
import * as $ from 'jquery';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {SortDescriptor, orderBy} from '@progress/kendo-data-query';


@Component({
    moduleId: module.id,
    selector:"role-list",
    templateUrl : './rolesList.component.html'
})

export class RolesListComponent implements OnInit {

    private roles;
    loadingIndicator : boolean = true;
    ShowKendo : boolean = false;
    private filter: string;
    searchString:string="";
    private info: boolean = true;
    private states: boolean[] = [];


    ngOnInit(): void {
        this.showToolTip();
        this.getRolesFromServer();
        this.titleService.setTitle("MobilizeOn-Roles");
        this.setKendoGridHeight(window.innerHeight);
        this.setKendoGridWidth(window.innerWidth,window.innerHeight);
    }

    constructor(private _usersService: UsersService,
                private  _rolesService: RolesService,
                private _userFormsService: UserFormsService,
                private _router: Router,
                private messageService:MessageAreaService,
                private titleService: Title,
                private _refreshService:RefreshService,
                private element: ElementRef) {
        this._refreshService.refresh.subscribe((type)=>
        {
            if(type==RefreshService.RoleType)
            {
                this.getRolesFromServer();
            }
        });
    }
    //add title on browser's tab
    public setTitle( newTitle: string) {
        this.titleService.setTitle( newTitle );
    }

    getRolesFromServer() {
        this._rolesService.getRoles().subscribe((result: any) => {
            this.roles = result;
            this.loadProducts();
            this.loadingIndicator = false;
            this.ShowKendo = true;
            this.StoreRolesToLocalStorage(this.roles);
        })
    }

    NavigateToAddRole() {
        // this._userFormsService.getUserForms().subscribe((result: any)=> {
        //
        //     this.Forms = result.Forms.filter(x=>x.FormType == "MobiForm");//all mobiforms
        // });
        let redirect = '/home/roles/list/add';
        this._router.navigate([redirect]);
    }

    StoreRolesToLocalStorage(roles: any) {
        localStorage.setItem("RolesData", JSON.stringify(roles));
    }

    editRoleCLick(role: Role) {
        // let redirect = '/home/roles/list/edit';
        // this._router.navigate([redirect, role.RoleId]);
        this._router.navigateByUrl(`/home/roles/list/(editRole:edit/${role.RoleId})`);
    }

    detailRoleCLick(role: Role) {
        // let redirect = '/home/roles/list/detail';
        // this._router.navigate([redirect, role.RoleId]);
        this._router.navigateByUrl(`/home/roles/list/(detailRole:detail/${role.RoleId})`);
    }

    DeleteRoles(role: Role) {
        if (confirm("Are you sure you want to delete " + role.RoleName + "?")) {
            var index = this.roles.indexOf(role)
            this._rolesService.deleteRole(role)
                .subscribe((result: any) => {
                    if (result.Success) {
                        this.roles.splice(index, 1);
                        this.messageService.addMessage(MessageAreaMessageType.SUCCESS,"Role Deleted!");
                    }
                    else {
                        console.log(result);
                        this.messageService.addMessage(MessageAreaMessageType.ERROR,"Unable to delete Role.");
                    }
                },
                    error => {
                        this.messageService.addMessage(MessageAreaMessageType.ERROR,"Unable to delete Role.");
                    });
        }
    }

    RefreshRole() {
        this.getRolesFromServer();
    }

    IsAdminRole(role: Role):boolean {
       return this._rolesService.IsAdminRole(role);
    }

    showToolTip()
    {
        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
        });
    }

    private gridView: GridDataResult;

    private pageSize: number = 10;
    private skip: number = 0;
    protected pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.loadProducts();
    }

    // private loadProducts(): void {
    //     this.gridView = {
    //         data: this.roles.slice(this.skip, this.skip + this.pageSize),
    //         total: this.roles.length
    //     };
    // }

    //products load using pagination
    private loadProducts(): void {

        if(this.searchString!=null && this.searchString != ""){
            this.loadFilteredProducts(this.searchResult);
            return;
        }

        this.gridView = {
            data: this.roles.slice(this.skip, this.skip + this.pageSize),
            total: this.roles.length
        };
    }

    private sort: SortDescriptor[] = [];
    //sorting data
        protected sortChange(sort: SortDescriptor[]): void {
            this.sort = sort;
            this.loadSortedProducts();
        }

        private loadSortedProducts(): void {
            this.roles = orderBy(this.roles, this.sort);
            this.loadProducts();
        }

    private loadFilteredProducts(role:any): void {
        if (role != null) {
            this.gridView = {
                data: role.slice(this.skip, this.skip + this.pageSize),
                total: role.length
            };
        }
    }

    //searching data
        private change() {
            this.skip = 0;
            this.search();
            this.loadProducts();
        }
        searchResult:any;
        search(){
            this.searchResult = this.roles.filter(x=>this.SearchInUser(this.searchString,x)==true);
        }

    SearchInUser(search:string,role:Role):boolean{
        if(search == null || search == ""){
            return true;
        }

        var sLower = search.toLowerCase();
        if(role==null){
            return false;
        }
        if(role.RoleName!=null && role.RoleName.toLowerCase().includes(sLower)){
            return true;
        }
        if(role.RoleDescription!=null && role.RoleDescription.toLowerCase().includes(sLower)){
            return true;
        }
        //forms is in array of objects, so we need to access each object
        for(var i = 0; i < role.Forms.length; i++) {
            if(role.Forms[i].toLowerCase().includes(sLower)) {
                return true;
            }
        }
        return false;
    }

    // for + - feature in kendo ui grid
    private icons(): any[] {
        const selector = ".k-master-row > .k-hierarchy-cell > .k-icon";
        const icons = this.element.nativeElement.querySelectorAll(selector);

        return Array.from(icons);
    }
    // for + - feature in kendo ui grid
    private saveStates(): void {
        this.states = this.icons().map(
            (icon) => icon.classList.contains("k-minus")
        );
    }
    // for + - feature in kendo ui grid
    private ngAfterViewInit(): void {
        this.saveStates();

        this.icons().forEach(
            (icon) => window.addEventListener("mouseup", () => window.setTimeout(this.saveStates.bind(this)))
        );
    }
    // for + - feature in kendo ui grid
    private isExpanded(index): boolean {
        return this.states[index] || false;
    }

    public kendoHeight:number;
    onResize(event){
        if(event!=null){
            var w = event.target.innerHeight;
            var h = event.target.innerHeight;
            console.log("height : ",h);
            this.setKendoGridHeight(h);
            this.setKendoGridWidth(w,h);
        }
    }


//for less than 767 dimensions responsive
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
        this.kendoHeight = height-230;
        let availableArea=this.kendoHeight - ( 35 + 40 );
        let pageSize= ((availableArea)/41);
        this.pageSize= Math.ceil(pageSize)+1;
        console.log(this.pageSize,`Page size ${pageSize} at ${this.kendoHeight} and window height ${height}`);
        // console.log("Height Set " , height);
        // if (height >= 860){
        //     this.kendoHeight = 590;
        //     this.pageSize = 16;
        // }
        // if (height >= 830 && height <= 859){
        //     this.kendoHeight = 604;
        //     this.pageSize = 15;
        // }
        // if (height >= 810 && height <= 829){
        //     this.kendoHeight = 587;
        //     this.pageSize = 15;
        // }
        // if(height >= 790 && height <= 809){
        //     this.kendoHeight = 565;
        //     this.pageSize = 14;
        // }
        // if(height >= 770 && height <= 789){
        //     this.kendoHeight = 545;
        //     this.pageSize = 14;
        // }
        // if(height >= 750 && height <= 769){
        //     this.kendoHeight = 525;
        //     this.pageSize = 13;
        // }
        // if(height >= 730 && height <= 749){
        //     this.kendoHeight = 503;
        //     this.pageSize = 13;
        // }
        // if(height >= 710 && height <= 729) {
        //     this.kendoHeight = 485;
        //     this.pageSize = 12;
        // }
        // if(height >= 690 && height <= 709) {
        //     this.kendoHeight = 463;
        //     this.pageSize = 12;
        // }
        // if(height >= 670 && height <= 689) {
        //     this.kendoHeight = 445;
        //     this.pageSize = 12;
        // }
        // if(height >= 650 && height <= 669) {
        //     this.kendoHeight = 425;
        //     this.pageSize = 12;
        // }
        // if(height >= 630 && height <= 649) {
        //     this.kendoHeight = 404;
        //     this.pageSize = 10;
        // }
        // if(height >= 610 && height <= 629) {
        //     this.kendoHeight = 382;
        //     this.pageSize = 10;
        // }
        // if(height >= 590 && height <= 609) {
        //     this.kendoHeight = 362;
        //     this.pageSize = 9;
        // }
        // if(height >= 570 && height <= 589) {
        //     this.kendoHeight = 342;
        //     this.pageSize = 8;
        // }
        // if(height >= 540 && height <= 569) {
        //     this.kendoHeight = 315;
        //     this.pageSize = 8;
        // }
        //for come on 1st page
        this.skip=0;
        // this.loadProducts();
    }
}