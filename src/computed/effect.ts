
export class Effect {
  private _fn: Function;
  private _dirty: boolean = true;
  private _value: any;

  constructor(fn: Function) {
    this._fn = fn;
  }

  run() {
    activeEffect = this;
    this._dirty && (this._value = this._fn());
    activeEffect = null;
    return this._value;
  }
}

export let activeEffect: Effect | null = null;
