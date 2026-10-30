import { Button } from "@/components/ui/button";

interface DatePickerProps {
    value: string;
    onChange: (date: string) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
    const today = new Date().toISOString().split("T")[0];

    const shift = (days: number) => {
        const d = new Date(value);
        d.setDate(d.getDate() + days);
        onChange(d.toISOString().split("T")[0]);
    };

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
        });
    };

    return (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => shift(-1)}>
                ←
            </Button>
            <span className="text-sm font-medium min-w-[120px] text-center">
                {formatDate(value)}
            </span>
            <Button variant="outline" size="sm" onClick={() => shift(1)}>
                →
            </Button>
            <Button variant="outline" size="sm" onClick={() => onChange(today)}>
                Сегодня
            </Button>
        </div>
    );
}