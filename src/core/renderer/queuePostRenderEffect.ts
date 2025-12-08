import { queuePostFlushCb, SchedulerJobs } from '../scheduler';

export const queuePostRenderEffect: (
  fn: SchedulerJobs,
  // suspense: SuspenseBoundary | null,
) => void = //__FEATURE_SUSPENSE__
  // ? __TEST__
  //   ? // vitest can't seem to handle eager circular dependency
  //   (fn: AnyFn | AnyFn[], suspense: SuspenseBoundary | null) =>
  //     queueEffectWithSuspense(fn, suspense)
  //   : queueEffectWithSuspense
  // : queuePostFlushCb
  queuePostFlushCb
