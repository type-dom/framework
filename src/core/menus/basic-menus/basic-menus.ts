import { BasicControlWrapper } from '../../../views/layout/body/left/contents/control-wrapper/basic-control-wrapper/basic-control-wrapper';
import { TypeDiv } from '../../../../type-dom/type-element/type-html/div/div.abstract';
import { Display } from '../../../../type-dom/style/style.enum';
import { ControlMenu } from '../menu.abstract';
import { NumericalMenu } from './numerical/numerical-menu';
import { SingleInputMenu } from './single-input/single-input-menu';
import { MultilineInputMenu } from './multiline-input/multiline-input-menu';
import { RadioMenu } from './radio/radio-menu';
import { SelectMenu } from './select/select-menu';
import { DateMenu } from './date/date-menu';
import { TimeMenu } from './time/time-menu';
import { AttachmentMenu } from './attachment/attachment-menu';
import { CheckboxMenu } from './checkbox/checkbox-menu';

export class BasicMenus extends TypeDiv {
  className: 'BasicControlMenus';
  childNodes: ControlMenu[];
  constructor(public parent: BasicControlWrapper) {
    super();
    this.className = 'BasicControlMenus';
    this.propObj = {
      styleObj: {
        display: Display.flex,
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        width: '200px',
      },
      attrObj: {
        // class: 'components',
        name: 'basic-control-menus',
      }
    };
    const numerical = new NumericalMenu(this);
    const singleInput = new SingleInputMenu(this);
    const multilineInput = new MultilineInputMenu(this);
    const dateMenu = new DateMenu(this);
    const timeMenu = new TimeMenu(this);
    const radioMenu = new RadioMenu(this);
    const checkboxMenu = new CheckboxMenu(this);
    const selectMenu = new SelectMenu(this);
    const attachmentMenu = new AttachmentMenu(this);
    this.childNodes = [
      singleInput,
      multilineInput,
      numerical,
      dateMenu,
      timeMenu,
      radioMenu,
      checkboxMenu,
      selectMenu,
      attachmentMenu
    ];
  }
}
