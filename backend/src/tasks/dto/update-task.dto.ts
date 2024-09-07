import { IsString, IsIn, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['pendente', 'em progresso', 'concluido', 'cancelado'])
  status?: string;
}