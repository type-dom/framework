const isLikelyNode = typeof Buffer !== 'undefined' && typeof window === 'undefined';
/**
 * 引用与非引用值 深拷贝方法
 * @param source
 */
export function deepClone<T>(source: T): T {
  if (typeof source !== 'object' || typeof source === 'function' || source === null) {
    return source;
  } else if (!isLikelyNode && source instanceof Element) {
    // avoid cloning deep images, canvases,
    return source;
  }
  let destination: T;
  if (Array.isArray(source)) {
    destination = [] as T;
  } else {
    destination = {} as T;
  }
  for (const i in source) {
    if (Object.prototype.hasOwnProperty.call(source, i)) {
      destination[i] = deepClone(source[i]);
    }
  }
  return destination;
}

export function deepCopy<T>(destination: T, source: T, deep?: boolean): T {
  // JScript DontEnum bug is not taken care of
  // the deep clone is for internal use, is not meant to avoid
  // javascript traps or cloning html element or self referenced objects.
  if (deep) {
    if (!isLikelyNode && source instanceof Element) {
      // avoid cloning deep images, canvases,
      destination = source;
    } else if (source instanceof Array) {
      destination = [] as T;
      for (let i = 0, len = source.length; i < len; i++) {
        (destination as any)[i] = deepCopy({ }, source[i], deep);
      }
    } else if (source && typeof source === 'object') {
      for (const property in source) {
        if (property === 'canvas') {
          destination[property] = deepCopy({} as any, source[property]);
        } else if (source.hasOwnProperty(property)) {
          destination[property] = deepCopy({} as any, source[property], deep);
        }
      }
    } else {
      // this sounds odd for an extend but is ok for recursive use
      destination = source;
    }
  } else {
    for (const property in source) {
      if (property) {
        destination[property] = source[property];
      }
    }
  }
  return destination;
}
