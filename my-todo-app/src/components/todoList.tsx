import type { Todo } from "../types/todo";
import TodoItem from "./todoItem";

interface TodoListProps {
    todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
    if (todos.length === 0) {
        return <div className="text-gray-500">No todos available</div>;
    }
    return (
        <ul className="space-y-4">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
}
