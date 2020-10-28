import database, { Schema } from "mongoose";
import { IUserEntity } from "../types/user";

export const USER_TABLE_NAME = "User"

const UserSchema: Schema = new Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

export const UserEntity = database.model<IUserEntity>(USER_TABLE_NAME, UserSchema);
