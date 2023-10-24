import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { HEADER_MODE, HeaderModeType, HeaderTitleType } from "@type/common.tsx";

interface CommonState {
  headerOpen: boolean;
  headerMode: HeaderModeType;
  guestMode: boolean;
  headerTitle: HeaderTitleType;
  bottomDrawerOpen: boolean;
  bottomDrawerTabMenu: number;
  isAuthenticated: boolean;
}

const initialState: CommonState = {
  headerOpen: true,
  headerMode: HEADER_MODE.home,
  guestMode: false,
  headerTitle: "",
  bottomDrawerOpen: true,
  bottomDrawerTabMenu: 0,
  isAuthenticated: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setHeaderOpenTrue: (
      state,
      action: PayloadAction<HeaderModeType | undefined>
    ) => {
      const mode = action.payload;
      if (mode !== undefined) {
        state.headerMode = mode;
      }
      state.headerOpen = true;
    },
    setHeaderOpenFalse: (state) => {
      state.headerOpen = false;
    },
    setGuestModeTrue: (state) => {
      state.guestMode = true;
    },
    setGuestModeFalse: (state) => {
      state.guestMode = false;
    },
    changeHeaderTitle: (state, action: PayloadAction<HeaderTitleType>) => {
      state.headerTitle = action.payload;
    },
    setBottomDrawerOpenTrue: (state) => {
      state.bottomDrawerOpen = true;
    },
    setBottomDrawerOpenFalse: (state) => {
      state.bottomDrawerOpen = false;
    },
    setBottomDrawerTabMenu: (state, action) => {
      state.bottomDrawerTabMenu = action.payload;
    },
    // 간편 인증 페이지 on/off
    setIsAuthenticatedTrue: (state) => {
      state.isAuthenticated = true;
    },
    setIsAuthenticatedFalse: (state) => {
      state.isAuthenticated = false;
    },
  },
});
export const {
  setHeaderOpenTrue,
  setHeaderOpenFalse,
  setGuestModeTrue,
  setGuestModeFalse,
  changeHeaderTitle,
  setBottomDrawerOpenTrue,
  setBottomDrawerOpenFalse,
  setBottomDrawerTabMenu,
  setIsAuthenticatedTrue,
  setIsAuthenticatedFalse,
} = commonSlice.actions;

export const selectHeaderOpen = (state: RootState) => state.common.headerOpen;
export const selectHeaderMode = (state: RootState) => state.common.headerMode;
export const selectGuestMode = (state: RootState) => state.common.guestMode;
export const selectHeaderTitle = (state: RootState) => state.common.headerTitle;
export const selectBottomDrawerOpen = (state: RootState) =>
  state.common.bottomDrawerOpen;
export const selectBottomDrawerTabMenu = (state: RootState) =>
  state.common.bottomDrawerTabMenu;
export const selectIsAuthenticated = (state: RootState) =>
  state.common.isAuthenticated;

export default commonSlice.reducer;
