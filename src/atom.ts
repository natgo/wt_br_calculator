import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const Parsed = atom({
  key: "Parsed",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const Corrected = atom({
  key: "Corrected",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const base64Image = atom({
  key: "base64Image",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
