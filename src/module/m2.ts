import { A, B } from "./m1";

export class C extends A implements B {
    c: string = '1';
    d: number = 2;
}

export { A as D } from "./m1";
 