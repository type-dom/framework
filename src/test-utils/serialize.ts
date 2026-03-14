import {
  CommentNode, NodeName,
  TextNode,
  toRaw,
  TypeElement,
  TypeNode
} from '../';
// import {
//   type TestComment,
//   type TestElement,
//   // type TestNode,
//   TestNodeTypes,
//   type TestText,
// } from './nodeOps'
// import { isOn } from '@vue/shared'
import { isOn } from '@type-dom/utils';

export function serialize(
  node: TypeNode,
  indent = 0,
  depth = 0,
): string {
  if (node instanceof TypeElement) {
    return serializeElement(node, indent, depth)
  } else {
    return serializeText(node as TextNode | CommentNode, indent, depth)
  }
}

export function serializeInner(
  node: TypeNode,
  indent = 0,
  depth = 0,
): string {
  const newLine = indent ? `\n` : ``
  return node.children.length
    ? newLine +
        node.children.map(c => serialize(c, indent, depth + 1)).join(newLine) +
        newLine
    : ``
}

function serializeElement(
  node: TypeNode,
  indent: number,
  depth: number,
): string {
  const props = Object.keys(node.props.attrObj ?? {})
    .map(key => {
      const value = (node.props.attrObj as any)[key]
      return isOn(key) || value == null
        ? ``
        : value === ``
          ? key
          : `${key}=${JSON.stringify(toRaw(value))}`
    })
    .filter(Boolean)
    .join(' ')
  const padding = indent ? ` `.repeat(indent).repeat(depth) : ``
  if (node.dom.nodeName === NodeName.FRAGMENT) {
    node.tag  = 'fragment';
  } else {
    node.tag = node.dom.localName;
  }
  return (
    `${padding}<${node.tag}${props ? ` ${props}` : ``}>` +
    `${serializeInner(node, indent, depth)}` +
    `${padding}</${node.tag}>`
  )
}

function serializeText(
  node: TextNode | CommentNode,
  indent: number,
  depth: number,
): string {
  const padding = indent ? ` `.repeat(indent).repeat(depth) : ``
  return (
    padding +
    (node instanceof CommentNode ? `<!--${node.props.nodeValue}-->` : node.props.nodeValue)
  )
}
