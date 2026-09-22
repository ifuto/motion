import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { AbsoluteFill } from "remotion";
import { PageFurniture } from "./components/PageFurniture";
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
 * MOTION / SKILL EXPLAINER — 1080 × 1920, 60 fps, 3 minutes.
 *
 * Timeline (transitions overlap the scenes, so the total is shorter than the
 * sum of the sequences):
 *
 *   Opening          09.0 s
 *   AboutRepo        16.0 s
 *   SkillStructure   22.0 s
 *   CreateFlow       24.0 s
 *   MarkupFrame      24.0 s
 *   MarkupStyle      24.0 s
 *   LayoutRules      22.0 s
 *   MoreSkills       20.0 s
 *   Closing          21.0 s
 *   -------------------------
 *   10920 frames minus 8 transitions (4 × 14 + 4 × 16 = 120) = 10800 frames
 *   10800 / 60 fps = 180 s = 3 minutes
 */
export const MotionSkillExplainer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#F2F0EB", fontFamily: '"Noto Sans JP", sans-serif' }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={540} name="Opening">
          <Opening />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: 14 })}
        />
        <TransitionSeries.Sequence durationInFrames={960} name="AboutRepo">
          <AboutRepo />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 16 })}
        />
        <TransitionSeries.Sequence durationInFrames={1320} name="SkillStructure">
          <SkillStructure />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: 14 })}
        />
        <TransitionSeries.Sequence durationInFrames={1440} name="CreateFlow">
          <CreateFlow />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 16 })}
        />
        <TransitionSeries.Sequence durationInFrames={1440} name="MarkupFrame">
          <MarkupFrame />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: 14 })}
        />
        <TransitionSeries.Sequence durationInFrames={1440} name="MarkupStyle">
          <MarkupStyle />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 16 })}
        />
        <TransitionSeries.Sequence durationInFrames={1320} name="LayoutRules">
          <LayoutRules />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: 14 })}
        />
        <TransitionSeries.Sequence durationInFrames={1200} name="MoreSkills">
          <MoreSkills />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 16 })}
        />
        <TransitionSeries.Sequence durationInFrames={1260} name="Closing">
          <Closing />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <PageFurniture />
    </AbsoluteFill>
  );
};
