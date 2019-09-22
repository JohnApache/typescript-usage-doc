// 基本使用
const fn1 = (): void => {
    class Animal {
        name: string = ''
    }
    class Dog {
        name: string = ''
    }

    const d: Dog = new Animal();
    console.log(d.name);

    const run = (dog: {name: string}): void => {
        console.log(dog.name);
    }

    run(new Animal());
    run(new Dog());

}
fn1();

// 比较两个函数
const fn2 = (): void => {
    let x = (a: string) => {};
    let y = (b: string, c: number) => {};
    // x = y //Error
    y = x;
    y('c', 1);

    interface XResult {
        name: string
    }

    interface YResult {
        name: string,
        age: number
    }
    let x2 = (): XResult => ({name: "Alice"});
    let y2 = (): YResult => ({name: "Alice", age: 15});
    x2 = y2;
    // y2 = x2; // Error
}
fn2();

// 可选参数 和 rest 扩展参数
const fn3 = (): void => {
    let fn1 = (x?: number): void => {
        console.log(x);
    }

    let fn2 = (y: number): void => {
        console.log(y);
    }
    // fn1 = fn2; // ok
    fn2 = fn1; // ok
    let ffn = (c: (...y: number[]) => void, ...x: number[]) => {
        console.log(x);
        c();
    }
    ffn(fn1, 1); // ok
    ffn(fn2, 1); // ok
}
fn3();

// 枚举
const fn4 = (): void => {
    enum Params {
        A, B, C
    }
    enum AnotherParams {
        D, E, F
    }
    let a: number = Params.B;
    let b = Params.A;
    // b = AnotherParams.D; //Error
}
fn4();
// class
const fn5 = (): void => {
    class Animal {
        constructor(public name: string, private age: number) {
        }
    }
    class Cat extends Animal {
        constructor(name: string, age: number, public gender: number) {
            super(name, age);
        }
        static run(): void {
            console.log('run')
        }
    }
    class Dog extends Animal{
        constructor(name: string, age: number, public gender: number) {
            super(name, age);
        }
        static say(): void {
            console.log('dog')
        }
    }
    let a = new Cat('cc', 12, 1);
    let b = new Dog('dd', 13, 0);
    a = b;
    b = a;
}
fn5();

// generic
const fn6 = (): void => {
    class Circle<T> {
        constructor(public t: T) {}
    }
    let c1 = new Circle(1);
    let c2 = new Circle('2');
    // c1 = c2; // Error

    interface Params<T> {
        data: T
    }

    let p1: Params<string>;
    let p2: Params<number>;
    // p1 = p2; // Error

    interface Empty<T> {};
    let e1: Empty<string> = '';
    let e2: Empty<number> = 1;
    e1 = e2; // ok
    e2 = e1; // ok
}
fn6();

export default {};