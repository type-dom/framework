// 定义测试组件
import {
  Div, DivProps, FragmentProps,
  TypeDiv, TypeFragment,
  // assignProps,
  // onActivated,
  nextTick,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated, render,
  serializeInner,
  transformSlot,
} from '../../src';
import { effect, signal } from '@type-dom/signals';

describe('api: lifecycle hooks', () => {
  it('onBeforeMount', () => {
    const root = new Div()
    const fn = vi.fn(() => {
      // should be called before inner div is rendered
      expect(serializeInner(root)).toBe(`<div></div>`)
    })

    class Comp extends TypeDiv {
      className = 'Comp';
      override setup() {
        onBeforeMount(fn)
      }
    }
    // render(h(Comp), root)
    root.addChild(new Comp());
    root.mount(document.body);
    expect(fn).toHaveBeenCalledTimes(1)
    // #10863
    expect(fn).toHaveBeenCalledWith()
  })

  it('onMounted', () => {
    const root = new Div()
    const fn = vi.fn(() => {
      // should be called after inner div is rendered
      expect(serializeInner(root)).toBe(`<div></div>`)
    })

    class Comp extends TypeDiv {
      className = 'Comp';
      override setup() {
        onMounted(fn)
        // return () => h('div')
      }
    }
    // render(h(Comp), root)
    root.addChild(new Comp());
    root.mount(document.body);
    expect(fn).toHaveBeenCalledTimes(1)
  })

  // it('onBeforeUpdate', async () => {
  //   const count = signal(0)
  //   const root = new Div()
  //   const fn = vi.fn(() => {
  //     // should be called before inner div is updated
  //     expect(serializeInner(root)).toBe(`<div>0</div>`)
  //   })
  //
  //   class Comp extends TypeDiv {
  //     className = 'Comp';
  //
  //     constructor(params: DivProps = {}) {
  //       super(params);
  //     }
  //     override setup() {
  //       onBeforeUpdate(fn)
  //       // return () => h('div', count.value)
  //     }
  //   }
  //   // render(h(Comp), root)
  //   root.addChild(new Comp({
  //     slot: count
  //   }));
  //   root.mount(document.body);
  //
  //   count.set(count.get() + 1)
  //   await nextTick()
  //   expect(fn).toHaveBeenCalledTimes(1)
  //   expect(serializeInner(root)).toBe(`<div>1</div>`)
  // })

  // it('state mutation in onBeforeUpdate', async () => {
  //   const count = signal(0)
  //   const root = new Div()
  //   const fn = vi.fn(() => {
  //     // should be called before inner div is updated
  //     expect(serializeInner(root)).toBe(`<div>0</div>`)
  //     count.set(count.get() + 1)
  //   })
  //   const renderSpy = vi.fn()
  //
  //   class Comp extends TypeDiv {
  //     className = 'Comp'
  //     constructor(params: DivProps = {}) {
  //       super(params);
  //     }
  //     override setup() {
  //       onBeforeUpdate(fn)
  //       // return () => {
  //         renderSpy()
  //       //   // return h('div', count.value)
  //       // }
  //     }
  //   }
  //   // render(h(Comp), root)
  //   root.addChild(new Comp({
  //     slot: count
  //   }))
  //   root.mount(document.body);
  //   expect(renderSpy).toHaveBeenCalledTimes(1)
  //
  //   count.set(count.get() + 1)
  //   await nextTick()
  //   expect(fn).toHaveBeenCalledTimes(1)
  //   expect(renderSpy).toHaveBeenCalledTimes(2)
  //   expect(serializeInner(root)).toBe(`<div>2</div>`)
  // })

  // it('onUpdated', async () => {
  //   const count = signal(0)
  //   const root = new Div()
  //   const fn = vi.fn(() => {
  //     // should be called after inner div is updated
  //     expect(serializeInner(root)).toBe(`<div>1</div>`)
  //   })
  //
  //   class Comp extends TypeDiv {
  //     className = 'Comp'
  //     constructor(params: DivProps = {}) {
  //       super(params);
  //     }
  //     override setup() {
  //       onUpdated(fn)
  //       // return () => h('div', count.value)
  //     }
  //   }
  //   // render(h(Comp), root)
  //   root.addChild(new Comp({
  //     slot: count
  //   }))
  //
  //   count.set(count.get() + 1)
  //   await nextTick()
  //   expect(fn).toHaveBeenCalledTimes(1)
  // })

  it('onBeforeUnmount', async () => {
    const toggle = signal(true)
    const root = new Div()
    const fn = vi.fn(() => {
      // should be called before inner div is removed
      expect(serializeInner(root)).toBe(`<div></div>`)
    })

    // const Comp = {
    //   setup() {
    //     // return () => (toggle.value ? h(Child) : null)
    //   }
    // }
    class Comp extends TypeFragment {
      className = 'Comp'
      override setup() {
        transformSlot(this, () => toggle.get() ? new Child() : null);
      }
    }

    // const Child = {
    //   setup() {
    //     onBeforeUnmount(fn)
    //     return () => h('div')
    //   },
    // }
    class Child extends TypeDiv {
      className = 'Child';
      override setup() {
        onBeforeUnmount(fn)
        // return () => h('div')
      }
    }

    // render(h(Comp), root)
    render(new Comp(), root.dom);

    toggle.set(false)
    await nextTick()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('onUnmounted', async () => {
    const toggle = signal(true)
    const root = document.createElement('div')
    const fn = vi.fn(() => {
      // should be called after inner div is removed
      expect(root.innerHTML).toBe(`<!---->`)
    })

    // const Comp = {
    //   setup() {
    //     return () => (toggle.value ? h(Child) : null)
    //   },
    // }
    class Comp extends TypeFragment {
      className = 'Comp';
      override setup() {
        transformSlot(this, () => toggle.get() ? new Child() : null);
      }
    }

    // const Child = {
    //   setup() {
    //     onUnmounted(fn)
    //     return () => h('div')
    //   },
    // }
    class Child extends TypeDiv {
      className = 'Child';
      override setup() {
        onUnmounted(fn);
      }
    }

    // render(h(Comp), root)
    render(new Comp(), root);

    toggle.set(false);
    await nextTick()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('onBeforeUnmount in onMounted', async () => {
    const toggle = signal(true)
    const root = document.createElement('div')
    const fn = vi.fn(() => {
      // should be called before inner div is removed
      expect(root.innerHTML).toBe(`<div></div>`)
    })

    // const Comp = {
    //   setup() {
    //     return () => (toggle.value ? h(Child) : null)
    //   },
    // }
    class Comp extends TypeFragment {
      className = 'Comp';
      override setup() {
        transformSlot(this, () => toggle.get() ? new Child() : null);
      }
    }

    // const Child = {
    //   setup() {
    //     onMounted(() => {
    //       onBeforeUnmount(fn)
    //     })
    //     return () => h('div')
    //   },
    // }
    class Child extends TypeDiv {
      className = 'Child';
      override setup() {
        onMounted(() => {
          onBeforeUnmount(fn)
        });
      }
    }

    // render(h(Comp), root)
    render(new Comp(), root);

    toggle.set(false);
    await nextTick()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('lifecycle call order', async () => {
    const count = signal(0)
    const root = document.createElement('div')
    const calls: string[] = []

    // const Root = {
    //   setup() {
    //     onBeforeMount(() => calls.push('root onBeforeMount'))
    //     onMounted(() => calls.push('root onMounted'))
    //     onBeforeUpdate(() => calls.push('root onBeforeUpdate'))
    //     onUpdated(() => calls.push('root onUpdated'))
    //     onBeforeUnmount(() => calls.push('root onBeforeUnmount'))
    //     onUnmounted(() => calls.push('root onUnmounted'))
    //     // return () => h(Mid, { count: count.value })
    //   },
    // }
    class Root extends TypeFragment {
      className = 'Root';
      override setup() {
        onBeforeMount(() => calls.push('root onBeforeMount'))
        onMounted(() => calls.push('root onMounted'))
        onBeforeUpdate(() => calls.push('root onBeforeUpdate'))
        onUpdated(() => calls.push('root onUpdated'))
        onBeforeUnmount(() => calls.push('root onBeforeUnmount'))
        onUnmounted(() => calls.push('root onUnmounted'))
        // return () => h(Mid, { count: count.value })
        this.addChild(new Mid({
          slot: count
        }))
      }
    }

    // const Mid = {
    //   props: ['count'],
    //   setup(props: any) {
    //     onBeforeMount(() => calls.push('mid onBeforeMount'))
    //     onMounted(() => calls.push('mid onMounted'))
    //     onBeforeUpdate(() => calls.push('mid onBeforeUpdate'))
    //     onUpdated(() => calls.push('mid onUpdated'))
    //     onBeforeUnmount(() => calls.push('mid onBeforeUnmount'))
    //     onUnmounted(() => calls.push('mid onUnmounted'))
    //     return () => h(Child, { count: props.count })
    //   },
    // }
    interface MidProps extends FragmentProps {
      count?: number;
    }
    class Mid extends TypeFragment<MidProps> {
      className = 'Mid';
      constructor(params: MidProps = {}) {
        super(params);
      }
      override setup(props: MidProps) {
        onBeforeMount(() => calls.push('mid onBeforeMount'))
        onMounted(() => calls.push('mid onMounted'))
        onBeforeUpdate(() => calls.push('mid onBeforeUpdate'))
        onUpdated(() => calls.push('mid onUpdated'))
        onBeforeUnmount(() => calls.push('mid onBeforeUnmount'))
        onUnmounted(() => calls.push('mid onUnmounted'))
        this.addChild(new Child({
          slot: props.count
        }))
      }
    }

    // const Child = {
    //   props: ['count'],
    //   setup(props: any) {
    //     onBeforeMount(() => calls.push('child onBeforeMount'))
    //     onMounted(() => calls.push('child onMounted'))
    //     onBeforeUpdate(() => calls.push('child onBeforeUpdate'))
    //     onUpdated(() => calls.push('child onUpdated'))
    //     onBeforeUnmount(() => calls.push('child onBeforeUnmount'))
    //     onUnmounted(() => calls.push('child onUnmounted'))
    //     return () => h('div', props.count)
    //   },
    // }
    interface ChildProps extends DivProps {
      count?: number;
    }
    class Child extends TypeDiv<ChildProps> {
      className = 'Child';
      constructor(params: ChildProps = {}) {
        super(params);
      }
      override setup(props: ChildProps) {
        // const props = this.props;
        onBeforeMount(() => calls.push('child onBeforeMount'))
        onMounted(() => calls.push('child onMounted'))
        onBeforeUpdate(() => calls.push('child onBeforeUpdate'))
        onUpdated(() => calls.push('child onUpdated'))
        onBeforeUnmount(() => calls.push('child onBeforeUnmount'))
        onUnmounted(() => calls.push('child onUnmounted'))
        // return () => h('div', props.count)
        this.addChild(props.count);
      }
    }

    // mount
    // render(h(Root), root)
    render(new Root(), root);
    expect(calls).toEqual([
      'root onBeforeMount',
      'mid onBeforeMount',
      'child onBeforeMount',
      'child onMounted',
      'mid onMounted',
      'root onMounted',
    ])

    calls.length = 0

    // update
    count.set(count.get() + 1);
    await nextTick()
    // expect(calls).toEqual([
    //   'root onBeforeUpdate',
    //   'mid onBeforeUpdate',
    //   'child onBeforeUpdate',
    //   'child onUpdated',
    //   'mid onUpdated',
    //   'root onUpdated',
    // ])

    calls.length = 0

    // unmount
    render(null, root);
    expect(calls).toEqual([
      'root onBeforeUnmount',
      'mid onBeforeUnmount',
      'child onBeforeUnmount',
      'child onUnmounted',
      'mid onUnmounted',
      'root onUnmounted',
    ])
  })

  // it('onRenderTracked', () => {
  //   const events: DebuggerEvent[] = []
  //   const onTrack = vi.fn((e: DebuggerEvent) => {
  //     events.push(e)
  //   })
  //   const obj = reactive({ foo: 1, bar: 2 })
  //
  //   const Comp = {
  //     setup() {
  //       onRenderTracked(onTrack)
  //       return () =>
  //         h('div', [obj.foo, 'bar' in obj, Object.keys(obj).join('')])
  //     },
  //   }
  //
  //   render(h(Comp), nodeOps.createElement('div'))
  //   expect(onTrack).toHaveBeenCalledTimes(3)
  //   expect(events).toMatchObject([
  //     {
  //       target: obj,
  //       type: TrackOpTypes.GET,
  //       key: 'foo',
  //     },
  //     {
  //       target: obj,
  //       type: TrackOpTypes.HAS,
  //       key: 'bar',
  //     },
  //     {
  //       target: obj,
  //       type: TrackOpTypes.ITERATE,
  //       key: ITERATE_KEY,
  //     },
  //   ])
  // })
  //
  // it('onRenderTriggered', async () => {
  //   const events: DebuggerEvent[] = []
  //   const onTrigger = vi.fn((e: DebuggerEvent) => {
  //     events.push(e)
  //   })
  //   const obj = reactive<{
  //     foo: number
  //     bar?: number
  //   }>({ foo: 1, bar: 2 })
  //
  //   const Comp = {
  //     setup() {
  //       onRenderTriggered(onTrigger)
  //       return () =>
  //         h('div', [obj.foo, 'bar' in obj, Object.keys(obj).join('')])
  //     },
  //   }
  //
  //   render(h(Comp), nodeOps.createElement('div'))
  //
  //   obj.foo++
  //   await nextTick()
  //   expect(onTrigger).toHaveBeenCalledTimes(1)
  //   expect(events[0]).toMatchObject({
  //     type: TriggerOpTypes.SET,
  //     key: 'foo',
  //     oldValue: 1,
  //     newValue: 2,
  //   })
  //
  //   delete obj.bar
  //   await nextTick()
  //   expect(onTrigger).toHaveBeenCalledTimes(2)
  //   expect(events[1]).toMatchObject({
  //     type: TriggerOpTypes.DELETE,
  //     key: 'bar',
  //     oldValue: 2,
  //   })
  //   ;(obj as any).baz = 3
  //   await nextTick()
  //   expect(onTrigger).toHaveBeenCalledTimes(3)
  //   expect(events[2]).toMatchObject({
  //     type: TriggerOpTypes.ADD,
  //     key: 'baz',
  //     newValue: 3,
  //   })
  // })
  //
  it('runs shared hook fn for each instance', async () => {
    const fn = vi.fn()
    const toggle = signal(true)
    // const Comp = {
    //   setup() {
    //     return () => (toggle.value ? [h(Child), h(Child)] : null)
    //   },
    // }
    class Comp extends TypeFragment {
      className = 'Comp';
      override setup() {
        transformSlot(this, () => (toggle.get() ? [new Child(), new Child()] : null))
      }
    }
    // const Child = {
    //   setup() {
    //     onMounted(fn)
    //     onBeforeUnmount(fn)
    //     return () => h('div')
    //   },
    // }
    class Child extends TypeDiv {
      className = 'Child';
      override setup() {
        onMounted(fn)
        onBeforeUnmount(fn)
      }
    }

    // render(h(Comp), nodeOps.createElement('div'))
    render(new Comp(), document.createElement('div'));
    expect(fn).toHaveBeenCalledTimes(2);
    toggle.set(false);
    await nextTick();
    expect(fn).toHaveBeenCalledTimes(4);
  })

  it('immediately trigger unmount during rendering', async () => {
    const fn = vi.fn();
    const toggle = signal(false);

    // const Child = {
    //   setup() {
    //     onMounted(fn)
    //     // trigger unmount immediately
    //     toggle.value = false
    //     return () => h('div')
    //   },
    // }
    class Child extends TypeDiv {
      className = 'Child';
      override setup() {
        onMounted(fn)
        // trigger unmount immediately
        toggle.set(false) // todo error 下面的effect没有监听到
      }
    }

    // const Comp = {
    //   setup() {
    //     return () => (toggle.value ? [h(Child)] : null)
    //   },
    // }
    class Comp extends TypeFragment {
      className = 'Comp';
      override setup() {
        // 使用 batchEffect 来确保正确追踪依赖
        // transformSlot(this, () => (toggle.get() ? [new Child()] : null))
        effect(() => {
          const shouldRender = toggle.get();
          if (shouldRender) {
            render(new Child(), this.dom);
          } else {
            render(null, this.dom);
          }
        })
      }
    }

    // render(h(Comp), nodeOps.createElement('div'))
    render(new Comp(), document.createElement('div'));

    toggle.set(true);
    await nextTick();
    expect(fn).toHaveBeenCalledTimes(0); // error 1
  })

//   it('immediately trigger unmount during rendering(with KeepAlive)', async () => {
//     const mountedSpy = vi.fn()
//     const activeSpy = vi.fn()
//     const toggle = signal(false)
//
//     const Child = {
//       setup() {
//         onMounted(mountedSpy)
//         onActivated(activeSpy)
//
//         // trigger unmount immediately
//         toggle.set(false)
//         return () => h('div')
//       },
//     }
//
//     const Comp = {
//       setup() {
//         return () => h(KeepAlive, [toggle.value ? h(Child) : null])
//       },
//     }
//
//     render(h(Comp), nodeOps.createElement('div'))
//
//     toggle.value = true
//     await nextTick()
//     expect(mountedSpy).toHaveBeenCalledTimes(0)
//     expect(activeSpy).toHaveBeenCalledTimes(0)
//   })
})
