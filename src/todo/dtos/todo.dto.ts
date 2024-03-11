import { IsNotEmpty, IsBoolean, ValidateNested } from 'class-validator';

export class TodoDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsBoolean()
  isActive: boolean;
}
