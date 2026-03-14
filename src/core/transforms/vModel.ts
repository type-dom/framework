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
import { TypeNode } from '../abstracts/type-node/type-node.abstract';
// import { onMounted } from '../apiLifecycle';
// import { onBeforeMount, onMounted } from '../../apiLifecycle';
// import { invokeArrayFns, isArray, looseToNumber } from '@type-dom/utils';

export function transformModel(element: TypeNode) {
  if (element.props && Object.prototype.hasOwnProperty.call(element.props, 'vModel')) {
    // console.warn('useVModel baseProps has vModel. ');
    // const el = element.dom as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    // resolveDynamicModel(el.tagName, el.type);
    // vModelText(element);

    // type AssignerFn = (value: any) => void
    //
    // const getModelAssigner = (vnode: TypeElement): AssignerFn => {
    //   const fn =
    //     vnode.props!['onUpdate:modelValue'] ||
    //     (__COMPAT__ && vnode.props!['onModelCompat:input']) as AssignerFn;
    //   return isArray(fn) ? value => invokeArrayFns(fn, value) : fn;
    // }
    //
    // onBeforeMount(() => {
    //   const el = element.dom as HTMLInputElement | HTMLTextAreaElement;
    //   (el as any)[assignKey] = getModelAssigner(element); // todo import TypeHtml error
    //
    //   // const number = element.props?.['vModel.number'];
    //   const trim = element.props?.['vModel.trim'];
    //   const lazy = element.props && element.props['vModel.lazy'];
    //   // const castToNumber =
    //   //   number || (element.props && el.type === 'number')
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
    //   const value = element.props.vModel?.get() as string;
    //   const el = element.dom as HTMLInputElement | HTMLTextAreaElement;
    //   el.value = value == null ? '' : value
    // }, element);

    if (element.props.vModel !== undefined) {
      element.props.modelValue = element.props.vModel.get();

      addEmits(element, {
        ['update:modelValue']: (newValue) => {
          // console.warn('element.className is ', element.className + ', update:modelValue emit , newVal is ', newValue);
        // todo 节流
          if (element.props.vModelModifiers?.number) {
            const n = parseFloat(newValue);
            newValue = isNaN(n) ? newValue : n;
          }
          if (element.props.vModelModifiers?.trim) {
            if (typeof newValue === 'string') {
              newValue = newValue.trim();
            }
          }
          element.props.vModel?.set(newValue)
          // console.warn('element.props.vModel?.get() is ', element.props.vModel?.get());
        },
        // change: (newValue) => {
        //   console.warn('change emit , newValue is ', newValue);
        //   // const isChecked  = evt.checked;
        //     element.props.vModel?.set(newValue)
        // },
        // input: (newValue) => {
        //   console.warn('input emit , evt is ', newValue);
        //   element.props.vModel?.set(newValue);
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
          //     // element.props.vModel?.set((evt?.target as HTMLInputElement).checked);
          //   },
          // });
          // onMounted(() => {
          //   // console.warn('useVModel onMounted . ');
          //   const value = !!element.props.vModel?.get();
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
              // if (element.props.vModelModifiers?.number) {
              //   const n = parseFloat(value);
              //   element.props.vModel?.set(isNaN(n) ? value : n);
              // }
              // if (element.props.vModelModifiers?.trim) {
              //   if (typeof value === 'string') {
              //     element.props.vModel?.set(value.trim());
              //   }
              // }
              element.props.vModel?.set(value);
            },
            // change: (evt) => {
            //   // console.warn('text input event , evt is ', evt);
            //   const value = (evt?.target as HTMLInputElement)?.value;
            //   // // todo 节流
            //   // if (element.props.vModelModifiers?.number) {
            //   //   const n = parseFloat(value);
            //   //   element.props.vModel?.set(isNaN(n) ? value : n);
            //   // }
            //   // if (element.props.vModelModifiers?.trim) {
            //   //   if (typeof value === 'string') {
            //   //     element.props.vModel?.set(value.trim());
            //   //   }
            //   // }
            //   element.props.vModel?.set(value);
            // },
          });
        }
      } else if (element.className === 'Textarea') {
        addEvents(element, {
          input: (evt) => {
            // console.warn('textarea event , evt is ', evt);
            let value: string | number = (evt?.target as HTMLInputElement)?.value;
            if (element.props.vModelModifiers?.number) {
              const n = parseFloat(value);
              value = isNaN(n) ? value : n;
            }
            if (element.props.vModelModifiers?.trim) {
              if (typeof value === 'string') {
                value = value.trim();
              }
            }
            element.props.vModel?.set(value);
          },
        });
      } else if (element.className === 'Select') {
        addEvents(element, {
          change: (evt) => {
            // console.warn('select change , evt is ', evt);
            // const isChecked  = evt.checked;
            element.props.vModel?.set((evt?.target as HTMLSelectElement).value);
          },
        });
      }
      // todo 监听 vModel,vIf,vShow
      watch(() => element.props.vModel?.get(), (newValue: any)=> {
        // console.warn('element.className is ' + element.className + ', watch vModel change value , newValue is ', newValue);
        element.props.modelValue = newValue;
        // if (element.props.vModelModifiers) {
        //   if (element.props.vModelModifiers.number) {
        //     const n = parseFloat(newValue);
        //     element.props.vModel?.set(isNaN(n) ? newValue : n);
        //   }
        //   if (element.props.vModelModifiers.trim) {
        //     if (typeof newValue === 'string') {
        //       element.props.vModel?.set(newValue.trim());
        //     }
        //   }
        // }
      }, {
        immediate: true
      });
    }
  }
}
