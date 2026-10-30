import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Task {
    id: number;
    title: string;
    xp: number;
    completed: boolean;
    date: string;
}

interface Achievement {
    id: string;
    title: string;
    icon: string;
    unlocked: boolean;
}

interface GameState {
    tasks: Task[];
    totalXP: number;
    achievements: Achievement[];              // ✅ добавили
    completeTask: (id: number) => void;
    addXP: (amount: number) => void;
    unlockAchievement: (id: string) => void;  // ✅ добавили
    addTask: (title: string, xp: number, date: string) => void;
    removeTask: (id: number) => void;
    toggleTask: (id: number) => void;
    clearTasks: () => void;


}

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            tasks: [],
            totalXP: 0,
            // ✅ Добавили массив достижений
            achievements: [
                { id: "first-xp", title: "Первый шаг", icon: "🌟", unlocked: false },
                { id: "level-2", title: "Уровень 2", icon: "🔥", unlocked: false },
                { id: "streak-7", title: "Неделя силы", icon: "💪", unlocked: false },
            ],

            completeTask: (id) => {
                const task = get().tasks.find((t) => t.id === id);
                if (!task || task.completed) return;

                set((state) => ({
                    tasks: state.tasks.map((t) =>
                        t.id === id ? { ...t, completed: true } : t
                    ),
                    totalXP: state.totalXP + task.xp,
                }));

                // ✅ Проверка достижений после обновления XP
                const newXP = get().totalXP;
                if (newXP >= 10) get().unlockAchievement("first-xp");
                if (newXP >= 100) get().unlockAchievement("level-2");
            },

            addXP: (amount) => set((s) => ({ totalXP: s.totalXP + amount })),
            // ✅ Метод для открытия достижения
            unlockAchievement: (id) =>
                set((state) => ({
                    achievements: state.achievements.map((a) =>
                        a.id === id ? { ...a, unlocked: true } : a
                    ),
                })),
            addTask: (title, xp, date) =>
                set((state) => ({
                    tasks: [
                        ...state.tasks,
                        { id: Date.now(), title, xp, completed: false, date }
                    ],
                })),
            removeTask: (id) =>
                set((state) => ({
                    tasks: state.tasks.filter((t) => t.id !== id),
                })),
            toggleTask: (id) => {
                const task = get().tasks.find((t) => t.id === id);
                if (!task) return;

                const newCompleted = !task.completed;

                set((state) => ({
                    tasks: state.tasks.map((t) =>
                        t.id === id ? { ...t, completed: newCompleted } : t
                    ),
                    totalXP: newCompleted
                        ? state.totalXP + task.xp
                        : Math.max(0, state.totalXP - task.xp),
                }));
                const newXP = get().totalXP;
                if (newXP >= 10) get().unlockAchievement('first-xp');
                if (newXP >= 100) get().unlockAchievement('level-2');
            },
            clearTasks: () =>
                set((state) => ({
                    tasks: [],
                })),
        }),
        { name: "levelup-storage" }
    )
);