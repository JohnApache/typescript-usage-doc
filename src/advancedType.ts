// 交集类型
const fn1 = () => {
    class A {
        name: string = ''
    }
    class B {
        age: number = 1
    }

    const f1 = (c: A & B): A & B => {
        return c;
    }
    f1({
        name: 'c',
        age: 12
    })

    interface C {
        gender: number
    }
    interface D {
        city: string
    }
    const f2 = (c: C & D): C & D => {
        return c;
    }
    f2({
        gender: 1,
        city: 'hz'
    })


    type All_Type = A & B & C & D; 
    const f3 = (c: All_Type): All_Type => {
        return c;
    }


    f3({
        name: 'c',
        age: 12,
        gender: 1,
        city: 'hz',
    })
}
fn1();

// union type 联合类型
const fn2 = (): void => {
    const isNumber = (content: number | string): content is number => {
        return typeof content === 'number';
    }
    const logger = (content: number | string) => {
        if(isNumber(content)) {
            console.log(content.toFixed(2));
        }else {
            console.log(content.slice(0, -1));
        }
    }
    logger(1);
    logger('dd');
}
fn2();

// 类型守护和区分类型
const fn3 = (): void => {
    class Bird {
        fly() {}
    }
    class Dog {
        run() {}
    }
    type DogOrBird = Dog | Bird;
    const create = (): DogOrBird => {
        return {
            fly() {}
        }
    }
    const d: DogOrBird = create();
    const isBird = (d: DogOrBird): d is Bird => {
        return (d as Bird).fly !== undefined;
    }
    if(isBird(d)) {
        d.fly();
    }else {
        d.run();
    }
}
fn3();

// 用户定义类型防护
const fn4 = (): void => {
    const isNumber = (n: any): n is number => {
        return typeof n === 'number';
    }

    const isString = (n: any): n is number => {
        return typeof n === 'string';
    }

    class Fish {
        name: string = ''
        swim() {}
    }
    class Dog {
        age: number = 1;
        run(){}
    }

    const isFish = (n: any): n is Fish => {
        return (
            typeof n === 'object' &&
            typeof n.name === 'string' &&
            typeof n.swim !== 'undefined'
        )
    }

    const fn = (d: Fish | Dog) => {
        if('swim' in d) {
            d.swim();
            console.log(d.name);
            return;
        }else {
            d.run();
            console.log(d.age);
        }
    }
    fn({
        age: 12,
        run() {}
    });

    const logger = (n: number | string): void => {
        if(typeof n === 'number') {
            console.log(n.toFixed());
        }else {
            console.log(n.slice(1, -1));
        }
    }
    logger(1);

    const exec = (c: Fish | Dog): void => {
        if(c instanceof Fish) {
            c.swim();
            console.log(c.name);
        }else {
            c.run();
            console.log(c.age);
        }
    }
    exec({
        age: 12,
        run() {}
    })
}
fn4();

// 可空类型
const fn5 = () => {
    // 类型断言
    const fn = (a?: string): void => {
        console.log(a!.slice())
    }
    fn();
}

fn5();

// 别名
const fn6 = (): void => {
    type NewString = string;
    type BaseTuple = [string, number, boolean];
    type AllType = NewString | BaseTuple;
    const a: NewString = '';
    const b: BaseTuple = ['', 1, true];
    const fn = (n: AllType): void => {
        if(typeof n === 'string') {
            console.log(n.slice(1, -1));
        }else {
            n.forEach(v => {
                console.log(v);
            })
        }
    }
    fn(b);
    fn(a);

    type Tree<T> = {
        value: T,
        right?: Tree<T>,
        left?: Tree<T>
    }
    
    const t1: Tree<string> = {
        value: '1',
    }
    const t2: Tree<string> = {
        value: '1',
    }

    const t: Tree<string> = {
        value: '3',
        right: t1,
        left: t2
    }
    
}
fn6();

// 字符串文字类型
const fn7 = (): void => {
    type Easing = 'ease-in' | 'ease-out' | 'bounce-in';
    class UIElement {
        animated(e: Easing) {
            if(e === 'ease-in') {
                console.log(e);
            }else if(e === 'bounce-in') {
                console.log(e);
            }else {
                console.log(e);
            }
        }
    }
    const element = new UIElement();
    element.animated('bounce-in');
    // element.animated('hide'); // Error

    // 方法重载
    function createElement(tagName: 'input'): HTMLInputElement;
    function createElement(tagName: 'img'): HTMLImageElement;
    function createElement(tagName: string): HTMLElement {
        if(tagName === 'input') {
            return document.createElement('input');
        }else {
            return document.createElement('img');
        }
    }

}
fn7();

const fn8 = (): void => {
    enum Params {
        A, B, C
    }
    interface A {
        kind: Params.A,
        name: string
    }
    interface B {
        kind: Params.B,
        size: number
    }
    interface C {
        kind: Params.C,
        radius: number
    }

    type All_Type = A | B | C;
    const fn = (n: All_Type): void => {
        switch(n.kind) {
            case Params.A: 
            console.log(n.name);
            break;
            case Params.B: 
            console.log(n.size);
            break;
            case Params.C: 
            console.log(n.radius);
            break;
            default:
        }
    }
    fn({
        kind: Params.A,
        name: 'ss'
    })
}
fn8();
// 多态this 类型
const fn9 = (): void => {
    class BaseCalculator {
        constructor(public value: number) {}
        add(n: number): this {
            this.value += n;
            return this;
        }
        multiply(n: number): this {
            this.value *= n;
            return this;
        }
        currentValue(): number {
            return this.value;
        }
    }
    const bc = new BaseCalculator(2);
    bc.add(3).multiply(3).add(3).currentValue();
}
fn9();

// 索引类型
const fn10 = (): void => {
    const create = <K, T extends keyof K>(o: K, n: T[]): K[T][] => {
        return n.map(v => o[v]);
    }

    const r = create({a: 1, b: 2}, ['a', 'b']);
    // const r2 = create({a: 1, b: 2}, ['d', 'b']); // Error
}
fn10();

//索引类型与索引签名
const fn11 = (): void => {
    interface Dict <T> {
        [key: string]: T
    }
    const d: Dict<string> = {
        a: '1'
    }
    let keys: keyof Dict<number>; // string | number

    interface Dict2 <T> {
        [key: number]: T
    }
    const dd: Dict2<string> = ['d'];
    let keys2: keyof Dict2<number>; // number
}
fn11();

// 映射类型
const fn12 = (): void => {
    type Readonly<T> = {
        readonly [P in keyof T]: T[P] 
    }

    type Nullable<T> = {
        [P in keyof T]: T[P] | null
    }

    type Partial<T> = {
        [P in keyof T]?: T[P]
    }

    interface A {
        a: string,
        b: number
    }

    const ra: Readonly<A> = {
        a: 'e',
        b: 1
    }
    // ra.a = 'b'; //Error readonly

    const na: Nullable<A> = {
        a: 'e',
        b: null
    }
    na.a = null;

    const pa: Partial<A> = {
        a: 'e'
    }
    pa.b = 1;
}
fn12();

const fn13 = (): void => {
    type Proxyable<T> = {
        get(): T;
        set(v: T): void;
    }

    type Proxify<T> =  {
        [P in keyof T]: Proxyable<T[P]>
    }
    
    interface A {
        a: string,
        b: number
    }

    const p1: Proxyable<string> = {
        get(): string {
            return '';
        },
        set(v: string) {
        }
    }
    const p2: Proxyable<number> = {
        get(): number {
            return 1;
        },
        set(v: number) {
        }
    }

    const pp1: Proxify<A> = {
        a: p1,
        b: p2
    }
    
    const pp2: Proxify<A> = {
        a: {
            set(v: string): void {

            },
            get(): string {
                return '';
            }
        },
        b: {
            set(v: number): void {

            },
            get(): number {
                return 1;
            }
        }
    };
}
fn13();

declare function fn<T extends boolean>(x: T): T extends true ? string : number;
const fn14 = (): void => {
    interface Params {
        a: string,
        b: number
    }

    interface SomeParams extends Params {
        c: string[]
    }
    type A<T> = T extends Params ? Params : string;
    const a: A<SomeParams> = {
        a: '1',
        b: 2,
    }
    
    const d1 = fn(false);
    const d2 = fn(Math.random() < .5); // string | number
   
    type B<T> = T extends string ? string :
                T extends number ? number :
                T extends boolean ? boolean :
                RegExp;
    const b1: B<string> = '1';            
    const b2: B<number> = 2;            
    const bc: B<boolean> = true;      
    
}
fn14();

// 分配条件类型
const fn15 = (): void => {
    type A<T> = T extends string ? string :
                T extends number ? number :
                T extends boolean ? boolean :
                RegExp;
    type B = A<string | number>; // string | number;
    type C = A<string[] | object>; // regexp

    // 过滤类型
    type Diff<T, K> = T extends K ? never : T;
    type D = Diff<'a'| 'b' | 'c' | 'd', 'b' | 'c'>; // 'a' | 'd'

    type Filter<T, K> = T extends K ? T : K;
    type F = Filter<'a'| 'b' | 'c' | 'd', 'b' | 'c'>; // "b" | "c"

    type NilDiff<T> = Diff<T, null | undefined>;
    type N = NilDiff<null | undefined | 'b' | 'c'>; // b | c

    // 与 映射类型 配合使用
    interface E {
        a: string,
        b: number,
        c: () => string;
        d: () => number
    }
    type FilterFuncPropNames<T> = {
        [K in keyof T]: T[K] extends Function ? K : never
    }[keyof T]
    type fe = FilterFuncPropNames<E>; // c | d

    type DiffFuncPropNames<T> = {
        [U in keyof T]: T[U] extends Function ? never : U
    }[keyof T];
    type df = DiffFuncPropNames<E>; // a | b 

    type FilterFuncProp<T> = {
        [K in keyof T]: T[K] extends Function ? T[K] : never
    }[keyof T];
    type ffp = FilterFuncProp<E>; // () => string | () => number

    type DiffFuncProp<T> = {
        [U in keyof T]: T[U] extends Function ? never : T[U]
    }[keyof T];
    type dfp = DiffFuncProp<E>; // string | number
}
fn15();


// 条件类型推断
const fn16 = (): void => {
    type A<T> = T extends (infer U)[] ? U | T : never;
    type B = A<string[]>; // string | string[]
    type C = A<number[]>; // number | number[]

    type D<T> = T extends (v: infer U, k: infer K) => infer J ? (U | K | J) : never;
    type E = D<(v: string, k: boolean) => void>; // string | boolean | void
    type F = D<number>; // never

    type G<T> = T extends [infer U, infer U] ? U : never;
    type H = G<[string, number]>; // string | number

    type I<T> = T extends {
        a: (x: infer U) => void,
        b: (x: infer U) => void 
    } ? U : never;
    type J = I<{
        a: (v: string) => void,
        b: (v: number) => void
    }>; // string & number => never  //
    type L = I<{
        a: (v: '1' | '2') => void,
        b: (v: '2' | '3' | '4') => void
    }>  // 2

    type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;
    // declare function foo(x: string): number;
    // declare function foo(x: number): string;
    // declare function foo(x: string | number): string | number;
    // type M = ReturnType<typeof foo>;  // string | number
}
fn16();

export default {};