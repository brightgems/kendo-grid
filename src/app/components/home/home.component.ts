import {Component} from '@angular/core'
import {UsersService} from "../../services/users.service";
import {RolesService} from "../../services/roles.service";
import {Role} from "../../Models/role.model";

@Component({

    selector: 'home',
    templateUrl: "./home.component.html",
    moduleId: module.id
})

export class HomeComponent {
    Users: any;

    roles: Array<Role> = [];
    role: Role = new Role();

    constructor(private _usersService: UsersService, private  _rolesService: RolesService) {

    }

    getUsers(): void {
        this._usersService.getUsers().subscribe((userResponse: any)=> {
            console.log(userResponse);
            this.Users = userResponse;
        });
    }

    createUser(): void {
        alert("creating user");
    }

    getRoles() {
        this._rolesService.getRoles().subscribe(x=>this.roles = x);
    }

    createRole() {
        this._rolesService.createRole(this.role).subscribe();
    }

    modifyRole(role: Role) {
        this.role = role;
    }

    updateRole() {
        this._rolesService.updateRole(this.role).subscribe();
    }

    deleteRole() {
        this._rolesService.deleteRole(this.role).subscribe();
    }

}