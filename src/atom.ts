import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface ParcedList {
  name: string;
  id: number;
}
export interface CorrectedList {
  name: string;
  id: number;
  br: string;
}

export const Parsed = atom<ParcedList[]>({
  key: "Parsed",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const Corrected = atom<CorrectedList[]>({
  key: "Corrected",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const base64Image = atom<string>({
  key: "base64Image",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const brb = atom<string>({
  key: "brb",
  default: "1.0",
  effects_UNSTABLE: [persistAtom],
});

export const dialogue = atom<boolean>({
  key: "dialog",
  default: false,
});
