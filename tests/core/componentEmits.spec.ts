// Note: emits and listener fallthrough is tested in
// ./rendererAttrsFallthrough.spec.ts.

// import {
//   type ComponentPublicInstance,
//   createApp,
//   defineComponent,
//   h,
//   nextTick,
//   nodeOps,
//   render,
//   toHandlers,
// } from '@vue/runtime-test'

import { AnyFn } from '@type-dom/utils';
import {
  TypeFragment, FragmentProps, TypeDiv, Div,
  render, onCreated,
  addEmits, isEmitListener,
  toHandlers,
  onBeforeUnmount, nextTick, createApp, DivProps
} from '../../src';

describe('component: emit', () => {
  test('trigger handlers', () => {
    // const Foo = defineComponent({
    //   render() {},
    //   created() {
    //     // the `emit` function is bound on component instances
    //     this.$emit('foo')
    //     this.$emit('bar')
    //     this.$emit('!baz')
    //   },
    // })
    type FooProps = { onfoo: any } & FragmentProps;
    class Foo extends TypeFragment<FooProps> {
      className = 'Foo';
      override setup() {
        onCreated(() => {
          this.emit('foo');
          this.emit('bar');
          this.emit('!baz');
        })
      }
    }

    const onfoo = vi.fn()
    const onBar = vi.fn()
    const onBaz = vi.fn()
    // const Comp = () => h(Foo, { onfoo, onBar, ['on!baz']: onBaz })
    const comp = new Foo({
      onfoo,
      onBar,
      ['on!baz']: onBaz,
    })
    // render(h(Comp), nodeOps.createElement('div'))
    render(comp, document.createElement('div'))

    expect(onfoo).not.toHaveBeenCalled()
    // only capitalized or special chars are considered event listeners
    expect(onBar).toHaveBeenCalled()
    expect(onBaz).toHaveBeenCalled()
  })

  test('trigger camelCase handler', () => {
    // const Foo = defineComponent({
    //   render() {},
    //   created() {
    //     this.$emit('test-event')
    //   },
    // })
    class Foo extends TypeFragment {
      className = 'Foo';
      override setup() {
        onCreated(() => {
          this.emit('test-event');
        })
      }
    }

    const fooSpy = vi.fn()
    // const Comp = () =>
    //   h(Foo, {
    //     onTestEvent: fooSpy,
    //   })
    const comp = new Foo({
      onTestEvent: fooSpy,
    })
    // render(h(Comp), nodeOps.createElement('div'))
    render(comp, document.createElement('div'))

    expect(fooSpy).toHaveBeenCalledTimes(1)
  })

  test('trigger kebab-case handler', () => {
    // const Foo = defineComponent({
    //   render() {},
    //   created() {
    //     this.$emit('test-event')
    //   },
    // })
    class Foo extends TypeFragment {
      className = 'Foo';
      override setup() {
        onCreated(() => {
          this.emit('test-event');
        })
      }
    }

    const fooSpy = vi.fn()
    // const Comp = () =>
    //   h(Foo, {
    //     'onTest-event': fooSpy,
    //   })
    const comp = new Foo({
      'onTest-event': fooSpy,
    })
    // render(h(Comp), nodeOps.createElement('div'))
    render(comp, document.createElement('div'))

    expect(fooSpy).toHaveBeenCalledTimes(1)
  })

  // #3527
  test('trigger mixed case handlers', () => {
    // const Foo = defineComponent({
    //   render() {},
    //   created() {
    //     this.$emit('test-event')
    //     this.$emit('testEvent')
    //   },
    // })
    class Foo extends TypeFragment {
      className = 'Foo';
      override setup() {
        onCreated(() => {
          this.emit('test-event');
          this.emit('testEvent');
        })
      }
    }

    const fooSpy = vi.fn()
    const barSpy = vi.fn()
    // const Comp = () =>
    //   // simulate v-on="obj" usage
    //   h(
    //     Foo,
    //     toHandlers({
    //       'test-event': fooSpy,
    //       testEvent: barSpy,
    //     }),
    //   )
    const comp = new Foo(toHandlers({
      'test-event': fooSpy,
      testEvent: barSpy,
    }))
    // render(h(Comp), nodeOps.createElement('div'))
    render(comp, document.createElement('div'))

    expect(fooSpy).toHaveBeenCalledTimes(1)
    expect(barSpy).toHaveBeenCalledTimes(1)
  })

  // for v-model:foo-bar usage in DOM templates
  test('trigger hyphenated events for update:xxx events', () => {
    // const Foo = defineComponent({
    //   render() {},
    //   created() {
    //     this.$emit('update:fooProp')
    //     this.$emit('update:barProp')
    //   },
    // })
    class Foo extends TypeFragment {
      className = 'Foo';
      override setup() {
        onCreated(() => {
          this.emit('update:fooProp');
          this.emit('update:barProp');
        })
      }
    }

    const fooSpy = vi.fn()
    const barSpy = vi.fn()
    // const Comp = () =>
    //   h(Foo, {
    //     'onUpdate:fooProp': fooSpy,
    //     'onUpdate:bar-prop': barSpy,
    //   })
    const comp = new Foo({
      'onUpdate:fooProp': fooSpy,
      'onUpdate:bar-prop': barSpy,
    })
    // render(h(Comp), nodeOps.createElement('div'))
    render(comp, document.createElement('div'))

    expect(fooSpy).toHaveBeenCalled()
    expect(barSpy).toHaveBeenCalled()
  })

  test('should trigger array of listeners', async () => {
    // const Child = defineComponent({
    //   setup(_, { emit }) {
    //     emit('foo', 1)
    //     return () => h('div')
    //   },
    // })
    class Child extends TypeDiv {
      className = 'Child';
      override setup() {
        onCreated(() => {
          this.emit('foo', 1);
        })
      }
    }

    const fn1 = vi.fn()
    const fn2 = vi.fn()

    // const App = {
    //   setup() {
    //     return () =>
    //       h(Child, {
    //         onFoo: [fn1, fn2],
    //       })
    //   },
    // }
    class App extends TypeFragment {
      className = 'App';
      override setup() {
        this.addChild(new Child({
          onFoo: [fn1, fn2],
        }))
      }
    }

    // render(h(App), nodeOps.createElement('div'))
    render(new App(), document.createElement('div'))
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn1).toHaveBeenCalledWith(1)
    expect(fn2).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledWith(1)
  })

  test('warning for undeclared event (array)', () => {
    // const Foo = defineComponent({
    //   emits: ['foo'],
    //   render() {},
    //   created() {
    //     // @ts-expect-error
    //     this.$emit('bar-baz')
    //   },
    // })
    class Foo extends TypeFragment {
      className = 'Foo';
      override setup() {
        addEmits(this, ['foo']);
        onCreated(() => {
          this.emit('bar-baz');
        })
      }
    }
    // render(h(Foo), nodeOps.createElement('div'))
    render(new Foo(), document.createElement('div'))
    // expect(
    //   `Component emitted event "bar-baz" but it is neither declared in the emits option nor as an "onBarBaz" prop`,
    // ).toHaveBeenWarned()
  })

  test('warning for undeclared event (object)', () => {
    // const Foo = defineComponent({
    //   emits: {
    //     foo: null,
    //   },
    //   render() {},
    //   created() {
    //     // @ts-expect-error
    //     this.$emit('bar-baz')
    //   },
    // })
    class Foo extends TypeFragment {
      className = 'Foo';
      override setup() {
        addEmits(this, {
          foo: null,
        });
        onCreated(() => {
          this.emit('bar-baz');
        })
      }
    }
    // render(h(Foo), nodeOps.createElement('div'))
    render(new Foo(), document.createElement('div'))
    // expect(
    //   `Component emitted event "bar-baz" but it is neither declared in the emits option nor as an "onBarBaz" prop`,
    // ).toHaveBeenWarned()
  })

  // test('should not warn if has equivalent onXXX prop', () => {
  //   // const Foo = defineComponent({
  //   //   props: ['onFoo'],
  //   //   emits: [],
  //   //   render() {},
  //   //   created() {
  //   //     // @ts-expect-error
  //   //     this.$emit('foo')
  //   //   },
  //   // })
  //   // render(h(Foo), nodeOps.createElement('div'))
  //   // expect(
  //   //   `Component emitted event "foo" but it is neither declared`,
  //   // ).not.toHaveBeenWarned()
  // })
  //
  // test('should not warn if has equivalent onXXX prop with kebab-cased event', () => {
  //   const Foo = defineComponent({
  //     props: ['onFooBar'],
  //     emits: [],
  //     render() {},
  //     created() {
  //       // @ts-expect-error
  //       this.$emit('foo-bar')
  //     },
  //   })
  //   render(h(Foo), nodeOps.createElement('div'))
  //   expect(
  //     `Component emitted event "foo-bar" but it is neither declared`,
  //   ).not.toHaveBeenWarned()
  // })

  test('validator warning', () => {
    // const Foo = defineComponent({
    //   emits: {
    //     foo: (arg: number) => arg > 0,
    //   },
    //   render() {},
    //   created() {
    //     this.$emit('foo', -1)
    //   },
    // })
    class Foo extends TypeFragment {
      className = 'Foo';
      constructor(params: FragmentProps = {}) {
        super(params);
        addEmits(this, {
          foo: (arg: number) => arg > 0,
        });
      }
      override setup() {
        onCreated(() => {
          this.emit('foo', -1);
        })
      }
    }
    // render(h(Foo), nodeOps.createElement('div'))
    render(new Foo(), document.createElement('div'))
    // expect(`event validation failed for event "foo"`).toHaveBeenWarned()
  })

  // test('merging from mixins', () => {
  //   const mixin = {
  //     emits: {
  //       foo: (arg: number) => arg > 0,
  //     },
  //   }
  //   const Foo = defineComponent({
  //     mixins: [mixin],
  //     render() {},
  //     created() {
  //       this.$emit('foo', -1)
  //     },
  //   })
  //   render(h(Foo), nodeOps.createElement('div'))
  //   expect(`event validation failed for event "foo"`).toHaveBeenWarned()
  // })
  //
  // // #2651
  // test('should not attach normalized object when mixins do not contain emits', () => {
  //   const Foo = defineComponent({
  //     mixins: [{}],
  //     render() {},
  //     created() {
  //       this.$emit('foo')
  //     },
  //   })
  //   render(h(Foo), nodeOps.createElement('div'))
  //   expect(
  //     `Component emitted event "foo" but it is neither declared`,
  //   ).not.toHaveBeenWarned()
  // })

  test('.once', () => {
    // const Foo = defineComponent({
    //   render() {},
    //   emits: {
    //     foo: null,
    //     bar: null,
    //   },
    //   created() {
    //     this.$emit('foo')
    //     this.$emit('foo')
    //     this.$emit('bar')
    //     this.$emit('bar')
    //   },
    // })
    class Foo extends TypeFragment {
      className = 'Foo';
      override setup() {
        addEmits(this, {
          foo: null,
          bar: null,
        });
        onCreated(() => {
          this.emit('foo');
          this.emit('foo');
          this.emit('bar');
          this.emit('bar');
        })
      }
    }
    const fn = vi.fn()
    const barFn = vi.fn()
    // render(
    //   h(Foo, {
    //     onFooOnce: fn,
    //     onBarOnce: barFn,
    //   }),
    //   nodeOps.createElement('div'),
    // )
    render(new Foo({
      onFooOnce: fn,
      onBarOnce: barFn,
    }), document.createElement('div'))
    expect(fn).toHaveBeenCalledTimes(1)
    expect(barFn).toHaveBeenCalledTimes(1)
  })

  test('.once with normal listener of the same name', () => {
    // const Foo = defineComponent({
    //   render() {},
    //   emits: {
    //     foo: null,
    //   },
    //   created() {
    //     this.$emit('foo')
    //     this.$emit('foo')
    //   },
    // })
    class Foo extends TypeFragment {
      className = 'Foo';
      override setup() {
        addEmits(this, {
          foo: null,
        });
        onCreated(() => {
          this.emit('foo');
          this.emit('foo');
        })
      }
    }
    const onFoo = vi.fn()
    const onFooOnce = vi.fn()
    // render(
    //   h(Foo, {
    //     onFoo,
    //     onFooOnce,
    //   }),
    //   nodeOps.createElement('div'),
    // )
    render(new Foo({
      onFoo,
      onFooOnce,
    }), document.createElement('div'));
    expect(onFoo).toHaveBeenCalledTimes(2)
    expect(onFooOnce).toHaveBeenCalledTimes(1)
  })

  test('.number modifier should work with v-model on component', () => {
    // const Foo = defineComponent({
    //   render() {},
    //   created() {
    //     this.$emit('update:modelValue', '1')
    //     this.$emit('update:foo', '2')
    //   },
    // })
    interface FooProps extends FragmentProps {
      modelValue?: string | null;
      modelModifiers?: {
        number: boolean;
      };
      foo?: string | null;
      fooModifiers?: {
        number?: boolean;
      };
    }
    class Foo extends TypeFragment<FooProps> {
      className = 'Foo';
      constructor(params: FooProps = {}) {
        super(params);
      }
      override setup() {
        onCreated(() => {
          this.emit('update:modelValue', '1');
          this.emit('update:foo', '2');
        })
      }
    }

    const fn1 = vi.fn()
    const fn2 = vi.fn()

    // const Comp = () =>
    //   h(Foo, {
    //     modelValue: null,
    //     modelModifiers: { number: true },
    //     'onUpdate:modelValue': fn1,
    //
    //     foo: null,
    //     fooModifiers: { number: true },
    //     'onUpdate:foo': fn2,
    //   })
    const comp = new Foo({
      modelValue: null,
      modelModifiers: { number: true },
      'onUpdate:modelValue': fn1,

      foo: null,
      fooModifiers: { number: true },
      'onUpdate:foo': fn2,
    })

    // render(h(Comp), nodeOps.createElement('div'))
    render(comp, document.createElement('div'));

    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn1).toHaveBeenCalledWith(1)
    expect(fn2).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledWith(2)
  })

  test('.trim modifier should work with v-model on component', () => {
    // const Foo = defineComponent({
    //   render() {},
    //   created() {
    //     this.$emit('update:modelValue', ' one ')
    //     this.$emit('update:foo', '  two  ')
    //   },
    // })
    interface FooProps extends FragmentProps {
      modelValue?: string | null;
      modelModifiers?: {
        trim: boolean;
      },
      'onUpdate:modelValue': AnyFn,
      foo?: string | null;
      fooModifiers?: {
        trim?: boolean;
      };
      'onUpdate:foo': AnyFn,
    }
    class Foo extends TypeFragment<FooProps> {
      className = 'Foo';
      override setup() {
        onCreated(() => {
          this.emit('update:modelValue', ' one ');
          this.emit('update:foo', '  two  ');
        })
      }
    }

    const fn1 = vi.fn()
    const fn2 = vi.fn()

    // const Comp = () =>
    //   h(Foo, {
    //     modelValue: null,
    //     modelModifiers: { trim: true },
    //     'onUpdate:modelValue': fn1,
    //
    //     foo: null,
    //     fooModifiers: { trim: true },
    //     'onUpdate:foo': fn2,
    //   })
    const comp = new Foo({
      modelValue: null,
      modelModifiers: { trim: true },
      'onUpdate:modelValue': fn1,

      foo: null,
      fooModifiers: { trim: true },
      'onUpdate:foo': fn2,
    })

    // render(h(Comp), nodeOps.createElement('div'))
    render(comp, document.createElement('div'));

    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn1).toHaveBeenCalledWith('one')
    expect(fn2).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledWith('two')
  })

  test('.trim modifier should work with v-model on component for kebab-cased props and camelCased emit', () => {
    // const Foo = defineComponent({
    //   render() {},
    //   created() {
    //     this.$emit('update:firstName', ' one ')
    //   },
    // })
    interface FooProps extends FragmentProps {
      'first-name': string | null,
      // 'first-nameModifiers': { trim: boolean },
      // 'onUpdate:first-name': AnyFn,
    }
    class Foo extends TypeFragment<FooProps> {
      className = 'Foo';
      override setup() {
        onCreated(() => {
          this.emit('update:firstName', ' one ');
        })
      }
    }

    const fn1 = vi.fn()

    // const Comp = () =>
    //   h(Foo, {
    //     'first-name': null,
    //     'first-nameModifiers': { trim: true },
    //     'onUpdate:first-name': fn1,
    //   })
    const comp = new Foo({
      'first-name': null,
      'first-nameModifiers': { trim: true },
      'onUpdate:first-name': fn1,
    })

    // render(h(Comp), nodeOps.createElement('div'))
    render(comp, document.createElement('div'));

    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn1).toHaveBeenCalledWith('one')
  })

  test('.trim modifier should work with v-model on component for camelCased props and kebab-cased emit', () => {
    // const Foo = defineComponent({
    //   render() {},
    //   created() {
    //     this.$emit('update:model-value', ' one ')
    //     this.$emit('update:first-name', ' two ')
    //   },
    // })
    interface FooProps extends FragmentProps {
      firstName?: null,
    }
    class Foo extends TypeFragment<FooProps> {
      className = 'Foo';
      override setup() {
        onCreated(() => {
          this.emit('update:model-value', ' one ');
          this.emit('update:first-name', ' two ');
        })
      }
    }

    const fn1 = vi.fn()
    const fn2 = vi.fn()

    // const Comp = () =>
    //   h(Foo, {
    //     modelValue: null,
    //     modelModifiers: { trim: true },
    //     'onUpdate:modelValue': fn1,
    //
    //     firstName: null,
    //     firstNameModifiers: { trim: true },
    //     'onUpdate:firstName': fn2,
    //   })
    const comp = new Foo({
      modelValue: null,
      modelModifiers: { trim: true },
      'onUpdate:modelValue': fn1,
      firstName: null,
      firstNameModifiers: { trim: true },
      'onUpdate:firstName': fn2,
    })

    // render(h(Comp), nodeOps.createElement('div'))
    render(comp, document.createElement('div'));

    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn1).toHaveBeenCalledWith('one')
    expect(fn2).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledWith('two')
  })

  test('.trim modifier should work with v-model on component for mixed cased props and emit', () => {
    // const Foo = defineComponent({
    //   render() {},
    //   created() {
    //     this.$emit('update:base-URL', ' one ')
    //   },
    // })
    interface FooProps extends FragmentProps {
      'base-URL': string | null,
    }
    class Foo extends TypeFragment<FooProps> {
      className = 'Foo';
      override setup() {
        onCreated(() => {
          this.emit('update:base-URL', ' one ');
        })
      }
    }

    const fn1 = vi.fn()

    // const Comp = () =>
    //   h(Foo, {
    //     'base-URL': null,
    //     'base-URLModifiers': { trim: true },
    //     'onUpdate:base-URL': fn1,
    //   })
    const comp = new Foo({
      'base-URL': null,
      'base-URLModifiers': { trim: true },
      'onUpdate:base-URL': fn1,
    })

    // render(h(Comp), nodeOps.createElement('div'))
    render(comp, document.createElement('div'));

    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn1).toHaveBeenCalledWith('one')
  })

  test('.trim and .number modifiers should work with v-model on component', () => {
    // const Foo = defineComponent({
    //   render() {},
    //   created() {
    //     this.$emit('update:modelValue', '    +01.2    ')
    //     this.$emit('update:foo', '    1    ')
    //   },
    // })
    interface FooProps extends FragmentProps {
      foo?: null,
    }
    class Foo extends TypeFragment<FooProps> {
      className = 'Foo';
      override setup() {
        onCreated(() => {
          this.emit('update:modelValue', '    +01.2    ');
          this.emit('update:foo', '    1    ');
        })
      }
    }

    const fn1 = vi.fn()
    const fn2 = vi.fn()

    // const Comp = () =>
    //   h(Foo, {
    //     modelValue: null,
    //     modelModifiers: { trim: true, number: true },
    //     'onUpdate:modelValue': fn1,
    //
    //     foo: null,
    //     fooModifiers: { trim: true, number: true },
    //     'onUpdate:foo': fn2,
    //   })
    const comp = new Foo({
      modelValue: null,
      modelModifiers: { trim: true, number: true },
      'onUpdate:modelValue': fn1,
      foo: null,
      fooModifiers: { trim: true, number: true },
      'onUpdate:foo': fn2,
    })

    // render(h(Comp), nodeOps.createElement('div'))
    render(comp, document.createElement('div'));

    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn1).toHaveBeenCalledWith(1.2)
    expect(fn2).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledWith(1)
  })

  test('only trim string parameter when work with v-model on component', () => {
    // const Foo = defineComponent({
    //   render() {},
    //   created() {
    //     this.$emit('update:modelValue', ' foo ', { bar: ' bar ' })
    //   },
    // })
    interface FooProps extends FragmentProps {

    }
    class Foo extends TypeFragment<FooProps> {
      className = 'Foo';
      override setup() {
        onCreated(() => {
          this.emit('update:modelValue', ' foo ', { bar: ' bar ' });
        })
      }
    }

    const fn = vi.fn()
    // const Comp = () =>
    //   h(Foo, {
    //     modelValue: null,
    //     modelModifiers: { trim: true },
    //     'onUpdate:modelValue': fn,
    //   })
    const comp = new Foo({
      modelValue: null,
      modelModifiers: { trim: true },
      'onUpdate:modelValue': fn,
    })

    // render(h(Comp), nodeOps.createElement('div'))
    render(comp, document.createElement('div'));

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('foo', { bar: ' bar ' })
  })

  test('isEmitListener', () => {
    const options = {
      click: null,
      'test-event': null,
      fooBar: null,
      FooBaz: null,
    }
    expect(isEmitListener(options, 'onClick')).toBe(true)
    expect(isEmitListener(options, 'onclick')).toBe(false)
    expect(isEmitListener(options, 'onBlick')).toBe(false)
    // .once listeners
    expect(isEmitListener(options, 'onClickOnce')).toBe(true)
    expect(isEmitListener(options, 'onclickOnce')).toBe(false)
    // kebab-case option
    expect(isEmitListener(options, 'onTestEvent')).toBe(true)
    // camelCase option
    expect(isEmitListener(options, 'onFooBar')).toBe(true)
    // PascalCase option
    expect(isEmitListener(options, 'onFooBaz')).toBe(true)
  })

  test('does not emit after unmount', async () => {
    const fn = vi.fn()
    // const Foo = defineComponent({
    //   emits: ['closing'],
    //   async beforeUnmount() {
    //     await this.$nextTick()
    //     this.$emit('closing', true)
    //   },
    //   render() {
    //     return h('div')
    //   },
    // })
    interface FooProps extends DivProps {}
    class Foo extends TypeDiv<FooProps> {
      className = 'Foo';
      override setup() {
        onBeforeUnmount(async () => {
          await nextTick()
          this.emit?.('closing', true);
        })
      }
    }
    // const Comp = () =>
    //   h(Foo, {
    //     onClosing: fn,
    //   })
    const comp = new Foo({
      onClosing: fn,
    })

    const el = document.createElement('div')
    // render(h(Comp), el)
    render(comp, el);
    await nextTick()
    render(null, el)
    await nextTick()
    expect(fn).not.toHaveBeenCalled()
  })

  // test('merge string array emits', async () => {
  //   const ComponentA = defineComponent({
  //     emits: ['one', 'two'],
  //   })
  //   const ComponentB = defineComponent({
  //     emits: ['three'],
  //   })
  //   const renderFn = vi.fn(function (this: ComponentPublicInstance) {
  //     expect(this.$options.emits).toEqual(['one', 'two', 'three'])
  //     return h('div')
  //   })
  //   const ComponentC = defineComponent({
  //     render: renderFn,
  //     mixins: [ComponentA, ComponentB],
  //   })
  //   const el = nodeOps.createElement('div')
  //   expect(renderFn).toHaveBeenCalledTimes(0)
  //   render(h(ComponentC), el)
  //   expect(renderFn).toHaveBeenCalledTimes(1)
  // })

  // test('merge object emits', async () => {
  //   const twoFn = vi.fn((v: unknown) => !v)
  //   // const ComponentA = defineComponent({
  //   //   emits: {
  //   //     one: null,
  //   //     two: twoFn,
  //   //   },
  //   // })
  //   class ComponentA extends TypeFragment {
  //     className = 'ComponentA';
  //     constructor(params: FragmentProps) {
  //       super(params)
  //       this.addEmits({
  //         one: null,
  //         two: twoFn,
  //       })
  //     }
  //   }
  //   // const ComponentB = defineComponent({
  //   //   emits: ['three'],
  //   // })
  //   class ComponentB extends TypeFragment {
  //     className = 'ComponentB';
  //     constructor(params: FragmentProps) {
  //       super(params)
  //       this.addEmits(['three'])
  //     }
  //   }
  //   const renderFn = vi.fn(function (this: TypeNode) {
  //     expect(this.props.emits).toEqual({
  //       one: null,
  //       two: twoFn,
  //       three: null,
  //     })
  //     expect(this.props.emits?.two).toBe(twoFn)
  //     // return h('div')
  //     return new Div();
  //   })
  //   // const ComponentC = defineComponent({
  //   //   render: renderFn,
  //   //   mixins: [ComponentA, ComponentB],
  //   // })
  //   class ComponentC extends TypeFragment {
  //     className = 'ComponentC';
  //     constructor(params: FragmentProps = {}) {
  //       super(params)
  //       this.addChild(renderFn.bind(this)());
  //     }
  //   }
  //   const el = document.createElement('div')
  //   expect(renderFn).toHaveBeenCalledTimes(0)
  //   // render(h(ComponentC), el)
  //   render(new ComponentC(), el)
  //   expect(renderFn).toHaveBeenCalledTimes(1)
  // })

  test('merging emits for a component that is also used as a mixin', () => {
    // const render = () => h('div')
    // const CompA = {
    //   render,
    // }
    class CompA extends TypeDiv {
      className = 'CompA';
    }
    const validateByMixin = vi.fn(() => true)
    const validateByGlobalMixin = vi.fn(() => true)

    // const mixin = {
    //   emits: {
    //     one: validateByMixin,
    //   },
    // }

    // const CompB = defineComponent({
    //   mixins: [mixin, CompA],
    //   created(this) {
    //     this.$emit('one', 1)
    //   },
    //   render,
    // })
    class CompB extends TypeDiv {
      className = 'CompB';
      override setup() {
        this.addEmits({
          one: validateByMixin,
        });
        onCreated(() => {
          this.emit('one', 1);
        });
      }
    }

    // const app = createApp({
    //   render() {
    //     return [h(CompA), h(CompB)]
    //   },
    // })
    const app = createApp(new Div({
      slot: [new CompA(), new CompB()]
    }))
    app.addEmits({
      one: validateByGlobalMixin,
      two: null,
    })
    // app.mixin({
    //   emits: {
    //     one: validateByGlobalMixin,
    //     two: null,
    //   },
    // })

    const root = document.createElement('div')
    app.mount(root)
    expect(validateByMixin).toHaveBeenCalledTimes(1)
    expect(validateByGlobalMixin).not.toHaveBeenCalled()
  })
})
