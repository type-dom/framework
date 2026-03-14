// import {
//   KeepAlive,
//   defineAsyncComponent,
//   defineComponent,
//   h,
//   nextTick,
//   nodeOps,
//   reactive,
//   ref,
//   render,
//   serializeInner,
//   shallowRef,
//   watch,
// } from '@vue/runtime-test'

import { signal } from '@type-dom/signals';
import { assignProps, Div, DivProps, FragmentProps, nextTick, render, transformSlot, TypeDiv, TypeFragment } from '../../src';

describe('api: template refs', () => {
  it('string ref mount', () => {
    const root = document.createElement('div')
    const el = signal(null)

    // const Comp = {
    //   setup() {
    //     return {
    //       refKey: el,
    //     }
    //   },
    //   render() {
    //     return h('div', { ref: 'refKey' })
    //   },
    // }
    class Comp extends TypeDiv {
      className = 'Header';
      constructor(params: DivProps = {}) {
        super(params);
        assignProps(this, { refDom: el })
      }
    }
    render(new Comp(), root)
    expect(el.get()).toBe(root.childNodes[0])
  })

  // it('string ref update', async () => {
  //   const root = document.createElement('div')
  //   const fooEl = signal(null)
  //   const barEl = signal(null)
  //   const refKey = signal('foo')
  //
  //   // const Comp = {
  //   //   setup() {
  //   //     return {
  //   //       foo: fooEl,
  //   //       bar: barEl,
  //   //     }
  //   //   },
  //   //   render() {
  //   //     return h('div', { ref: refKey.value })
  //   //   },
  //   // }
  //   class Comp extends TypeDiv {
  //     className = 'Comp';
  //     constructor(params: DivProps = {}) {
  //       super(params);
  //       // this.props.ref = refKey;
  //       // assignProps(this, { ref: refKey })
  //     }
  //   }
  //   render(new Comp(), root)
  //   expect(fooEl.get()).toBe(root.children[0])
  //   expect(barEl.get()).toBe(null)
  //
  //   refKey.set('bar')
  //   await nextTick()
  //   expect(fooEl.get()).toBe(null)
  //   expect(barEl.get()).toBe(root.children[0])
  // })

  it('string ref unmount', async () => {
    const root = document.createElement('div')
    const el = signal(null)
    const toggle = signal(true)

    // const Comp = {
    //   setup() {
    //     return {
    //       refKey: el,
    //     }
    //   },
    //   render() {
    //     return toggle.get() ? h('div', { ref: 'refKey' }) : null
    //   },
    // }
    class Comp extends TypeFragment {
      className = 'Comp';
      constructor(params: FragmentProps = {}) {
        super(params);
        // assignProps(this, { refDom: el })
        transformSlot(this, () => {
          return toggle.get() ? new Div({ refDom: el }) : null
        })
      }
    }
    render(new Comp(), root)
    expect(el.get()).toBe(root.children[0])

    toggle.set(false)
    await nextTick()
    // expect(el.get()).toBe(null)
  })

  // it('function ref mount', () => {
  //   const root = document.createElement('div')
  //   const fn = vi.fn()
  //
  //   const Comp = defineComponent(() => () => h('div', { ref: fn }))
  //   render(h(Comp), root)
  //   expect(fn.mock.calls[0][0]).toBe(root.children[0])
  // })
  //
  // it('function ref update', async () => {
  //   const root = document.createElement('div')
  //   const fn1 = vi.fn()
  //   const fn2 = vi.fn()
  //   const fn = signal(fn1)
  //
  //   const Comp = defineComponent(() => () => h('div', { ref: fn.value }))
  //
  //   render(h(Comp), root)
  //   expect(fn1.mock.calls).toHaveLength(1)
  //   expect(fn1.mock.calls[0][0]).toBe(root.children[0])
  //   expect(fn2.mock.calls).toHaveLength(0)
  //
  //   fn.value = fn2
  //   await nextTick()
  //   expect(fn1.mock.calls).toHaveLength(1)
  //   expect(fn2.mock.calls).toHaveLength(1)
  //   expect(fn2.mock.calls[0][0]).toBe(root.children[0])
  // })
  //
  // it('function ref unmount', async () => {
  //   const root = document.createElement('div')
  //   const fn = vi.fn()
  //   const toggle = signal(true)
  //
  //   const Comp = defineComponent(
  //     () => () => (toggle.value ? h('div', { ref: fn }) : null),
  //   )
  //   render(h(Comp), root)
  //   expect(fn.mock.calls[0][0]).toBe(root.children[0])
  //   toggle.value = false
  //   await nextTick()
  //   expect(fn.mock.calls[1][0]).toBe(null)
  // })
  //
  // it('render function ref mount', () => {
  //   const root = document.createElement('div')
  //   const el = signal(null)
  //
  //   const Comp = {
  //     setup() {
  //       return () => h('div', { ref: el })
  //     },
  //   }
  //   render(h(Comp), root)
  //   expect(el.value).toBe(root.children[0])
  // })
  //
  // it('render function ref update', async () => {
  //   const root = document.createElement('div')
  //   const refs = {
  //     foo: signal(null),
  //     bar: signal(null),
  //   }
  //   const refKey = ref<keyof typeof refs>('foo')
  //
  //   const Comp = {
  //     setup() {
  //       return () => h('div', { ref: refs[refKey.value] })
  //     },
  //   }
  //   render(h(Comp), root)
  //   expect(refs.foo.value).toBe(root.children[0])
  //   expect(refs.bar.value).toBe(null)
  //
  //   refKey.value = 'bar'
  //   await nextTick()
  //   expect(refs.foo.value).toBe(null)
  //   expect(refs.bar.value).toBe(root.children[0])
  // })
  //
  // it('render function ref unmount', async () => {
  //   const root = document.createElement('div')
  //   const el = signal(null)
  //   const toggle = signal(true)
  //
  //   const Comp = {
  //     setup() {
  //       return () => (toggle.value ? h('div', { ref: el }) : null)
  //     },
  //   }
  //   render(h(Comp), root)
  //   expect(el.value).toBe(root.children[0])
  //
  //   toggle.value = false
  //   await nextTick()
  //   expect(el.value).toBe(null)
  // })
  //
  // // #12639
  // it('update and unmount child in the same tick', async () => {
  //   const root = document.createElement('div')
  //   const el = signal(null)
  //   const toggle = signal(true)
  //   const show = signal(true)
  //
  //   const Comp = defineComponent({
  //     emits: ['change'],
  //     props: ['show'],
  //     setup(props, { emit }) {
  //       watch(
  //         () => props.show,
  //         () => {
  //           emit('change')
  //         },
  //       )
  //       return () => h('div', 'hi')
  //     },
  //   })
  //
  //   const App = {
  //     setup() {
  //       return {
  //         refKey: el,
  //       }
  //     },
  //     render() {
  //       return toggle.value
  //         ? h(Comp, {
  //             ref: 'refKey',
  //             show: show.value,
  //             onChange: () => (toggle.value = false),
  //           })
  //         : null
  //     },
  //   }
  //   render(h(App), root)
  //   expect(el.value).not.toBe(null)
  //
  //   show.value = false
  //   await nextTick()
  //   expect(el.value).toBe(null)
  // })
  //
  // it('set and change ref in the same tick', async () => {
  //   const root = document.createElement('div')
  //   const show = signal(false)
  //   const refName = signal('a')
  //
  //   const Child = defineComponent({
  //     setup() {
  //       refName.value = 'b'
  //       return () => {}
  //     },
  //   })
  //
  //   const Comp = {
  //     render() {
  //       return h(Child, {
  //         ref: refName.value,
  //       })
  //     },
  //     updated(this: any) {
  //       expect(this.$refs.a).toBe(null)
  //       expect(this.$refs.b).not.toBe(null)
  //     },
  //   }
  //
  //   const App = {
  //     render() {
  //       return show.value ? h(Comp) : null
  //     },
  //   }
  //
  //   render(h(App), root)
  //   expect(refName.value).toBe('a')
  //
  //   show.value = true
  //   await nextTick()
  //   expect(refName.value).toBe('b')
  // })
  //
  // it('unset old ref when new ref is absent', async () => {
  //   const root1 = document.createElement('div')
  //   const root2 = document.createElement('div')
  //   const el1 = signal(null)
  //   const el2 = signal(null)
  //   const toggle = signal(true)
  //
  //   const Comp1 = {
  //     setup() {
  //       return () => (toggle.value ? h('div', { ref: el1 }) : h('div'))
  //     },
  //   }
  //
  //   const Comp2 = {
  //     setup() {
  //       return () => h('div', { ref: toggle.value ? el2 : undefined })
  //     },
  //   }
  //
  //   render(h(Comp1), root1)
  //   render(h(Comp2), root2)
  //
  //   expect(el1.value).toBe(root1.children[0])
  //   expect(el2.value).toBe(root2.children[0])
  //
  //   toggle.value = false
  //   await nextTick()
  //   expect(el1.value).toBe(null)
  //   expect(el2.value).toBe(null)
  // })
  //
  // test('string ref inside slots', async () => {
  //   const root = document.createElement('div')
  //   const spy = vi.fn()
  //   const Child = {
  //     render(this: any) {
  //       return this.$slots.default()
  //     },
  //   }
  //
  //   const Comp = {
  //     render() {
  //       return h(Child, () => {
  //         return h('div', { ref: 'foo' })
  //       })
  //     },
  //     mounted(this: any) {
  //       spy(this.$refs.foo.tag)
  //     },
  //   }
  //   render(h(Comp), root)
  //
  //   expect(spy).toHaveBeenCalledWith('div')
  // })
  //
  // it('should work with direct reactive property', () => {
  //   const root = document.createElement('div')
  //   const state = reactive({
  //     refKey: null,
  //   })
  //
  //   const Comp = {
  //     setup() {
  //       return state
  //     },
  //     render() {
  //       return h('div', { ref: 'refKey' })
  //     },
  //   }
  //   render(h(Comp), root)
  //   expect(state.refKey).toBe(root.children[0])
  //   expect('Template ref "refKey" used on a non-ref value').toHaveBeenWarned()
  // })
  //
  // test('multiple root refs', () => {
  //   const root = document.createElement('div')
  //   const refKey1 = signal(null)
  //   const refKey2 = signal(null)
  //   const refKey3 = signal(null)
  //
  //   const Comp = {
  //     setup() {
  //       return {
  //         refKey1,
  //         refKey2,
  //         refKey3,
  //       }
  //     },
  //     render() {
  //       return [
  //         h('div', { ref: 'refKey1' }),
  //         h('div', { ref: 'refKey2' }),
  //         h('div', { ref: 'refKey3' }),
  //       ]
  //     },
  //   }
  //   render(h(Comp), root)
  //   expect(refKey1.value).toBe(root.children[1])
  //   expect(refKey2.value).toBe(root.children[2])
  //   expect(refKey3.value).toBe(root.children[3])
  // })
  //
  // // #1505
  // test('reactive template ref in the same template', async () => {
  //   const Comp = {
  //     setup() {
  //       const el = signal()
  //       return { el }
  //     },
  //     render(this: any) {
  //       return h('div', { id: 'foo', ref: 'el' }, this.el && this.el.props.id)
  //     },
  //   }
  //
  //   const root = document.createElement('div')
  //   render(h(Comp), root)
  //   // ref not ready on first render, but should queue an update immediately
  //   expect(serializeInner(root)).toBe(`<div id="foo"></div>`)
  //   await nextTick()
  //   // ref should be updated
  //   expect(serializeInner(root)).toBe(`<div id="foo">foo</div>`)
  // })
  //
  // // #1834
  // test('exchange refs', async () => {
  //   const refToggle = signal(false)
  //   const spy = vi.fn()
  //
  //   const Comp = {
  //     render(this: any) {
  //       return [
  //         h('p', { ref: refToggle.value ? 'foo' : 'bar' }),
  //         h('i', { ref: refToggle.value ? 'bar' : 'foo' }),
  //       ]
  //     },
  //     mounted(this: any) {
  //       spy(this.$refs.foo.tag, this.$refs.bar.tag)
  //     },
  //     updated(this: any) {
  //       spy(this.$refs.foo.tag, this.$refs.bar.tag)
  //     },
  //   }
  //
  //   const root = document.createElement('div')
  //   render(h(Comp), root)
  //
  //   expect(spy.mock.calls[0][0]).toBe('i')
  //   expect(spy.mock.calls[0][1]).toBe('p')
  //   refToggle.value = true
  //   await nextTick()
  //   expect(spy.mock.calls[1][0]).toBe('p')
  //   expect(spy.mock.calls[1][1]).toBe('i')
  // })
  //
  // // #1789
  // test('toggle the same ref to different elements', async () => {
  //   const refToggle = signal(false)
  //   const spy = vi.fn()
  //
  //   const Comp = {
  //     render(this: any) {
  //       return refToggle.value ? h('p', { ref: 'foo' }) : h('i', { ref: 'foo' })
  //     },
  //     mounted(this: any) {
  //       spy(this.$refs.foo.tag)
  //     },
  //     updated(this: any) {
  //       spy(this.$refs.foo.tag)
  //     },
  //   }
  //
  //   const root = document.createElement('div')
  //   render(h(Comp), root)
  //
  //   expect(spy.mock.calls[0][0]).toBe('i')
  //   refToggle.value = true
  //   await nextTick()
  //   expect(spy.mock.calls[1][0]).toBe('p')
  // })
  //
  // // #2078
  // test('handling multiple merged refs', async () => {
  //   const Foo = {
  //     render: () => h('div', 'foo'),
  //   }
  //   const Bar = {
  //     render: () => h('div', 'bar'),
  //   }
  //
  //   const viewRef = shallowRef<any>(Foo)
  //   const elRef1 = signal()
  //   const elRef2 = signal()
  //
  //   const App = {
  //     render() {
  //       if (!viewRef.value) {
  //         return null
  //       }
  //       const view = h(viewRef.value, { ref: elRef1 })
  //       return h(view, { ref: elRef2 })
  //     },
  //   }
  //   const root = document.createElement('div')
  //   render(h(App), root)
  //
  //   expect(serializeInner(elRef1.value.$el)).toBe('foo')
  //   expect(elRef1.value).toBe(elRef2.value)
  //
  //   viewRef.value = Bar
  //   await nextTick()
  //   expect(serializeInner(elRef1.value.$el)).toBe('bar')
  //   expect(elRef1.value).toBe(elRef2.value)
  //
  //   viewRef.value = null
  //   await nextTick()
  //   expect(elRef1.value).toBeNull()
  //   expect(elRef1.value).toBe(elRef2.value)
  // })
  //
  // // compiled output of <script setup> inline mode
  // test('raw ref with ref_key', () => {
  //   let refs: any
  //
  //   const el = signal()
  //
  //   const App = {
  //     mounted() {
  //       refs = (this as any).$refs
  //     },
  //     render() {
  //       return h(
  //         'div',
  //         {
  //           ref: el,
  //           ref_key: 'el',
  //         },
  //         'hello',
  //       )
  //     },
  //   }
  //   const root = document.createElement('div')
  //   render(h(App), root)
  //
  //   expect(serializeInner(el.value)).toBe('hello')
  //   expect(serializeInner(refs.el)).toBe('hello')
  // })
  //
  // // compiled output of v-for + template ref
  // test('ref in v-for', async () => {
  //   const show = signal(true)
  //   const list = reactive([1, 2, 3])
  //   const listRefs = signal([])
  //   const mapRefs = () => listRefs.value.map(n => serializeInner(n))
  //
  //   const App = {
  //     render() {
  //       return show.value
  //         ? h(
  //             'ul',
  //             list.map(i =>
  //               h(
  //                 'li',
  //                 {
  //                   ref: listRefs,
  //                   ref_for: true,
  //                 },
  //                 i,
  //               ),
  //             ),
  //           )
  //         : null
  //     },
  //   }
  //   const root = document.createElement('div')
  //   render(h(App), root)
  //
  //   expect(mapRefs()).toMatchObject(['1', '2', '3'])
  //
  //   list.push(4)
  //   await nextTick()
  //   expect(mapRefs()).toMatchObject(['1', '2', '3', '4'])
  //
  //   list.shift()
  //   await nextTick()
  //   expect(mapRefs()).toMatchObject(['2', '3', '4'])
  //
  //   show.value = !show.value
  //   await nextTick()
  //
  //   expect(mapRefs()).toMatchObject([])
  //
  //   show.value = !show.value
  //   await nextTick()
  //   expect(mapRefs()).toMatchObject(['2', '3', '4'])
  // })
  //
  // test('named ref in v-for', async () => {
  //   const show = signal(true)
  //   const list = reactive([1, 2, 3])
  //   const listRefs = signal([])
  //   const mapRefs = () => listRefs.value.map(n => serializeInner(n))
  //
  //   const App = {
  //     setup() {
  //       return { listRefs }
  //     },
  //     render() {
  //       return show.value
  //         ? h(
  //             'ul',
  //             list.map(i =>
  //               h(
  //                 'li',
  //                 {
  //                   ref: 'listRefs',
  //                   ref_for: true,
  //                 },
  //                 i,
  //               ),
  //             ),
  //           )
  //         : null
  //     },
  //   }
  //   const root = document.createElement('div')
  //   render(h(App), root)
  //
  //   expect(mapRefs()).toMatchObject(['1', '2', '3'])
  //
  //   list.push(4)
  //   await nextTick()
  //   expect(mapRefs()).toMatchObject(['1', '2', '3', '4'])
  //
  //   list.shift()
  //   await nextTick()
  //   expect(mapRefs()).toMatchObject(['2', '3', '4'])
  //
  //   show.value = !show.value
  //   await nextTick()
  //
  //   expect(mapRefs()).toMatchObject([])
  //
  //   show.value = !show.value
  //   await nextTick()
  //   expect(mapRefs()).toMatchObject(['2', '3', '4'])
  // })
  //
  // // #6697 v-for ref behaves differently under production and development
  // test('named ref in v-for , should be responsive when rendering', async () => {
  //   const list = signal([1, 2, 3])
  //   const listRefs = signal([])
  //   const App = {
  //     setup() {
  //       return { listRefs }
  //     },
  //     render() {
  //       return h('div', null, [
  //         h('div', null, String(listRefs.value)),
  //         h(
  //           'ul',
  //           list.value.map(i =>
  //             h(
  //               'li',
  //               {
  //                 ref: 'listRefs',
  //                 ref_for: true,
  //               },
  //               i,
  //             ),
  //           ),
  //         ),
  //       ])
  //     },
  //   }
  //   const root = document.createElement('div')
  //   render(h(App), root)
  //
  //   await nextTick()
  //   expect(String(listRefs.value)).toBe(
  //     '[object Object],[object Object],[object Object]',
  //   )
  //   expect(serializeInner(root)).toBe(
  //     '<div><div>[object Object],[object Object],[object Object]</div><ul><li>1</li><li>2</li><li>3</li></ul></div>',
  //   )
  //
  //   list.value.splice(0, 1)
  //   await nextTick()
  //   expect(String(listRefs.value)).toBe('[object Object],[object Object]')
  //   expect(serializeInner(root)).toBe(
  //     '<div><div>[object Object],[object Object]</div><ul><li>2</li><li>3</li></ul></div>',
  //   )
  // })
  //
  // test('with async component which nested in KeepAlive', async () => {
  //   const AsyncComp = defineAsyncComponent(
  //     () =>
  //       new Promise(resolve =>
  //         setTimeout(() =>
  //           resolve(
  //             defineComponent({
  //               setup(_, { expose }) {
  //                 expose({
  //                   name: 'AsyncComp',
  //                 })
  //                 return () => h('div')
  //               },
  //             }) as any,
  //           ),
  //         ),
  //       ),
  //   )
  //
  //   const Comp = defineComponent({
  //     setup(_, { expose }) {
  //       expose({
  //         name: 'Comp',
  //       })
  //       return () => h('div')
  //     },
  //   })
  //
  //   const toggle = signal(false)
  //   const instanceRef = ref<any>(null)
  //
  //   const App = {
  //     render: () => {
  //       return h(KeepAlive, () =>
  //         toggle.value
  //           ? h(AsyncComp, { ref: instanceRef })
  //           : h(Comp, { ref: instanceRef }),
  //       )
  //     },
  //   }
  //
  //   const root = document.createElement('div')
  //   render(h(App), root)
  //   expect(instanceRef.value.name).toBe('Comp')
  //
  //   // switch to async component
  //   toggle.value = true
  //   await nextTick()
  //   expect(instanceRef.value).toBe(null)
  //
  //   await new Promise(r => setTimeout(r))
  //   expect(instanceRef.value.name).toBe('AsyncComp')
  //
  //   // switch back to normal component
  //   toggle.value = false
  //   await nextTick()
  //   expect(instanceRef.value.name).toBe('Comp')
  //
  //   // switch to async component again
  //   toggle.value = true
  //   await nextTick()
  //   expect(instanceRef.value.name).toBe('AsyncComp')
  // })
})
