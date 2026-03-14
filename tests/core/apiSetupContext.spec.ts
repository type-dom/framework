// import { reactive, ref } from '@vue/reactivity'
// import {
//   type TestElement,
//   defineComponent,
//   h,
//   nextTick,
//   nodeOps,
//   render,
//   renderToString,
//   serializeInner,
//   triggerEvent,
//   watchEffect,
// } from '@vue/runtime-test'

import { computed, effect, signal } from '@type-dom/signals';
import {
  Div,
  DivProps,
  Fragment,
  FragmentProps,
  TypeDiv,
  TypeFragment, Ref,
  addAttrObj,
  render,
  renderToString,
  nextTick, triggerEvent,
  transformSlot, addEvents
} from '../../src';

describe('api: setup context', () => {
  it('should expose return values to template render context', () => {
    const Comp = new Fragment({
      setup(this: Fragment) {
        // return {
        //   // ref should auto-unwrap
        //   ref: signal('foo'),
        //   // object exposed as-is
        //   object: { msg: signal('bar') },
        //   // primitive value exposed as-is
        //   value: 'baz',
        // }
        const ref = signal('foo')
        const object = { msg: signal('bar') }
        const value = 'baz'
        this.addChild(computed(() => ref.get() + ' ' + object.msg.get() + ' ' + value))
      },
      // render() {
      //   return `${this.ref} ${this.object.msg} ${this.value}`
      // },
    })
    expect(renderToString(Comp)).toMatch(`foo bar baz`)
  })

  it('should support returning render function', () => {
    const Comp = new Div({
      setup(this: Div) {
        // return () => {
        //   return h('div', 'hello')
        // }
        this.addChild('hello')
      },
    })
    expect(renderToString(Comp)).toMatch(`hello`)
  })

  it('props', async () => {
    const count = signal(0)
    let dummy;

    // const Parent = {
    //   render: () => h(Child, { count: count.value }),
    // }
    class Parent extends TypeFragment {
      className = 'Parent';
      override setup() {
        this.addChild(new Child({
          count: count,
        }))
      }
    }

    // const Child = defineComponent({
    //   props: { count: Number },
    //   setup(props) {
    //     watchEffect(() => {
    //       dummy = props.count
    //     })
    //     return () => h('div', props.count)
    //   },
    // })
    type ChildProps = { count?: Ref<number> } & DivProps;
    class Child extends TypeDiv<ChildProps> {
      className = 'Child';
      constructor(params: ChildProps = {}) {
        super(params);
      }
      override setup(props: ChildProps) {
        effect(() => {
          dummy = props.count?.get()
        })
        this.addChild(props.count);
      }
    }

    const root = document.createElement('div')
    render(new Parent(), root);
    expect(root.innerHTML).toMatch(`<div>0</div>`);
    expect(dummy).toBe(0);

    // props should be reactive
    count.set(count.get() + 1);
    await nextTick();
    expect(root.innerHTML).toMatch(`<div>1</div>`);
    expect(dummy).toBe(1);
  })

  it('context.attrs', async () => {
    const toggle = signal(true)

    // const Parent = {
    //   render: () => h(Child, toggle.value ? { id: 'foo' } : { class: 'baz' }),
    // }
    class Parent extends TypeFragment {
      className = 'Parent';
      override setup(this: Fragment, props: any) {
        const attrObj = computed(() => {
          return toggle.get() ? { id: 'foo' } : { class: 'baz' };
        })
        this.addChild(new Child({
          attrObj: attrObj,
        }));
      }
    }

    // const Child = {
    //   // explicit empty props declaration
    //   // puts everything received in attrs
    //   // disable implicit fallthrough
    //   inheritAttrs: false,
    //   setup(props: any, { attrs }: any) {
    //     return () => h('div', attrs)
    //   },
    // }
    type ChildProps = { inheritAttrs?: boolean; } & DivProps;
    class Child extends  TypeDiv<ChildProps> {
      className = 'Child';
      // inheritAttrs: false
      override setup(props: ChildProps) {
        addAttrObj(this, props.attrObj);
      }
    }

    const root = document.createElement('div')
    render(new Parent(), root);
    expect(root.innerHTML).toMatch(`<div id="foo"></div>`)

    // should update even though it's not reactive
    toggle.set(false)
    await nextTick()
    expect(root.innerHTML).toMatch(`<div class="baz"></div>`)
  })

  // #4161
  // it('context.attrs in child component slots', async () => {
  //   const toggle = signal(true)
  //
  //   // const Parent = {
  //   //   render: () => h(Child, toggle.value ? { id: 'foo' } : { class: 'baz' }),
  //   // }
  //   class Parent extends TypeFragment {
  //     className = 'Parent';
  //     override setup(props: any) {
  //       const attrObj = computed(() => {
  //         return toggle.get() ? { id: 'foo' } : { class: 'baz' };
  //       })
  //       this.addChild(new Child({
  //         attrObj: attrObj,
  //       }));
  //     }
  //   }
  //
  //   const Wrapper = {
  //     render(this: any) {
  //       return this.$slots.default()
  //     },
  //   }
  //
  //   // const Child = {
  //   //   inheritAttrs: false,
  //   //   setup(_: any, { attrs }: any) {
  //   //     return () => {
  //   //       const vnode = h(Wrapper, null, {
  //   //         default: () => [h('div', attrs)],
  //   //         _: 1, // mark stable slots
  //   //       })
  //   //       vnode.dynamicChildren = [] // force optimized mode
  //   //       return vnode
  //   //     }
  //   //   },
  //   // }
  //   class Child extends TypeDiv<ChildProps> {
  //
  //   }
  //
  //   const root = document.createElement('div')
  //   render(h(Parent), root)
  //   expect(serializeInner(root)).toMatch(`<div id="foo"></div>`)
  //
  //   // should update even though it's not reactive
  //   toggle.value = false
  //   await nextTick()
  //   expect(serializeInner(root)).toMatch(`<div class="baz"></div>`)
  // })

  it('context.slots', async () => {
    const id = signal('foo')

    // const Parent = {
    //   render: () =>
    //     h(Child, null, {
    //       foo: () => id.value,
    //       bar: () => 'bar',
    //     }),
    // }
    class Parent extends TypeFragment {
      className = 'Parent';
      override setup(props: any) {
        this.addChild(new Child({
          slots: {
            foo: () => id.get(),
            bar: () => 'bar',
          },
        }));
      }
    }

    // const Child = {
    //   setup(props: any, { slots }: any) {
    //     return () => h('div', [...slots.foo(), ...slots.bar()])
    //   },
    // }
    type ChildProps = { slots?: { foo: () => string, bar: () => string } } & DivProps;
    class Child extends TypeDiv<ChildProps> {
      className = 'Child';
      constructor(params: ChildProps = {}) {
        super(params);
        transformSlot(this, () => [params.slots?.foo(), params.slots?.bar()]);
      }
    }

    const root = document.createElement('div')
    render(new Parent(), root)
    expect(root.innerHTML).toMatch(`<div>foobar</div>`)

    // should update even though it's not reactive
    id.set('baz');
    await nextTick()
    expect(root.innerHTML).toMatch(`<div>bazbar</div>`)
  })

  it('context.emit', async () => {
    const count = signal(0)
    const spy =  vi.fn()

    // const Parent = {
    //   render: () =>
    //     h(Child, {
    //       count: count.value,
    //       onInc: (newVal: number) => {
    //         spy()
    //         count.value = newVal
    //       },
    //     }),
    // }
    type ParentProps = {
      count?: number;
      onInc?: (newVal: number) => void;
    } & FragmentProps
    class Parent extends TypeFragment<ParentProps> {
      className = 'Parent';
      constructor(params: ParentProps = {}) {
        super(params);
        this.addChild(new Child({
          count: count,
          onInc: (newVal: number) => {
            spy();
            count.set(newVal);
          },
        }))
      }
    }

    // const Child = defineComponent({
    //   props: {
    //     count: {
    //       type: Number,
    //       default: 1,
    //     },
    //   },
    //   setup(props, { emit }) {
    //     return () =>
    //       h(
    //         'div',
    //         {
    //           onClick: () => emit('inc', props.count + 1),
    //         },
    //         props.count,
    //       )
    //   },
    // })
    type ChildProps = { count?: Ref<number> } & DivProps;
    class Child extends TypeDiv<ChildProps>  {
      className = 'Child';
      constructor(params: ChildProps = {}) {
        super(params);
        // defaultProps(this, {
        //   count: 1,
        // });
        this.className = 'Child';
        addEvents(this, {
          click: () => {
            console.warn('click');
            this.emit('inc', (this.props.count?.get() ?? 1) + 1);
          }
        })
        this.addChild(this.props.count);
      }
    }

    const root = new Div({ slot: new Parent() });
    // render(new Parent(), root.dom);
    root.mount(document.createElement('div'));
    expect(root.dom.innerHTML).toMatch(`<div>0</div>`)

    // emit should trigger parent handler
    triggerEvent(root.downRealElement!, 'click')
    expect(spy).toHaveBeenCalled()
    await nextTick()
    expect(root.dom.innerHTML).toMatch(`<div>1</div>`)
  })
})
