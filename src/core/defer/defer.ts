export class Defer<T = unknown> {
  private _promise: Promise<T>;
  private _resolve: ((value: T | PromiseLike<T>) => void) | null;
  private _reject: ((reason?: any) => void) | null;

  constructor() {
    this._resolve = null;
    this._reject = null;
    this._promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  resetPromise() {
    this._resolve = null;
    this._reject = null;
    this._promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }
  get promise(): Promise<T> {
    return this._promise;
  }

  resolve(value: T | PromiseLike<T>): void {
    if (this._resolve) {
      this._resolve(value);
      this._resolve = null;
      this._reject = null;
    }
  }

  reject(reason?: any): void {
    if (this._reject) {
      this._reject(reason);
      this._resolve = null;
      this._reject = null;
    }
  }

  // 模拟 then 方法
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): Defer<TResult1 | TResult2> {
    const deferred = new Defer<TResult1 | TResult2>();
    this.promise.then(
      (value) => {
        try {
          const result = onfulfilled ? onfulfilled(value) : value;
          deferred.resolve(result as TResult1 | TResult2);
        } catch (error) {
          deferred.reject(error);
        }
      },
      (reason) => {
        try {
          const result = onrejected ? onrejected(reason) : reason;
          deferred.reject(result as TResult2);
        } catch (error) {
          deferred.reject(error);
        }
      }
    );
    return deferred;
  }

  // 模拟 catch 方法
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Defer<T | TResult> {
    return this.then(null, onrejected);
  }
}
