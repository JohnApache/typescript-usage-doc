// 测试enum
const fn1 = () => {
    enum Set{
        A = 1,
        B,
        C = 2
    }
    console.log(Set);
    console.log(Set[2]);
}
fn1();


// 数字枚举
const fn2 = (): void => {
    const enum Direction {
        Up,
        Bottom,
        Left,
        Right
    }

    console.log(Direction.Bottom);
}
fn2();

const fn3 = (): void => {
    const getNumber = (): number => {
        return 3;
    }

    // const enum Direction {
    //     Up = getNumber(), // Error
    //     Bottom = 3,
    // }

    // enum Direction {
    //     Up = getNumber(),
    //     Bottom = 'bottom', // Error
    // }

    enum Direction {
        Up = getNumber(),
        Bottom = 3,
    }

    console.log(Direction)
}
fn3();

// 字符串枚举类型
const fn4 = (): void => {
    const enum Direction {
        Up = 'Up',
        Bottom = 'Bottom',
        Left = 'Left',
        Right = 'Right',
    }
    console.log(Direction.Bottom);
}
fn4();

// 联合类型 和 枚举成员类型

const fn5 = (): void => {
    enum Shape {
        Circle,
        Rect
    }
    interface Circle {
        kind: Shape.Circle,
        radius: number
    }
    interface Rect {
        kind: Shape.Rect,
        length: number
    }

    const c: Circle = {
        // kind: Shape.Rect, // Error
        kind: Shape.Circle,
        radius: 1
    }

    console.log(c);

}
fn5();

// 运行时枚举
const fn6 = (): void => {
    enum Params {
        A = 'A',
        B = 'B',
        C = 'C'
    }

    interface FnParams {
        A: string
    }

    const fn = (obj: FnParams) => {
        console.log(obj.A)
    }
    fn(Params);
}
fn6();

// 编译时枚举
const fn7 = (): void => {
    enum Params {
        A, B, C
    }
    // type ParamsType = "A" | "B" | "C"
    type ParamsType = keyof typeof Params;
    const log = (key: ParamsType) => {
        console.log(Params[key]);
    }
    log('A');
}   
fn7();

// 反向映射
const fn8 = (): void => {
    enum Params {
        A = 1, B, C
    }

    const B = Params.B;
    const BKey = Params[B]; // B
    console.log(B, BKey);
}
fn8();

// const 枚举
const fn9 = (): void => {
    const enum Direction {
        Up,
        Bottom,
        Right,
        Left
    }
    console.log(Direction.Bottom);
}
fn9();

export default {};