import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  id: number;

  @IsOptional()
  name: string;

  @IsOptional()
  todoId: number;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
