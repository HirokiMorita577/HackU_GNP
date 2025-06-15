import { atom } from 'jotai';

export const userIdAtom = atom<string | null>(null);
export const displayNameAtom = atom<string | null>(null);
export const groupIdAtom = atom<string | null>(null);
export const profilePictureUrlAtom = atom<string | null>(null);