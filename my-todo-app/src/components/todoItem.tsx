import type { Todo } from "../types/todo";

interface TodoItemProps {
    todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
    const { title, text, completed, dueDate, priority } = todo;

    return (
        <li
            className={`p-4 border rounded shadow-md flex flex-col gap-2 ${
                completed ? "bg-slate-200" : "bg-white"
            }`}
        >
            <div className="flex justify-between items-center mb-1">
                <h2 className="text-lg font-semibold">{title}</h2>
                {priority && (
                    <span
                        className={`text-xs px-2 py-1 rounded ${
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
