
import {Subject} from "rxjs/Subject";
import {Injectable} from "@angular/core";
@Injectable()
export class RefreshService {

    refresh: Subject<string>;
    public static UserType:string="User";
    public static RoleType:string="Role";
    constructor() {
        this.refresh = new Subject<string>();
    }
}


