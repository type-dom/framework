// // import { getCurrentInstance, warn } from '@vue/runtime-core'
// import { getCurrentInstance } from 'src/core/component';
// import { EMPTY_OBJ } from '../../../shared'
// import { warn } from '../../../utils';
//
// export function useCssModule(name = '$style'): Record<string, string> {
//   if (!__GLOBAL__) {
//     const instance = getCurrentInstance()!
//     if (!instance) {
//       warn(`useCssModule must be called inside setup()`)
//       return EMPTY_OBJ
//     }
//     const modules = instance.type.__cssModules
//     if (!modules) {
//       warn(`Current instance does not have CSS modules injected.`)
//       return EMPTY_OBJ
//     }
//     const mod = modules[name]
//     if (!mod) {
//         warn(`Current instance does not have CSS module named "${name}".`)
//       return EMPTY_OBJ
//     }
//     return mod as Record<string, string>
//   } else {
//     /* v8 ignore start */
//     // if (__DEV__) {
//       warn(`useCssModule() is not supported in the global build.`)
//     // }
//     return EMPTY_OBJ
//     /* v8 ignore stop */
//   }
// }
