// import { isArray, isFunction } from '@type-dom/utils';
// import { isRef, toRaw } from '../../reactivity';
// import { ISlotRaw } from '../type-node/type-node.interface';
// import { TypeNode } from '../type-node/type-node.abstract';
// import { TypeElement } from '../type-element/type-element.abstract';
//
// export function useSlotChild(element: TypeElement, slot?: ISlotRaw | ISlotRaw[] | ((arg?: any) => ISlotRaw | ISlotRaw[]), type: 'add' | 'unshift' = 'add') {
//   // console.log('slotChild is called . ');
//   if (slot === undefined) {
//     return;
//   }
//   if (isRef(slot)) { // todo 不可能
//     console.error('slit is ref . ');
//     useSlotChild(element, toRaw(slot) as ISlotRaw);
//   } else if (isFunction(slot)) {
//     const el = slot();
//     useSlotChild(element, el);
//   } else if (isArray(slot)) {
//     slot.forEach((item) => {
//       useSlotChild(element, toRaw(item));
//     });
//   } else {
//     if (type === 'unshift') {
//       if (slot instanceof TypeNode) {
//         element.unshiftChild(slot);
//       } else if (typeof slot === 'string' || typeof slot === 'number') {
//         element.unshiftChild(slot);
//       } else {
//         console.error('useSlotChild: slot is not TypeNode or string or number, it is ', slot);
//       }
//     } else {
//       if (slot instanceof TypeNode) {
//         element.addChild(slot);
//       } else if (typeof slot === 'string' || typeof slot === 'number') {
//         element.addChild(slot);
//       } else {
//         console.error('type is ', type, 'useSlotChild: slot is not TypeNode or string or number, it is ', slot);
//       }
//     }
//   }
// }
