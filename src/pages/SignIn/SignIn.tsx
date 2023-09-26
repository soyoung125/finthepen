import { Stack } from "@mui/material";
import CenterBox from "../../components/layouts/CenterBox";
import Header from "./Header.tsx";
import SignInFields from "./SignInFields.tsx";
import Footer from "./Footer.tsx";
import useHeader from "../../hooks/useHeader";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/user.ts";
import { bottomTabMenuRepository } from "@app/recoil/bottomTabMenu.ts";
import { useEffect } from "react";

function SignIn() {
  const { openBottomBar, closeBottomBar } = useRecoilValue(bottomTabMenuRepository);
  const user = useRecoilValue(userState);
  
  // useHeader(false);
  
  useEffect(() => {
    closeBottomBar();
    return (() => openBottomBar());
  }, [])

  return (
    <CenterBox>
      <Stack justifyContent="center" alignItems="center" px={1}>
        {user === undefined ? (
          <>
            <Header />
            <SignInFields />
          </>
        ) : (
          <div>이미 로그인이 되어있습니다.</div>
        )}
        <Footer />
      </Stack>
    </CenterBox>
  );
}
export default SignIn;
