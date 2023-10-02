import { Box, Stack } from "@mui/material";
import { useEffect } from "react";
import {
  setGuestModeFalse,
  setGuestModeTrue,
} from "../../../../app/redux/slices/commonSlice";
import AnalysisMode from "./headerMode/AnalysisMode";
import HomeMode from "./headerMode/HomeMode";
import { useAppDispatch, useAppSelector } from "../../../../app/redux/hooks";
import { selectSavingPopUpSetting } from "../../../../app/redux/slices/assetSlice";
import PopupButton from "./buttons/PopupButton";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../constants/path";
import SettingsMode from "./headerMode/SettingsMode";
import { useRecoilValue } from "recoil";
import { headerModeState, headerOpenState } from "@recoil/header.ts";
import { userState } from "@recoil/user.ts";
import SignMode from "./headerMode/SignMode";
import SearchMode from "./headerMode/SearchMode";
import AssetMode from "./headerMode/AssetMode";

function TopBar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useRecoilValue(userState);
  const isHeaderOpen = useRecoilValue(headerOpenState);
  const headerMode = useRecoilValue(headerModeState);
  const popupSetting = useAppSelector(selectSavingPopUpSetting);

  useEffect(() => {
    // 옵셔널 체이닝 사용하면 eslint에서 오류 발생
    if (user && user.name === "guest by msw") {
      console.warn(
        "게스트 모드로 동작합니다. 게스트 모드에서는 데이터가 저장되지 않습니다."
      );
      dispatch(setGuestModeTrue());
    } else {
      dispatch(setGuestModeFalse());
    }
  }, [user]);

  const handleClickPopup = () => {
    console.log(2);
    if (popupSetting.settings.connect === "적금 계좌 APP") {
      console.log("계좌 열기");
    } else {
      navigate(PATH.savingsGoal);
    }
  };

  return (
    <Box sx={{ position: "relative", height: 70, zIndex: 1000 }}>
      {isHeaderOpen && (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
            sx={{ height: 70, paddingX: '12px' }}
          >
            {headerMode === "home" && <HomeMode />}
            {headerMode === "analysis" && <AnalysisMode />}
            {headerMode === "settings" && <SettingsMode />}
            {headerMode === "sign" && <SignMode />}
            {headerMode === "search" && <SearchMode />}
            {headerMode === "assetManagement" && <AssetMode />}
          </Stack>
          {popupSetting.isOn && (
            <PopupButton handleClickPopup={handleClickPopup} />
          )}
        </>
      )}
    </Box>
  );
}

export default TopBar;
/**
 * 상단 바
 */
