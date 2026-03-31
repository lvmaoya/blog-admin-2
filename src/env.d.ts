declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
declare module '@/utils/cache' {
    export function setCache(key: string, value: unknown): void;
    export function getCache(key: string): string | undefined;
    export function deleteCache(key: string): void;
    export function clearCache(): void;
}
declare const __APP_VERSION__: string
