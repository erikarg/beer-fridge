import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class OpenFridgeDto {
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    userId?: string;
}
