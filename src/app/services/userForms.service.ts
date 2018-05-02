import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpService, ServiceResponse} from "./httpHelper.service";
import {Forms} from "../Models/forms.model";

@Injectable()
export class UserFormsService {

    constructor(private _httpService: HttpService) {
    }

    forms: Array<Forms> = [];

    getUserForms(): Observable<Array<Forms>> {
        // makes service call to get forms from server
        return this._httpService.Post('UserForms', null)
            .map((x: ServiceResponse) => {
                if (x != null && x.Success) {
                    return this.readForms(x.Message);
                } else {
                    return this.readForms(null);
                }
            })
    }

    private readForms(result: any): Array<Forms> {
        // read result if result has list of Forms or not
        // set forms as result.Forms or null
        if (result != null && result.Forms != null) {
            this.forms = result.Forms;
        } else {
            this.forms = [];
        }
        return this.forms;
    }

}