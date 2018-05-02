

import {Injectable} from "@angular/core";

@Injectable()
export class Config{

    public baseUrl :string;

    constructor()
    {
        // test-dev- api
        this.baseUrl = "http://test-mobilizie-api.azurewebsites.net/";
        // temp code, to be removed- beta api
        // this.baseUrl = "http://api-mobilizeonbeta.azurewebsites.net/";

    }
}