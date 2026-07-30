/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_SITE_URL: string;
    readonly VITE_ENV: string;
    readonly VITE_TOKEN: string;
    readonly VITE_STORAGE_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}