import { Stack, Typography } from "@mui/material";
import LogoCircle from "@components/common/LogoCircle.tsx";

function Header() {
  return (
    <Stack py={3} alignItems="center" spacing={2}>
      <LogoCircle />
      <Stack my={2}>
        <Typography fontSize={22} fontWeight={700}>
          핀터펜 계정 가입
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Header;
