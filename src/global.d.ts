// Global compile-time constants
declare let __DEV__: boolean // 通过 window.__DEV__ 访问
declare let __TEST__: boolean // 通过 window.__TEST__ 访问
declare let __BROWSER__: boolean
declare let __GLOBAL__: boolean
declare let __ESM_BUNDLER__: boolean
declare let __ESM_BROWSER__: boolean
declare let __CJS__: boolean
declare let __SSR__: boolean
declare let __VERSION__: string
declare let __COMPAT__: boolean

// Feature flags
declare let __FEATURE_OPTIONS_API__: boolean
declare let __FEATURE_PROD_DEVTOOLS__: boolean
declare let __FEATURE_SUSPENSE__: boolean
declare let __FEATURE_PROD_HYDRATION_MISMATCH_DETAILS__: boolean

// declare module '*.vue' {}

// declare module 'estree-walker' {
//   export function walk<T>(
//     root: T,
//     options: {
//       enter?: (node: T, parent: T | null) => any
//       leave?: (node: T, parent: T | null) => any
//       exit?: (node: T) => any
//     } & ThisType<{ skip: () => void }>,
//   )
// }
//
// declare interface String {
//   /**
//    * @deprecated Please use String.prototype.slice instead of String.prototype.substring in the repository.
//    */
//   substring(start: number, end?: number): string
// }

