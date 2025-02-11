import { Box, Button, Stack, Typography } from "@mui/material";
import GuestMode from "./GuestMode.tsx";
import ScheduleFilterData from "./ScheduleFilterData.tsx";
import { useAppSelector } from "@redux/hooks.ts";
import ScheduleData from "@pages/MyPage/ScheduleData.tsx";
import UserData from "@pages/MyPage/UserData.tsx";
import { selectGuestMode } from "@redux/slices/commonSlice.tsx";
import SchedulesData from "@pages/MyPage/SchedulesData.tsx";
import GuestDataManager from "pages/MyPage/GuestDataManager";
import { useAuth } from "@app/tanstack-query/useAuth.ts";
import { getCookie } from "@utils/storage.ts";
import { COOKIE_KEY_REFRESH_TOKEN } from "@api/keys.ts";

function MyPage() {
  const guestMode = useAppSelector(selectGuestMode);
  const refreshToken = getCookie(COOKIE_KEY_REFRESH_TOKEN);
  const { signOut } = useAuth();

  const userLogOut = () => {
    if (
      confirm(
        "게스트 계정은 로그아웃 하는 경우 지금까지 작업한 내용이 저장되지 않습니다. 중요한 자료는 미리 백업해주세요. (확인 시 모든 정보 날라감)"
      )
    ) {
      signOut();
    }
  };

  return (
    <>
      {!refreshToken ? (
        <div>로그인이 되어있지 않습니다.</div>
      ) : (
        <Box>
          {guestMode ? (
            <GuestDataManager />
          ) : (
            <Stack spacing={2} m={2} border={1} p={2}>
              <Typography>
                현재 작업한 내용은 모두 서버에 저장중입니다.
              </Typography>
            </Stack>
          )}
          <Box m={2}>
            <Button
              variant="contained"
              color="error"
              onClick={() => userLogOut()}
            >
              로그아웃
            </Button>
          </Box>

          <GuestMode />
          <UserData />
          <ScheduleData />
          <SchedulesData />
          <ScheduleFilterData />
        </Box>
      )}
    </>
  );
}

export default MyPage;
