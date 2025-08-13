import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;
//name//
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

    @Prop({ 
    type: String,
    enum: ['user', 'admin', 'moderator'], // valeurs autorisées
    default: 'user'
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
