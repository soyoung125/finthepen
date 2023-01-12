/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import {
  Box, Button, Stack, Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PATH from '../../utils/constants/path';
import { logOut, selectUser } from '../../utils/redux/user/userSlice';
// import SignInContainer from '../sign/SignInContainer';

function MyPageContainer() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogOut = () => {
    if (confirm('게스트 계정은 로그아웃 하는 경우 지금까지 작업한 내용이 저장되지 않습니다. 중요한 자료는 미리 백업해주세요. (확인 시 모든 정보 날라감)')) {
      dispatch(logOut());
      // 로그아웃 하면서 추가로 해제해야 할 행동을 여기에서 해줘야 함
    }
  };
  useEffect(() => {
    // 로그인 안된 계정은 로그인 페이지로 강제연결
    if (user === null) {
      navigate(PATH.signIn);
    }
  }, [user]);
  return (
    <Box>
      <Typography>다음 계정으로 로그인 되어있습니다.</Typography>
      <Typography>
        {JSON.stringify(user)}
      </Typography>
      <Stack spacing={2} m={2} border={1} p={2}>
        <Typography variant="h5">게스트 계정 전용 메뉴 (준비중)</Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => alert('준비 중인 메뉴')}
        >
          세이브 데이터 복구하기
        </Button>

        <Button
          variant="contained"
          color="info"
          onClick={() => alert('준비 중인 메뉴')}
        >
          지금까지 작업한 데이터 백업
        </Button>

      </Stack>
      <Box m={2}>
        <Button
          variant="contained"
          color="error"
          onClick={() => userLogOut()}
        >
          로그아웃
        </Button>
      </Box>

    </Box>
  );
}
export default MyPageContainer;
