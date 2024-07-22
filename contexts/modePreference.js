import { createContext, useContext } from "react";

const ModePreferenceContext = createContext();

export const useModePreference = () => useContext(ModePreferenceContext);