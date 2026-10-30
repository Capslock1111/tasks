import { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "./DatePicker";

interface AddTaskDialogProps {
    selectedDate: string;
}

export function AddTaskDialog({ }: AddTaskDialogProps) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [xp, setXp] = useState(10);
    const addTask = useGameStore((s) => s.addTask);

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim()) return;

        addTask(title.trim(), xp, selectedDate);
        setTitle('');
        setXp(10);
        setOpen(false);
        setSelectedDate(today)
    };

    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const today = new Date().toISOString().split("T")[0];
    //   const tasksForDate = tasks.filter((t) => t.date === selectedDate);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>+ Задача</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Новая задача</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Название задачи"
                        autoFocus
                    />
                    <div>
                        <label className="text-sm text-slate-400 block mb-1">
                            XP за выполнение
                        </label>
                        <Input
                            type="number"
                            value={xp}
                            onChange={(e) => setXp(Number(e.target.value))}
                            min={1}
                            max={100}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm text-slate-400 block mb-1">
                            Дата задачи
                        </label>
                        <DatePicker value={selectedDate} onChange={setSelectedDate} />
                    </div>
                    <Button type="submit" className="w-full" >
                        Добавить
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}