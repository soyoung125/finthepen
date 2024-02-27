import { useState } from "react";
import { useDatePicker } from "@hooks/date-picker/hooks/useDatePicker.tsx";
import { useUser } from "@app/tanstack-query/useUser.ts";
import { useReports } from "@app/tanstack-query/reports/useReports.ts";
import moment from "moment";
import { useSetGoal } from "@app/tanstack-query/reports/useSetGoal.ts";

const useReport = () => {
  const [yearMonth, setYearMonth] = useState("2024-02");
  const [year, month] = yearMonth.split("-").map((s) => Number(s));
  const { data: user } = useUser();
  const {
    data: report,
    isPending,
    isError,
  } = useReports({
    user_id: user?.user_id ?? "",
    date: `${yearMonth}-${moment().date()}`,
  });
  const { openMonthPicker } = useDatePicker();
  const { setGoal } = useSetGoal();

  // const maxPercent = Math.max(
  //   ...(reportList?.map((l) => Number(l.rate)) ?? [])
  // );

  const addMonth = () => {
    const date = moment(yearMonth, "YYYY-MM");
    setYearMonth(date.add(1, "month").format("YYYY-MM"));
  };

  const subtractMonth = () => {
    const date = moment(yearMonth, "YYYY-MM");
    setYearMonth(date.subtract(1, "month").format("YYYY-MM"));
  };

  const pickMonth = async () => {
    const newMonth = await openMonthPicker(yearMonth);
    setYearMonth(newMonth.format("YYYY-MM"));
  };

  const setExpenditureGoal = (amount: number) => {
    if (user) {
      setGoal({
        user_id: user.user_id,
        date: yearMonth,
        expenditure_amount: amount.toString(),
      });
    }
  };

  return {
    yearMonth,
    year,
    month,
    report,
    isPending,
    isError,
    openMonthPicker,
    // maxPercent,
    addMonth,
    subtractMonth,
    pickMonth,
    setExpenditureGoal,
  };
};

export default useReport;
