import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const preloadAssets = async () => {
  const images = [
    "/assets/image/inner_casino.jpg",
    "/assets/image/casino_lounge.jpg",
    "/assets/image/poker.jpg",
    "/assets/image/red_casino.jpg",
    "/assets/image/poker_light.jpg",
  ];

  const videos = ["/assets/video/poker_video.mp4"];

  const preloadImage = (src: string) =>
    new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });

  const preloadVideo = (src: string) =>
    new Promise<void>((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "auto";
      video.oncanplaythrough = () => resolve();
      video.onerror = reject;
      video.src = src;
    });

  const tasks = [...images.map(preloadImage), ...videos.map(preloadVideo)];

  await Promise.allSettled(tasks);
};

preloadAssets()
  .then(() => {
    document.getElementById("loading")!.style.display = "none";
    document.getElementById("root")!.style.display = "block";

    const root = createRoot(document.getElementById("root")!);
    root.render(<App />);
  })
  .catch(() => {
    document.getElementById("loading")!.style.display = "none";
    document.getElementById("root")!.style.display = "block";

    const root = createRoot(document.getElementById("root")!);
    root.render(<App />);
  });
