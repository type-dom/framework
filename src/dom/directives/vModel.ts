import {
  invokeArrayFns,
  isArray,
  isSet,
  looseEqual,
  looseIndexOf,
  looseToNumber,
} from '@type-dom/utils'
import {
  // type DirectiveBinding,
  // type DirectiveHook,
  // type ObjectDirective,
  // type VNode,
  // warn,
  nextTick,onBeforeMount, onMounted,
  TypeElement,
} from '../../core';
// TypeInput, TypeTextarea, TypeSelect, //  todo a.abstract.ts import TypeHtml error;
import { addEventListener } from '../modules/events'

type AssignerFn = (value: any) => void

export const getModelAssigner = (vnode: TypeElement): AssignerFn => {
  const fn =
    vnode.props!['onUpdate:modelValue'] as AssignerFn; // ||
    // (__COMPAT__ && vnode.props!['onModelCompat:input']) as AssignerFn;
  return isArray(fn) ? value => invokeArrayFns(fn, value) : fn;
}

export function onCompositionStart(e: Event) {
  ;(e.target as any).composing = true
}

export function onCompositionEnd(e: Event) {
  const target = e.target as any
  if (target.composing) {
    target.composing = false
    target.dispatchEvent(new Event('input'))
  }
}

export const assignKey: unique symbol = Symbol('_assign')

// type ModelDirective<T, Modifiers extends string = string> = ObjectDirective<
//   T & { [assignKey]: AssignerFn; _assigning?: boolean },
//   any,
//   Modifiers
// >

// We are exporting the v-model runtime directly as vnode hooks so that it can
// be tree-shaken in case v-model is never used.
export const vModelText = (vnode: TypeElement) => {
  console.warn('vModelText . ');
  return () => {
    onBeforeMount(() => {
      const el = vnode.dom as HTMLInputElement | HTMLTextAreaElement;
      (el as any)[assignKey] = getModelAssigner(vnode);

      const number = vnode.props?.modelModifiers?.number;
      const trim = vnode.props?.modelModifiers?.trim;
      const lazy = vnode.props && vnode.props?.modelModifiers?.lazy;
      const castToNumber =
        number || (vnode.props && el.type === 'number')
      addEventListener(el, lazy ? 'change' : 'input', e => {
        if ((e.target as any).composing) return
        let domValue: string | number = el.value
        if (trim) {
          domValue = domValue.toString().trim()
        }
        if (castToNumber) {
          domValue = looseToNumber(domValue)
        }
        (el as any)[assignKey](domValue)
      })
      if (trim) {
        addEventListener(el, 'change', () => {
          el.value = el.value.trim()
        })
      }
      if (!lazy) {
        addEventListener(el, 'compositionstart', onCompositionStart)
        addEventListener(el, 'compositionend', onCompositionEnd)
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        addEventListener(el, 'change', onCompositionEnd)
      }
    }, vnode);
    // set value on mounted so it's after min/max for type="range"
    onMounted(() => {
      // const value = vnode.props.vModel?.get() as string;
      // const el = vnode.dom as HTMLInputElement | HTMLTextAreaElement;
      // el.value = value == null ? '' : value
    }, vnode); //   todo a.abstract.ts import TypeHtml error;

    // beforeUpdate(
    //   el,
    //   { value, oldValue, modifiers: { lazy, trim, number } },
    //   vnode,
    // ) {
    //   el[assignKey] = getModelAssigner(vnode)
    //   // avoid clearing unresolved text. #2302
    //   if ((el as any).composing) return
    //   const elValue =
    //     (number || el.type === 'number') && !/^0\d/.test(el.value)
    //       ? looseToNumber(el.value)
    //       : el.value
    //   const newValue = value == null ? '' : value
    //
    //   if (elValue === newValue) {
    //     return
    //   }
    //
    //   if (document.activeElement === el && el.type !== 'range') {
    //     // #8546
    //     if (lazy && value === oldValue) {
    //       return
    //     }
    //     if (trim && el.value.trim() === newValue) {
    //       return
    //     }
    //   }
    //
    //   el.value = newValue
    // }
  }
}

export function vModelCheckbox(vnode: TypeElement) {
  // #4096 array checkboxes need to be deep traversed
  // deep: true,
  onBeforeMount(() => {
    const el = vnode.dom as any;
    el[assignKey] = getModelAssigner(vnode)
    addEventListener(el, 'change', () => {
      const modelValue = (el as any)._modelValue
      const elementValue = getValue(el)
      const checked = el.checked
      const assign = el[assignKey]
      if (isArray(modelValue)) {
        const index = looseIndexOf(modelValue, elementValue)
        const found = index !== -1
        if (checked && !found) {
          assign(modelValue.concat(elementValue))
        } else if (!checked && found) {
          const filtered = [...modelValue]
          filtered.splice(index, 1)
          assign(filtered)
        }
      } else if (isSet(modelValue)) {
        const cloned = new Set(modelValue)
        if (checked) {
          cloned.add(elementValue)
        } else {
          cloned.delete(elementValue)
        }
        assign(cloned)
      } else {
        assign(getCheckboxValue(el, checked))
      }
    })
  }, vnode)
  // set initial checked on mount to wait for true-value/false-value
  onMounted(setChecked, vnode)
  // beforeUpdate(el, binding, vnode) {
  //   el[assignKey] = getModelAssigner(vnode)
  //   setChecked(el, binding, vnode)
  // }
}

function setChecked(
  el: HTMLInputElement,
  { value, oldValue }: any,
  vnode: TypeElement,
) {
  // store the v-model value on the element so it can be accessed by the
  // change listener.
  ;(el as any)._modelValue = value
  let checked: boolean

  if (isArray(value)) {
    checked = looseIndexOf(value, vnode.props!.value) > -1
  } else if (isSet(value)) {
    checked = value.has(vnode.props!.value)
  } else {
    if (value === oldValue) return
    checked = looseEqual(value, getCheckboxValue(el, true))
  }

  // Only update if the checked state has changed
  if (el.checked !== checked) {
    el.checked = checked
  }
}

export function vModelRadio(vnode: TypeElement) {
  onBeforeMount(() => {
    const el = vnode.dom as HTMLInputElement;
    const value = vnode.props?.vModel?.get();
    el.checked = looseEqual(value, vnode.props?.value);
    (el as any)[assignKey] = getModelAssigner(vnode)
    addEventListener(el, 'change', () => {
      (el as any)[assignKey](getValue(el))
    })
  }, vnode);
  // beforeUpdate(el, { value, oldValue }, vnode) {
  //   el[assignKey] = getModelAssigner(vnode)
  //   if (value !== oldValue) {
  //     el.checked = looseEqual(value, vnode.props!.value)
  //   }
  // }
}

export function vModelSelect(vnode: TypeElement) {
  // <select multiple> value need to be deep traversed
  // deep: true
  onBeforeMount(() => {
    const el = vnode.dom as HTMLSelectElement;
    const value = vnode.props?.vModel?.get();
    const number = vnode.props && vnode.props?.vModelModifiers?.number;
    const isSetModel = isSet(value);
    addEventListener(el, 'change', () => {
      const selectedVal = Array.prototype.filter
        .call(el.options, (o: HTMLOptionElement) => o.selected)
        .map((o: HTMLOptionElement) =>
          number ? looseToNumber(getValue(o)) : getValue(o),
        );
      (el as any)[assignKey](
        el.multiple
          ? isSetModel
            ? new Set(selectedVal)
            : selectedVal
          : selectedVal[0],
      );
      (el as any)._assigning = true;
      nextTick(() => {
        (el as any)._assigning = false;
      });
    });
    (el as any)[assignKey] = getModelAssigner(vnode);
  }, vnode);
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  onMounted(() => {
    const el = vnode.dom as HTMLSelectElement;
    const value = vnode.props?.vModel?.get();
    setSelected(el, value)
  })
  // beforeUpdate(el, _binding, vnode) {
  //   el[assignKey] = getModelAssigner(vnode)
  // }
  // updated(el, { value }) {
  //   if (!el._assigning) {
  //     setSelected(el, value)
  //   }
  // }
}

function setSelected(el: HTMLSelectElement, value: any) {
  const isMultiple = el.multiple
  const isArrayValue = isArray(value)
  if (isMultiple && !isArrayValue && !isSet(value)) {
    // if (__DEV__) {
    //   warn(
    //     `<select multiple v-model> expects an Array or Set value for its binding, ` +
    //     `but got ${Object.prototype.toString.call(value).slice(8, -1)}.`,
    //   )
    // }
    return
  }

  for (let i = 0, l = el.options.length; i < l; i++) {
    const option = el.options[i]
    const optionValue = getValue(option)
    if (isMultiple) {
      if (isArrayValue) {
        const optionType = typeof optionValue
        // fast path for string / number values
        if (optionType === 'string' || optionType === 'number') {
          option.selected = value.some(v => String(v) === String(optionValue))
        } else {
          option.selected = looseIndexOf(value, optionValue) > -1
        }
      } else {
        option.selected = value.has(optionValue)
      }
    } else if (looseEqual(getValue(option), value)) {
      if (el.selectedIndex !== i) el.selectedIndex = i
      return
    }
  }
  if (!isMultiple && el.selectedIndex !== -1) {
    el.selectedIndex = -1
  }
}

// retrieve raw value set via :value bindings
function getValue(el: HTMLOptionElement | HTMLInputElement) {
  return '_value' in el ? (el as any)._value : el.value
}

// retrieve raw value for true-value and false-value set via :true-value or :false-value bindings
function getCheckboxValue(
  el: HTMLInputElement & { _trueValue?: any; _falseValue?: any },
  checked: boolean,
) {
  const key = checked ? '_trueValue' : '_falseValue'
  return key in el ? el[key] : checked
}

// export const vModelDynamic: ObjectDirective<
//   HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
// > = {
//   created(el, binding, vnode) {
//     callModelHook(el, binding, vnode, null, 'created')
//   },
//   mounted(el, binding, vnode) {
//     callModelHook(el, binding, vnode, null, 'mounted')
//   },
//   beforeUpdate(el, binding, vnode, prevVNode) {
//     callModelHook(el, binding, vnode, prevVNode, 'beforeUpdate')
//   },
//   updated(el, binding, vnode, prevVNode) {
//     callModelHook(el, binding, vnode, prevVNode, 'updated')
//   },
// }

export function resolveDynamicModel(tagName: string, type: string | undefined) {
  switch (tagName) {
    case 'SELECT':
      return vModelSelect
    case 'TEXTAREA':
      return vModelText
    default:
      switch (type) {
        case 'checkbox':
          return vModelCheckbox
        case 'radio':
          return vModelRadio
        default:
          return vModelText
      }
  }
}

// function callModelHook(
//   el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
//   // binding: DirectiveBinding,
//   vnode: VNode,
//   prevVNode: VNode | null,
//   hook: string,
// ) {
//   const modelToUse = resolveDynamicModel(
//     el.tagName,
//     vnode.props && el.type,
//   )
//   const fn = modelToUse[hook]
//   fn && fn(el, binding, vnode, prevVNode)
// }

// // SSR vnode transforms, only used when user includes client-oriented render
// // function in SSR
// export function initVModelForSSR(): void {
//   vModelText.getSSRProps = ({ value }) => ({ value })
//
//   vModelRadio.getSSRProps = ({ value }, vnode) => {
//     if (vnode.props && looseEqual(vnode.props.value, value)) {
//       return { checked: true }
//     }
//   }
//
//   vModelCheckbox.getSSRProps = ({ value }, vnode) => {
//     if (isArray(value)) {
//       if (vnode.props && looseIndexOf(value, vnode.props.value) > -1) {
//         return { checked: true }
//       }
//     } else if (isSet(value)) {
//       if (vnode.props && value.has(vnode.props.value)) {
//         return { checked: true }
//       }
//     } else if (value) {
//       return { checked: true }
//     }
//   }
//
//   vModelDynamic.getSSRProps = (binding, vnode) => {
//     if (typeof vnode.type !== 'string') {
//       return
//     }
//     const modelToUse = resolveDynamicModel(
//       // resolveDynamicModel expects an uppercase tag name, but vnode.type is lowercase
//       vnode.type.toUpperCase(),
//       vnode.props && vnode.props.type,
//     )
//     if (modelToUse.getSSRProps) {
//       return modelToUse.getSSRProps(binding, vnode)
//     }
//   }
// }
//
// export type VModelDirective =
//   | typeof vModelText
//   | typeof vModelCheckbox
//   | typeof vModelSelect
//   | typeof vModelRadio
//   | typeof vModelDynamic
