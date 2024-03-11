import { IsNotEmpty, IsBoolean, ValidateNested } from 'class-validator';

export class TaskDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  todo: number;

  @IsBoolean()
  isActive: boolean;
}
