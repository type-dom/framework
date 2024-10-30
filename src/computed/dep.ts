import { activeEffect, Effect } from './effect';

export class Dep {
  private subs: Set<Effect> = new Set();

  depend() {
    if (activeEffect) {
      this.subs.add(activeEffect);
    }
  }

  notify() {
    this.subs.forEach(effect => effect.run());
  }
}
