import { signal } from '@type-dom/signals';
import {
  // type InjectionKey,
  // type Ref,
  // defineComponent,
  // h,
  hasInjectionContext,
  inject,
  nextTick,
  provide,
  serialize,
  render,
  assignProps,
  TypeFragment,
  Div,
  InjectionKey,
  App,
  Ref,
  // onMounted,
  // reactive,
  // readonly,
  // ref,
} from '../../src';
// import { createApp, nodeOps, render, serialize } from '@vue/runtime-test'

describe('api: provide/inject', () => {
  it('string keys', () => {
    // const Provider = {
    //   setup() {
    //     provide('foo', 1)
    //     return () => h(Middle)
    //   },
    // }
    class Provider extends TypeFragment {
      className = 'Provider';
      override setup() {
        provide('foo', 1);
        this.addChild(new Middle())
      }
    }

    // const Middle = {
    //   render: () => h(Consumer),
    // }
    class Middle extends TypeFragment {
      className = 'Middle';
      constructor() {
        super();
        this.addChild(new Consumer())
      }
    }

    // const Consumer = {
    //   setup() {
    //     const foo = inject('foo')
    //     return () => foo
    //   },
    // }
    class Consumer extends TypeFragment {
      className = 'Consumer';
      override setup() {
        const foo = inject('foo') as string;
        this.addChild(foo);
      }
    }

    // const root = nodeOps.createElement('div')
    const root = document.createElement('div');
    // render(h(Provider), root)
    render(new Provider(), root);
    expect(root.outerHTML).toBe(`<div>1</div>`);
  })

  it('symbol keys', () => {
    // also verifies InjectionKey type sync
    const key: InjectionKey<number> = Symbol()

    // const Provider = {
    //   setup() {
    //     provide(key, 1)
    //     return () => h(Middle)
    //   },
    // }
    class Provider extends TypeFragment {
      className = 'Provider';
      override setup() {
        provide(key, 1);
        this.addChild(new Middle())
      }
    }

    // const Middle = {
    //   render: () => h(Consumer),
    // }
    class Middle extends TypeFragment {
      className = 'Middle';
      constructor() {
        super();
        this.addChild(new Consumer())
      }
    }

    // const Consumer = {
    //   setup() {
    //     const foo = inject(key) || 1
    //     return () => foo + 1
    //   },
    // }
    class Consumer extends TypeFragment {
      className = 'Consumer';
      override setup() {
        const foo = inject(key) || 1;
        this.addChild(foo + 1);
      }
    }

    const root = document.createElement('div')
    render(new Provider(), root)
    expect(root.outerHTML).toBe(`<div>2</div>`)
  })

  it('default values', () => {
    // const Provider = {
    //   setup() {
    //     provide('foo', 'foo')
    //     return () => h(Middle)
    //   },
    // }
    class Provider extends TypeFragment {
      className = 'Provider';
      override setup() {
        provide('foo', 'foo');
        this.addChild(new Middle())
      }
    }

    // const Middle = {
    //   render: () => h(Consumer),
    // }
    class Middle extends TypeFragment {
      className = 'Middle';
      constructor() {
        super();
        this.addChild(new Consumer())
      }
    }

    // const Consumer = {
    //   setup() {
    //     // default value should be ignored if value is provided
    //     const foo = inject('foo', 'fooDefault')
    //     // default value should be used if value is not provided
    //     const bar = inject('bar', 'bar')
    //     return () => foo + bar
    //   },
    // }
    class Consumer extends TypeFragment {
      className = 'Consumer';
      override setup() {
        // default value should be ignored if value is provided
        const foo = inject('foo', 'fooDefault')
        // default value should be used if value is not provided
        const bar = inject('bar', 'bar')
        this.addChild(foo + bar);
      }
    }

    const root = document.createElement('div')
    render(new Provider(), root)
    expect(root.outerHTML).toBe(`<div>foobar</div>`)
  })

  it('bound to instance', () => {
    // const Provider = {
    //   setup() {
    //     return () => h(Consumer)
    //   },
    // }
    class Provider extends TypeFragment {
      className = 'Provider';
      override setup() {
        this.addChild(new Consumer());
      }
    }

    // const Consumer = defineComponent({
    //   name: 'Consumer',
    //   inject: {
    //     foo: {
    //       from: 'foo',
    //       default() {
    //         return this!.props.name
    //       },
    //     },
    //   },
    //   render() {
    //     return this.foo
    //   },
    // })
    class Consumer extends TypeFragment {
      className = 'Consumer';
      override setup() {
        assignProps(this, {
          name: 'Consumer',
        });
        const foo = inject('foo', this.props.name);
        this.addChild(foo);
      }
    }

    const root = document.createElement('div');
    // render(h(Provider), root)
    render(new Provider(), root);
    expect(root.outerHTML).toBe(`<div>Consumer</div>`);
  })

  it('nested providers', () => {
    // const ProviderOne = {
    //   setup() {
    //     provide('foo', 'foo')
    //     provide('bar', 'bar')
    //     return () => h(ProviderTwo)
    //   },
    // }
    class ProviderOne extends TypeFragment {
      className = 'ProviderOne';
      override setup() {
        provide('foo', 'foo');
        provide('bar', 'bar');
        this.addChild(new ProviderTwo());
      }
    }

    // const ProviderTwo = {
    //   setup() {
    //     // override parent value
    //     provide('foo', 'fooOverride')
    //     provide('baz', 'baz')
    //     return () => h(Consumer)
    //   },
    // }
    class ProviderTwo extends TypeFragment {
      className = 'ProviderTwo';
      override setup() {
        // override parent value
        provide('foo', 'fooOverride');
        provide('baz', 'baz');
        this.addChild(new Consumer());
      }
    }

    // const Consumer = {
    //   setup() {
    //     const foo = inject('foo')
    //     const bar = inject('bar')
    //     const baz = inject('baz')
    //     return () => [foo, bar, baz].join(',')
    //   },
    // }
    class Consumer extends TypeFragment {
      className = 'Consumer';
      override setup() {
        const foo = inject('foo');
        const bar = inject('bar');
        const baz = inject('baz');
        this.addChild([foo, bar, baz].join(','));
      }
    }

    const root = document.createElement('div')
    // render(h(ProviderOne), root)
    render(new ProviderOne(), root);
    expect(root.outerHTML).toBe(`<div>fooOverride,bar,baz</div>`)
  })

  it('reactivity with refs', async () => {
    const count = signal(1)

    // const Provider = {
    //   setup() {
    //     provide('count', count)
    //     return () => h(Middle)
    //   },
    // }
    class Provider extends TypeFragment {
      className = 'Provider';
      override setup() {
        provide('count', count);
        this.addChild(new Middle());
      }
    }

    // const Middle = {
    //   render: () => h(Consumer),
    // }
    class Middle extends TypeFragment {
      className = 'Middle';
      constructor() {
        super();
        this.addChild(new Consumer());
      }
    }

    // const Consumer = {
    //   setup() {
    //     const count = inject<Ref<number>>('count')!
    //     return () => count.value
    //   },
    // }
    class Consumer extends TypeFragment {
      className = 'Consumer';
      override setup() {
        const count = inject<Ref<number>>('count')!;
        this.addChild(count);
      }
    }

    const root = document.createElement('div')
    // render(h(Provider), root)
    render(new Provider(), root);
    expect(root.outerHTML).toBe(`<div>1</div>`)

    count.set(count.get() + 1);
    await nextTick();
    expect(root.outerHTML).toBe(`<div>2</div>`)
  })

  it('reactivity with readonly refs', async () => {
    const count = signal(1);

    // const Provider = {
    //   setup() {
    //     provide('count', readonly(count))
    //     return () => h(Middle)
    //   },
    // }
    class Provider extends TypeFragment {
      className = 'Provider';
      override setup() {
        provide('count', count);
        this.addChild(new Middle());
      }
    }

    // const Middle = {
    //   render: () => h(Consumer),
    // }
    class Middle extends TypeFragment {
      className = 'Middle';
      constructor() {
        super();
        this.addChild(new Consumer());
      }
    }

    // const Consumer = {
    //   setup() {
    //     const count = inject<Ref<number>>('count')!
    //     // should not work // todo why
    //     count.value++
    //     return () => count.value
    //   },
    // }
    class Consumer extends TypeFragment {
      className = 'Consumer';
      override setup() {
        const count = inject<Ref<number>>('count')!;
        // should not work // todo why
        // count.set(count.get() + 1);
        this.addChild(count);
      }
    }

    const root = document.createElement('div')
    // render(h(Provider), root)
    render(new Provider(), root);
    expect(root.outerHTML).toBe(`<div>1</div>`)

    // expect(
    //   `Set operation on key "value" failed: target is readonly`,
    // ).toHaveBeenWarned()

    // source mutation should still work
    count.set(count.get() + 1);
    await nextTick();
    expect(root.outerHTML).toBe(`<div>2</div>`);
  })

  it('reactivity with objects', async () => {
    const rootState = { count: signal(1) }

    // const Provider = {
    //   setup() {
    //     provide('state', rootState)
    //     return () => h(Middle)
    //   },
    // }
    class Provider extends TypeFragment {
      className = 'Provider';
      override setup() {
        provide('state', rootState);
        this.addChild(new Middle());
      }
    }

    // const Middle = {
    //   render: () => h(Consumer),
    // }
    class Middle extends TypeFragment {
      className = 'Middle';
      constructor() {
        super();
        this.addChild(new Consumer());
      }
    }

    // const Consumer = {
    //   setup() {
    //     const state = inject<typeof rootState>('state')!
    //     return () => state.count
    //   },
    // }
    class Consumer extends TypeFragment {
      className = 'Consumer';
      override setup() {
        const state = inject<typeof rootState>('state')!;
        this.addChild(state.count);
      }
    }

    const root = document.createElement('div');
    // render(h(Provider), root)
    render(new Provider(), root);
    expect(root.outerHTML).toBe(`<div>1</div>`);

    rootState.count.set(rootState.count.get() + 1);
    await nextTick();
    expect(root.outerHTML).toBe(`<div>2</div>`);
  })

  // it('reactivity with readonly objects', async () => {
  //   const rootState = reactive({ count: 1 })
  //
  //   const Provider = {
  //     setup() {
  //       provide('state', readonly(rootState))
  //       return () => h(Middle)
  //     },
  //   }
  //
  //   const Middle = {
  //     render: () => h(Consumer),
  //   }
  //
  //   const Consumer = {
  //     setup() {
  //       const state = inject<typeof rootState>('state')!
  //       // should not work
  //       state.count++
  //       return () => state.count
  //     },
  //   }
  //
  //   const root = nodeOps.createElement('div')
  //   render(h(Provider), root)
  //   expect(serialize(root)).toBe(`<div>1</div>`)
  //
  //   expect(
  //     `Set operation on key "count" failed: target is readonly`,
  //   ).toHaveBeenWarned()
  //
  //   rootState.count++
  //   await nextTick()
  //   expect(serialize(root)).toBe(`<div>2</div>`)
  // })

  // it('should warn unfound', () => {
  //   const Provider = {
  //     setup() {
  //       return () => h(Middle)
  //     },
  //   }
  //
  //   const Middle = {
  //     render: () => h(Consumer),
  //   }
  //
  //   const Consumer = {
  //     setup() {
  //       const foo = inject('foo')
  //       expect(foo).toBeUndefined()
  //       return () => foo
  //     },
  //   }
  //
  //   const root = nodeOps.createElement('div')
  //   render(h(Provider), root)
  //   expect(serialize(root)).toBe(`<div><!----></div>`)
  //   expect(`injection "foo" not found.`).toHaveBeenWarned()
  // })

  // it('should not warn when default value is undefined', () => {
  //   const Provider = {
  //     setup() {
  //       return () => h(Middle)
  //     },
  //   }
  //
  //   const Middle = {
  //     render: () => h(Consumer),
  //   }
  //
  //   const Consumer = {
  //     setup() {
  //       const foo = inject('foo', undefined)
  //       return () => foo
  //     },
  //   }
  //
  //   const root = nodeOps.createElement('div')
  //   render(h(Provider), root)
  //   expect(`injection "foo" not found.`).not.toHaveBeenWarned()
  // })

  // #2400
  it('should not self-inject', () => {
    // const Comp = {
    //   setup() {
    //     provide('foo', 'foo')
    //     const injection = inject('foo', null)
    //     return () => injection
    //   },
    // }
    class Comp extends TypeFragment {
      className = 'Comp';
      override setup() {
        provide('foo', 'foo')
        const injection = inject('foo', null)
        this.addChild(injection);
      }
    }

    // const root = nodeOps.createElement('div')
    // render(h(Comp), root)
    const root = new Div();
    new Comp().mount(root.dom);
    expect(serialize(root)).toBe(`<div></div>`)
  })

  describe('hasInjectionContext', () => {
    it('should be false outside of setup', () => {
      expect(hasInjectionContext()).toBe(false)
    })

    it('should be true within setup', () => {
      expect.assertions(1)
      // const Comp = {
      //   setup() {
      //     expect(hasInjectionContext()).toBe(true)
      //     return () => null
      //   },
      // }
      class Comp extends TypeFragment {
        className = 'Comp';
        override setup() {
          expect(hasInjectionContext()).toBe(true)
        }
      }
      const root = document.createElement('div');
      new Comp().mount(root);
      // const root = nodeOps.createElement('div')
      // render(h(Comp), root)
    })

    it('should be true within app.runWithContext()', () => {
      expect.assertions(1)
      new App({}).runWithContext(() => {
        expect(hasInjectionContext()).toBe(true)
      })
    })
  })

  // describe('warnings for incorrect usage', () => {
  //   // it('should warn when inject() is called outside setup', () => {
  //   //   inject('foo', 'bar')
  //   //   expect(`inject() can only be used`).toHaveBeenWarned()
  //   // })
  //   //
  //   // it('should warn when provide() is called outside setup', () => {
  //   //   provide('foo', 'bar')
  //   //   expect(`provide() can only be used`).toHaveBeenWarned()
  //   // })
  //
  //   // it('should warn when provide() is called from a render function', () => {
  //   //   const Provider = {
  //   //     setup() {
  //   //       return () => {
  //   //         provide('foo', 'bar')
  //   //       }
  //   //     },
  //   //   }
  //   //
  //   //   const root = nodeOps.createElement('div')
  //   //   render(h(Provider), root)
  //   //   expect(`provide() can only be used`).toHaveBeenWarned()
  //   // })
  //   //
  //   // it('should warn when provide() is called from onMounted', () => {
  //   //   const Provider = {
  //   //     setup() {
  //   //       onMounted(() => {
  //   //         provide('foo', 'bar')
  //   //       })
  //   //
  //   //       return () => null
  //   //     },
  //   //   }
  //   //
  //   //   const root = nodeOps.createElement('div')
  //   //   render(h(Provider), root)
  //   //   expect(`provide() can only be used`).toHaveBeenWarned()
  //   // })
  // })
})
