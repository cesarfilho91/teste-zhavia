import { IsString, IsIn, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsNotEmpty({message:'Não pode estar vazio'})
  @IsIn(['pendente', 'em progresso', 'concluido', 'cancelado'])
  status?: string;
}