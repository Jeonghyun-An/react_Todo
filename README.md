이건 나의 리액트 첫걸음 프로젝트이다.
React + TypeScript를 이용하여 Todo 앱을 만들었다.
2025.06.30 PM 03:44 시작
export interface Todo {
    id: number;
    title: string;
    text:string;
    completed: boolean;
    createdAt: string;
    updatedAt?: string;
    dueDate?: string; 
    priority?: 'low' | 'medium' | 'high'; 
}
타입 정의는 이렇게 진행한다.
