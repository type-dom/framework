import { activeEffect, EffectScope } from './effect-scope';

export class Dep {
  private subs: Set<EffectScope> = new Set();

  depend() {
    if (activeEffect) {
      this.subs.add(activeEffect);
    }
  }

  notify() {
    this.subs.forEach(effect => effect.run());
  }
}
