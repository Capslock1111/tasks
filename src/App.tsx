import { motion } from "motion/react";
import { useGameStore } from "@/store/gameStore";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddTaskDialog } from "./components/ui/AddTaskDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import { DatePicker } from "./components/ui/DatePicker";

function App() {
  const { tasks, totalXP, completeTask, clearTasks, removeTask, toggleTask, achievements } = useGameStore();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // const tasksForDate = tasks.filter((t) => t.date === selectedDate);

  const level = Math.floor(totalXP / 100) + 1;
  const progressXP = totalXP % 100;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-2xl mx-auto p-6">
        {/* Шапка */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-2xl">
              🦸
            </div>
            <div>
              <h1 className="text-2xl font-bold">Уровень {level}</h1>
              <p className="text-slate-400">Иван</p>
            </div>
            <Badge className="ml-auto">{totalXP} XP</Badge>
          </div>

          {/* XP-бар с анимацией */}
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressXP}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            />
          </div>
          <p className="text-sm text-slate-400 mt-2">
            {progressXP} / 100 XP
          </p>
        </header>

        {/* <div className="mb-4">
          <DatePicker value={selectedDate} onChange={setSelectedDate} />
        </div> */}

        {/* Задания */}
        <section>
          <h2 className="text-xl font-bold mb-4">Задания на сегодня</h2>
          <AddTaskDialog selectedDate={selectedDate} />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Очистить все задачи</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Удалить все задачи?</AlertDialogTitle>
                <AlertDialogDescription>
                  Все задачи будут удалены. Это действие нельзя отменить.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={() => clearTasks()}>
                  Удалить
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div className="space-y-3">
            {tasks.map((task) => (
              <Card key={task.id} className="p-4 bg-slate-800 border-slate-700 flex items-center justify-between">
                <div>
                  <p className={task.completed ? "line-through text-slate-500" : "font-medium"}>
                    {task.title}
                  </p>
                  <p className="text-sm text-slate-400">+{task.xp} XP</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(task.date).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant={task.completed ? "secondary" : "default"}
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.completed ? "✓" : "→"}
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="icon" variant="destructive">✕</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Удалить задачу?</AlertDialogTitle>
                        <AlertDialogDescription>
                          «{task.title}» будет удалена. Это действие нельзя отменить.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction onClick={() => removeTask(task.id)}>
                          Удалить
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Достижения */}
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            Достижения</h2>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((ach) => (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={`p-4 text-center transition-all ${ach.unlocked
                    ? "bg-purple-600 border-purple-500"
                    : "bg-slate-800 border-slate-700 opacity-40"
                    }`}
                >
                  <div className="text-3xl mb-2">{ach.icon}</div>
                  <p className="text-sm font-medium">{ach.title}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;

// {
//   "$schema": "https://ui.shadcn.com/schema.json",
//   "style": "base-nova",
//   "rsc": false,
//   "tsx": true,
//   "tailwind": {
//     "config": "",
//     "css": "src/index.css",
//     "baseColor": "neutral",
//     "cssVariables": true,
//     "prefix": ""
//   },
//   "iconLibrary": "lucide",
//   "rtl": false,
//   "aliases": {
//     "components": "@/components",
//     "utils": "@/lib/utils",
//     "ui": "@/components/ui",
//     "lib": "@/lib",
//     "hooks": "@/hooks"
//   },
//   "menuColor": "default",
//   "menuAccent": "subtle",
//   "registries": {}
// }