export class TokenData
{
    access_token: string;
    token_type: string;
    expires_in: string;
    userName: string;
    orgName: string;
    issued: string;
    expires: string;
    userId: string;
    organizationId: string;
    canSavePassword: string;
    loginId:string;

    // public isAdminLogin():boolean {
    //     return this.loginId === this.adminId();
    // }
    //
    // public  adminId(): string {
    //     return this.organizationId+".admin";
    // }

}