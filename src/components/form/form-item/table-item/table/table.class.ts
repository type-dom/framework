import { fromEvent } from 'rxjs';
import { TypeTable } from '../../../../../../type-dom/type-element/type-html/table/table.class';
import { Span } from '../../../../../../type-dom/element/html-element/span/span.class';
import { toJSON } from '../../../../../../type-dom/type-element/type-element.function';
import { TextNode } from '../../../../../../type-dom/text-node/text-node.class';
import { WebControl } from '../../../../../core/controls/web-control.abstract';
import { ITableConfig, ITableField } from '../../../../../core/controls/complex/table/table.interface';
import { FormEditor } from '../../../../../form-editor';
import { TableItem } from '../table-item.class';
import { TableRow } from './row/row.class';
import { TableHead } from './head/head.class';
import { ITableRow } from './row/row.interface';
import { ITableHead } from './head/head.interface';
import { TableDataCell } from './data-cell/data-cell.class';
import { ITable } from './table.interface';

// todo 是否有选项列和操作列。
export class Table extends TypeTable implements ITable {
  nodeName: 'table';
  className: 'Table';
  dom: HTMLTableElement;
  childNodes: [TableHead, ...TableRow[]];
  config?: ITableConfig;
  readonly tableHead: TableHead;

  constructor(public parent: TableItem) {
    super();
    this.nodeName = 'table';
    this.dom = document.createElement(this.nodeName);
    this.propObj = {
      attrObj: {
        border: '1', // 表格的边框宽度 1px;
        cellspacing: '0', // 单元格间距为 0
        cellpadding: '10', // 单元格 padding 10;
      },
      styleObj: {
        height: '100%',
        width: '100%',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#DCDFE6',
        // border: '1px solid #DCDFE6',
        backgroundColor: '#fff',
        // marginBottom: '-10px',
        // borderRadius: '4px',
        // padding: '10px',
        // textAlign: 'center',
      },
    };
    this.className = 'Table';
    this.tableHead = new TableHead(this);
    this.childNodes = [this.tableHead];
    // this.initEvents();
  }

  /**
   * 根据表格对象的信息，获取tableHeader的数据。
   * 与config.tableHeader有可能不一致
   */
  get tableHeader(): ITableField[] {
    const tableHead = this.tableHead;
    const tableHeader: ITableField[] = [];
    tableHead.childNodes.forEach((th, index) => {
      const field: ITableField = {} as ITableField;
      field.name = tableHead.childNodes[index].attrObj.name as string;
      field.label = tableHead.childNodes[index].childNodes[0].nodeValue;
      tableHeader.push(field);
    });
    return tableHeader;
  }

  /**
   * 根据表格对象，获取tableData的信息
   * 与config.tableData可能不一致。
   */
  get tableData(): Record<string, string | number | boolean>[] {
    const dataArr: Record<string, string | number | boolean>[] = [];
    // console.log('tableHeader is ', this.tableHeader);
    this.childNodes.forEach((tr, index) => {
      if (index > 0) { // 两重保证
        if (tr instanceof TableRow) {
          // console.log('tr is ', tr);
          const data: Record<string, string | number | boolean> = {};
          tr.childNodes.forEach((td: TableDataCell | Span, index) => {
            // console.log('this.tableHeader[' + index + '] is ', this.tableHeader[index]);
            // console.log('td.value is ', td.value);
            if (td instanceof TableDataCell) {
              data[this.tableHeader[index].name] = td.value;
            }
            // console.log('data is ', data);
          });
          dataArr.push(data);
        }
      }
    });
    // console.log('dataArr is ', dataArr);
    return dataArr;
  }

  /**
   * 根据表格的配置数据config，重新渲染表格
   *
   * todo 根据条件判断是否可以动态添加记录。底部添加一个添加的标签
   * @param config
   */
  setTable(config: ITableConfig): void {
    // this.clearChildNodes();
    // this.clearChildDom();
    // console.log('setTable ');
    console.log('setTable config is ', config);
    this.childNodes.forEach((child, index) => {
      if (index > 0) {
        child.dom.remove();
      }
    });
    this.childNodes = [this.tableHead];

    this.config = config;
    this.tableHead.setHeadItems(config.tableHeader);
    // console.log('tableHead', this.tableHead);
    config.tableData.map(item => { // 根据表头过滤字段 todo 这样如果表头设置和行数据不对应，行数据会丢失。
      for (const key in item) {
        const isExit = config.tableHeader.find(head => head.name === key);
        if (!isExit) {
          delete item[key];
        }
      }
      return item;
    }).forEach((tr: Record<string, string | number | boolean>, index: number) => {
      if (index === 0) {
      // 数据行的第一行，一般应该是已经存在的，这样才能获取到数据行中设置的控件信息。
      }

      const trObj = new TableRow(this, tr);
      this.childNodes.push(trObj);
    });
    // console.log('table boundBox is ', this.boundBox);
  }

  /**
   * 根据传入的tableData，重新创建表格的数据显示行。
   * 先获取原有数据行的字面量，以获取每一个单元格对应的控件类型设置
   * 接着依据数据行的字面量，创建新的表格行。
   * 然后，根据tableData对应的数据初始化表格行。
   * 最后，将新的表格行追加到表格中。
   * @param tableData
   */
  setTableData(tableData: Record<string, string>[]): void {
    console.log('setTableData . ');
    const rowLiteral = toJSON(this.childNodes[1]) as ITableRow;
    this.childNodes.forEach((tr, index) => {
      if (index > 0) {
        tr.dom.remove();
      }
    });
    this.childNodes.length = 1;
    tableData.forEach(trJson => {
      const tableRow = new TableRow(this, trJson);
      tableRow.createInstance(rowLiteral);
      for (const key in trJson) {
        if (key.endsWith('.ID')) {
          tableRow.addAttrObj({
            'row-id': JSON.stringify({ [key]: trJson[key] }),
          });
        }
      }
      tableRow.childNodes.forEach((td: TableDataCell | Span, index) => {
        if (td instanceof Span) { // 最后的删除对象。
          return;
        }
        if (td.control instanceof WebControl) {
          td.control.setValue(trJson[this.tableHeader[index].name] || '');
        } else if (td.control instanceof TextNode) {
          td.control.nodeValue = trJson[this.tableHeader[index].name] || '';
        }
      });
      this.appendChild(tableRow);
    });
  }

  /**
   * 改变表格的字段数量
   * 对应 控件属性栏 的 table-column 属性控制项
   * 目前只有在控件属性中才能改变表格的字段数量。
   * @param value
   */
  changeColumnCount(value: number): void {
    console.log('changeColumnCount');
    // 已经渲染的config
    const config = this.config;
    if (!config) {
      console.log('error');
      return;
    }
    const diff = Number(value) - config.tableHeader.length;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        const index = config.tableHeader.length + 1 + i;
        const field: ITableField = {
          name: 'table1.field' + index,
          label: '字段1-' + index,
        };
        config.tableHeader.push(field);
      }
      config.tableData.map(item => {
        config.tableHeader.forEach((field) => {
          if (!item[field.name]) {
            item[field.name] = '';
          }
        });
        return item;
      });
      console.log(' config is ', config);
      // console.log('tableHead', this.tableHead);
      this.childNodes.forEach((tr, index) => {
        if (index > 0) {
          if (tr instanceof TableRow) {
            for (let i = 0; i < diff; i++) {
              const td = new TableDataCell(tr, '');
              // const control = new SingleInputControl(td);
              // control.formItem.deleteSpan.hide();
              // td.addChild(control);
              tr.appendChild(td);
            }
          }
        }
      });
    } else {
      config.tableHeader.splice(diff, -diff);
      console.log('config.tableHeader is ', config.tableHeader);
      this.childNodes.forEach((tr, index) => {
        if (index > 0) {
          if (tr instanceof TableRow) {
            tr.childNodes.forEach((td, index) => {
              if (index > value - 1) {
                td.dom.remove();
              }
            });
            tr.childNodes.length = value;
          }
        }
      });
    }
    this.tableHead.setHeadItems(config.tableHeader);
    this.tableHead.render();
  }
  createInstance(tableLiteral: ITable): void {
    super.createInstance(tableLiteral);
    for (let index = 0; index < tableLiteral.childNodes.length; index++) {
      const trLiteral = tableLiteral.childNodes[index];
      if (index === 0) {
        this.tableHead.createInstance(trLiteral as ITableHead);
      } else {
        // todo 设计模式下，应该只有一行
        if (FormEditor.mode === 'design') {
          if (index === 1) {
            (this.childNodes[index]).createInstance(trLiteral as ITableRow);
            break; // 断出
          }
        }
        if ((this.childNodes[index]) instanceof TableRow) {
          (this.childNodes[index] as TableRow).createInstance(trLiteral as ITableRow);
        } else {
          const trObj = new TableRow(this, {});
          trObj.createInstance(trLiteral as ITableRow);
          this.addChild(trObj);
        }
      }
    }
  }

  //  todo 点击非td处， selectedTableDataCell = null;
  initEvents(): void {
    this.events.push(
      fromEvent(this.dom, 'click').subscribe(() => {
        console.log('table click . ');
        // console.log('e.target is ', e.target);
        // console.log('table boundBox is ', this.boundBox);
      })
    );
  }
}
