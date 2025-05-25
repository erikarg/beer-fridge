import {
    IsString,
    IsInt,
    IsPositive,
    MinLength,
    MaxLength,
} from "class-validator";

export class CreateBeerDto {
    @IsString()
    @MinLength(2, { message: "Beer type must be at least 2 characters long" })
    @MaxLength(50, { message: "Beer type must not exceed 50 characters" })
    type: string;

    @IsString()
    @MinLength(2, { message: "Brand must be at least 2 characters long" })
    @MaxLength(100, { message: "Brand must not exceed 100 characters" })
    brand: string;

    @IsInt({ message: "Volume must be an integer" })
    @IsPositive({ message: "Volume must be a positive number" })
    volumeML: number;

    @IsInt({ message: "Quantity must be an integer" })
    @IsPositive({ message: "Quantity must be a positive number" })
    quantity: number;
}
