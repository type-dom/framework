import { TextNode } from './text-node/text-node.class';
import { Division } from './element/html-element/division/division.class';
import { Heading } from './element/html-element/heading/heading.class';
import { UnorderedList } from './element/html-element/unordered-list/unordered-list.class';
import { ListItem } from './element/html-element/unordered-list/list-item/list-item.class';
import { XElement } from './x-element/x-element.class';
import { Header } from './element/html-element/header/header.class';
import { Button } from './element/html-element/button/button.class';
import { Span } from './element/html-element/span/span.class';
import { SectionClass } from './element/html-element/section/section.class';
import { Table } from './element/html-element/table/table.class';
import { TableBody } from './element/html-element/table/body/body.class';
import { Select } from './element/html-element/select/select.class';
import { Label } from './element/html-element/label/label.class';
import { Input } from './element/html-element/input/input.class';
import { Textarea } from './element/html-element/textarea/textarea.class';
import { TableHeaderCell } from './element/html-element/table/header-cell/header-cell.class';
import { TableRow } from './element/html-element/table/row/row.class';
import { TableHead } from './element/html-element/table/head/head.class';
import { TableDataCell } from './element/html-element/table/data-cell/data-cell.class';
import { SelectOption } from './element/html-element/select/option/option.class';
import { TableFoot } from './element/html-element/table/foot/foot.class';
// 命名空间  TypeDom
class TypeDom {
  static XElement = XElement;
  static TextNode = TextNode;
  static Division = Division;
  static Span = Span;
  static Button = Button;
  static Header = Header;
  static Section = SectionClass;
  static Heading = Heading;
  static UnorderedList = UnorderedList;
  static ListItem = ListItem;
  static Select = Select;
  static SelectOption = SelectOption;
  static Label = Label;
  static Input = Input;
  static Textarea = Textarea;
  static Table = Table;
  static TableHeaderCell = TableHeaderCell;
  static TableHead = TableHead;
  static TableBody = TableBody;
  static TableRow = TableRow;
  static TableDataCell = TableDataCell;
  static TableFoot = TableFoot;

}
export default TypeDom;

export type ITypeClass = typeof Button | typeof Division | typeof Heading
  | typeof Input | typeof Textarea | typeof Label| typeof Span
  | typeof Select | typeof SelectOption
  | typeof UnorderedList | typeof ListItem
  | typeof Table | typeof TableRow | typeof TableDataCell
  | typeof TableHeaderCell
  | typeof TableHead | typeof TableBody | typeof TableFoot;
