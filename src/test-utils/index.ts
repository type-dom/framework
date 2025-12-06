// import {
//   type CreateAppFunction,
//   type RootRenderFunction,
//   type VNode,
//   createRenderer,
// } from '@vue/runtime-core'
import { Div, TypeNode } from '../';
// import { // type TestElement,
//   nodeOps } from './nodeOps'
// import { patchProp } from './patchProp'
import { serializeInner } from './serialize'
// import { extend } from '@type-dom/utils';
// import { extend } from '@vue/shared'

// const { render: baseRender, createApp: baseCreateApp } = createRenderer(
//   extend({ patchProp }, nodeOps),
// )

// export const render = baseRender as RootRenderFunction<TestElement>
// export const createApp = baseCreateApp as CreateAppFunction<TestElement>

// convenience for one-off render validations
export function renderToString(tnode: TypeNode): string {
  // const root = nodeOps.createElement('div')
  // render(vnode, root)
  const root = new Div({
    slot: tnode
  });

  return serializeInner(root)
}

export * from './triggerEvent'
export * from './serialize'
export * from './nodeOps'
// export * from '@vue/runtime-core'
