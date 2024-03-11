import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { TaskDto } from './dtos/task.dto';
import { UpdateTaskDto } from './dtos/updateTask.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAllTasks(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async findTaskById(@Param('id') id: number): Promise<Task> {
    return await this.taskService.findOne(id);
  }

  @Post()
  async createTask(@Body() taskDto: TaskDto): Promise<Task> {
    return await this.taskService.create(taskDto);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<void> {
    return await this.taskService.delete(id);
  }
}
