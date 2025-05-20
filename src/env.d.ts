declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
declare module '@/utils/cache' {
    const cache: any;
    export default cache;
}
declare const __APP_VERSION__: string
