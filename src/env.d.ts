declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
declare module '@/utils/cache' {
    const cache: any;
    export default cache;
}