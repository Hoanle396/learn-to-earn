import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Storage } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocalStore(key: Storage) {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;
  if (!isLocalStorageAvailable) {
    return;
  }
  return localStorage.getItem(key);
}

export function setLocalStore(key: Storage, value: string) {
  try {
    const isLocalStorageAvailable =
      typeof window !== "undefined" && window.localStorage;
    if (!isLocalStorageAvailable) {
      return;
    }
    return localStorage.setItem(key, value);
  } catch (error) {
    throw new Error("Can't set local store");
  }
}

export function removeLocalStore(key: Storage) {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;
  if (!isLocalStorageAvailable) {
    return;
  }
  return localStorage.removeItem(key);
}


export const cutString = (str: string, length: number) => {
  if (str.length > length) {
    return str.slice(0, length) + '...' + str.slice(-length, str.length);
  }
  return str;
}
