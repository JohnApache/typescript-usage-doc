(() => {
// 对象解构指定类型
const fn1 = (): void => {
    const {a, b}: {a: number, b: string} = {a: 1, b: '2'};
    console.log(a, b);
}
fn1();


// 对象解构属性重命名
const fn2 = (): void => {
    const {a: newA, b: newB}: {a: number, b: string} = {a: 1, b: '2'};
    console.log(newA, newB);
}
fn2();

// 函数声明对象传参解构
const fn3 = (): void => {
    type C = {
        a: string, 
        b: number
    }
    const f = ({a, b}: C) => {
        console.log(a.toUpperCase());
        console.log(b.toFixed(2));
    }
    f({a: '1', b: 1});
}
fn3();

// 对象解构 只会浅复制对象的可枚举属性, 解构对象实例时方法会丢失
const fn4 = (): void => {
    class C {
        x: number = 1
        exec(str: string): void {
            console.log(str);
        }
    }
    const c = new C();
    const newC = {...c};
    console.log(newC.x);
    // newC.exec(); // error
}
fn4();
})()