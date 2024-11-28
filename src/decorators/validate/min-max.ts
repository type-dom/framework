export function minMax(min: number, max: number) {
  return function(target: any, propertyKey: string) {
    let val = target[propertyKey];

    const getter = () => val;
    const setter = (newVal: number) => {
      if (newVal < min || newVal > max) {
        throw new Error(`Invalid value ${newVal}. Value must be between ${min} and ${max}`);
      }
      val = newVal;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}
