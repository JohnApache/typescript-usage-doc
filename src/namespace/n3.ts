declare namespace DKing {
    export type a = number | string;
    export type b = [number, string];
    export interface c {
        a: string;
        b(x: number): void;
        c: a;
        d: b;
    }
    export interface d {
        exec(x: number): void;
    }
}

declare var dking: DKing.d;
