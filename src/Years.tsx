import { format, parse, startOfDecade, startOfYear } from "date-fns";
import {
  eachMonthOfInterval,
  eachYearOfInterval,
  endOfDecade,
  endOfYear,
} from "date-fns/esm";
import { motion } from "framer-motion";

interface Years {
  currentMonth: string;
  selectYear: (newMonth: Date) => void;
  containerRef: any;
}

export default function Years({
  currentMonth,
  selectYear,
  containerRef,
}: Years) {
  const currentMonthDate = parse(currentMonth, "MMM-yyyy", new Date());

  const years = eachYearOfInterval({
    start: startOfDecade(currentMonthDate),
    end: endOfDecade(currentMonthDate),
  });

  return (
    <motion.div
      layoutId={"years"}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 2,
      }}
      ref={containerRef}
      className="grid grid-cols-4"
    >
      {years.map((year) => {
        return (
          <div className="p-2 text-center  ">
            <motion.div
              initial={{
                backgroundColor: "white",
              }}
              onClick={() => {
                selectYear(year);
              }}
              whileHover={{
                backgroundColor: "lightblue",
              }}
              className="rounded-3xl cursor-pointer p-2 text-lg"
            >
              {format(year, "yyyy")}
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}
