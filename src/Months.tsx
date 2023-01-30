import { format, parse, startOfYear } from "date-fns";
import { eachMonthOfInterval, endOfYear } from "date-fns/esm";
import { motion } from "framer-motion";

interface Months {
  currentMonth: string;
  selectMonth: (newMonth: Date) => void;
  containerRef: any;
}

export default function Months({
  currentMonth,
  selectMonth,
  containerRef,
}: Months) {
  const currentMonthDate = parse(currentMonth, "MMM-yyyy", new Date());

  const months = eachMonthOfInterval({
    start: startOfYear(currentMonthDate),
    end: endOfYear(currentMonthDate),
  });

  console.log("months", months);

  return (
    <motion.div
      layoutId={"months"}
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
      {months.map((month) => {
        return (
          <div className="p-2 text-center  ">
            <motion.div
              initial={{
                backgroundColor: "white",
              }}
              onClick={() => {
                selectMonth(month);
              }}
              whileHover={{
                backgroundColor: "lightblue",
              }}
              className="rounded-3xl cursor-pointer p-2 text-lg"
            >
              {format(month, "MMM")}
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}
