import { Document } from "mongoose";

export interface IUserEntity extends Document {
    id?: string;
    userName: string;
    email: string;
    password: string;
}

export interface IUser {
    id?: IUserEntity['id'];
    userName: IUserEntity['userName'];
    email: IUserEntity['email'];
    password: IUserEntity['password'];
}