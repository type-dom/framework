import { Computed, Signal } from '@type-dom/signals';
import { MaybeRef, ToMaybeRefs } from '../../../reactivity/ref';
import { EventHandlers, Events } from '../../../core/event-emitter/event-emitter.interface';
import { StyleValue } from '../style/style.interface';

/**
 * class: active
 * class: { active: isActive, 'text-danger': hasError }
 * class: [activeClass, errorClass]
 * class: [{ active: isActive }, errorClass]
 */

export type RawClass =
  | undefined
  | boolean
  | string
  | Record<string, MaybeRef<boolean | string | unknown>>;

export type ClassValue = RawClass | Signal<ClassValue> | Computed<ClassValue> | ClassValue[];

// export type IClass =
//   | MaybeRef<string | undefined | Record<string, MaybeRef<boolean | unknown>>>
//   // | MaybeRef<string | boolean | undefined>[]
//   | (MaybeRef<string | undefined | Record<string, MaybeRef<boolean | unknown>>> | MaybeRef<(string | undefined)[]>)[];

// Note: this file is auto concatenated to the end of the bundled d.ts during
// build.

// This code is based on react definition in DefinitelyTyped published under the MIT license.
//      Repository: https://github.com/DefinitelyTyped/DefinitelyTyped
//      Path in the repository: types/react/index.d.ts
//
// Copyrights of original definition are:
//      AssureSign <http://www.assuresign.com>
//      Microsoft <https://microsoft.com>
//                 John Reilly <https://github.com/johnnyreilly>
//      Benoit Benezech <https://github.com/bbenezech>
//      Patricio Zavolinsky <https://github.com/pzavolinsky>
//      Digiguru <https://github.com/digiguru>
//      Eric Anderson <https://github.com/ericanderson>
//      Dovydas Navickas <https://github.com/DovydasNavickas>
//                 Josh Rutherford <https://github.com/theruther4d>
//                 Guilherme Hübner <https://github.com/guilhermehubner>
//                 Ferdy Budhidharma <https://github.com/ferdaber>
//                 Johann Rakotoharisoa <https://github.com/jrakotoharisoa>
//                 Olivier Pascal <https://github.com/pascaloliv>
//                 Martin Hochel <https://github.com/hotell>
//                 Frank Li <https://github.com/franklixuefei>
//                 Jessica Franco <https://github.com/Jessidhia>
//                 Saransh Kataria <https://github.com/saranshkataria>
//                 Kanitkorn Sujautra <https://github.com/lukyth>
//                 Sebastian Silbermann <https://github.com/eps1lon>

// export type MaybeRefHtmlAttributes = {
//   [K in keyof HTMLAttributes]?: MaybeRef<HTMLAttributes[K]>
// }
// export type MaybeRefSvgAttributes = {
//   [K in keyof SVGAttributes]?: MaybeRef<SVGAttributes[K]>
// }

export type Attributes = ToMaybeRefs<HTMLAttributes> | ToMaybeRefs<SVGAttributes> | undefined;

type Booleanish = boolean | 'true' | 'false';
type Numberish = number | string;

// All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
export interface AriaAttributes {
  /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
  'aria-activedescendant'?: string
  ariaActivedescendant?: string
  /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
  'aria-atomic'?: Booleanish
  ariaAtomic?: Booleanish
  /**
   * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
   * presented if they are made.
   */
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both'
  ariaAutocomplete?: 'none' | 'inline' | 'list' | 'both'
  /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
  'aria-busy'?: Booleanish
  ariaBusy?: Booleanish
  /**
   * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
   * @see aria-pressed @see aria-selected.
   */
  'aria-checked'?: Booleanish | 'mixed'
  ariaChecked?: Booleanish | 'mixed'
  /**
   * Defines the total number of columns in a table, grid, or treegrid.
   * @see aria-colindex.
   */
  'aria-colcount'?: Numberish
  ariaColcount?: Numberish
  /**
   * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
   * @see aria-colcount @see aria-colspan.
   */
  'aria-colindex'?: Numberish
  ariaColindex?: Numberish
  /**
   * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-colindex @see aria-rowspan.
   */
  'aria-colspan'?: Numberish
  ariaColspan?: Numberish
  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the current element.
   * @see aria-owns.
   */
  'aria-controls'?: string
  ariaControls?: string
  /** Indicates the element that represents the current item within a container or set of related elements. */
  'aria-current'?: Booleanish | 'page' | 'step' | 'location' | 'date' | 'time'
  ariaCurrent?: Booleanish | 'page' | 'step' | 'location' | 'date' | 'time'
  /**
   * Identifies the element (or elements) that describes the object.
   * @see aria-labelledby
   */
  'aria-describedby'?: string
  ariaDescribedby?: string
  /**
   * Identifies the element that provides a detailed, extended description for the object.
   * @see aria-describedby.
   */
  'aria-details'?: string
  ariaDetails?: string
  /**
   * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
   * @see aria-hidden @see aria-readonly.
   */
  'aria-disabled'?: Booleanish
  ariaDisabled?: Booleanish
  /**
   * Indicates what functions can be performed when a dragged object is released on the drop target.
   * @deprecated in ARIA 1.1
   */
  'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup'
  ariaDropeffect?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup'
  /**
   * Identifies the element that provides an error message for the object.
   * @see aria-invalid @see aria-describedby.
   */
  'aria-errormessage'?: string
  ariaErrormessage?: string
  /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
  'aria-expanded'?: Booleanish
  ariaExpanded?: Booleanish
  /**
   * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
   * allows assistive technology to override the general default of reading in document source order.
   */
  'aria-flowto'?: string
  ariaFlowto?: string
  /**
   * Indicates an element's "grabbed" state in a drag-and-drop operation.
   * @deprecated in ARIA 1.1
   */
  'aria-grabbed'?: Booleanish
  ariaGrabbed?: Booleanish
  /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
  'aria-haspopup'?: Booleanish | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
  ariaHaspopup?: Booleanish | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
  /**
   * Indicates whether the element is exposed to an accessibility API.
   * @see aria-disabled.
   */
  'aria-hidden'?: Booleanish
  ariaHidden?: Booleanish
  /**
   * Indicates the entered value does not conform to the format expected by the application.
   * @see aria-errormessage.
   */
  'aria-invalid'?: Booleanish | 'grammar' | 'spelling'
  ariaInvalid?: Booleanish | 'grammar' | 'spelling'
  /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
  'aria-keyshortcuts'?: string
  ariaKeyshortcuts?: string
  /**
   * Defines a string value that labels the current element.
   * @see aria-labelledby.
   */
  'aria-label'?: string
  ariaLabel?: string
  /**
   * Identifies the element (or elements) that labels the current element.
   * @see aria-describedby.
   */
  'aria-labelledby'?: string
  ariaLabelledby?: string
  /** Defines the hierarchical level of an element within a structure. */
  'aria-level'?: Numberish
  ariaLevel?: Numberish
  /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
  'aria-live'?: 'off' | 'assertive' | 'polite'
  ariaLive?: 'off' | 'assertive' | 'polite'
  /** Indicates whether an element is modal when displayed. */
  'aria-modal'?: Booleanish
  ariaModal?: Booleanish
  /** Indicates whether a text box accepts multiple lines of input or only a single line. */
  'aria-multiline'?: Booleanish
  ariaMultiline?: Booleanish
  /** Indicates that the user may select more than one item from the current selectable descendants. */
  'aria-multiselectable'?: Booleanish
  ariaMultiselectable?: Booleanish
  /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
  'aria-orientation'?: 'horizontal' | 'vertical'
  ariaOrientation?: 'horizontal' | 'vertical'
  /**
   * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
   * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
   * @see aria-controls.
   */
  'aria-owns'?: string
  ariaOwns?: string
  /**
   * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
   * A hint could be a sample value or a brief description of the expected format.
   */
  'aria-placeholder'?: string
  ariaPlaceholder?: string
  /**
   * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-setsize.
   */
  'aria-posinset'?: Numberish
  ariaPosinset?: Numberish
  /**
   * Indicates the current "pressed" state of toggle buttons.
   * @see aria-checked @see aria-selected.
   */
  'aria-pressed'?: Booleanish | 'mixed'
  ariaPressed?: Booleanish | 'mixed'
  /**
   * Indicates that the element is not editable, but is otherwise operable.
   * @see aria-disabled.
   */
  'aria-readonly'?: Booleanish
  ariaReadonly?: Booleanish
  /**
   * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
   * @see aria-atomic.
   */
  'aria-relevant'?:
    | 'additions'
    | 'additions removals'
    | 'additions text'
    | 'all'
    | 'removals'
    | 'removals additions'
    | 'removals text'
    | 'text'
    | 'text additions'
    | 'text removals'
  ariaRelevant?:
    | 'additions'
    | 'additions removals'
    | 'additions text'
    | 'all'
    | 'removals'
    | 'removals additions'
    | 'removals text'
    | 'text'
    | 'text additions'
    | 'text removals'
  /** Indicates that user input is required on the element before a form may be submitted. */
  'aria-required'?: Booleanish
  ariaRequired?: Booleanish
  /** Defines a human-readable, author-localized description for the role of an element. */
  'aria-roledescription'?: string
  ariaRoledescription?: string
  /**
   * Defines the total number of rows in a table, grid, or treegrid.
   * @see aria-rowindex.
   */
  'aria-rowcount'?: Numberish
  ariaRowcount?: Numberish
  /**
   * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
   * @see aria-rowcount @see aria-rowspan.
   */
  'aria-rowindex'?: Numberish
  ariaRowindex?: Numberish
  /**
   * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-rowindex @see aria-colspan.
   */
  'aria-rowspan'?: Numberish
  ariaRowspan?: Numberish
  /**
   * Indicates the current "selected" state of various widgets.
   * @see aria-checked @see aria-pressed.
   */
  'aria-selected'?: Booleanish
  ariaSelected?: Booleanish
  /**
   * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-posinset.
   */
  'aria-setsize'?: Numberish
  ariaSetsize?: Numberish
  /** Indicates if items in a table or grid are sorted in ascending or descending order. */
  'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other'
  /** Defines the maximum allowed value for a range widget. */
  'aria-valuemax'?: Numberish
  ariaValuemax?: Numberish
  /** Defines the minimum allowed value for a range widget. */
  'aria-valuemin'?: Numberish
  ariaValuemin?: Numberish
  /**
   * Defines the current value for a range widget.
   * @see aria-valuetext.
   */
  'aria-valuenow'?: Numberish
  ariaValuenow?: Numberish
  /** Defines the human readable text alternative of aria-valuenow for a range widget. */
  'aria-valuetext'?: string
  ariaValuetext?: string
  ariaDescription?: string
}

export interface HTMLAttributes extends AriaAttributes, EventHandlers<Events> {
  innerHTML?: string

  class?: any
  style?: StyleValue

  // Standard HTML Attributes
  accesskey?: string
  contenteditable?: Booleanish | 'inherit' | 'plaintext-only'
  contextmenu?: string
  dir?: string
  draggable?: Booleanish
  hidden?: Booleanish | '' | 'hidden' | 'until-found'
  id?: string | number
  inert?: Booleanish
  lang?: string
  placeholder?: string
  spellcheck?: Booleanish
  tabindex?: Numberish
  title?: string
  translate?: 'yes' | 'no'

  // Unknown
  radiogroup?: string // <command>, <menuitem>

  // WAI-ARIA
  role?: string

  // RDFa Attributes
  about?: string
  datatype?: string
  inlist?: any
  prefix?: string
  property?: string
  resource?: string
  typeof?: string
  vocab?: string

  // Non-standard Attributes
  autocapitalize?: string
  autocorrect?: string
  autosave?: string
  color?: string
  itemprop?: string
  itemscope?: Booleanish
  itemtype?: string
  itemid?: string
  itemref?: string
  results?: Numberish
  security?: string
  unselectable?: 'on' | 'off'

  // Living Standard
  /**
   * Hints at the type of data that might be entered by the user while editing the element or its contents
   * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
   */
  inputmode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
  /**
   * Specify that a standard HTML element should behave like a defined custom built-in element
   * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
   */
  is?: string

  name?: string
  [d: `data-${string}`]: string | number | undefined
}

type HTMLAttributeReferrerPolicy =
  | ''
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url'

export interface AnchorHTMLAttributes extends HTMLAttributes {
  download?: any
  href?: string
  hreflang?: string
  media?: string
  ping?: string
  rel?: string
  target?: string
  type?: string
  referrerpolicy?: HTMLAttributeReferrerPolicy
}

export interface AreaHTMLAttributes extends HTMLAttributes {
  alt?: string
  coords?: string
  download?: any
  href?: string
  hreflang?: string
  media?: string
  referrerpolicy?: HTMLAttributeReferrerPolicy
  rel?: string
  shape?: string
  target?: string
}

export interface AudioHTMLAttributes extends MediaHTMLAttributes {
  onPlay?: (payload: Event) => void;  // 播放时触发
  onPause?: (payload: Event) => void; // 暂停时触发
  onEnded?: (payload: Event) => void; // 播放结束时触发
}

export interface BaseHTMLAttributes extends HTMLAttributes {
  href?: string
  target?: string
}

export interface BlockquoteHTMLAttributes extends HTMLAttributes {
  cite?: string
}

export interface ButtonHTMLAttributes extends HTMLAttributes {
  autofocus?: Booleanish
  disabled?: Booleanish
  form?: string
  formaction?: string
  formenctype?: string
  formmethod?: string
  formnovalidate?: Booleanish
  formtarget?: string
  name?: string
  type?: 'submit' | 'reset' | 'button'
  value?: string | ReadonlyArray<string> | number
}

export interface CanvasHTMLAttributes extends HTMLAttributes {
  height?: Numberish
  width?: Numberish
}

export interface ColHTMLAttributes extends HTMLAttributes {
  span?: Numberish
  width?: Numberish
}

export interface ColgroupHTMLAttributes extends HTMLAttributes {
  span?: Numberish
}

export interface DataHTMLAttributes extends HTMLAttributes {
  value?: string | ReadonlyArray<string> | number
}

export interface DetailsHTMLAttributes extends HTMLAttributes {
  name?: string
  open?: Booleanish
  onToggle?: (payload: ToggleEvent) => void
}

export interface DelHTMLAttributes extends HTMLAttributes {
  cite?: string
  datetime?: string
}

export interface DialogHTMLAttributes extends HTMLAttributes {
  open?: Booleanish
  onClose?: (payload: Event) => void
}

export interface EmbedHTMLAttributes extends HTMLAttributes {
  height?: Numberish
  src?: string
  type?: string
  width?: Numberish
}

export interface FieldsetHTMLAttributes extends HTMLAttributes {
  disabled?: Booleanish
  form?: string
  name?: string
}

export interface FormHTMLAttributes extends HTMLAttributes {
  acceptcharset?: string
  action?: string
  autocomplete?: string
  enctype?: string
  method?: string
  name?: string
  novalidate?: Booleanish
  target?: string
}

export interface HtmlHTMLAttributes extends HTMLAttributes {
  manifest?: string
}

export interface IframeHTMLAttributes extends HTMLAttributes {
  allow?: string
  allowfullscreen?: Booleanish
  allowtransparency?: Booleanish
  /** @deprecated */
  frameborder?: Numberish
  height?: Numberish
  loading?: 'eager' | 'lazy'
  /** @deprecated */
  marginheight?: Numberish
  /** @deprecated */
  marginwidth?: Numberish
  name?: string
  referrerpolicy?: HTMLAttributeReferrerPolicy
  sandbox?: string
  /** @deprecated */
  scrolling?: string
  seamless?: Booleanish
  src?: string
  srcdoc?: string
  width?: Numberish
}

export interface ImgHTMLAttributes extends HTMLAttributes {
  alt?: string
  crossorigin?: 'anonymous' | 'use-credentials' | 'crossorigin' | ''
  decoding?: 'async' | 'auto' | 'sync'
  height?: Numberish
  loading?: 'eager' | 'lazy'
  referrerpolicy?: HTMLAttributeReferrerPolicy
  sizes?: string
  src?: string
  srcset?: string
  usemap?: string
  width?: Numberish
}

export interface InsHTMLAttributes extends HTMLAttributes {
  cite?: string
  datetime?: string
}

export type InputTypeHTMLAttribute =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  | (string & {})

export interface InputHTMLAttributes extends HTMLAttributes {
  accept?: string
  alt?: string
  autocomplete?: string
  autofocus?: Booleanish
  capture?: boolean | 'user' | 'environment' // https://www.w3.org/tr/html-media-capture/#the-capture-attribute
  checked?: Booleanish | any[] | Set<any> // for IDE v-model multi-checkbox support
  crossorigin?: string
  disabled?: Booleanish
  enterKeyHint?:
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send'
  form?: string
  formaction?: string
  formenctype?: string
  formmethod?: string
  formnovalidate?: Booleanish
  formtarget?: string
  height?: Numberish
  indeterminate?: boolean
  list?: string
  max?: Numberish
  maxlength?: Numberish
  min?: Numberish
  minlength?: Numberish
  multiple?: Booleanish
  name?: string
  pattern?: string
  placeholder?: string
  readonly?: Booleanish
  required?: Booleanish
  size?: Numberish
  src?: string
  step?: Numberish
  type?: InputTypeHTMLAttribute
  value?: any // we support :value to be bound to anything w/ v-model
  width?: Numberish

  trueValue?: string | number | boolean
  falseValue?: string | number | boolean
  intermediate?: boolean
}

export interface KeygenHTMLAttributes extends HTMLAttributes {
  autofocus?: Booleanish
  challenge?: string
  disabled?: Booleanish
  form?: string
  keytype?: string
  keyparams?: string
  name?: string
}

export interface LabelHTMLAttributes extends HTMLAttributes {
  for?: string
  form?: string
}

export interface LiHTMLAttributes extends HTMLAttributes {
  value?: string | ReadonlyArray<string> | number
}

export interface LinkHTMLAttributes extends HTMLAttributes {
  as?: string
  crossorigin?: string
  href?: string
  hreflang?: string
  integrity?: string
  media?: string
  referrerpolicy?: HTMLAttributeReferrerPolicy
  rel?: string
  sizes?: string
  type?: string
  charset?: string
}

export interface MapHTMLAttributes extends HTMLAttributes {
  name?: string
}

export interface MenuHTMLAttributes extends HTMLAttributes {
  type?: string
}

export interface MediaHTMLAttributes extends HTMLAttributes {
  autoplay?: Booleanish
  controls?: Booleanish
  controlslist?: string
  crossorigin?: string
  loop?: Booleanish
  mediagroup?: string
  muted?: Booleanish
  playsinline?: Booleanish
  preload?: string
  src?: string
}

export interface MetaHTMLAttributes extends HTMLAttributes {
  charset?: string
  content?: string
  httpequiv?: string
  name?: string
}

export interface MeterHTMLAttributes extends HTMLAttributes {
  form?: string
  high?: Numberish
  low?: Numberish
  max?: Numberish
  min?: Numberish
  optimum?: Numberish
  value?: string | ReadonlyArray<string> | number
}

export interface QuoteHTMLAttributes extends HTMLAttributes {
  cite?: string
}

export interface ObjectHTMLAttributes extends HTMLAttributes {
  classid?: string
  data?: string
  form?: string
  height?: Numberish
  name?: string
  type?: string
  usemap?: string
  width?: Numberish
  wmode?: string
}

export interface OlHTMLAttributes extends HTMLAttributes {
  reversed?: Booleanish
  start?: Numberish
  type?: '1' | 'a' | 'A' | 'i' | 'I'
}

export interface OptgroupHTMLAttributes extends HTMLAttributes {
  disabled?: Booleanish
  label?: string
}

export interface OptionHTMLAttributes extends HTMLAttributes {
  disabled?: Booleanish
  label?: string
  selected?: Booleanish
  value?: any // we support :value to be bound to anything w/ v-model
}

export interface OutputHTMLAttributes extends HTMLAttributes {
  for?: string
  form?: string
  name?: string
}

export interface ParamHTMLAttributes extends HTMLAttributes {
  name?: string
  value?: string | ReadonlyArray<string> | number
}

export interface ProgressHTMLAttributes extends HTMLAttributes {
  max?: Numberish
  value?: string | ReadonlyArray<string> | number
}

export interface ScriptHTMLAttributes extends HTMLAttributes {
  async?: Booleanish
  /** @deprecated */
  charset?: string
  crossorigin?: string
  defer?: Booleanish
  integrity?: string
  nomodule?: Booleanish
  referrerpolicy?: HTMLAttributeReferrerPolicy
  nonce?: string
  src?: string
  type?: string
}

export interface SelectHTMLAttributes extends HTMLAttributes {
  autocomplete?: string
  autofocus?: Booleanish
  disabled?: Booleanish
  form?: string
  multiple?: Booleanish
  name?: string
  required?: Booleanish
  size?: Numberish
  value?: any // we support :value to be bound to anything w/ v-model
}

export interface SourceHTMLAttributes extends HTMLAttributes {
  media?: string
  sizes?: string
  src?: string
  srcset?: string
  type?: string
}

export interface StyleHTMLAttributes extends HTMLAttributes {
  media?: string
  nonce?: string
  scoped?: Booleanish
  type?: string
}

export interface TableHTMLAttributes extends HTMLAttributes {
  cellpadding?: Numberish
  cellspacing?: Numberish
  summary?: string
  width?: Numberish
}

export interface TextareaHTMLAttributes extends HTMLAttributes {
  autocomplete?: string
  autofocus?: Booleanish
  cols?: Numberish
  dirname?: string
  disabled?: Booleanish
  form?: string
  maxlength?: Numberish
  minlength?: Numberish
  name?: string
  placeholder?: string
  readonly?: Booleanish
  required?: Booleanish
  rows?: Numberish
  value?: string | ReadonlyArray<string> | number | null
  wrap?: string
}

export interface TdHTMLAttributes extends HTMLAttributes {
  align?: 'left' | 'center' | 'right' | 'justify' | 'char'
  colspan?: Numberish
  headers?: string
  rowspan?: Numberish
  scope?: string
  abbr?: string
  height?: Numberish
  width?: Numberish
  valign?: 'top' | 'middle' | 'bottom' | 'baseline'
}

export interface ThHTMLAttributes extends HTMLAttributes {
  align?: 'left' | 'center' | 'right' | 'justify' | 'char'
  colspan?: Numberish
  headers?: string
  rowspan?: Numberish
  scope?: string
  abbr?: string
}

export interface TimeHTMLAttributes extends HTMLAttributes {
  datetime?: string
}

export interface TrackHTMLAttributes extends HTMLAttributes {
  default?: Booleanish
  kind?: string
  label?: string
  src?: string
  srclang?: string
}

export interface VideoHTMLAttributes extends MediaHTMLAttributes {
  height?: Numberish
  playsinline?: Booleanish
  poster?: string
  width?: Numberish
  disablePictureInPicture?: Booleanish
  disableRemotePlayback?: Booleanish
}

export interface WebViewHTMLAttributes extends HTMLAttributes {
  allowfullscreen?: Booleanish
  allowpopups?: Booleanish
  autoFocus?: Booleanish
  autosize?: Booleanish
  blinkfeatures?: string
  disableblinkfeatures?: string
  disableguestresize?: Booleanish
  disablewebsecurity?: Booleanish
  guestinstance?: string
  httpreferrer?: string
  nodeintegration?: Booleanish
  partition?: string
  plugins?: Booleanish
  preload?: string
  src?: string
  useragent?: string
  webpreferences?: string
}

export interface SVGAttributes extends AriaAttributes, EventHandlers<Events> {
  innerHTML?: string

  /**
   * SVG Styling Attributes
   * @see https://www.w3.org/TR/SVG/styling.html#ElementSpecificStyling
   */
  class?: any
  style?: StyleValue

  color?: string
  height?: Numberish
  id?: string
  lang?: string
  max?: Numberish
  media?: string
  method?: string
  min?: Numberish
  name?: string
  target?: string
  type?: string
  width?: Numberish

  // Other HTML properties supported by SVG elements in browsers
  role?: string
  tabindex?: Numberish
  crossOrigin?: 'anonymous' | 'use-credentials' | ''

  // SVG Specific attributes
  'accent-height'?: Numberish
  accumulate?: 'none' | 'sum'
  additive?: 'replace' | 'sum'
  'alignment-baseline'?:
    | 'auto'
    | 'baseline'
    | 'before-edge'
    | 'text-before-edge'
    | 'middle'
    | 'central'
    | 'after-edge'
    | 'text-after-edge'
    | 'ideographic'
    | 'alphabetic'
    | 'hanging'
    | 'mathematical'
    | 'inherit'
  alignmentBaseline?:
    | 'auto'
    | 'baseline'
    | 'before-edge'
    | 'text-before-edge'
    | 'middle'
    | 'central'
    | 'after-edge'
    | 'text-after-edge'
    | 'ideographic'
    | 'alphabetic'
    | 'hanging'
    | 'mathematical'
    | 'inherit';
  allowReorder?: 'no' | 'yes'
  alphabetic?: Numberish
  amplitude?: Numberish
  'arabic-form'?: 'initial' | 'medial' | 'terminal' | 'isolated'
  ascent?: Numberish
  attributeName?: string
  attributeType?: string
  autoReverse?: Numberish
  azimuth?: Numberish
  baseFrequency?: Numberish
  'baseline-shift'?: Numberish
  baseProfile?: Numberish
  bbox?: Numberish
  begin?: Numberish
  bias?: Numberish
  by?: Numberish
  calcMode?: Numberish
  'cap-height'?: Numberish
  capHeight?: Numberish
  clip?: Numberish
  'clip-path'?: string
  clipPath?: string
  clipPathUnits?: Numberish
  'clip-rule'?: Numberish
  clipRule?: Numberish
  'color-interpolation'?: Numberish
  colorInterpolation?: Numberish
  'color-interpolation-filters'?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit'
  colorInterpolationFilters?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit'
  'color-profile'?: Numberish
  colorProfile?: Numberish
  'color-rendering'?: Numberish
  colorRendering?: Numberish
  contentScriptType?: Numberish
  contentStyleType?: Numberish
  cursor?: Numberish
  cx?: Numberish
  cy?: Numberish
  d?: string
  decelerate?: Numberish
  descent?: Numberish
  diffuseConstant?: Numberish
  direction?: Numberish
  display?: Numberish
  divisor?: Numberish
  'dominant-baseline'?: Numberish
  dominantBaseline?: Numberish
  dur?: Numberish
  dx?: Numberish
  dy?: Numberish
  edgeMode?: Numberish
  elevation?: Numberish
  'enable-background'?: Numberish
  enableBackground?: Numberish
  end?: Numberish
  exponent?: Numberish
  externalResourcesRequired?: Numberish
  fill?: string
  'fill-opacity'?: Numberish
  fillOpacity?: Numberish
  'fill-rule'?: 'nonzero' | 'evenodd' | 'inherit'
  fillRule?: 'nonzero' | 'evenodd' | 'inherit'
  filter?: string
  filterRes?: Numberish
  filterUnits?: Numberish
  'flood-color'?: Numberish
  floodColor?: Numberish
  'flood-opacity'?: Numberish
  floodOpacity?: Numberish
  focusable?: Numberish
  'font-family'?: string
  fontFamily?: string
  'font-size'?: Numberish
  fontSize?: Numberish
  'font-size-adjust'?: Numberish
  fontSizeAdjust?: Numberish
  'font-stretch'?: Numberish
  fontStretch?: Numberish
  'font-style'?: Numberish
  fontStyle?: Numberish
  'font-variant'?: Numberish
  fontVariant?: Numberish
  'font-weight'?: Numberish
  fontWeight?: Numberish
  format?: Numberish
  from?: Numberish
  fx?: Numberish
  fy?: Numberish
  g1?: Numberish
  g2?: Numberish
  'glyph-name'?: Numberish
  glyphName?: Numberish
  'glyph-orientation-horizontal'?: Numberish
  glyphOrientationHorizontal?: Numberish
  'glyph-orientation-vertical'?: Numberish
  glyphOrientationVertical?: Numberish
  glyphRef?: Numberish
  gradientTransform?: string
  gradientUnits?: string
  hanging?: Numberish
  'horiz-adv-x'?: Numberish
  horizAdvX?: Numberish
  'horiz-origin-x'?: Numberish
  horizOriginX?: Numberish
  href?: string
  ideographic?: Numberish
  'image-rendering'?: Numberish
  imageRendering?: Numberish
  in2?: Numberish
  in?: string
  intercept?: Numberish
  k1?: Numberish
  k2?: Numberish
  k3?: Numberish
  k4?: Numberish
  k?: Numberish
  kernelMatrix?: Numberish
  kernelUnitLength?: Numberish
  kerning?: Numberish
  keyPoints?: Numberish
  keySplines?: Numberish
  keyTimes?: Numberish
  lengthAdjust?: Numberish
  'letter-spacing'?: Numberish
  letterSpacing?: Numberish
  'lighting-color'?: Numberish
  lightingColor?: Numberish
  limitingConeAngle?: Numberish
  local?: Numberish
  'marker-end'?: string
  markerEnd?: string
  markerHeight?: Numberish
  'marker-mid'?: string
  markerMid?: string
  'marker-start'?: string
  markerStart?: string
  markerUnits?: Numberish
  markerWidth?: Numberish
  mask?: string
  maskContentUnits?: Numberish
  maskUnits?: Numberish
  mathematical?: Numberish
  mode?: Numberish
  numOctaves?: Numberish
  offset?: Numberish
  opacity?: Numberish
  operator?: Numberish
  order?: Numberish
  orient?: Numberish
  orientation?: Numberish
  origin?: Numberish
  overflow?: Numberish
  'overline-position'?: Numberish
  overlinePosition?: Numberish
  'overline-thickness'?: Numberish
  overlineThickness?: Numberish
  'paint-order'?: Numberish
  paintOrder?: Numberish
  'panose-1'?: Numberish
  panose1?: Numberish
  pathLength?: Numberish
  patternContentUnits?: string
  patternTransform?: Numberish
  patternUnits?: string
  'pointer-events'?: Numberish
  pointerEvents?: Numberish
  points?: string
  pointsAtX?: Numberish
  pointsAtY?: Numberish
  pointsAtZ?: Numberish
  preserveAlpha?: Numberish
  preserveAspectRatio?: string
  primitiveUnits?: Numberish
  r?: Numberish
  radius?: Numberish
  refX?: Numberish
  refY?: Numberish
  renderingIntent?: Numberish
  repeatCount?: Numberish
  repeatDur?: Numberish
  requiredExtensions?: Numberish
  requiredFeatures?: Numberish
  restart?: Numberish
  result?: string
  rotate?: Numberish
  rx?: Numberish
  ry?: Numberish
  scale?: Numberish
  seed?: Numberish
  'shape-rendering'?: Numberish
  shapeRendering?: Numberish
  slope?: Numberish
  spacing?: Numberish
  specularConstant?: Numberish
  specularExponent?: Numberish
  speed?: Numberish
  spreadMethod?: string
  startOffset?: Numberish
  stdDeviation?: Numberish
  stemh?: Numberish
  stemv?: Numberish
  stitchTiles?: Numberish
  'stop-color'?: string
  stopColor?: string
  'stop-opacity'?: Numberish
  stopOpacity?: Numberish
  'strikethrough-position'?: Numberish
  strikethroughPosition?: Numberish
  'strikethrough-thickness'?: Numberish
  strikethroughThickness?: Numberish
  string?: Numberish
  stroke?: string
  'stroke-dasharray'?: Numberish
  strokeDasharray?: Numberish
  'stroke-dashoffset'?: Numberish
  strokeDashoffset?: Numberish
  'stroke-linecap'?: 'butt' | 'round' | 'square' | 'inherit'
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit'
  'stroke-linejoin'?: 'miter' | 'round' | 'bevel' | 'inherit'
  strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit'
  'stroke-miterlimit'?: Numberish
  strokeMiterlimit?: Numberish
  'stroke-opacity'?: Numberish
  strokeOpacity?: Numberish
  'stroke-width'?: Numberish
  strokeWidth?: Numberish
  surfaceScale?: Numberish
  systemLanguage?: Numberish
  tableValues?: Numberish
  targetX?: Numberish
  targetY?: Numberish
  'text-anchor'?: string
  textAnchor?: string
  'text-decoration'?: Numberish
  textDecoration?: Numberish
  textLength?: Numberish
  'text-rendering'?: Numberish
  textRendering?: Numberish
  to?: Numberish
  transform?: string
  u1?: Numberish
  u2?: Numberish
  'underline-position'?: Numberish
  underlinePosition?: Numberish
  'underline-thickness'?: Numberish
  underlineThickness?: Numberish
  unicode?: Numberish
  'unicode-bidi'?: Numberish
  unicodeBidi?: Numberish
  'unicode-range'?: Numberish
  unicodeRange?: Numberish
  'unitsPer-em'?: Numberish
  unitsPerEm?: Numberish
  'v-alphabetic'?: Numberish
  vAlphabetic?: Numberish
  values?: string
  'vector-effect'?: Numberish
  vectorEffect?: Numberish
  version?: string
  'vert-adv-y'?: Numberish
  vertAdvY?: Numberish
  'vert-origin-x'?: Numberish
  vertOriginX?: Numberish
  'vert-origin-y'?: Numberish
  vertOriginY?: Numberish
  'v-hanging'?: Numberish
  vHanging?: Numberish
  'v-ideographic'?: Numberish
  vIdeographic?: Numberish
  viewBox?: string
  viewTarget?: Numberish
  visibility?: Numberish
  'v-mathematical'?: Numberish
  vMathematical?: Numberish
  widths?: Numberish
  'word-spacing'?: Numberish
  wordSpacing?: Numberish
  'writing-mode'?: Numberish
  writingMode?: Numberish
  x1?: Numberish
  x2?: Numberish
  x?: Numberish
  xChannelSelector?: string
  'x-height'?: Numberish
  xHeight?: Numberish
  xlinkActuate?: string
  xlinkArcrole?: string
  xlinkHref?: string
  xlinkRole?: string
  xlinkShow?: string
  xlinkTitle?: string
  xlinkType?: string
  xmlns?: string
  xmlnsXlink?: string
  y1?: Numberish
  y2?: Numberish
  y?: Numberish
  yChannelSelector?: string
  z?: Numberish
  zoomAndPan?: string
}

export interface IntrinsicElementAttributes {
  a: ToMaybeRefs<AnchorHTMLAttributes>
  abbr: ToMaybeRefs<HTMLAttributes>
  address: ToMaybeRefs<HTMLAttributes>
  area: ToMaybeRefs<AreaHTMLAttributes>
  article: ToMaybeRefs<HTMLAttributes>
  aside: ToMaybeRefs<HTMLAttributes>
  audio: ToMaybeRefs<AudioHTMLAttributes>
  b: ToMaybeRefs<HTMLAttributes>
  base: ToMaybeRefs<BaseHTMLAttributes>
  bdi: ToMaybeRefs<HTMLAttributes>
  bdo: ToMaybeRefs<HTMLAttributes>
  blockquote: ToMaybeRefs<BlockquoteHTMLAttributes>
  body: ToMaybeRefs<HTMLAttributes>
  br: ToMaybeRefs<HTMLAttributes>
  button: ToMaybeRefs<ButtonHTMLAttributes>
  canvas: ToMaybeRefs<CanvasHTMLAttributes>
  caption: ToMaybeRefs<HTMLAttributes>
  cite: ToMaybeRefs<HTMLAttributes>
  code: ToMaybeRefs<HTMLAttributes>
  col: ToMaybeRefs<ColHTMLAttributes>
  colgroup: ToMaybeRefs<ColgroupHTMLAttributes>
  data: ToMaybeRefs<DataHTMLAttributes>
  datalist: ToMaybeRefs<HTMLAttributes>
  dd: ToMaybeRefs<HTMLAttributes>
  del: ToMaybeRefs<DelHTMLAttributes>
  details: ToMaybeRefs<DetailsHTMLAttributes>
  dfn: ToMaybeRefs<HTMLAttributes>
  dialog: ToMaybeRefs<DialogHTMLAttributes>
  div: ToMaybeRefs<HTMLAttributes>
  dl: ToMaybeRefs<HTMLAttributes>
  dt: ToMaybeRefs<HTMLAttributes>
  em: ToMaybeRefs<HTMLAttributes>
  embed: ToMaybeRefs<EmbedHTMLAttributes>
  fieldset: ToMaybeRefs<FieldsetHTMLAttributes>
  figcaption: ToMaybeRefs<HTMLAttributes>
  figure: ToMaybeRefs<HTMLAttributes>
  footer: ToMaybeRefs<HTMLAttributes>
  form: ToMaybeRefs<FormHTMLAttributes>
  h1: ToMaybeRefs<HTMLAttributes>
  h2: ToMaybeRefs<HTMLAttributes>
  h3: ToMaybeRefs<HTMLAttributes>
  h4: ToMaybeRefs<HTMLAttributes>
  h5: ToMaybeRefs<HTMLAttributes>
  h6: ToMaybeRefs<HTMLAttributes>
  head: ToMaybeRefs<HTMLAttributes>
  header: ToMaybeRefs<HTMLAttributes>
  hgroup: ToMaybeRefs<HTMLAttributes>
  hr: ToMaybeRefs<HTMLAttributes>
  html: ToMaybeRefs<HtmlHTMLAttributes>
  i: ToMaybeRefs<HTMLAttributes>
  iframe: ToMaybeRefs<IframeHTMLAttributes>
  img: ToMaybeRefs<ImgHTMLAttributes>
  input: ToMaybeRefs<InputHTMLAttributes>
  ins: ToMaybeRefs<InsHTMLAttributes>
  kbd: ToMaybeRefs<HTMLAttributes>
  keygen: ToMaybeRefs<KeygenHTMLAttributes>
  label: ToMaybeRefs<LabelHTMLAttributes>
  legend: ToMaybeRefs<HTMLAttributes>
  li: ToMaybeRefs<LiHTMLAttributes>
  link: ToMaybeRefs<LinkHTMLAttributes>
  main: ToMaybeRefs<HTMLAttributes>
  map: ToMaybeRefs<MapHTMLAttributes>
  mark: ToMaybeRefs<HTMLAttributes>
  menu: ToMaybeRefs<MenuHTMLAttributes>
  meta: ToMaybeRefs<MetaHTMLAttributes>
  meter: ToMaybeRefs<MeterHTMLAttributes>
  nav: ToMaybeRefs<HTMLAttributes>
  noindex: ToMaybeRefs<HTMLAttributes>
  noscript: ToMaybeRefs<HTMLAttributes>
  object: ToMaybeRefs<ObjectHTMLAttributes>
  ol: ToMaybeRefs<OlHTMLAttributes>
  optgroup: ToMaybeRefs<OptgroupHTMLAttributes>
  option: ToMaybeRefs<OptionHTMLAttributes>
  output: ToMaybeRefs<OutputHTMLAttributes>
  p: ToMaybeRefs<HTMLAttributes>
  param: ToMaybeRefs<ParamHTMLAttributes>
  picture: ToMaybeRefs<HTMLAttributes>
  pre: ToMaybeRefs<HTMLAttributes>
  progress: ToMaybeRefs<ProgressHTMLAttributes>
  q: ToMaybeRefs<QuoteHTMLAttributes>
  rp: ToMaybeRefs<HTMLAttributes>
  rt: ToMaybeRefs<HTMLAttributes>
  ruby: ToMaybeRefs<HTMLAttributes>
  s: ToMaybeRefs<HTMLAttributes>
  samp: ToMaybeRefs<HTMLAttributes>
  script: ToMaybeRefs<ScriptHTMLAttributes>
  section: ToMaybeRefs<HTMLAttributes>
  select: ToMaybeRefs<SelectHTMLAttributes>
  small: ToMaybeRefs<HTMLAttributes>
  source: ToMaybeRefs<SourceHTMLAttributes>
  span: ToMaybeRefs<HTMLAttributes>
  strong: ToMaybeRefs<HTMLAttributes>
  style: ToMaybeRefs<StyleHTMLAttributes>
  sub: ToMaybeRefs<HTMLAttributes>
  summary: ToMaybeRefs<HTMLAttributes>
  sup: ToMaybeRefs<HTMLAttributes>
  table: ToMaybeRefs<TableHTMLAttributes>
  template: ToMaybeRefs<HTMLAttributes>
  tbody: ToMaybeRefs<HTMLAttributes>
  td: ToMaybeRefs<TdHTMLAttributes>
  textarea: ToMaybeRefs<TextareaHTMLAttributes>
  tfoot: ToMaybeRefs<HTMLAttributes>
  th: ToMaybeRefs<ThHTMLAttributes>
  thead: ToMaybeRefs<HTMLAttributes>
  time: ToMaybeRefs<TimeHTMLAttributes>
  title: ToMaybeRefs<HTMLAttributes>
  tr: ToMaybeRefs<HTMLAttributes>
  track: ToMaybeRefs<TrackHTMLAttributes>
  u: ToMaybeRefs<HTMLAttributes>
  ul: ToMaybeRefs<HTMLAttributes>
  var: ToMaybeRefs<HTMLAttributes>
  video: ToMaybeRefs<VideoHTMLAttributes>
  wbr: ToMaybeRefs<HTMLAttributes>
  webview: ToMaybeRefs<WebViewHTMLAttributes>

  // SVG
  svg: ToMaybeRefs<SVGAttributes>

  animate: ToMaybeRefs<SVGAttributes>
  animateMotion: ToMaybeRefs<SVGAttributes>
  animateTransform: ToMaybeRefs<SVGAttributes>
  circle: ToMaybeRefs<SVGAttributes>
  clipPath: ToMaybeRefs<SVGAttributes>
  defs: ToMaybeRefs<SVGAttributes>
  desc: ToMaybeRefs<SVGAttributes>
  ellipse: ToMaybeRefs<SVGAttributes>
  feBlend: ToMaybeRefs<SVGAttributes>
  feColorMatrix: ToMaybeRefs<SVGAttributes>
  feComponentTransfer: ToMaybeRefs<SVGAttributes>
  feComposite: ToMaybeRefs<SVGAttributes>
  feConvolveMatrix: ToMaybeRefs<SVGAttributes>
  feDiffuseLighting: ToMaybeRefs<SVGAttributes>
  feDisplacementMap: ToMaybeRefs<SVGAttributes>
  feDistantLight: ToMaybeRefs<SVGAttributes>
  feDropShadow: ToMaybeRefs<SVGAttributes>
  feFlood: ToMaybeRefs<SVGAttributes>
  feFuncA: ToMaybeRefs<SVGAttributes>
  feFuncB: ToMaybeRefs<SVGAttributes>
  feFuncG: ToMaybeRefs<SVGAttributes>
  feFuncR: ToMaybeRefs<SVGAttributes>
  feGaussianBlur: ToMaybeRefs<SVGAttributes>
  feImage: ToMaybeRefs<SVGAttributes>
  feMerge: ToMaybeRefs<SVGAttributes>
  feMergeNode: ToMaybeRefs<SVGAttributes>
  feMorphology: ToMaybeRefs<SVGAttributes>
  feOffset: ToMaybeRefs<SVGAttributes>
  fePointLight: ToMaybeRefs<SVGAttributes>
  feSpecularLighting: ToMaybeRefs<SVGAttributes>
  feSpotLight: ToMaybeRefs<SVGAttributes>
  feTile: ToMaybeRefs<SVGAttributes>
  feTurbulence: ToMaybeRefs<SVGAttributes>
  filter: ToMaybeRefs<SVGAttributes>
  foreignObject: ToMaybeRefs<SVGAttributes>
  g: ToMaybeRefs<SVGAttributes>
  image: ToMaybeRefs<SVGAttributes>
  line: ToMaybeRefs<SVGAttributes>
  linearGradient: ToMaybeRefs<SVGAttributes>
  marker: ToMaybeRefs<SVGAttributes>
  mask: ToMaybeRefs<SVGAttributes>
  metadata: ToMaybeRefs<SVGAttributes>
  mpath: ToMaybeRefs<SVGAttributes>
  path: ToMaybeRefs<SVGAttributes>
  pattern: ToMaybeRefs<SVGAttributes>
  polygon: ToMaybeRefs<SVGAttributes>
  polyline: ToMaybeRefs<SVGAttributes>
  radialGradient: ToMaybeRefs<SVGAttributes>
  rect: ToMaybeRefs<SVGAttributes>
  stop: ToMaybeRefs<SVGAttributes>
  switch: ToMaybeRefs<SVGAttributes>
  symbol: ToMaybeRefs<SVGAttributes>
  text: ToMaybeRefs<SVGAttributes>
  textPath: ToMaybeRefs<SVGAttributes>
  tspan: ToMaybeRefs<SVGAttributes>
  use: ToMaybeRefs<SVGAttributes>
  view: ToMaybeRefs<SVGAttributes>
}
