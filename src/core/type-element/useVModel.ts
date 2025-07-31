import { watch } from '../../reactivity';
import { InputHTMLAttributes } from '../attribute';
import { TypeElement } from './type-element.abstract';

export function useVModel(element: TypeElement) {
  if (Object.prototype.hasOwnProperty.call(element.props, 'vModel')) {
    if (element.props.vModel !== undefined) {
      element.props.modelValue = element.props.vModel.get();
      element.addEmits({
        ['update:modelValue']: (newValue) => {
          // console.warn('element.className is ', element.className + ', update:modelValue emit , newVal is ', newValue);
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
        if ((element.params.attrObj as InputHTMLAttributes)?.type === 'checkbox'
          // || element.params.attrObj?.type === 'radio'
        ) {
          // element.addEvents({
          //   change: (evt) => {
          //     // console.warn('checkbox radio change emit , evt is ', evt);
          //     // const isChecked  = evt.checked;
          //     // radio-group 中的 radio组件的vModel是没有值的。
          //     //    其中的input绑定的是 radio-group的vModel。
          //     //    这与checkbox-group中的选中逻辑是不一样的。
          //     // element.props.vModel?.set((evt?.target as HTMLInputElement).checked);
          //   },
          // });
        } else if ((element.params.attrObj as InputHTMLAttributes)?.type === 'radio') {
          //   todo
        } else {
          element.addEvents({
            input: (evt) => {
              // console.warn('text input event , evt is ', evt);
              const value = (evt?.target as HTMLInputElement)?.value;
              // todo 节流
              element.props.vModel?.set(value);
            },
          });
        }
      } else if (element.className === 'Textarea') {
        element.addEvents({
          input: (evt) => {
            // console.warn('textarea event , evt is ', evt);
            const value = (evt?.target as HTMLInputElement)?.value;
            element.props.vModel?.set(value);
          },
        });
      } else if (element.className === 'Select') {
        element.addEvents({
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
      }, {
        immediate: true
      });
    }
  }
}
