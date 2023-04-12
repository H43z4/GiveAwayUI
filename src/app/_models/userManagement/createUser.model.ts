
export class CreateUser {
  
    
    UserName: string="";
    Password: string="";
    RoleId: number=0;
    DistrictId: number=0;
    SiteOfficeId: number=0;
    UserTypeId: number=0;
    LineManagerId?: number;
}

export class RegisterUser {
  
    
    userName: string="";
    password: string="";
    fullName: string="";
    phoneNumber: string="";
    address: string="";
    email: string="";
}