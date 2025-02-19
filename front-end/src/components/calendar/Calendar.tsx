import { ptBR } from "react-day-picker/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./Calendar.css"

interface CalendarComponentProps {
  markedDates?: Date[];
}

export default function CalendarComponent({
  markedDates = [],
}: CalendarComponentProps) {
  return (
    <DayPicker
      locale={ptBR}
      mode="single"
      modifiers={{ marked: markedDates }}
      modifiersClassNames={{
        marked: "bg-yellow-400 text-black font-semibold rounded-lg",
      }}
    />
  );
}
