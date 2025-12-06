import { watch } from '../../reactivity';
import { InputHTMLAttributes } from '../../dom/modules/attribute';
// import { addEventListener } from '../../../dom/modules/events'
// import {
//   assignKey,
//   getModelAssigner,
//   onCompositionEnd,
//   onCompositionStart,
//   resolveDynamicModel,
//   vModelText
// } from './vModel';
import { addEmits, addEvents } from '../event-emitter/event-emitter';
import { TypeNode } from '../type-node/type-node.abstract';
// import { onMounted } from '../apiLifecycle';
// import { onBeforeMount, onMounted } from '../../apiLifecycle';
// import { invokeArrayFns, isArray, looseToNumber } from '@type-dom/utils';

export function useVModel(element: TypeNode) {
  if (Object.prototype.hasOwnProperty.call(element.baseProps, 'vModel')) {
    // console.warn('useVModel baseProps has vModel. ');
    // const el = element.dom as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    // resolveDynamicModel(el.tagName, el.type);
    // vModelText(element);

    // type AssignerFn = (value: any) => void
    //
    // const getModelAssigner = (vnode: TypeElement): AssignerFn => {
    //   const fn =
    //     vnode.baseProps!['onUpdate:modelValue'] ||
    //     (__COMPAT__ && vnode.baseProps!['onModelCompat:input']) as AssignerFn;
    //   return isArray(fn) ? value => invokeArrayFns(fn, value) : fn;
    // }
    //
    // onBeforeMount(() => {
    //   const el = element.dom as HTMLInputElement | HTMLTextAreaElement;
    //   (el as any)[assignKey] = getModelAssigner(element); // todo import TypeHtml error
    //
    //   // const number = element.baseProps?.['vModel.number'];
    //   const trim = element.baseProps?.['vModel.trim'];
    //   const lazy = element.baseProps && element.baseProps['vModel.lazy'];
    //   // const castToNumber =
    //   //   number || (element.baseProps && el.type === 'number')
    //   // addEventListener(el, lazy ? 'change' : 'input', e => {
    //   //   if ((e.target as any).composing) return
    //   //   let domValue: string | number = el.value
    //   //   if (trim) {
    //   //     domValue = domValue.toString().trim()
    //   //   }
    //   //   if (castToNumber) {
    //   //     domValue = looseToNumber(domValue)
    //   //   }
    //   //   (el as any)[assignKey](domValue)
    //   // })
    //   // if (trim) {
    //   //   addEventListener(el, 'change', () => {
    //   //     el.value = el.value.trim()
    //   //   })
    //   // }
    //   if (!lazy) {
    //     // addEventListener(el, 'compositionstart', onCompositionStart)
    //     // addEventListener(el, 'compositionend', onCompositionEnd)
    //     // // Safari < 10.2 & UIWebView doesn't fire compositionend when
    //     // // switching focus before confirming composition choice
    //     // // this also fixes the issue where some browsers e.g. iOS Chrome
    //     // // fires "change" instead of "input" on autocomplete.
    //     // addEventListener(el, 'change', onCompositionEnd)
    //   }
    // }, element);
    // onMounted(() => {
    //   console.warn('useVModel onMounted . ');
    //   const value = element.baseProps.vModel?.get() as string;
    //   const el = element.dom as HTMLInputElement | HTMLTextAreaElement;
    //   el.value = value == null ? '' : value
    // }, element);

    if (element.baseProps.vModel !== undefined) {
      element.baseProps.modelValue = element.baseProps.vModel.get();

      addEmits(element, {
        ['update:modelValue']: (newValue) => {
          // console.warn('element.className is ', element.className + ', update:modelValue emit , newVal is ', newValue);
        // todo 节流
          if (element.baseProps.vModelModifiers?.number) {
            const n = parseFloat(newValue);
            newValue = isNaN(n) ? newValue : n;
          }
          if (element.baseProps.vModelModifiers?.trim) {
            if (typeof newValue === 'string') {
              newValue = newValue.trim();
            }
          }
          element.baseProps.vModel?.set(newValue)
          // console.warn('element.baseProps.vModel?.get() is ', element.baseProps.vModel?.get());
        },
        // change: (newValue) => {
        //   console.warn('change emit , newValue is ', newValue);
        //   // const isChecked  = evt.checked;
        //     element.baseProps.vModel?.set(newValue)
        // },
        // input: (newValue) => {
        //   console.warn('input emit , evt is ', newValue);
        //   element.baseProps.vModel?.set(newValue);
        // },
      });
      if (element.className === 'Input') { // todo
        if ((element.params?.attrObj as InputHTMLAttributes)?.type === 'checkbox'
          // || element.params.attrObj?.type === 'radio'
        ) {
          // addEvents(element, {
          //   change: (evt) => {
          //     // console.warn('checkbox radio change emit , evt is ', evt);
          //     // const isChecked  = evt.checked;
          //     // radio-group 中的 radio组件的vModel是没有值的。
          //     //    其中的input绑定的是 radio-group的vModel。
          //     //    这与checkbox-group中的选中逻辑是不一样的。
          //     // element.baseProps.vModel?.set((evt?.target as HTMLInputElement).checked);
          //   },
          // });
          // onMounted(() => {
          //   // console.warn('useVModel onMounted . ');
          //   const value = !!element.baseProps.vModel?.get();
          //   const el = element.dom as HTMLInputElement | HTMLTextAreaElement;
          //   (el as any).checked = value
          // }, element);
        } else if ((element.params?.attrObj as InputHTMLAttributes)?.type === 'radio') {
          //   todo
        } else {
          addEvents(element, {
            input: (evt) => {
              // console.warn('text input event , evt is ', evt);
              const value = (evt?.target as HTMLInputElement)?.value;
              // // todo 节流
              // if (element.baseProps.vModelModifiers?.number) {
              //   const n = parseFloat(value);
              //   element.baseProps.vModel?.set(isNaN(n) ? value : n);
              // }
              // if (element.baseProps.vModelModifiers?.trim) {
              //   if (typeof value === 'string') {
              //     element.baseProps.vModel?.set(value.trim());
              //   }
              // }
              element.baseProps.vModel?.set(value);
            },
            // change: (evt) => {
            //   // console.warn('text input event , evt is ', evt);
            //   const value = (evt?.target as HTMLInputElement)?.value;
            //   // // todo 节流
            //   // if (element.baseProps.vModelModifiers?.number) {
            //   //   const n = parseFloat(value);
            //   //   element.baseProps.vModel?.set(isNaN(n) ? value : n);
            //   // }
            //   // if (element.baseProps.vModelModifiers?.trim) {
            //   //   if (typeof value === 'string') {
            //   //     element.baseProps.vModel?.set(value.trim());
            //   //   }
            //   // }
            //   element.baseProps.vModel?.set(value);
            // },
          });
        }
      } else if (element.className === 'Textarea') {
        addEvents(element, {
          input: (evt) => {
            // console.warn('textarea event , evt is ', evt);
            let value: string | number = (evt?.target as HTMLInputElement)?.value;
            if (element.baseProps.vModelModifiers?.number) {
              const n = parseFloat(value);
              value = isNaN(n) ? value : n;
            }
            if (element.baseProps.vModelModifiers?.trim) {
              if (typeof value === 'string') {
                value = value.trim();
              }
            }
            element.baseProps.vModel?.set(value);
          },
        });
      } else if (element.className === 'Select') {
        addEvents(element, {
          change: (evt) => {
            // console.warn('select change , evt is ', evt);
            // const isChecked  = evt.checked;
            element.baseProps.vModel?.set((evt?.target as HTMLSelectElement).value);
          },
        });
      }
      // todo 监听 vModel,vIf,vShow
      watch(() => element.baseProps.vModel?.get(), (newValue: any)=> {
        // console.warn('element.className is ' + element.className + ', watch vModel change value , newValue is ', newValue);
        element.baseProps.modelValue = newValue;
        // if (element.baseProps.vModelModifiers) {
        //   if (element.baseProps.vModelModifiers.number) {
        //     const n = parseFloat(newValue);
        //     element.baseProps.vModel?.set(isNaN(n) ? newValue : n);
        //   }
        //   if (element.baseProps.vModelModifiers.trim) {
        //     if (typeof newValue === 'string') {
        //       element.baseProps.vModel?.set(newValue.trim());
        //     }
        //   }
        // }
      }, {
        immediate: true
      });
    }
  }
}
