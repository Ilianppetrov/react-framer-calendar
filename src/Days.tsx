import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isBefore,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";

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

export default function Days({
  selectedDay,
  currentMonth,
  setSelectedDay,
  containerRef,
}: {
  selectedDay: Date;
  currentMonth: string;
  setSelectedDay: (newDate: Date) => void;
  containerRef: any;
}) {
  const prevMonth = usePreviousMonth(new Date(currentMonth));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const direction = prevMonth
    ? isBefore(new Date(currentMonth), prevMonth)
      ? 1
      : -1
    : -1;

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  return (
    <>
      <motion.div
        layoutId={"days"}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        exit={{ opacity: 0 }}
        className="relative"
      >
        <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-700 font-semibold">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <AnimatePresence custom={{ direction }} initial={false}>
          <motion.div
            ref={containerRef}
            key={currentMonth}
            variants={variants}
            initial={"enter"}
            animate="stale"
            exit="exit"
            transition={{
              duration: 0.7,
            }}
            custom={{ direction }}
            className="grid grid-cols-7 mt-2 text-sm absolute w-full"
          >
            {days.map((day, dayIdx) => (
              <div
                key={day.toString()}
                className={classNames(
                  dayIdx === 0 && colStartClasses[getDay(day)],
                  "py-1.5"
                )}
              >
                <button
                  type="button"
                  onClick={() => {
                    console.log("day", new Date(day));

                    setSelectedDay(day);
                  }}
                  className={classNames(
                    isEqual(day, selectedDay) && "text-white",
                    !isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "text-red-500",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-900",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-400",
                    isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
                    isEqual(day, selectedDay) && !isToday(day) && "bg-gray-900",
                    !isEqual(day, selectedDay) && "hover:bg-gray-200",
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      "font-semibold",
                    "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </button>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </>
  );
}

const variants = {
  enter: ({ direction }: { direction: number }) => ({
    x: `${direction * 100}%`,
  }),
  stale: { x: 0 },
  exit: ({ direction }: { direction: number }) => ({
    x: `${-direction * 100}%`,
  }),
};

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
