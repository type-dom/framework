import { Watcher } from '../watcher/watcher.class';

export class Dep {
  private deps: Watcher[];
  static target?: Watcher;

  constructor() {
    this.deps = [];
  }

  addDep(dep: Watcher) {
    this.deps.push(dep);
  }

  notify() {
    this.deps.forEach(dep => dep.update());
  }
}
