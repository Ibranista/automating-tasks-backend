import { IsNotEmpty, IsBoolean, ValidateNested } from 'class-validator';

export class UpdateTodoCompleteDto {
  @IsBoolean()
  isCompleted: boolean;
}
