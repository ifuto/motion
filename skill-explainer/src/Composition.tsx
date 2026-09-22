import { AbsoluteFill, Composition, Sequence } from "remotion";
import { Background } from "./components/Background";
import { Scene } from "./components/Scene";
import { COLORS, FONT } from "./theme";
import { Opening } from "./scenes/Opening";
import { AboutRepo } from "./scenes/AboutRepo";
import { SkillStructure } from "./scenes/SkillStructure";
import { CreateFlow } from "./scenes/CreateFlow";
import { MarkupFrame } from "./scenes/MarkupFrame";
import { MarkupStyle } from "./scenes/MarkupStyle";
import { LayoutRules } from "./scenes/LayoutRules";
import { MoreSkills } from "./scenes/MoreSkills";
import { Closing } from "./scenes/Closing";

/**
 * Scene timeline (60 fps, 1080×1920, total 10800 frames = 3 minutes).
 *
 *    0 –  480  Opening             (8s)
 *  480 – 1440  About the repo      (16s)
 * 1440 – 2760  Skill structure     (22s)
 * 2760 – 4200  Create flow         (24s)
 * 4200 – 5640  Markup: frames      (24s)
 * 5640 – 7080  Markup: timing      (24s)
 * 7080 – 8400  Layout rules        (22s)
 * 8400 – 9600  More skills         (20s)
 * 9600 – 10800 Closing             (20s)
 */
const SCENES = [
  { from: 0, duration: 480, Component: Opening },
  { from: 480, duration: 960, Component: AboutRepo },
  { from: 1440, duration: 1320, Component: SkillStructure },
  { from: 2760, duration: 1440, Component: CreateFlow },
  { from: 4200, duration: 1440, Component: MarkupFrame },
  { from: 5640, duration: 1440, Component: MarkupStyle },
  { from: 7080, duration: 1320, Component: LayoutRules },
  { from: 8400, duration: 1200, Component: MoreSkills },
  { from: 9600, duration: 1200, Component: Closing },
] as const;

const TOTAL_DURATION = 10800;

const MotionSkillExplainer: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily: FONT,
        color: COLORS.ink,
      }}
    >
      <Background />
      {SCENES.map(({ from, duration, Component }) => (
        <Sequence key={from} from={from} durationInFrames={duration}>
          <Scene duration={duration}>
            <Component />
          </Scene>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const MyComposition: React.FC = () => {
  return (
    <Composition
      id="MotionSkillExplainer"
      component={MotionSkillExplainer}
      durationInFrames={TOTAL_DURATION}
      fps={60}
      width={1080}
      height={1920}
    />
  );
};
