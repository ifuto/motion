import "@fontsource/noto-sans-jp/japanese-400.css";
import "@fontsource/noto-sans-jp/japanese-500.css";
import "@fontsource/noto-sans-jp/japanese-700.css";
import "@fontsource/noto-sans-jp/japanese-900.css";
import "@fontsource/noto-sans-jp/latin-400.css";
import "@fontsource/noto-sans-jp/latin-500.css";
import "@fontsource/noto-sans-jp/latin-700.css";
import "@fontsource/noto-sans-jp/latin-900.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "./index.css";

import { continueRender, delayRender } from "remotion";
import { MyComposition } from "./Composition";

// Wait for webfonts before rendering any frame.
const fontHandle = delayRender("load-fonts");
Promise.all([
  document.fonts.load('400 48px "Noto Sans JP"'),
  document.fonts.load('500 48px "Noto Sans JP"'),
  document.fonts.load('700 48px "Noto Sans JP"'),
  document.fonts.load('900 96px "Noto Sans JP"'),
  document.fonts.load('400 40px "JetBrains Mono"'),
  document.fonts.load('700 40px "JetBrains Mono"'),
])
  .then(() => continueRender(fontHandle))
  .catch(() => continueRender(fontHandle));

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
    </>
  );
};
