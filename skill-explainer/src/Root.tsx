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

import { Composition, Folder, continueRender, delayRender } from "remotion";
import { MotionSkillExplainer } from "./Composition";
import { Opening } from "./scenes/Opening";
import { AboutRepo } from "./scenes/AboutRepo";
import { SkillStructure } from "./scenes/SkillStructure";
import { CreateFlow } from "./scenes/CreateFlow";
import { MarkupFrame } from "./scenes/MarkupFrame";
import { MarkupStyle } from "./scenes/MarkupStyle";
import { LayoutRules } from "./scenes/LayoutRules";
import { MoreSkills } from "./scenes/MoreSkills";
import { Closing } from "./scenes/Closing";

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

/**
 * Every scene is registered twice: once on its own (so it can be previewed,
 * trimmed and edited in isolation) and once inside the full film.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="MotionSkillExplainer-Scenes">
        <Composition
          id="Scene01-Opening"
          component={Opening}
          durationInFrames={540}
          fps={60}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene02-AboutRepo"
          component={AboutRepo}
          durationInFrames={960}
          fps={60}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene03-SkillStructure"
          component={SkillStructure}
          durationInFrames={1320}
          fps={60}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene04-CreateFlow"
          component={CreateFlow}
          durationInFrames={1440}
          fps={60}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene05-MarkupFrame"
          component={MarkupFrame}
          durationInFrames={1440}
          fps={60}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene06-MarkupStyle"
          component={MarkupStyle}
          durationInFrames={1440}
          fps={60}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene07-LayoutRules"
          component={LayoutRules}
          durationInFrames={1320}
          fps={60}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene08-MoreSkills"
          component={MoreSkills}
          durationInFrames={1200}
          fps={60}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene09-Closing"
          component={Closing}
          durationInFrames={1260}
          fps={60}
          width={1080}
          height={1920}
        />
      </Folder>
      <Composition
        id="MotionSkillExplainer"
        component={MotionSkillExplainer}
        durationInFrames={10800}
        fps={60}
        width={1080}
        height={1920}
      />
    </>
  );
};

