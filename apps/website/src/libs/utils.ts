import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Storage } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocalStore(key: Storage) {
  return localStorage.getItem(key);
}

export function setLocalStore(key: Storage, value: unknown) {
  try {
    return localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw new Error("Can't set local store")
  }
}

export function removeLocalStore(key: Storage) {
  return localStorage.removeItem(key)
}
