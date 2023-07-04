import { fromEvent } from 'rxjs';
import { formData, formJson, oldFormData, oldFormJson, tableData, tableJson } from './form-data';
import { FormEditor } from './form-editor';
import './styles/index.scss';
// 在页面中调用时
fromEvent(document, 'DOMContentLoaded').subscribe(() => {
  // console.log('form mode document DOMContentLoaded, e is ', e);
  const formEl = document.querySelector('#readonly-mode') as HTMLElement;
  // console.log('formEl is ', formEl);
  if (formEl) {
    const editor = new FormEditor(formEl, 'readonly');
    console.log('editor is ', editor);
    editor.createInstance(oldFormJson);
    // 给控件配值
    FormEditor.setFormData(oldFormData);

    // editor.createInstance(formJson);
    // // 给控件配值
    // editor.setFormData(exampleData);

    // editor.createInstance(tableJson);
    // // 给控件配值
    // editor.setFormData(tableData);

  }
});

// fromEvent(window, 'load').subscribe(e => {
//   console.log('window onload is ', e);
// });
