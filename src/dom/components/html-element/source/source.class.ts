import { TypeSource } from '../../../../core/abstracts/type-html/source/source.abstract';
import { SourceProps } from '../../../../core/abstracts/type-html/source/source.interface';
import type { ISource } from './source.interface';

export class Source extends TypeSource implements ISource {
  className: 'Source';

  constructor(params: SourceProps = {}) {
    super(params);
    this.className = 'Source';
  }
}
