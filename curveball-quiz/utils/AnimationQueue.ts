// utils/AnimationQueue.ts

import { QuestionDifficulty, BaseType } from '../types';

export interface AnimationStep {
  id: string;
  fromBase: BaseType | 'home';
  toBase: BaseType | 'home';
  isScoring: boolean;
}

export class AnimationQueue {
  private steps: AnimationStep[] = [];
  private currentStepIndex: number = 0;
  private onStepStart: (step: AnimationStep) => void;
  private onComplete: () => void;

  constructor(
    onStepStart: (step: AnimationStep) => void,
    onComplete: () => void
  ) {
    this.onStepStart = onStepStart;
    this.onComplete = onComplete;
  }

  addSteps(steps: AnimationStep[]) {
    this.steps = steps;
    this.currentStepIndex = 0;
  }

  start() {
    if (this.steps.length > 0) {
      this.onStepStart(this.steps[this.currentStepIndex]);
    } else {
      this.onComplete();
    }
  }

  stepAnimationComplete() {
    this.currentStepIndex++;
    if (this.currentStepIndex < this.steps.length) {
      this.onStepStart(this.steps[this.currentStepIndex]);
    } else {
      this.onComplete();
    }
  }

  clear() {
    this.steps = [];
    this.currentStepIndex = 0;
  }
}

interface RunnerState {
  id: string;
  currentBase: BaseType;
}

// Base progression order
const baseOrder: BaseType[] = ['first', 'second', 'third'];

export function createAnimationStepsForPlay(
  runners: RunnerState[],
  hitType: QuestionDifficulty,
  batterId: string
): AnimationStep[] {
  const steps: AnimationStep[] = [];

  // Determine how many bases to advance
  let advanceBy = 1;
  if (hitType === 'Double') advanceBy = 2;
  if (hitType === 'Triple') advanceBy = 3;
  if (hitType === 'Homerun') advanceBy = 4;

  // Move existing runners
  runners.forEach(runner => {
    const currentIndex = baseOrder.indexOf(runner.currentBase);
    const targetIndex = currentIndex + advanceBy;

    let toBase: BaseType | 'home' = 'home';
    if (targetIndex < baseOrder.length) {
      toBase = baseOrder[targetIndex];
    }

    steps.push({
      id: runner.id,
      fromBase: runner.currentBase,
      toBase,
      isScoring: toBase === 'home'
    });
  });

  // Move the batter
  if (advanceBy < 4) {
    steps.push({
      id: batterId,
      fromBase: 'home',
      toBase: baseOrder[advanceBy - 1],
      isScoring: false
    });
  } else {
    steps.push({
      id: batterId,
      fromBase: 'home',
      toBase: 'home',
      isScoring: true
    });
  }

  return steps;
}
