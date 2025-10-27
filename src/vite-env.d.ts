/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Fix for JSX element type issue when TypeScript parses Vue templates
declare namespace JSX {
  interface IntrinsicElements {
    [elem: string]: any
  }
}
