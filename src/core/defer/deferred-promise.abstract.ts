// export class DeferredPromise<T> {
//   private _state?: 'pending' | 'fulfilled' | 'rejected' = 'pending';
//   private _value?: T | PromiseLike<T>;
//   private _reason?: any;
//   private _callbacks?: Array<() => void> = [];
//
//   constructor(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
//     this._executor = executor.bind(this);
//     this._executor(this.resolve.bind(this), this.reject.bind(this));
//   }
//
//   private _executor(resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) {
//   }
//
//   resolve(value: T | PromiseLike<T>) {
//     if (this._state === 'pending') {
//       this._state = 'fulfilled';
//       this._value = value;
//       this._executeCallbacks();
//     }
//   }
//
//   reject(reason: any) {
//     if (this._state === 'pending') {
//       this._state = 'rejected';
//       this._reason = reason;
//       this._executeCallbacks();
//     }
//   }
//
//   private _executeCallbacks() {
//     while (this._callbacks?.length > 0) {
//       const callback = this._callbacks?.shift();
//       if (callback) {
//         callback();
//       }
//     }
//   }
//
//   private _enqueueCallback(callback: () => void) {
//     this._callbacks?.push(callback);
//   }
//
//   then<U>(onFulfilled?: (value: T) => U | PromiseLike<U>, onRejected?: (reason: any) => void | U | PromiseLike<U>): DeferredPromise<U> {
//     return new DeferredPromise<U>((resolve, reject) => {
//       if (this._state === 'fulfilled') {
//         try {
//           const result = onFulfilled ? onFulfilled(this._value!) : this._value;
//           resolve(result);
//         } catch (error) {
//           reject(error);
//         }
//       } else if (this._state === 'rejected') {
//         try {
//           const result = onRejected ? onRejected(this._reason) : this._reason;
//           resolve(result);
//         } catch (error) {
//           reject(error);
//         }
//       } else {
//         this._enqueueCallback(() => {
//           try {
//             const result = onFulfilled ? onFulfilled(this._value!) : this._value!;
//             resolve(result);
//           } catch (error) {
//             reject(error);
//           }
//         });
//         this._enqueueCallback(() => {
//           try {
//             const result = onRejected ? onRejected(this._reason) : this._reason;
//             resolve(result);
//           } catch (error) {
//             reject(error);
//           }
//         });
//       }
//     });
//   }
//
//   catch<U = T>(onRejected?: (reason: any) => U | PromiseLike<U>): DeferredPromise<T | U> {
//     return this.then(null, onRejected);
//   }
//
//   finally(onFinally: () => void): DeferredPromise<unknown> {
//     return this.then(
//       (value) => {
//         onFinally();
//         return value;
//       },
//       (reason) => {
//         onFinally();
//         throw reason;
//       }
//     );
//   }
// }

// 示例使用
// (async () => {
//   const promise = new DeferredPromise<string>((resolve, reject) => {
//     setTimeout(() => {
//       resolve('Hello, World!');
//     }, 2000);
//   });
//
//   try {
//     const result = await promise.then(
//       (value) => {
//         console.log('Resolved:', value);
//         return value.toUpperCase();
//       },
//       (reason) => {
//         console.error('Rejected:', reason);
//         throw reason;
//       }
//     ).catch((error) => {
//       console.error('Caught Error:', error);
//       return 'Fallback Value';
//     }).finally(() => {
//       console.log('Finally block executed.');
//     });
//
//     console.log('Final Result:', result);
//   } catch (error) {
//     console.error('Caught Error:', error);
//   }
// })();
