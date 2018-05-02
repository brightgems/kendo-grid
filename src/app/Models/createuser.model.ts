import {Role} from "./role.model";

export class CreateUserRequest
{
    UserId: string;
    Name:string;
    Email:string;
    CountryCode:string;
    PhoneNo:string;
    LoginId:string;
    LoginPassword:string;
    CanSavePassword:string;
    RoleIds:Array<string>;
    IsEnabled: boolean
    Roles : Array<Role>;
}
export class UpdateUserRequest
{
    UserId: string;
    Name: string;
    Email: string;
    CountryCode: string;
    PhoneNo: string;
    RoleIds: Array<string>;
    IsEnabled: boolean
    CanSavePassword: string;
}
export class GetUsersRequest
{
    showDisabled:boolean=false;
}
export class CheckLoginIdRequest
{
    LoginId:string;
}
export class DeleteUserRequest
{
    UserId:string;
}
export class ResetPasswordRequest
{
    UserId:string
    SendMail :boolean
    MailsTo :string
    UserPassword:string
}