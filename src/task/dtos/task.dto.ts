import {
  IsNotEmpty,
  IsBoolean,
  ValidateNested,
  IsOptional,
} from 'class-validator';

export class TaskDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  trelloId: string;

  @IsNotEmpty()
  todo: number;

  @IsBoolean()
  isActive: boolean;
}
