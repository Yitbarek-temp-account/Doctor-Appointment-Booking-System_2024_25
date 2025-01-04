import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {


  @IsNotEmpty()
  @IsString()
  readonly fullname: string;

  @IsNotEmpty()
  @IsEmail({}, { message: "Please enter a correct email" })
  readonly email: string; // Include only if your user schema has an email field

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
