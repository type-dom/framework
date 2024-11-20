import { AnyFn } from '../interface';

export class EffectScope {
  private _fn: AnyFn;
  private _dirty = true;
  private _value: any;

  constructor(fn: AnyFn) {
    this._fn = fn;
  }

  run<T>(fn?: () => T): T | undefined {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    activeEffect = this;
    this._dirty && (this._value = this._fn());
    activeEffect = null;
    return this._value;
  }
}

export let activeEffect: EffectScope | null = null;
