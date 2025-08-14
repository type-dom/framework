import { TypeInput } from '../../../core/type-html/input/input.abstract';
import { TypeInputProps } from '../../../core/type-html/input/input.interface';
import type { IInput } from './input.interface';

export class Input extends TypeInput implements IInput {
  className: 'Input';
  override childNodes: [];

  // value: string | number | boolean | undefined;
  override isBasic = true;

  constructor(params: TypeInputProps = {}) {
    super();
    this.className = 'Input';
    this.childNodes = [];
    this.slotChildren(params.slot);
    this.useParams(params);
  }

  /**
   * 传统的输入控件
   * text checkbox radio button submit password reset hidden file image
   * 新增类型
   * color url [注意]safari和IE不支持该类型
   * number [注意]IE不支持该类型 min max step value(规定默认值）
   * range 定义包含一定范围内数字值的输入域 min max step value(规定默认值） [注意]IE9-不支持该类型
   * tel email search
   * month week date time datetime datetime-local[注意]IE和firefox这6种日期类型都不支持，chrome不支持datetime类型
   */
  get type(): string {
    return this.attr.get('type') as string;
  }

  /**
   * 输入框和单选框、复选框不一样
   * 单选、复选框本身有value属性的。
   */
  get value(): string | undefined {
    return this.dom?.value;
  }

  set value(value: string | number | boolean) {
    this.attr.set('value', value);
    if (this.dom) {
      this.dom.value = String(value);
    }
  }

  // override mounted() {
  //   const props = this.props;
  //   if (props.modelValue) {
  //     this.attr.set('value', String(props.modelValue));
  //   }
  // }

  focus(): void {
    this.dom?.focus();
  }

  // 日期类型的处理
  setValue(value: string | number | boolean): void {
    // console.error('input setValue . ');
    // todo datetime 格式。
    if (this.type === 'date') {
      // console.log('isNaN(Number(value)) is ', isNaN(Number(value)));
      if (isNaN(Number(value))) {
        //
      } else {
        // const timeStamp = new Date().getTime();
        // console.error('timestamp is ', timeStamp);
        if (String(value).length === 13) {
          const d = new Date(value as string);
          value =
            d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); // + ' ' +
          // (d.getHours()) + ':' +
          // (d.getMinutes()) + ':' +
          // (d.getSeconds());
          // console.log('value is ', value);
        } else {
          // console.error('时间戳长度有问题，不是13位');
          throw Error('时间戳长度有问题，不是13位');
        }
      }
    }
    this.value = value;
    // this.setAttribute('value', value);
    // this.dom.value = String(value);
  }
}
