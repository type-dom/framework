import { TypeElement } from '../type-element/type-element.abstract';
import { ITypeFragment } from './type-fragment.interface';

export abstract class TypeFragment extends TypeElement implements ITypeFragment {
  nodeName: 'fragment';
  dom: undefined;

  constructor() {
    super();
    this.nodeName = 'fragment';
    this.dom = undefined;
  }
}
