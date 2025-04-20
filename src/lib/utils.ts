import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const logo = [
  "/company/adobe.png",
  "/company/amazon.png",
  "/company/facebook.png",
  "/company/hostinger.png",
  "/company/pinterest.png",
  "/company/quora.png",
  "/company/reddit.png",
  "/company/skype.png",
  "/company/spotify.png",
  "/company/telegram.png",
  "/company/tiktok.png",
  "/company/yahoo.png",
];

export const getRandomLogo = () => {
  const random1 = Math.floor(Math.random() * logo.length);
  const random2 = Math.floor(Math.random() * logo.length);
  const random3 = Math.floor(Math.random() * logo.length);
  return [logo[random1], logo[random2], logo[random3]];
};
