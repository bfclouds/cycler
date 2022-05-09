/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const __static: string;

interface AnyKeyValue {
  [key: string]: any
}


// declare var window: Window & typeof globalThis & AnyKeyValue

declare interface Window extends AnyKeyValue {}