/**
 * 组装属性
 * 根据提供的配置参数构建属性
 * @param config
 */
// import { isEventKey, } from '@type-dom/utils';
// import { isRef } from '../../reactivity';
import { TypeProps } from '../type-node/type-node.interface';

export function defaultProps<Props extends TypeProps>(params = {} as Props, defaults = {} as Props) {
  try {
    if (!params) {
      console.error('params is undefined . ');
    }
    const result = { ...params } as Props;
    for (const key in defaults) {
      // styleObj, attrObj, events 要单独处理
      // if (isRef(params[key])) {
      //   console.warn('params[' + key + '] is ref , is ', params[key]);
      //   console.warn('defaults[' + key + '] is  ', defaults[key])
      // }
      // todo value MaybeRef
      // if (key === 'styleObj') {
      //   // styleValue  Ref
      //   result.styleObj = params.styleObj ? params.styleObj : defaults.styleObj;
      // } else if (key === 'attrObj') {
      //   result.attrObj = params.attrObj ? params.attrObj : defaults.attrObj;
      // } else if (key === 'emits') {
      //   result.emits = params.emits ? params.emits : defaults.emits;
      // } else if (isEventKey(key)) {
      //   result[key] = params[key] ? params[key] : defaults[key];
      // } else if (key === 'slot') {
      //   result.slot = params.slot;
      // } else if (key === 'slots') {
      //   result.slots = params.slots;
      // } else if (key === 'nodeName') {
      //   result.nodeName = params.nodeName;
      // } else {
      //   // params[key] = params[key] ? Object.assign(defaults[key]!, params[key]) : defaults[key];
      //   // console.warn('key is ', key)
      //   // if (key === 'nodeName' && defaults[key] === 'i') {
      //   //   console.warn('params[nodeName] is ', params[key]);
      //   //   console.warn('defaults[nodeName] is ', defaults[key]);
      //   // }
      //   result[key] = params[key] ? params[key] : defaults[key];
      // }
      result[key] = params[key] ? params[key] : defaults[key];
    }
    return result;
  } catch (e) {
    console.error('defaultProps error . ', e);
    return params;
  }
}
