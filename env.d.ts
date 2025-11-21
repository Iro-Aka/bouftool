/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORTABLE_BUILD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}