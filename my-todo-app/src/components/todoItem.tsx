import type { Todo } from "../types/todo";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
}

export default function TodoItem({ todo, onToggle }: TodoItemProps) {
    const { title, text, completed, dueDate, priority } = todo;

    return (
        <li
            className={`p-4 border rounded shadow-md flex flex-col gap-2 ${
                completed ? "bg-slate-200" : "bg-white"
            }`}
        >
            <div className="flex justify-between items-start mb-1">
                <div className="flex items-start gap-2">
                    <div className="pt-1">
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={() => onToggle(todo.id)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                    </div>
                    <h2 className="text-lg font-semibold leading-tight">
                        {title}
                    </h2>
                </div>

                {priority && (
                    <span
                        className={` ml-2 mt-1 pt-1 text-xs px-2 py-1 rounded ${
                            priority === "high"
                                ? "bg-red-500 text-white"
                                : priority === "medium"
                                ? "bg-yellow-500 text-white"
                                : "bg-green-500 text-white"
                        }`}
                    >
                        {priority.toUpperCase()}
                    </span>
                )}
            </div>
            {text && <p className="text-sm text-gray-700">{text}</p>}
            {dueDate && <p className="text-xs text-gray-500 mt-1">{dueDate}</p>}
        </li>
    );
}
