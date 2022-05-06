export interface IUser {
  id:number;
  firstName?: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}
export interface IUserPayload {
  userId: number;
  userEmail:string;
}
