// generics helloworld
const fn1 = () => {
    const fn = <T>(arg: T): T => {
        return arg;
    }   
    function fn2 <T>(arg: T): T {
        return arg;
    }
    fn(1); fn2<string>('sss');
}
fn1();

// use generic variable
const fn2 = (): void => {
    const fn = <T>(arg: T[]): T => {
        if(arg.length <= 1) {
            return arg[1];
        }
        return arg[arg.length - 1];
    }
    function fn2<T>(arg: Array<T>): T {
        if(arg.length <= 1) {
            return arg[1];
        }
        return arg[arg.length - 1];
    }
    console.log(fn([1]));
    console.log(fn2([1]));
}
fn2();

// generic class
const fn3 = (): void => {
    class Content<T> {
        // static detail: T; Error
        print(): T {
            return this.info;
        };
        constructor(public info: T) {}
    }
    const numberContent = new Content<number>(1);
    numberContent.print();
    const stringContent = new Content<string>('ddd');
    stringContent.print();

}
fn3();

// generice constraints
const fn4 = (): void => {
    interface LengthWise {
        length: number
    }
    const fn = <T extends LengthWise>(arg: T): T => {
        console.log(arg.length);
        return arg;
    }

    fn('xx');
    fn({length: 1});
    // fn(1) Error 

}
fn4();

// 在泛型约束中使用 类型参数
const fn5 = (): void => {
    const fn = <V, K extends keyof V>(val: V, key: K): void => {
        console.log(val[key]);
    }
    fn([1], 0);
    fn({a:1}, 'a');
    class A {
        constructor(public n: string) {}
    }
    const a = new A('d');
    fn(a, 'n');
}   
fn5();

// 使用 class 类型

const fn6 = (): void => {
    const create = <K>(C: new () => K): K => {
        return new C();
    }
    class Animals {
        a: string = '1';
        b: string = '2';
    }
    create(Animals);

    class BeeKeeper {
        hasMask: boolean = false;
    }
    
    class ZooKeeper {
        nametag: string = 'zoo';
    }
    
    class Animal {
        numLegs: number = 1;
    }
    
    class Bee extends Animal {
        keeper: BeeKeeper = new BeeKeeper();
    }
    
    class Lion extends Animal {
        keeper: ZooKeeper = new ZooKeeper();
    }
    
    function createInstance<A extends Animal>(c: new () => A): A {
        return new c();
    }

    console.log(createInstance(Bee).keeper.hasMask);
    console.log(createInstance(Lion).keeper.nametag);
    console.log(createInstance(Bee).numLegs);
    console.log(createInstance(Lion).numLegs);
}

fn6();


export default {};