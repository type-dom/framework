import { isDescendant } from '@type-dom/utils';
import { Teleport } from '../../dom/components/teleport/teleport.class';
import { nextTick } from '../scheduler';
import { TypeNode } from '../abstracts/type-node/type-node.abstract';
import { getTarget } from '../helpers/getNodeContainer';
import { hasVIf } from '../transforms/vIf';
import { onMounted } from '../apiLifecycle';
import { RendererElement } from './renderer';

/**
 * 创建一个锚点元素，在开发环境下创建注释节点，生产环境下创建空文本节点
 * @param txt - 要创建的注释文本内容
 * @returns 返回创建的DOM节点（开发环境返回注释节点，生产环境返回空文本节点）
 */
export function createAnchor(txt: string) {
  // console.warn('process.env.NODE_ENV is ', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    // console.warn('当前是开发环境');
    return document.createComment(txt);
  } else {
    // console.warn('当前是生产环境');
    return document.createTextNode('');
  }
}

/**
 * 处理元素的注释占位符初始化及DOM替换逻辑
 * Teleport 要单独处理
 * @param element 待处理的元素对象，包含DOM节点及关联的注释节点
 * @param container
 * @returns void
 */
export function renderAnchor(element: TypeNode, container?: RendererElement) {
  if (element.dom instanceof DocumentFragment) {
    // console.error('element.dom is DocumentFragment . ');
    element.anchorStart =
      element.anchorStart ??
      createAnchor('[' + element.className + '-' + element.uid);
    element.anchor =
      element.anchor ??
      createAnchor(element.className + '-' + element.uid + ']');
  } else if (hasVIf(element)) {
    element.anchor =
      element.anchor ??
      document.createComment('v-if');
  }

  // const parentNode = element.anchor?.parentNode;
  // if (parentNode) {
  //   console.error('parentNode is ', parentNode);
  // }
  if (container) {
    if (element.anchorStart && !isDescendant(container, element.anchorStart)) {
      container.appendChild(element.anchorStart);
    }
    if (element.anchor && !isDescendant(container, element.anchor)){
      container.appendChild(element.anchor);
    }
  }

  if (element.className === 'Teleport') {
    element.targetStart = element.targetStart ?? createAnchor('target start');
    element.targetAnchor =
      element.targetAnchor ?? createAnchor('target anchor');
    const target = getTarget(element);
    if (target) {
      renderTeleportAnchor(element as Teleport, target);
    } else {
      onMounted(() => {
        const target = getTarget(element);
        if (target) {
          renderTeleportAnchor(element as Teleport, target);
        } else {
          nextTick(() => {
            const target = getTarget(element);
            if (target) {
              renderTeleportAnchor(element as Teleport, target);
            } else {
              console.error('target can not find . ');
            }
          });
        }
      }, element.root);
    }
  }
}

function renderTeleportAnchor(teleport: Teleport, target: RendererElement) {
  if (target) {
    if (!isDescendant(target, teleport.targetStart)) {
      target.appendChild(teleport.targetStart);
    }
    if (!isDescendant(target, teleport.targetAnchor)) {
      target.appendChild(teleport.targetAnchor);
    }
  }
}
