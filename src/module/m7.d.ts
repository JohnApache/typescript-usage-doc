declare module "fake" {
    export const a: string;
    export interface b {
        b: number;
    }
    export function parse(urlStr: string): b;
    const deParse: () => string;
    export {deParse};
}

declare module "rng" {
    export const b: number;
    export type c<T> = {
        info: T[]
    }
    export type d = {
        a: string,
        b: number
    }
    export function fn(v: d): c<string>;
}

declare module "quick";

declare module "*!text" {
    const content: string;
    export default content;
}
// Some do it the other way around.
declare module "json!*" {
    const value: any;
    export default value;
}
