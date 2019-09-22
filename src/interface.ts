// interface demo
const fn1 = (): void => {
    interface LabelValue {
        label: string,
    }

    const printLabel = (labelObj: LabelValue): void => {
        console.log(labelObj.label);
    }

    const labelObj = {label: 'sss', size: 10};
    printLabel(labelObj);
}
fn1();

// 可选属性
const fn2 = (): void => {
    interface Shape {
        width?: number,
        height?: number,
        color: string,
    }

    const printShape = (shape: Shape): void => {
        // if(shape.size) {
        //     // Error！ size 属性不存在 Shape中
        //     console.log(shape.size);
        // }
        console.log(shape.color, shape.width, shape.height);
    }

    printShape({color: '#ddd', height: 100});
}
fn2();


// 只读属性
const fn3 = (): void => {
    interface Point {
        readonly x: number,
        readonly y: number,
    }

    const point: Point = {x: 1, y: 1}; // 只允许初次创建的时候修改属性值
    // point.x = 1; Error 不允许修改
    console.log(point);

    // 只读数组
    let arr1: number[] = [1,2];
    const arr2: ReadonlyArray<number> = [1,2];
    // arr[0] = 2; Error;
    // arr.push(1); Error;
    // arr1 = arr2; Error;
    arr1 = arr2 as number[];
}
fn3();

// 额外属性检查
const fn4 = () => {
    interface ServerConfig {
        host: string,
        time: number,
        address?: string
    }
    // const config: ServerConfig = {
    //     host: 'www.baidu.com',
    //     time: 123,
    //     addrres: '/search' // Error ！ ServerCofnig 不存在 addrres属性
    // }

    // 绕过检查 
    const config: ServerConfig = {
        host: 'www.baidu.com',
        time: 123,
        addrres: '/search'
    } as ServerConfig;
    console.log(config);

    const fn = (config: ServerConfig): void => {
        console.log(config.host, config.address, config.time);
    }

    // fn({
    //     host: 'www.baidu.com',
    //     time: 123,
    //     addrres: '/search' // Error ！ ServerCofnig 不存在 addrres属性
    // })

    // 绕过检查 
    fn({
        host: 'www.baidu.com',
        time: 123,
        addrres: '/search'
    } as ServerConfig);

    // 修改接口属性适配任意额外属性字段
    interface NewServerConfig extends ServerConfig {
        [property: string]: any,
    }
    const fn2 = (config: NewServerConfig): void => {
        console.log(config.host, config.address, config.time);
    }

    fn2({
        host: 'www.baidu.com',
        time: 123,
        addrres: '/search'
    });
}
fn4();

// 函数类型
const fn5 = (): void => {
    interface FuncType {
        (num: number, str: string): boolean,
    }
    
    const func: FuncType = (a: number, b: string): boolean => {
        return a > 1 && b.length > 0;
    }
  
    func(1, '3');

    const fn = (func: FuncType): boolean => {
        return func(1, '1');
    } 
    
    fn((a, b) => {
        return a > b.length;
    })
}
fn5();

// 索引类型
const fn6 = (): void => {
    interface ArrayType {
        [index: number]: string,
    }
    const arr: ArrayType = ['1', '2'];
    const str: string = arr[1];
    console.log(str);

    class Animal {
        name: string = '';
    };
    class Dog extends Animal {
        age: number = 1;
    };

    interface MixAnimalType {
        [index: number]: Dog; // 值类型必须与string一致 或为子集
        [prop: string]: Animal
    }

    const ma: MixAnimalType = {};
    ma[1] = {
        name: 'dog',
        age: 2
    };
    ma['2'] = {
        name: 'cat',
    }
    console.log(ma);

    // 索引制作只读属性接口
    interface ReadonlyStringArray {
        readonly [index: number] : string
    }

    const rsa: ReadonlyStringArray = ['1', '2'];
    console.log(rsa);
    // rsa[2] = "Mallory"; // error!
}
fn6();

// class 类型
const fn7 = (): void => {
    interface Animal {
        name: string,
        run(speed: number): void,
    }

    class Dog implements Animal {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
        run(s: number): void {}
    }

    interface PointConstructor {
        new (x: number, y: number): any;
    }

    // class Point implements PointConstructor {
    //     constructor(x: number, y: number) {}
    // }

    interface NewPonitConstructor {
        new (x: number, y: number): PonitInterface
    }

    interface PonitInterface {
        x: number,
        y: number,
        setPos(x: number, y: number): boolean;
    }
    
    class Point implements PonitInterface {
        x: number
        y: number
        setPos(x: number, y: number) {
            return true;
        }
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }

    const createPoint = (ctor: NewPonitConstructor, x: number, y: number): PonitInterface => {
        return new ctor(x, y);
    }
    
    const p1 = createPoint(Point, 1, 2);
    console.log(p1.setPos(p1.x, p1.y));

    const NewPoint: NewPonitConstructor = class NewPoint implements PonitInterface {
        x: number = 1;
        y: number = 2;
        setPos(x: number, y: number) {
            return true;
        }
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }
    const p2 = new NewPoint(1, 2);
    console.log(p2.setPos(p2.x, p2.y));
}
fn7();

// 接口扩展
const fn8 = (): void => {
    interface ServerConfig {
        host: string
    }
    // 接口继承 扩展serverconfig 属性
    interface ActivityConfig extends ServerConfig {
        activityName: string
    }

    const config: ActivityConfig = {
        host: 'www.baidu.com',
        activityName: 'happy new year'
    }
    console.log(config);


    interface ClientConfig  {
        address: string;
    }

    interface AllConfig extends ServerConfig, ClientConfig{
        target: string;
    }

    const allConfig: AllConfig = {
        host: 'www.baidu.com',
        address: '/server',
        target: '111'
    }
    console.log(allConfig)
}
fn8();

// 混合类型
const fn9 = (): void => {
    interface MixPropUtil {
        (str: string): void;
        help(): void;
        total: number
    }

    const util = ((name: string): void => {
        console.log(name);
    }) as MixPropUtil;
    util.help = () => {
        console.log(util.total);
    }
    util.total = 10;
    util('cjw');
    util.help();
    console.log(util);
}
fn9();


// 接口扩展 class 类类型
const fn10 = (): void => {
    class People {
        name: string = 'people';
    }
    class Student extends People {
        score: number = 2;
    }

    interface StudentType extends Student {
        study(): void;
    }

    class XiaoMing implements StudentType {
        name: string = 'xiaoming';
        score: number = 100;
        study(): void {
            console.log('study');
        }
    } 
    const xm = new XiaoMing();
    console.log(xm);

    class Teacher extends People {
        work() {
            console.log('work.');
        }
        private money: number = 0
    }

    class GoodTeacher extends Teacher {
        protected teach() {

        }
    }

    interface WorkerType {
        earnMoney(): void
    }
    
    interface GoodTeacherType extends GoodTeacher, WorkerType{
        className: string
    }

    class TeacherWang extends GoodTeacher implements GoodTeacherType {
        className: string = 'math';
        earnMoney() {
            console.log('earn money.');
        }
    }
    const tw = new TeacherWang();
    console.log(tw);
}
fn10();

export default {};