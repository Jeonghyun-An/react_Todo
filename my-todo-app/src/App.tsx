import { useState, useEffect } from "react";
import type { Todo } from "./types/todo";
import TodoList from "./components/todoList";

const STORAGE_KEY = "my_todo_app_todos";

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState<"low" | "medium" | "high">("low");

    useEffect(() => {
        const storedTodos = localStorage.getItem(STORAGE_KEY);
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (!title.trim()) return;

        const now = new Date().toISOString();
        const newTodo: Todo = {
            id: Date.now(),
            title,
            text,
            completed: false,
            createdAt: now,
            updatedAt: now,
            dueDate: dueDate || undefined,
            priority: priority,
        };

        setTodos((prev) => [...prev, newTodo]);
        setTitle("");
        setText("");
        setDueDate("");
        setPriority("low");
    };
    return (
        <div className="h-screen bg-slate-50">
            <div className="h-full max-w-2xl mx-auto p-4 flex flex-col">
                <h1 className="text-2xl font-bold mb-4">My Todo App</h1>
                <div className="flex flex-col gap-2 mb-6">
                    <input
                        className="border  p-2 rounded focus:outline-none focus:ring-slate-400 focus:ring-1 focus:border-slate-400 hover:border-slate-300"
                        placeholder="할 일"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="border p-2 rounded resize-none focus:outline-none focus:ring-slate-400 focus:ring-1 focus:border-slate-400 hover:border-slate-300"
                        placeholder="Description (Optional)"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div className="flex gap-16">
                        <div className="flex-1 flex items-center gap-6">
                            <p className="text-slate-700 whitespace-nowrap w-12">
                                마감일
                            </p>
                            <input
                                type="date"
                                className="w-full border p-2 rounded focus:outline-none focus:ring-slate-400 focus:ring-1 focus:border-slate-400 hover:border-slate-300"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                        <div className="flex-1 flex items-center gap-6">
                            <p className="text-slate-700 whitespace-nowrap w-12 ">
                                중요도
                            </p>
                            <select
                                className="w-full border p-2 rounded focus:outline-none focus:ring-slate-400 focus:ring-1 focus:border-slate-400 hover:border-slate-300 hover:cursor-pointer"
                                value={priority}
                                onChange={(e) =>
                                    setPriority(
                                        e.target.value as
                                            | "low"
                                            | "medium"
                                            | "high"
                                    )
                                }
                            >
                                <option value="low">낮음</option>
                                <option value="medium">중간</option>
                                <option value="high">높음</option>
                            </select>
                        </div>
                    </div>

                    <button
                        className=" bg-slate-700 text-white p-4 rounded-lg hover:bg-slate-600"
                        onClick={addTodo}
                    >
                        추가하기
                    </button>
                </div>
                <div
                    className="flex-1 overflow-y-auto ml-4"
                    style={{ scrollbarGutter: "stable" }}
                >
                    <TodoList
                        todos={todos.filter((todo) => !todo.completed)}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                    {todos.some((todo) => todo.completed) && (
                        <>
                            <hr className="my-8" />
                            <h2 className="text-lg font-semibold text-slate-700 mb-2">
                                완료된 작업
                            </h2>
                            <TodoList
                                todos={todos.filter((todo) => todo.completed)}
                                onToggle={toggleTodo}
                                onDelete={deleteTodo}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    function toggleTodo(id: number) {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? {
                          ...todo,
                          completed: !todo.completed,
                          updatedAt: new Date().toISOString(),
                      }
                    : todo
            )
        );
    }

    function deleteTodo(id: number) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
}

export default App;
