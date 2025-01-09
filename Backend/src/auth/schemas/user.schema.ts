///user.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "../roles/role.enum";

@Schema({
  timestamps:true,
})

export class user extends Document{

  @Prop()
  id:string;

  @Prop()
  name:string;

  @Prop({unique:[true,'Duplicate email entered']})
  email:string;

  @Prop()
  password: string;

  @Prop({ type: [String], default: [] })
  roles: string[];
}

export const UserSchema= SchemaFactory.createForClass(user);

export { Document, Role };
