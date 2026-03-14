import { TypeNode } from '../abstracts/type-node/type-node.abstract';
// import { TypeElement } from '../type-element/type-element.abstract';
// import { UnmountFn } from './unmount';

export type ElementNamespace = 'svg' | 'mathml' | undefined

export type RealDom =  Element | ShadowRoot // HTMLElement | SVGElement | ShadowRoot; //
export type RawDom = RealDom | DocumentFragment | Document;
export type TypeEl =  RawDom | string | null | undefined;

type INode = {
  $node?: TypeNode | null;
  [key: string | symbol]: any
}
// Renderer Node can technically be any object in the context of core renderer
// logic - they are never directly operated on and always passed to the node op
// functions provided via options, so the internal constraint is really just
// a generic object.
// export interface RendererNode extends Node {
//   [key: string | symbol]: any
// }
export type RendererNode = (RawDom | Comment | Text) & INode;

// export interface RendererElement extends RendererNode {
//   $node: TypeNode;
// }
export type RendererElement = RawDom & INode;
export type RealElement = RealDom & INode;

// An object exposing the internals of a renderer, passed to tree-shakeable
// features so that they can be decoupled from this file. Keys are shortened
// to optimize bundle size.
// export interface RendererInternals<
//   HostNode = RendererNode,
//   HostElement = RendererElement,
// > {
//   p: PatchFn
//   um: UnmountFn
//   r: RemoveFn
//   m: MoveFn
//   mt: MountComponentFn
//   mc: MountChildrenFn
//   pc: PatchChildrenFn
//   pbc: PatchBlockChildrenFn
//   n: NextFn
//   o: RendererOptions<HostNode, HostElement>
// }
