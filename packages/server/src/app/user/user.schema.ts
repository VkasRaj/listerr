import { ObjectType, Field, registerEnumType } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { IDSchema } from "../shared/shared.schema";

// don't extract this enum from this file
export enum AuthRolesEnum {
    USER = "USER",
    ADMIN = "ADMIN",
}

@ObjectType({
    simpleResolvers: true,
})
export class User extends IDSchema {
    @Field()
    @prop({
        unique: true,
        required: true,
        trim: true,
        minlength: 3,
    })
    username: string;

    @Field()
    @prop({
        unique: true,
        required: true,
        trim: true,
    })
    email: string;

    @prop({
        required: true,
        enum: AuthRolesEnum,
    })
    role: AuthRolesEnum;

    @prop({
        required: true,
        trim: true,
    })
    password: string;
}

registerEnumType(AuthRolesEnum, {
    name: "AuthRoles",
    description: "Roles for the authenticated users",
});

export const UserModel = getModelForClass(User);
