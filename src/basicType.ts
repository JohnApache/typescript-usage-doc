// boolean
const bool = (): void => {
    const isValid = true;
    const isEnable: boolean = false;
    console.log(isValid);
    console.log(isEnable);
}
bool();

// number
const num = (): void => {
    const decima: number = 10; // 十进制
    const hex: number = 0xf00d; // 十六进制
    const binary: number = 0b1010; // 二进制
    const octal: number = 0o777; // 八进制
    console.log(decima);
    console.log(hex);
    console.log(binary);
    console.log(octal);
}
num();

// string
const str = (): void => {
    const username: string = 'cjw';
    const job: string = "coder";
    const sentence: string = `my name is ${username}, my job is a ${job}`;
    console.log(username, job, sentence);
}
str();

// array
const arr = (): void => {
    const animals: string[] = ['dog', 'cat'];
    const nums: Array<number> = [1,2,3,4];
    animals.forEach(v => {
        console.log(v.toUpperCase());
    });
    nums.forEach(v => {
        console.log(v.toFixed(2));
    });
}
arr();

// tuple
const tuple = (): void => {
    let tuples: [boolean, number, string[]];
    tuples = [false, 12, ['c', 'j', 'w']];
    tuples[2].forEach(v => {
        console.log(v.toLowerCase());
    })
}
tuple();

// enum
const enumFn = (): void => {
    const fn1 = (): void => {
        enum Colors { Red, Green, Blue };
        const c = Colors.Green;
        console.log(c); // 默认编号从0开始自增
    }
    // 自定义编号起始
    const fn2 = (): void => {
        enum Colors { Red = 10000, Green = 10003, Blue };
        const c = Colors.Blue;
        console.log(c, c === 10004); // 10004;
    }
    // 自定义所有成员编号
    const fn3 = (): void => {
        enum Colors { Red = 2, Green = 4, Blue = 8 };
        const c = Colors.Blue;
        console.log(c); // 8
    }
    // 可以从值反向获得枚举的名称
    const fn4 = (): void => {
        enum Colors { Red =  2, Green, Blue = 8};
        const colorName: string = Colors[3];
        console.log(colorName); // Green
    }
    fn1();fn2();fn3();fn4();
}
enumFn();

// any
const anyFn = (): void => {
    const notSureVars: any = 1;
    const collection: any = [1, '2', false];
    console.log(notSureVars);
    console.log(collection);
}
anyFn();

// void
const voidFn = (): void => {
    let voidVar: void = undefined;
    const fn = (): void => {};
    console.log(voidVar, fn());
}
voidFn();

// null and undefined
const nullAndUndefined = (): void => {
    const u: undefined = undefined;
    const n: null = null;
    const fn = (): void => {
        const u2: undefined = undefined; // undefined 可以分配给 void
        const n2: null = null; // null 不可以分配给 void;
        return u2;
    };
    fn();
    const u3: void = undefined;  // undefined 可以分配给 void
    console.log(u, n);
}
nullAndUndefined();

const neverFn = (): void => {
    const error = (): never => {
        throw new Error('this is an error');
    }

    const fail = (): never => {
        return error();
    }
    // 无限循环也是never 类型
    const infiniteLoop = (): never => {
        while(true) {};
    }

    try {
        error();
    } catch (error) {
        console.log(error);
    }

    try {
        fail();
    } catch (error) {
        console.log(error);
    }
}
neverFn();

// object
const objectFn = (): void => {
    const o1: object = ['1', '2'];
    const o2: object = {a: 1, b: 2};
    const o3: object = /^.+\.js$/;         
    const o4: object = () => {};
    console.log(o1, o2, o3, o4);
}
objectFn();

// assert 
const assertFn = (): void => {
    const fn = (): any => {
        return '1,2,3';
    }
    const a = fn();
    (<string>a).split(',').forEach(v => {
        console.log(v.toLowerCase());
    });
    
    (a as string).split(',').forEach(v => {
        console.log(v.toUpperCase());
    });
}
assertFn();