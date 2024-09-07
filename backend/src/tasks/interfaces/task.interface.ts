export interface Task {
  id?: number;
  title: string;
  description: string;
  status: 'pendente' | 'em progresso' | 'concluido' | 'cancelado'; 
  timestamp?: Date;
}
