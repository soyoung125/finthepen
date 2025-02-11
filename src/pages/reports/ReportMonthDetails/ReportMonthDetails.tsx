import TopNavigationBar from "@components/layouts/common/TopNavigationBar";
import { Button, Stack } from "@mui/material";
import ReportMonthTitle from "@pages/reports/ReportMonthDetails/components/ReportMonthTitle";
import useReport from "@hooks/report/useReport.ts";
import useHeader from "@hooks/useHeader.ts";
import { useNavigate } from "react-router-dom";
import ReportList from "@pages/reports/ReportMonthDetails/components/ReportList";
import { useScheduleDrawer } from "@hooks/useScheduleDrawer.tsx";
import { INIT_SCHEDULE } from "@constants/schedule.ts";
import moment from "moment";
import { PATH } from "@constants/path.ts";
import useBottomBar from "@hooks/useBottomBar.ts";
import useMonth from "@hooks/report/useMonth.ts";

function ReportMonthDetails() {
  useHeader(false);
  useBottomBar(false);
  const navigate = useNavigate();
  const { date, yearMonth, year, month, pickMonth } = useMonth();
  const { isPending, report, reportList, maxPercent } = useReport(date);
  const { openScheduleDrawer } = useScheduleDrawer();

  const handleClickAddSchedule = () => {
    const date = moment(yearMonth, "YYYY-MM");
    openScheduleDrawer(INIT_SCHEDULE(date.format("YYYY-MM-DD")));
  };

  return (
    <>
      <TopNavigationBar
        onClick={() => navigate(-1)}
        title="카테고리 소비 리포트"
      />
      <Stack px="20px" py="24px" gap="24px">
        <ReportMonthTitle
          year={year}
          month={month}
          onClickMonth={pickMonth}
          goal={Number(report?.spend_amount)}
          spent={Number(report?.first_month_amount)}
        />

        <ReportList
          isPending={isPending}
          reportList={reportList}
          maxPercent={maxPercent}
          handleClickAddSchedule={handleClickAddSchedule}
        />
      </Stack>
    </>
  );
}

export default ReportMonthDetails;
