import {Component, OnInit,ElementRef} from '@angular/core';
import {UsersService} from "../services/users.service";
import { Title }     from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import {DeleteUserRequest} from "../Models/createuser.model";
import {Router} from "@angular/router";
import {MessageAreaService, MessageAreaMessageType} from "../message-area/message-area.service";
import {RefreshService} from "../services/list.refresh.service";
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {SortDescriptor, orderBy, GroupDescriptor , process} from '@progress/kendo-data-query';
import * as $ from 'jquery';


@Component({
    templateUrl : '/app/users/usersList.component.html'
})

export class UsersListComponent implements OnInit
{
    Users: any;
    private filter: string;
    searchString:string="";
    loadingIndicator : boolean = true;
    ShowKendo : boolean = false;
    private groups: GroupDescriptor[];
    private info: boolean = true;
    private states: boolean[] = [];

    ngOnInit(): void
    {
        this.getUsers();
        this.titleService.setTitle("MobilizeOn-Users");
        this.setKendoGridHeight(window.innerHeight);
        this.setKendoGridWidth(window.innerWidth,window.innerHeight);
    }



    constructor(private _usersService: UsersService,
                private _router:Router,
                private messageService:MessageAreaService,
                private titleService: Title,
                private _refreshService: RefreshService,
                private element: ElementRef)
    {
       this._refreshService.refresh.subscribe((type)=>
       {
           if(type==RefreshService.UserType)
           {
               this.getUsers();
           }
       });
    }
    //add title on browser's tab
    public setTitle( newTitle: string) {
        this.titleService.setTitle( newTitle );
    }

    getUsers(): void
    {
        this._usersService.getUsers().subscribe((userResponse: any)=> {
            console.log(userResponse);
            this.Users = userResponse;
            this.SaveUserListToLocal(this.Users);
            this.loadProducts();
            this.loadingIndicator = false;
            this.ShowKendo = true;

        });
    }

    deleteUserClick(a) {
        if (confirm("Are you sure you want to disable " + a.Name + "?")) {
            var index = this.Users.indexOf(a)
            // let selectedUser = this.Users.filter(x=>x.UserId==a.UserId)[0];
            // let index=this.Users.indexOf(selectedUser);
            // Here, with the splice method, we remove 1 object
            // at the given index.

            let deleteUserRequest: DeleteUserRequest = new DeleteUserRequest();
            deleteUserRequest.UserId = a.UserId;
            this._usersService.deleteUser(deleteUserRequest)
                .subscribe((result: any)=> {
                    if (result.Success) {
                        this.Users.splice(index, 1);
                        this.messageService.addMessage(MessageAreaMessageType.SUCCESS,"User Disabled Successfully!!!");
                    }
                    else {
                        console.log(result);
                        this.messageService.addSingleMessage(MessageAreaMessageType.ERROR,"Unable to disable User.");
                    }
                    this.loadProducts();
                },error =>
                {
                    this.messageService.addSingleMessage(MessageAreaMessageType.ERROR,"Unable to disable User.");
                });
        }
    }

    editUserClick(user)
    {
        // let redirect=/home/users/list/(editUserModal:edit/:id);

        this._router.navigateByUrl(`/home/users/list/(editUser:edit/${user.UserId})`);
    }

    detailUserClick(user)
    {
        // let redirect = '/home/users/list/detail';
        // this._router.navigate([redirect,user.UserId]);
        this._router.navigateByUrl(`/home/users/list/(detailUser:detail/${user.UserId})`);
    }
    resetUserClick(user)
    {
        let redirect='/home/users/list/reset';
        this._router.navigate([redirect,user.UserId]);
    }


    AddUser()
    {
        let redirect = '/home/users/list/(popup:create)';
        // Redirect the user
        this._router.navigateByUrl(redirect);
    }


    SaveUserListToLocal(UsersData:any)
    {
        localStorage.setItem("UsersData",JSON.stringify(UsersData));
    }


    ShowDisabledUser()
    {
        let redirect='/home/users/list/disable';
        this._router.navigate([redirect]);
    }


    IsAdminUser(user:any):boolean{
        console.log(this.IsAdminUser);
        return this._usersService.IsAdminUser(user);
    }


    IsAdminLogin():boolean {
        return this._usersService.IsAdminLogin();
    }



    private gridView: GridDataResult;
    private gridView2: GridDataResult;
    private pageSize: number = 10;
    private skip: number = 0;
    protected pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.loadProducts();
    }

    //products load using pagination
    private loadProducts(): void {

        if(this.searchString!=null && this.searchString != ""){
            this.loadFilteredProducts(this.searchResult);
            return;
        }
        var groupingResult=process(this.Users, {group: this.groups });

        this.gridView = {
            // data: groupingResult.data,
            data: groupingResult.data.slice(this.skip, this.skip + this.pageSize),
            total: groupingResult.data.length
        };
       /* this.gridView2 = {
            data: this.Users.slice(this.skip, this.skip + this.pageSize),
            total: this.Users.length
        };
         this.gridView = process(this.gridView2.data, { group: this.groups });*/
    }

    private sort: SortDescriptor[] = [];
    //sorting data
    protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadSortedProducts();
    }

    public groupChange(groups: GroupDescriptor[]): void {
        this.groups = groups;
        this.loadProducts();
    }

    private loadSortedProducts(): void {
            this.Users = orderBy(this.Users, this.sort);
            this.loadProducts();
    }


    private loadFilteredProducts(user:any): void {
        if (user != null) {
            this.gridView = {
                data: user.slice(this.skip, this.skip + this.pageSize),
                total: user.length
            };
        }
    }

    private change() {
        //when user search on page 5, the searched result should appear on 1st page
        this.skip=0;
        //for searching users
          this.search();
          this.loadProducts();
      }
    searchResult:any;
    search(){
      // this.searchResult= this.Users.filter(x=>x.Name != null && x.Name.toLowerCase().includes(this.searchString.toLowerCase()));
        this.searchResult = this.Users.filter(x=>this.SearchInUser(this.searchString,x)==true);
    }

    SearchInUser(search:string,user:any):boolean{
        if(search == null || search == ""){
            return true;
        }

        var sLower = search.toLowerCase();
        if(user==null){
            return false;
        }
        if(user.Name!=null && user.Name.toLowerCase().includes(sLower)){
            return true;
        }
        if(user.Email!=null && user.Email.toLowerCase().includes(sLower)){
            return true;
        }
        if(user.PhoneNo!=null && user.PhoneNo.toLowerCase().includes(sLower)){
            return true;
        }
        // x.Name != null && x.Name.toLowerCase().includes(this.searchString.toLowerCase())
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
