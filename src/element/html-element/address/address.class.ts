import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeAddress } from '../../../type-element/type-html/address/address.abstract';
import { XElement } from '../../x-element/x-element.class';
import { IAddress } from './address.interface';
export class Address extends TypeAddress implements IAddress {
  className: 'Address';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Address';
  }
}
