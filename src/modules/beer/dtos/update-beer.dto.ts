import {
    IsString,
    IsInt,
    IsPositive,
    MinLength,
    MaxLength,
    IsOptional,
} from "class-validator";
import { Transform } from "class-transformer";

export class UpdateBeerDto {
    @IsOptional()
    @IsString()
    @MinLength(2, { message: "Beer type must be at least 2 characters long" })
    @MaxLength(50, { message: "Beer type must not exceed 50 characters" })
    type?: string;

    @IsOptional()
    @IsString()
    @MinLength(2, { message: "Brand must be at least 2 characters long" })
    @MaxLength(100, { message: "Brand must not exceed 100 characters" })
    brand?: string;

    @IsOptional()
    @IsInt({ message: "Volume must be an integer" })
    @IsPositive({ message: "Volume must be a positive number" })
    @Transform(({ value }) => parseInt(value))
    volumeML?: number;

    @IsOptional()
    @IsInt({ message: "Quantity must be an integer" })
    @IsPositive({ message: "Quantity must be a positive number" })
    @Transform(({ value }) => parseInt(value))
    quantity?: number;
}
