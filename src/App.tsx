import { useState } from "react";
import Calendar from "./Calendar";

export default function App() {
  const [date, setDate] = useState(new Date());
  return (
    <div className=" bg-purple-200 h-full flex flex-col gap-4 items-center justify-center">
      <Calendar date={date} onChange={setDate} />
      {date.toString()}
    </div>
  );
}
