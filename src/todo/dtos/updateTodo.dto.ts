import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  id: number;

  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
