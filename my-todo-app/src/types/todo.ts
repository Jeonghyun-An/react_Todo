export interface Todo {
    id: number;
    title: string;
    text?:string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    dueDate?: string; 
    priority?: 'low' | 'medium' | 'high'; 
}