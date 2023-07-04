import { Display } from '../../../type-dom/style/style.enum';
import { IStyle } from '../../../type-dom/style/style.interface';

export const menuStyle: Partial<IStyle> = {
  display: Display.flex,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: '55px',
  margin: '5px',
  // marginRight: '11px',
  // marginTop: '8px',
  fontSize: '12px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.4)',
  border: '1px solid #eee',
  backgroundColor: '#eee',
  background: '-webkit-linear-gradient(top, #eee, #d9d9d9)',
};

export const menuActive: Partial<IStyle> = {
  backgroundColor: '#fae100',
  background: '#fae100'
};
