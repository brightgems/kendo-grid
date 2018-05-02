import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpService, ServiceResponse} from "./httpHelper.service";
import {Role} from "../Models/role.model";
import {MessageAreaService, MessageAreaMessageType} from "../message-area/message-area.service";

@Injectable()
export class RolesService {

    constructor(private _httpService: HttpService,private _messageService:MessageAreaService) {
    }

    roles: any; // holds the latest value of roles

    getRoles(): Observable<Array<Role>> {
        //  Makes a http get call to get roles in organization...
        return this._httpService.Get("OrganizationRoles").map((x: ServiceResponse) => {
                if (x.Success) {
                    return this.readRoles(x.Message);
                } else {
                    this._messageService.addMessage(MessageAreaMessageType.ERROR,"Unable to fetch roles");
                    return this.readRoles(null);
                }
            }
        );
    }

    private readRoles(result: any): Array<Role> {
        // read result if result has list of roles or not
        // set roles as result.Roles or null

        if (result != null && result.Roles != null) {
            this.roles = result.Roles;
        } else {
            this.roles = null;
        }
        return this.roles;
    }

    createRole(role: Role): Observable<any> {
        //  Makes a http get call to get roles in organization...
        return this._httpService.Post("OrganizationRoles", role).map((x: ServiceResponse): ServiceResponse => {
                if (x.Success) {
                    return x.Message;
                } else {
                    return x.Message;
                }
            }
        );
    }

    updateRole(role: Role): Observable<any> {
        //  Makes a http get call to get roles in organization...
        return this._httpService.Post("UpdateRole", role).map((x: ServiceResponse): ServiceResponse => {
                if (x.Success) {
                    return x.Message;
                } else {
                    return x.Message;
                }
            }
        );
    }

    deleteRole(role: Role): Observable<any> {
        //  Makes a http get call to get roles in organization...
        return this._httpService.Post("DeleteRole", role).map((x: ServiceResponse): ServiceResponse => {
                if (x.Success) {
                    return x.Message;
                } else {
                    return x.Message;
                }
            }
        );
    }

    IsAdminRole(role: Role):boolean {
        if(role!=null && role.RoleName!=null && role.RoleName === 'Administrators'){
            return true;
        }
        return false;
    }
}