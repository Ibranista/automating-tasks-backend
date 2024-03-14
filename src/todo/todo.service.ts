import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { TodoDto } from './dtos/todo.dto';
import { UpdateTodoDto } from './dtos/updateTodo.dto';
import { UpdateTodoCompleteDto } from './dtos/updateComplete.dto';
import { TaskService } from 'src/task/task.service';
import axios from 'axios';
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private readonly taskService: TaskService,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find({ relations: { tasks: true } });
  }

  async triggerWebHookWorkflow(name: string, isComplted: boolean = false) {
    await axios
      .post('https://theprogrammer1.app.n8n.cloud/webhook-test/name', {
        name: 'hello',
        isCompleted: isComplted,
      })
      .then((response) => {
        console.log('Response:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  async updateIsComplete(
    name: string,
    updateTodoCompleteDto: UpdateTodoCompleteDto,
  ): Promise<any> {
    console.log('updateTodoCompleteDto-->', updateTodoCompleteDto);
    const todoToUpdate = await this.todoRepository.findOneBy({ name });

    if (todoToUpdate) {
      console.log('has matched!!!');
      const updated = await this.todoRepository.update(
        { name },
        updateTodoCompleteDto,
      );

      try {
        await this.triggerWebHookWorkflow(
          name,
          updateTodoCompleteDto.isCompleted,
        );
      } catch (e) {
        console.log({ e });
      }

      if (updateTodoCompleteDto.isCompleted) {
        await this.taskService.updateIsComplete(todoToUpdate.id);
      }
      return updated;
    }
    return todoToUpdate;
  }

  async findOne(id: number): Promise<Todo> {
    const task = await this.todoRepository.find({
      where: { id },
      relations: { tasks: true },
    });
    return task[0];
  }

  async create(todo: TodoDto): Promise<Todo> {
    let newTodo: Todo = new Todo();
    Object.assign(newTodo, todo);
    return this.todoRepository.save(todo);
  }

  async update(id: number, todo: UpdateTodoDto): Promise<Todo> {
    await this.todoRepository.update(id, todo);
    return this.todoRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
