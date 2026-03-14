import { TypeElement } from '../abstracts/type-element/type-element.abstract';

export function mountChildren(element: TypeElement) {
  for (const child of element.childNodes ?? []) {
    if (child.isMounted) {
      // console.error('child is mounted , child is ', child);
      continue;
    }
    child.mount(element.dom);
  }
}
