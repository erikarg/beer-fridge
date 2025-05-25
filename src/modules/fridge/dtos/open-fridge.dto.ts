import { IsOptional, IsString, MaxLength } from "class-validator";

export class OpenFridgeDto {
    @IsOptional()
    @IsString()
    @MaxLength(100, { message: "User ID must not exceed 100 characters" })
    userId?: string;
}
