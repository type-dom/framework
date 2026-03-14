import {
  Del,
  Div,
  // h,
  Select,
  Option,
  SvgG,
  SvgSvg,
  TypeDiv,
  Fragment,
  transformSlot,
  nextTick,
  patchProp,
  render, TypeFragment, Input
  // ref,
  // vModelCheckbox,
  // withDirectives,
} from '../../src';
import { signal } from '@type-dom/signals';

describe('runtime-dom: props patching', () => {
  test('basic', () => {
    const el = document.createElement('div')
    patchProp(el, 'id', null, 'foo')
    expect(el.id).toBe('foo')
    // prop with string value should be set to empty string on null values
    patchProp(el, 'id', null, null)
    expect(el.id).toBe('')
    expect(el.getAttribute('id')).toBe(null)
  })

  test('value', () => {
    const el = document.createElement('input')
    patchProp(el, 'value', null, 'foo')
    expect(el.value).toBe('foo')
    patchProp(el, 'value', null, null)
    expect(el.value).toBe('')
    expect(el.getAttribute('value')).toBe(null)
    const obj = {}
    patchProp(el, 'value', null, obj)
    expect(el.value).toBe(obj.toString())
    expect((el as any)._value).toBe(obj)

    const option = document.createElement('option')
    patchProp(option, 'textContent', null, 'foo')
    expect(option.value).toBe('foo')
    expect(option.getAttribute('value')).toBe(null)
    patchProp(option, 'value', null, 'foo')
    expect(option.value).toBe('foo')
    expect(option.getAttribute('value')).toBe('foo')
  })

  test('value for custom elements', () => {
    class TestElement extends HTMLElement {
      constructor() {
        super()
      }

      // intentionally uses _value because this is used in "normal" HTMLElement for storing the object of the set property value
      private _value: any
      get value() {
        return this._value
      }

      set value(val) {
        this._value = val
        this.setterCalled++
      }

      public setterCalled = 0
    }
    window.customElements.define('patch-props-test-element', TestElement)
    const el = document.createElement('patch-props-test-element') as TestElement
    patchProp(el, 'value', null, 'foo')
    expect(el.value).toBe('foo')
    expect(el.setterCalled).toBe(1)
    patchProp(el, 'value', null, null)
    expect(el.value).toBe('')
    expect(el.setterCalled).toBe(2)
    expect(el.getAttribute('value')).toBe(null)
    const obj = {}
    patchProp(el, 'value', null, obj)
    expect(el.value).toBe(obj)
    expect(el.setterCalled).toBe(3)
  })

  // For <input type="text">, setting el.value won't create a `value` attribute
  // so we need to add tests for other elements
  test('value for non-text input', () => {
    const el = document.createElement('option')
    el.textContent = 'foo' // #4956
    patchProp(el, 'value', null, 'foo')
    expect(el.getAttribute('value')).toBe('foo')
    expect(el.value).toBe('foo')
    patchProp(el, 'value', null, null)
    el.textContent = ''
    expect(el.value).toBe('')
    // #3475
    expect(el.getAttribute('value')).toBe(null)
  })

  test('boolean prop', () => {
    const el = document.createElement('select')
    patchProp(el, 'multiple', null, '')
    expect(el.multiple).toBe(true)
    patchProp(el, 'multiple', null, null)
    expect(el.multiple).toBe(false)
    patchProp(el, 'multiple', null, true)
    expect(el.multiple).toBe(true)
    patchProp(el, 'multiple', null, 0)
    expect(el.multiple).toBe(false)
    patchProp(el, 'multiple', null, '0')
    expect(el.multiple).toBe(true)
    patchProp(el, 'multiple', null, false)
    expect(el.multiple).toBe(false)
    patchProp(el, 'multiple', null, 1)
    expect(el.multiple).toBe(true)
    patchProp(el, 'multiple', null, undefined)
    expect(el.multiple).toBe(false)
  })

  test('innerHTML unmount prev children', () => {
    const fn = vi.fn()
    // const comp = {
    //   render: () => 'foo',
    //   unmounted: fn,
    // }
    const comp = new Fragment({ slot: 'foo', unmounted: fn });
    const root = document.createElement('div')
    // render(h('div', null, [h(comp)]), root)
    render(new Div({
      slot: comp,
    }), root);
    expect(root.innerHTML).toBe(`<div>foo</div>`)

    // render(h('div', { innerHTML: 'bar' }), root)
    render(new Div({
      slot: 'bar'
    }), root);
    expect(root.innerHTML).toBe(`<div>bar</div>`)
    expect(fn).toHaveBeenCalled()
  })

  // #954
  test('(svg) innerHTML unmount prev children', () => {
    const fn = vi.fn()
    // const comp = {
    //   render: () => 'foo',
    //   unmounted: fn,
    // }
    const comp = new Fragment({ slot: 'foo', unmounted: fn });
    const root = document.createElement('div')
    // render(h('div', null, [h(comp)]), root)
    render(new Div({
      slot: comp
    }), root);
    expect(root.innerHTML).toBe(`<div>foo</div>`)

    // render(h('svg', { innerHTML: '<g></g>' }), root)
    render(new SvgSvg({
      slot: new SvgG()
    }), root);
    expect(root.innerHTML).toBe(`<svg><g></g></svg>`)
    expect(fn).toHaveBeenCalled()
  })

  test('patch innerHTML prop', async () => {
    const root = document.createElement('div')
    const state = signal(false)
    // const Comp = {
    //   render: () => {
    //     if (state.value) {
    //       return h('div', [h('del', null, 'baz')])
    //     } else {
    //       return h('div', { innerHTML: 'baz' })
    //     }
    //   },
    // }
    class Comp extends TypeDiv {
      className = 'Comp';
      override setup() {
        transformSlot(this, () => {
          if (state.get()) {
            return new Del({
              slot: 'baz',
            })
          } else {
            return 'baz';
          }
        });
      }
    }
    // render(h(Comp), root)
    render(new Comp(), root);
    expect(root.innerHTML).toBe(`<div>baz</div>`)
    state.set(true);
    await nextTick()
    expect(root.innerHTML).toBe(`<div><del>baz</del></div>`)
  })

  test('patch innerHTML porp w/ undefined value', async () => {
    const root = document.createElement('div')
    // render(h('div', { innerHTML: undefined }), root)
    render(new Div(), root);
    expect(root.innerHTML).toBe(`<div></div>`)
  })

  test('textContent unmount prev children', () => {
    const fn = vi.fn()
    // const comp = {
    //   render: () => 'foo',
    //   unmounted: fn,
    // }
    const comp = new Fragment({ slot: 'foo', unmounted: fn });
    const root = document.createElement('div')
    // render(h('div', null, [h(comp)]), root)
    render(new Div({ slot: comp }), root);
    expect(root.innerHTML).toBe(`<div>foo</div>`)

    // render(h('div', { textContent: 'bar' }), root)
    render(new Div({ slot: 'bar' }), root);
    expect(root.innerHTML).toBe(`<div>bar</div>`)
    expect(fn).toHaveBeenCalled()
  })

  // #1049
  test('set value as-is for non string-value props', () => {
    const el = document.createElement('video')
    // jsdom doesn't really support video playback. srcObject in a real browser
    // should default to `null`, but in jsdom it's `undefined`.
    // anyway, here we just want to make sure Vue doesn't set non-string props
    // to an empty string on nullish values - it should reset to its default
    // value.
    el.srcObject = null
    const initialValue = el.srcObject
    const fakeObject = {}
    patchProp(el, 'srcObject', null, fakeObject)
    expect(el.srcObject).toBe(fakeObject)
    patchProp(el, 'srcObject', null, null)
    expect(el.srcObject).toBe(initialValue)
  })

  // test('catch and warn prop set TypeError', () => {
  //   const el = document.createElement('div')
  //   Object.defineProperty(el, 'someProp', {
  //     set() {
  //       throw new TypeError('Invalid type')
  //     },
  //   })
  //   patchProp(el, 'someProp', null, 'foo')
  //
  //   expect(`Failed setting prop "someProp" on <div>`).toHaveBeenWarnedLast()
  // })

  // #1576
  test('remove attribute when value is falsy', () => {
    const el = document.createElement('div')
    patchProp(el, 'id', null, '')
    expect(el.hasAttribute('id')).toBe(true)
    patchProp(el, 'id', null, null)
    expect(el.hasAttribute('id')).toBe(false)

    patchProp(el, 'id', null, '')
    expect(el.hasAttribute('id')).toBe(true)
    patchProp(el, 'id', null, undefined)
    expect(el.hasAttribute('id')).toBe(false)

    patchProp(el, 'id', null, '')
    expect(el.hasAttribute('id')).toBe(true)

    // #2677
    const img = document.createElement('img')
    patchProp(img, 'width', null, '')
    expect(el.hasAttribute('width')).toBe(false)
    patchProp(img, 'width', null, 0)
    expect(img.hasAttribute('width')).toBe(true)

    patchProp(img, 'width', null, null)
    expect(img.hasAttribute('width')).toBe(false)
    patchProp(img, 'width', null, 0)
    expect(img.hasAttribute('width')).toBe(true)

    patchProp(img, 'width', null, undefined)
    expect(img.hasAttribute('width')).toBe(false)
    patchProp(img, 'width', null, 0)
    expect(img.hasAttribute('width')).toBe(true)
  })

  test('form attribute', () => {
    const el = document.createElement('input')
    patchProp(el, 'form', null, 'foo')
    // non existent element
    expect(el.form).toBe(null)
    expect(el.getAttribute('form')).toBe('foo')
    // remove attribute
    patchProp(el, 'form', 'foo', null)
    expect(el.getAttribute('form')).toBe(null)
  })

  test('readonly type prop on textarea', () => {
    const el = document.createElement('textarea')
    // just to verify that it doesn't throw when i.e. switching a dynamic :is from an 'input' to a 'textarea'
    // see https://github.com/vuejs/core/issues/2766
    patchProp(el, 'type', 'text', null)
  })

  test('force patch as prop', () => {
    const el = document.createElement('div') as any;
    patchProp(el, '.x', null, 1)
    expect(el.x).toBe(1)
  })

  test('force patch as attribute', () => {
    const el = document.createElement('div') as any;
    el.x = 1
    patchProp(el, '^x', null, 2)
    expect(el.x).toBe(1)
    expect(el.getAttribute('x')).toBe('2')
  })

  test('input with size (number property)', () => {
    const el = document.createElement('input')
    patchProp(el, 'size', null, 100)
    expect(el.size).toBe(100)
    patchProp(el, 'size', 100, null)
    expect(el.getAttribute('size')).toBe(null)
    // expect('Failed setting prop "size" on <input>').not.toHaveBeenWarned()
    // patchProp(el, 'size', null, 'foobar')
    // expect('Failed setting prop "size" on <input>').toHaveBeenWarnedLast()
  })

  test('select with type (string property)', () => {
    const el = document.createElement('select')
    patchProp(el, 'type', null, 'test')
    expect(el.type).toBe('select-one')
    // expect('Failed setting prop "type" on <select>').toHaveBeenWarnedLast()
  })

  test('select with willValidate (boolean property)', () => {
    const el = document.createElement('select')
    patchProp(el, 'willValidate', true, null)
    expect(el.willValidate).toBe(true)
    // expect(
    //   'Failed setting prop "willValidate" on <select>',
    // ).toHaveBeenWarnedLast()
  })

  test('patch value for select', () => {
    const root = document.createElement('div')
    // render(
    //   h('select', { value: 'foo' }, [
    //     h('option', { value: 'foo' }, 'foo'),
    //     h('option', { value: 'bar' }, 'bar'),
    //   ]),
    //   root,
    // )
    render(new Select({
      attrObj: {
        value: 'foo',
      },
      slot: [
        new Option({
          attrObj: {
            value: 'foo',
          },
          slot: 'foo',
        }),
        new Option({
          attrObj: {
            value: 'bar',
          },
          slot: 'bar',
        }),
      ],
    }), root);
    const el = root.children[0] as HTMLSelectElement
    expect(el.value).toBe('foo')

    // render(
    //   h('select', { value: 'baz' }, [
    //     h('option', { value: 'foo' }, 'foo'),
    //     h('option', { value: 'baz' }, 'baz'),
    //   ]),
    //   root,
    // )
    render(new Select({
      attrObj: {
        value: 'baz',
      },
      slot: [
        new Option({
          attrObj: {
            value: 'foo',
          },
          slot: 'foo',
        }),
        new Option({
          attrObj: {
            value: 'baz',
          },
          slot: 'baz',
        }),
      ],
    }), root);
    const el1 = root.children[0] as HTMLSelectElement
    expect(el1.value).toBe('baz')
  })

  test('init empty value for option', () => {
    const root = document.createElement('div')
    // render(
    //   h('select', { value: 'foo' }, [h('option', { value: '' }, 'foo')]),
    //   root,
    // )
    render(new Select({
      attrObj: {
        value: 'foo',
      },
      slot: [
        new Option({
          attrObj: {
            value: '',
          },
          slot: 'foo',
        }),
      ],
    }), root);
    const select = root.children[0] as HTMLSelectElement
    const option = select.children[0] as HTMLOptionElement
    expect(select.value).toBe('')
    expect(option.value).toBe('')
  })

  // #8780
  test('embedded tag with width and height', () => {
    // Width and height of some embedded element such as img、video、source、canvas
    // must be set as attribute
    const el = document.createElement('img')
    patchProp(el, 'width', null, '24px')
    expect(el.getAttribute('width')).toBe('24px')
  })

  // # 9762 should fallthrough to `key in el` logic for non embedded tags
  test('width and height on custom elements', () => {
    const el = document.createElement('foobar')
    patchProp(el, 'width', null, '24px')
    expect(el.getAttribute('width')).toBe('24px')
  })

  test('translate attribute', () => {
    const el = document.createElement('div')
    patchProp(el, 'translate', null, 'no')
    expect(el.translate).toBeFalsy()
    expect(el.getAttribute('translate')).toBe('no')
  })

  // #11647
  test('should not trigger input mutation when `value` is `undefined`', async () => {
    const fn = vi.fn()
    // const comp = {
    //   setup() {
    //     const checked = ref()
    //     return () =>
    //       withDirectives(
    //         h('input', {
    //           type: 'checkbox',
    //           value: undefined,
    //           'onUpdate:modelValue': (value: any) => {
    //             checked.value = value
    //           },
    //         }),
    //         [[vModelCheckbox, checked.value]],
    //       )
    //   },
    // }
    class Comp extends TypeFragment {
      className = 'Comp';
      override setup() {
        const checked = signal<number>();
        this.addChild(new Input({
          attrObj: {
            type: 'checkbox',
            value: undefined,
          },
          vModel: checked,
          'onUpdate:modelValue': (value: any) => {
            checked.set(value);
          },
        }));
      }
    }

    const root = document.createElement('div')
    // render(h(comp), root)
    render(new Comp(), root);
    document.body.append(root)

    const el = root.children[0] as HTMLInputElement
    const observer = new MutationObserver(fn)
    observer.observe(el, {
      attributes: true,
    })

    el.click()
    await nextTick()

    expect(fn).toBeCalledTimes(0)
  })
})
