import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  getQuarter,
  isBefore,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  secondsInDay,
  startOfDay,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { bg } from "date-fns/locale";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import Days from "./Days";
import Months from "./Months";
import Years from "./Years";
import { endOfQuarter } from "date-fns/esm";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

function usePreviousMonth(date: Date) {
  const [tuple, setTuple] = useState([null, date]);

  if (tuple[1] && !isSameMonth(tuple[1], date)) {
    setTuple([tuple[1], date]);
  }

  return tuple[0];
}

type mode = "date" | "month" | "year";

interface Calendar {
  date: Date;
  onChange: (newDate: Date) => void;
}

export default function Calendar({ date, onChange }: Calendar) {
  const today = startOfDay(date);
  //   const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const prevMonth = usePreviousMonth(new Date(currentMonth));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const [mode, setMode] = useState<mode>("date");
  const [ref, { height }] = useMeasure();

  console.log(endOfQuarter(today));

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function previousMonth() {
    const firstDayPrevMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPrevMonth, "MMM-yyyy"));
  }

  function selectMonth(newMonth: Date) {
    setCurrentMonth(format(newMonth, "MMM-yyyy"));
    setMode("date");
  }

  function nextDecade() {
    const firstDayNextDecade = add(firstDayCurrentMonth, { years: 10 });
    setCurrentMonth(format(firstDayNextDecade, "MMM-yyyy"));
  }

  function previousDecade() {
    const firstDayNextDecade = add(firstDayCurrentMonth, { years: -10 });
    setCurrentMonth(format(firstDayNextDecade, "MMM-yyyy"));
  }

  function selectYear(newDate: Date) {
    setCurrentMonth(format(newDate, "MMM-yyyy"));
    setMode("month");
  }
  const containerMargin = mode === "date" ? 40 : 0;
  return (
    <motion.div className="p-4 rounded-lg md:min-w-[420px] md:max-w-4xl shadow-lg bg-white overflow-hidden ">
      <div className="flex items-center">
        <h2
          className="flex-auto font-semibold text-gray-900 cursor-pointer"
          onClick={() => {
            setMode("year");
          }}
        >
          {format(firstDayCurrentMonth, "MMMM yyyy", {
            locale: bg,
          })}
        </h2>
        {mode !== "month" && (
          <button
            type="button"
            onClick={() => {
              switch (mode) {
                case "date":
                  previousMonth();
                  break;
                case "year":
                  previousDecade();
                  break;

                default:
                  break;
              }
            }}
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Previous month</span>
            left
            {/* <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" /> */}
          </button>
        )}
        {mode !== "month" && (
          <button
            type="button"
            onClick={() => {
              switch (mode) {
                case "date":
                  nextMonth();
                  break;
                case "year":
                  nextDecade();
                  break;

                default:
                  break;
              }
            }}
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Next month</span>
            right
            {/* <ChevronRightIcon className="w-5 h-5" aria-hidden="true" /> */}
          </button>
        )}
      </div>
      <motion.div
        animate={{ height: height + containerMargin }}
        className="relative"
      >
        <AnimatePresence mode="wait">
          {mode === "year" && (
            <Years
              containerRef={ref}
              currentMonth={currentMonth}
              selectYear={selectYear}
            />
          )}
          {mode === "month" && (
            <Months
              containerRef={ref}
              currentMonth={currentMonth}
              selectMonth={selectMonth}
            />
          )}
          {mode === "date" && (
            <Days
              containerRef={ref}
              selectedDay={today}
              currentMonth={currentMonth}
              setSelectedDay={onChange}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
