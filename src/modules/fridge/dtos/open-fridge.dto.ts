import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class OpenFridgeDto {
    @IsOptional()
    @IsString()
    @MinLength(1, { message: "User ID must not be empty" })
    @MaxLength(100, { message: "User ID must not exceed 100 characters" })
    userId?: string;
}
