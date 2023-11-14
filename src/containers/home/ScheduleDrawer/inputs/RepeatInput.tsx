import {
  // eslint-disable-next-line max-len
  Box,
  Collapse,
  Stack,
  RadioGroup,
  Radio,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectSchedule } from "../../../../app/redux/slices/scheduleSlice";
import { updateRepeat } from "../domain/schedule";
import { useAppDispatch } from "../../../../app/redux/hooks";
import SwitchButton from "@components/common/SwitchButton";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

function RepeatInput() {
  const dispatch = useAppDispatch();
  const schedule = useSelector(selectSchedule);

  const [openDatePickerModal, setOpenDatePickerModal] = useState(false);

  const changeRepeat = (state: { target: { value: string; name: string } }) => {
    console.log(state);
    updateRepeat(dispatch, schedule, setOpenDatePickerModal, state);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Box sx={{ color: "primary.main" }}>반복</Box>
        <SwitchButton
          checked={schedule?.repeat !== "None"}
          handleChange={() =>
            changeRepeat({
              target: {
                value: schedule?.repeat === "None" ? "" : "None",
                name: "repeat",
              },
            })
          }
        />
      </Stack>
      <Collapse in={schedule?.repeat !== "None"}>
        <RadioGroup
          value={schedule?.repeat}
          onChange={(e) =>
            changeRepeat({
              target: {
                value: e.target.value,
                name: "repeat",
              },
            })
          }
        >
          <FormControlLabel
            value="AllDay"
            control={
              <Radio
                icon={<CheckCircleOutlineRoundedIcon />}
                checkedIcon={<CheckCircleRoundedIcon />}
              />
            }
            label="매일"
          />
          <FormControlLabel
            value="Week"
            control={
              <Radio
                icon={<CheckCircleOutlineRoundedIcon />}
                checkedIcon={<CheckCircleRoundedIcon />}
              />
            }
            label="매주"
          />
          <FormControlLabel
            value="Month"
            control={
              <Radio
                icon={<CheckCircleOutlineRoundedIcon />}
                checkedIcon={<CheckCircleRoundedIcon />}
              />
            }
            label="매달"
          />
        </RadioGroup>
      </Collapse>
    </>
  );
}

export default RepeatInput;
