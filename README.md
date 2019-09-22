# Typescript 探究实践

## 使用手册

### 基本类型

+ boolean 布尔类型
    ```ts
    const isValid = true;
    const isEnable: boolean = false;
    ```
    
+ number 数字类型
    ts与js 相同，所有数字都是浮点类型，类型为number，除了10进制和16进制，同时ts还支持 2进制 8进制数字
    ```ts
    const decima: number = 10; // 十进制
    const hex: number = 0xf00d; // 十六进制
    const binary: number = 0b1010; // 二进制
    const octal: number = 0o777; // 八进制
    ```
+ string 字符串类型
    支持 单引号 '' 双引号 "" 反引号 ``;  
    ```ts
    const username: string = 'cjw';
    const job: string = "coder";
    const sentence: string = `my name is ${username}, my job is ${job}`;
    ```
+ array 数组类型
    ts 与 js 一样允许使用值数组，ts 声明数组有两种方式elemType[], Array<elemType>;
    ```ts
    const animals: string[] = ['dog', 'cat'];
    const nums: Array<number> = [1,2,3,4];
    ```
    
+ Tuple 元组类型 
    ts 支持定义一个 具有固定长度的数组，数组的内容类型可以不相同
    ```ts
    let tuples: [boolean, number, string[]];
    tuples = [false, 12, ['c', 'j', 'w']];
    tuples[2].forEach(v => {
        console.log(v);
    })
    ```
+ Enum 枚举类型
    ts 为js补充的标准数据类型enum ，可以为数值集合提供更友好的名称
    ```ts
    enum Colors { Red, Green, Blue };
    const c = Colors.Green;
    ```
    默认ts 枚举编号从0开始，您可以手动设置成员的值更改此数值。
     ```ts
    enum Colors { Red = 10000, Green, Blue };
    const c = Colors.Green; // 10001
    ```
    也可以修改全部成员变量
    ```ts
    enum Colors { Red = 2, Green = 4, Blue = 8 };
    const c = Colors.Blue;// 8;
    ```
    枚举还可以从数值映射出枚举中该值的名称
    ```ts
    enum Colors  { Red = 10000, Green, Blue };
    const colorName: string = Colors[1];
    console.log(colorName); // Green;
    ```

+ void 无效类型
    表示不是任何类型, 该类型常用来作为函数不返回值的返回类型, undefined 可以分配给 void 类型
    ```ts
    const voidVar: void = undefined;
    const fn = (): void => {};
    console.log(voidVar, fn());
    ```
    
+ null/undefined 空或者未定义类型
    undefined 可以分配给 void 类型, null 不可以
    ```ts
    const u: undefined = undefined;
    const n: null = null;
    const fn = (): void => {
        const u2: undefined = undefined; // undefined 可以分配给 void
        const n2: null = null; // null 不可以分配给 void;
        return u2;
    };
    fn();
    console.log(u, n);
    ```
+ never 从不返回类型
    该类型表示函数总是会抛出异常，或者内部无限循环永远不会返回内容的异常，never除了never本身可以分配，任意数据类型都不可以分配，设置是any 类型
    ```ts
    // 总是会抛出异常，不会有返回值
    const error = (): never => {
        throw new Error('this is an error');
    }
    // never 可以分配给 never
    const fail = (): never => {
        return error();
    }
    // 无限循环也是never 类型
    const infiniteLoop = (): never => {
        while(true) {};
    }
    ```
+ object 对象类型
    object表示的是一种非原始类型的数据，即任何不是number，string，boolean，symbol，null，或undefined类型的数据 都可以分配给 object 类型, [], {}都可以. 
    ```ts
    const o1: object = ['1', '2'];
    const o2: object = {a: 1, b: 2};
    const o3: object = /^.+\.js$/;
    const o4: object = () => {};
    console.log(o1, o2, o3, o4);
    ```
+ 类型推断
    有时候，我们会比ts 更清楚数值的类型，当您知道某个实体的类型可能比其当前类型更具体时，可以通过断言，让ts不执行任何检查，假定当前类型为你指定的类型。
    类型断言有两种形式.
    ```ts
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
    ```

### 变量声明
大多数规则同 es6 相同，这里主要列举少数几个小点demo
+ 对象解构指定类型
    ```ts
    
    const {a, b}: {a: number, b: string} = {a: 1, b: '2'};
    ```
+ 对象结构属性重命名
    ```ts
    const {a: newA, b: newB}: {a: number, b: string} = {a: 1, b: '2'};
    console.log(newA, newB);
    ```
+ 函数声明对象传参解构
    ```ts
    type C = {
        a: string, 
        b: number
    }
    const f = ({a, b}: C) => {
        console.log(a.toUpperCase());
        console.log(b.toFixed(2));
    }
    f({a: '1', b: 1});
    ```
+ 对象解构 只会浅复制对象的可枚举属性, 解构class实例时方法会丢失    
    ```ts
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
    ```
### 接口
> ts 的核心原则之一是类型检查时关注 值所具有的“形状”，接口 interface 在 ts中充当了命名这样类型的角色，并且是在代码中定义规则以及与项目之外的代码约定规则的强大方法。

+ 第一个接口
    ```ts
       interface LabelValue {
        label: string,
    }

    const printLabel = (labelObj: LabelValue): void => {
        console.log(labelObj.label);
    }

    const labelObj = {label: 'sss', size: 10};
    printLabel(labelObj);
    ```
    printLabel 接收一个 LabelValue 接口类型的数据作为参数传入，不需要明确说明 labelObj 实现了LabelValue 接口，ts 只注重形状，编译器仅检查至少存在所需的属性并匹配所需的类型，只要传递给函数的对象 符合 接口的要求就是允许的。
    > 注意： 类型检查器不要求这些属性以任何顺序排列，只要接口所需的属性存在且具有所需的类型。额外的属性也是允许的
+ 可选属性
    ts 允许接口定义可选属性，允许某些属性不存在，但是当存在该属性时必须 符合 类型检查。实例如下
    ```ts
    interface Shape {
        width?: number,
        height?: number,
        color: string,
    }

    const printShape = (shape: Shape): void => {
        if(shape.size) {
            // Error！ size 属性不存在 Shape中
            console.log(shape.size);
        }
        console.log(shape.color, shape.width, shape.height);
    }

    printShape({color: '#ddd', height: 100});
    ```
    每个接口的 可选属性名末尾加上 “?” 表示该属性可选，可选属性的优点 是可以描述可能会使用的属性 ，还可以防止使用不属于当前接口的属性。

+ 只读属性
    接口可以定义某些属性，只有在初次创建对象的时候修改值，通过 readonly 添加在interface 属性名前面 可以指定该效果
    ```ts
    interface Point {
        readonly x: number,
        readonly y: number,
    }

    const point: Point = {x: 1, y: 1}; // 只允许初次创建的时候修改属性值
    // point.x = 1; Error 不允许修改
    console.log(point);
    ```
    ts 还提供了 一个接口 ReadonlyArray<T>, 实现该接口的数组只可读 不可以做任何修改操作，甚至分配到普通数组也是不合法的，除非使用断言处理覆盖它。
    ```ts
    let arr1: number[] = [1,2];
    const arr2: ReadonlyArray<number> = [1,2];
    // arr[0] = 2; Error;
    // arr.push(1); Error;
    // arr1 = arr2; Error;
    arr1 = arr2 as number[];
    ```
    > 注意： const vs readonly
    >> 在使用定义变量的使用 const
    >> 在使用对象接口属性的时候 使用 readonly
    
+ 额外属性检查
    前面介绍ts 只要满足 接口的 规则可以传递多余属性。然而在 接口作为类型分配给变量时，或者函数接口的参数实现某个接口，当直接传入字面量对象时，ts会做一次额外的多余属性检查，如果对象具有“目标类型”没有的任何属性，则会出现错误.
    ```ts
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
    ```
    可以使用 类型断言的方式 绕过 ts 额外属性检查，也可以修改接口类型用来适配任意属性, 修改后的接口允许 任意 额外属性的添加。
    ```ts
    interface ServerConfig {
        host: string,
        time: number,
        address?: string
    }
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
    ```
    这种操作行为大多数情况都是错误的，相比于绕过检查，更好的行为是修改类型声明。
    
+ 函数类型 
    接口除了可以描述对象的形状 还可以描述函数类型
    ```ts
    interface FuncType {
        (num: number, str: string): boolean,
    }
    
    const func: FuncType = (a: number, b: string): boolean => {
        return a > 1 && b.length > 0;
    }

    func(1, '3');
    // 参数传递
    const fn = (func: FuncType): boolean => {
        return func(1, '1');
    } 
    
    fn((a, b) => {
        return a > b.length;
    })
    ```
    在分配变量的时候 也可以不指定类型，ts 会根据上下文推断类型是否正确

+ 可索引类型
    ts 允许我们使用接口 描绘对象的索引类型以及索引对应的值的类型
    ```ts
    interface ArrayType {
        [index: number]: string,
    }
    const arr: ArrayType = ['1', '2'];
    const str: string = arr[1];
    console.log(str);
    ```
    支持的索引类型只有两种 number | string，但当两种索引类型同时存在，由number 索引类型返回的值类型，必须是 string索引类型返回值类型的子集，这是因为 当时用number 作为索引类型时，本质上 js 会将number转成 string 类型，这意味着string索引类型 和 number索引类型两者必须一致
    ```ts
    class Animal {
        name: string
    };
    class Dog extends Animal {
        age: number
    };

    interface MixAnimalType {
        [index: number]: Dog, // 值类型必须与string一致 或为子集
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
    ```
    string索引强制所有其他所有属性都必须与其返回值类型匹配
    ```ts
    interface NumberDictionary {
        [index: string]: number;
        length: number;    // ok, length is a number
        name: string;      // error, the type of 'name' is not a subtype of the indexer
    }
    
    interface NumberOrStringDictionary {
        [index: string]: number | string;
        length: number;    // ok, length is a number
        name: string;      // ok, name is a string
    }
    ```
    还可以使用 readonly 属性，限制索引属性不只读，不可以分配到索引内容
    ```ts
    interface ReadonlyStringArray {
        readonly [index: number]: string;
    }
    const arr: ReadonlyStringArray = ['1', '2'];
    console.log(arr);
    // arr[2] = '3'; Error! only read
    ```
+ class类 类型   
    ts中 class 类可以通过 implements 实现某个接口 
    ```ts
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
    ```
    接口只描绘了类的 public公共属性, 而不是 public 和 private 属性，这样禁止接口来检查类是否具有私有的某个属性或方法.
    class 静态属性 和 实例属性的区别。
    ```ts
    interface PointConstructor {
        new (x: number, y: number)
    }

    // class Point implements PointConstructor {
    //     constructor(x: number, y: number) {}
    // }
    ```
    class 实现接口 时ts 只会检查类的实例属性，不会检查静态属性，构造函数位于静态属性上面因此不包含检查.
    你想接口作用于静态属性，可以通过下面的方法
    ```ts
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
    ```
    或者 还有一种更简单的方式,使用类表达式
    ```ts
    interface NewPonitConstructor {
        new (x: number, y: number): PonitInterface
    }

    interface PonitInterface {
        x: number,
        y: number,
        setPos(x: number, y: number): boolean;
    }
    
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
    ```
+ 接口扩展
    与类一样，接口可以相互扩展。这允许您将一个接口的成员复制到另一个接口，这使您可以更灵活地将接口分成可重用的组件。  
    ```ts
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
    ```
    ts 的接口还允许同时继承扩展多个接口
    ```ts
    interface ServerConfig {
        host: string
    }

    interface ClientConfig  {
        address: string;
    }
    // 接口继承扩展自多个接口属性
    interface AllConfig extends ServerConfig, ClientConfig{
        target: string;
    }

    const allConfig: AllConfig = {
        host: 'www.baidu.com',
        address: '/server',
        target: '111'
    }
    console.log(allConfig)
    ```
+ 混合类型
    js中存在丰富的数据类型，由于JavaScript的动态性和灵活性，您可能偶尔会遇到一个对象，该对象可以作为上述某些类型的组合。    
    ```ts
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
    ```
+ 接口扩展 class 类 类型
    在ts中接口还可以继承 class 类类型， 当interface 继承 class 时，继承的是class 的成员 但不继承成员的实现，甚至 接口继承 可以继承 class 的 private / protected 私有或受保护成员。这样的行为，意味着当继承一个 class 类类型时，如果class 保护 私有或受保护成员变量时，该接口 interface 只能由当前 class 类或 其 子类来实现.
    ```ts
    class People {
        name: string
    }
    class Student extends People {
        score: number
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
        private money: number
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
    ```
### class 类 类型
+ 基本使用
    ```ts
    class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        greet() {
            return "Hello, " + this.greeting;
        }
    }

    let greeter = new Greeter("world");
    ```
+ class 继承
    ```ts
    class Animal {
        move(distanceInMeters: number = 0) {
            console.log(`Animal moved ${distanceInMeters}m.`);
        }
    }

    class Dog extends Animal {
        bark() {
            console.log('Woof! Woof!');
        }
    }

    const dog = new Dog();
    dog.bark();
    dog.move(10);
    dog.bark();
    ```
+ private/protected/public
    ts中默认成员变量的属性就是public，可以省略声明。private 和 protected 就需要单独声明。
    主要区别：
    - pubilc： public 修饰的成员变量，可以在class实例中访问，也可以在class 和 class 派生类内部访问
    -  protected：该修饰的成员变量 可以在 当前 class 和 class 派生类内部访问，但是不可以在class实例中直接访问
    -  private：该修饰的成员变量 只可以在当前class 内部访问，不可以实例 或者 派生类中访问
    ```ts
    class People {
        private name: string;
        protected age: number;
        protected getPeopleName(): string {
            return this.name;
        }
        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }
    }

    class Student extends People{
        getName() {
            return this.getPeopleName();
        }
        getAge() {
            return this.age;
        }
        constructor(name: string, age: number) {
            super(name, age);
            
        }
    }
    const s = new Student('x', 12);
    s.getName();
    s.getAge();
    ``` 
+ 只读修饰符 readonly
    class 的成员变量可以使用readonly修饰符，来限制某个属性只可读，只读属性只允许在声明或构造函数中初始化只读属性。    
    ```ts
    class People {
        readonly name: string;
        constructor(name: string) {
            this.name = name;
        }
    }
    const p = new People('nn');
    console.log(p.name);
    // p.name = 'mm'; Error readonly
    ```
    
+ 参数属性
    ts中允许构造函数 传入的参数中添加修饰符，修饰符 包括 readonly private protected public, 修饰符修饰的参数允许在当前class内自动创建和初始化该修饰符效果的成员。
    ```ts
    class People {
        constructor(
            public name: string,
            private age: number,
            protected city: string,
            readonly score: number
        ){}
        protected getPeopleAge(): number {
            return this.age;
        }
    }

    class Teacher extends People {
        constructor(name: string, age: number, city: string, score: number) {
            super(name, age, city, score);
        }
        getCity(): string {
            return this.city;
        }
        getAge(): number {
            return this.getPeopleAge();
        }
    }
    const t = new Teacher('dd', 11, 'ee', 100);
    
    console.log(t.name, t.getAge(), t.getCity(), t.score);
    // t.score = 1; Error readonly
    ```
    
+ getter / setter
    ts 支持getter/setter访问修改成员变量，可以提供对象成员的更细致操作控制
    ```ts
     class People {
        constructor(private _score: number) {

        }
        get score():number {
            return this._score;
        }
        set score(score: number) {
            if(score < 0 || score > 100) throw new Error('invalid score');
            this._score = score;
        }
    }

    const p = new People(100);
    console.log(p.score);
    // p.score = -1; Error 
    ```
    当只有 get 没有 set 属性时，ts会自动推断当前成员为 readonly 成员
    
+ 静态属性
    ts还允许 class 创建 静态成员 使用static 修饰符 修饰的变量，这些成员在类本身 而不是在实例上。
    ```ts
     class Point {
        static originX: number = 0;
        static originY: number = 0;
        constructor(public x: number, public y: number) {}
        computeDistance(): number {
            return Math.sqrt(Math.pow(this.x - Point.originX, 2) + Math.pow(this.y - Point.originY, 2));
        }
    }
    const p = new Point(1, 2);
    console.log(p.computeDistance());
    ```
+ abstract class 抽象类 类型    
    ts中的抽象类是一个基类，只允许派发继承给其他子类，本身不能实例化，与接口不同，抽象类可以包含成员的实现细节。使用 abstract 关键字用于定义抽象类 和 抽象类中的抽象方法。抽象类中的抽象方法，在抽象类的子类中必须要有具体实现。
    ```ts
    abstract class People {
        constructor(public name: string) {
            
        }
        
        sayHello(): void {
            console.log('sayHello');
        }

        abstract study(): void; 
    }

    class Student extends People {
        constructor(name: string) {
            super(name);
        }
        study(): void {
            console.log('study');
        }
    }

    const s = new Student('xx');
    s.sayHello();
    s.study();
    ```
+ 类 可以用作接口
    ```ts
    class Point {
        x: number = 1;
        y: number = 0;
    }

    interface PointType extends Point {
        z:number;
    }

    const p: PointType = {
        x: 1,
        y: 2,
        z: 3
    }
    console.log(p);
    ```
    
### Function 函数类型
函数类型主要介绍两个小点，其他功能基本同 es6相同

+ this 和 箭头函数
    ts可以描述function函数的this 指向，当this 为 void 类型时，当前函数 不允许使用 this, 箭头函数调用的 是上一层环境的this
    ```ts
    const a = function(this: void, name: string) {
        // this['']Error
    }
    interface InfoType {
        name: string,
        getName(): string
    }
    let Info: InfoType = {
        name: 'cjw',
        getName: function(this: InfoType) {
            return this.name;
        }
    }
    ```
+ 方法重载
    有时候我们会需要一个函数 可以接受不同的参数，返回不同的结果，这种多功能型的函数可以用重载实现
    ```ts
    function MultiFn (x: string): string;
    function MultiFn(x: string []): number;
    function MultiFn(x: any): any {
        if(typeof x === 'string') {
            return x as string;
        }
        if(typeof x === 'object') {
            return (x as string []).length;
        }
    }
    MultiFn('1');
    MultiFn(['2'])
    ```
    重载的定义 只能使用普通函数不能使用箭头函数
    请注意，该function MultiFn(x: any): any部分不是重载列表的一部分，因此它只有两个重载：一个接受一个对象，另一个接受一个数字。MultiFn使用任何其他参数类型调用将导致错误。

### 泛型
软件工程的一个主要部分是构建组件，这些组件不仅具有定义明确且一致的API，而且还可以重用。能够处理当前数据以及未来数据的组件将为您提供构建大型软件系统的最灵活功能。
工具箱中用于创建可重用组件的主要工具之一是泛型，即能够创建可以在多种类型而不是单个类型上工作的组件。这允许用户使用这些组件并使用他们自己的类型。

+ helloworld 泛型
    ```ts
    const fn = <T>(arg: T): T => {
        return arg;
    }   
    function fn2 <T>(arg: T): T {
        return arg;
    }
    fn(1); fn2<string>('sss');
    ```
    为函数添加一个类型变量 T，T 允许我们捕获传入的参数的类型，并限制使用该类型参数并返回该类型的结果,调用的方法可以显示 fn<string>('123'), 明确类型调用函数，也可以直接调用 ts 此时会根据 传入的参数 推断 T 类型。
+ 使用泛型类型变量
    因为泛型函数 会将参数视为任何所有类型，所以在使用泛型变量的属性 length时候可能会报错，因为有的数据是不存在length属性的， 如果我们需要传入的是一个数组可以用下面的方法解决   
    ```ts
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
    ```
    这里的arg 是一个 T 类型的数组，一定包含length 属性，此时就不会提示 Error了
+ 泛型 class 
    泛型类 与 通用接口类似的效果
    ```ts
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
    ```
    泛型类 可以限制内部成员变量或者方法参数都使用相同的类型，泛型只能作用在 实例端成员变量， 不能作用在static 静态成员变量，静态成员不能使用泛型。
    
+ 泛型约束
    有时候我们想定义一个 泛型函数，函数并不是支持任意数据，而是满足一些特定情况的 一组类型，为此我们必须要要对泛型 T 做类型约束
    ```ts
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
    ```
    泛型继承了length 接口，当我们使用函数fn的时候，参数是受限制的，必须满足接口 参数需要包含length 属性
    
+ 在泛型约束中使用类型参数 
    在ts中 你可以声明 受另一个类型参数约束的类型参数，例如可以 限制 从给定对象中获取属性，确保不会选中obj不存在的属性
    ```ts
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
    ```
    
+ 在泛型中使用 class 类型
    在使用工厂函数时，经常需要用到class 类型
    ```ts
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
    ```
### 枚举 enum
ts中提供了基于数字 和 字符串的 枚举，枚举允许我们定义一组命名常量。使用枚举可以更容易地记录意图，或创建一组不同的案例
+ 数字枚举
    ```ts
    enum Direction {
        Up = 1,
        Bottom,
        Left,
        Right
    }
    ```
    上面的demo Up 初始化数字枚举为1， 后续的属性默认递增，Bottom = 2 Left = 3 Right = 4;
    ```ts
    enum Direction {
        Up,
        Down,
        Left,
        Right,
    }
    ```
    也可以不使用初始化数字枚举，默认的数字递增 从 0 开始. Up = 0 ，Bottom = 1 ...
+ 数字枚举可以使用 计算 和常量 混合使用
    数字枚举的值可以使用 函数计算的方式使用，但是计算函数必须 返回数字类型,
    ```ts
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
    ```
    当使用 计算函数时，其他成员 也必须是 number 类型，而且 const enum 不能和计算函数并存.

+ 字符串枚举
    枚举还可以使用字符串初始化每个值，字符串枚举 下 每个成员都必须是字符串，而且每个成员必须要有初始值，字符串不会有默认递增行为
    ```ts
    const enum Direction {
        Up = 'Up',
        Bottom = 'Bottom',
        Left = 'Left',
        Right = 'Right',
    }
    console.log(Direction.Bottom);
    ```
+ 计算型成员 和 常量成员
    在以下情况被视为 常量成员
    - 它是枚举中的第一个成员，它没有初始化程序，在这种情况下，它被赋值0
    - 它没有初始化程序，前面的枚举成员是一个数字常量。在这种情况下，当前枚举成员的值将是前一个枚举成员的值加一。
    - 枚举成员使用常量枚举表达式初始化。常量枚举表达式是TypeScript表达式的子集，可以在编译时进行完全计算。表达式是一个常量枚举表达式，如果它是：
        * 文字枚举表达式（基本上是字符串文字或数字文字）
        * 对先前定义的常量枚举成员的引用（可以源自不同的枚举）
        * 带括号的常量枚举表达式
        * +，-，~恒定枚举表达一元运算符
        * +，-，*，/，%，<<，>>，>>>，&，|，^二元算常数的枚举表达式作为操作数的
    > 注意: 不允许将常量枚举表达式计算为NaN或Infinity，会触发编译时错误。
    ```ts
    enum FileAccess {
        // constant members
        None,
        Read    = 1 << 1,
        Write   = 1 << 2,
        ReadWrite  = Read | Write,
        // computed member
        G = "123".length
    }

    ```
    
+ 联合枚举 和 枚举成员类型
    枚举中有一个不计算的特殊常量枚举成员子集：文字枚举成员，文字枚举成员是一个常量枚举成员，没有初始化值，或者初始化为的值
    - 任何字符串文字（例如"foo"，"bar，"baz"）
    - 任何数字文字（例如1，100）
    - 应用于任何数字文本一个一元减号（例如-1，-100）
    
    当枚举中的所有成员都具有文字枚举值时，会出现特殊语义
    1. 枚举成员也成为一种类型
    ```ts
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
    ```
    2. 枚举类型本身有效地成为每个枚举成员的联合
    ```ts
    enum E {
        Foo,
        Bar,
    }

    function f(x: E) {
        if (x !== E.Foo || x !== E.Bar) {
            //             ~~~~~~~~~~~
            // Error! This condition will always return 'true' since the types 'E.Foo' and 'E.Bar' have no overlap.
        }
    }
    ```
+ 运行时枚举
    枚举是运行时存在的真实对象。
    ```ts
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
    ```
+ 编译时枚举
    keyof 关键字会返回 枚举对象方法的所有键，toString | toFixed ...
    keyof typeof 组合使用可以返回枚举的所有成员的键， A | B | C
    ```ts
    enum Params {
        A, B, C
    }
    // type ParamsType = "A" | "B" | "C"
    type ParamsType = keyof typeof Params;
    const log = (key: ParamsType) => {
        console.log(Params[key]);
    }
    log('A');
    ```
+ 反向映射
    除了创建具有成员属性名称的对象之外，数字枚举成员还获得从枚举值到枚举名称的反向映射
    ```ts
    enum Params {
        A = 1, B, C
    }

    const B = Params.B;
    const BKey = Params[B]; // B
    console.log(B, BKey);
    ```
    枚举被编译成一个存储前向（name- > value）和反向（value- > name）映射的对象。对其他枚举成员的引用始终作为属性访问发出，并且从不内联
+ const 枚举
    在大多数情况下，枚举是一个非常有效的解决方案。但有时候要求更严格。为了避免在访问枚举值时支付额外生成的代码和额外的间接费用，可以使用const枚举。使用const我们的枚举上的修饰符定义Const 枚举
    ```ts
    const enum Direction {
        Up,
        Bottom,
        Right,
        Left
    }
    console.log(Direction.Bottom); 
    // console.log(1 /* Bottom */);
    ```
    与常规枚举不同，const 枚举只能使用常量表达式，不能有计算成员,  不能直接使用const 枚举变量，只能使用const 枚举对象的索引，它们在编译期间都会被完全删除, 直接替换成最终常量值

### 类型推断
ts可以通过类型推断来在没有显式类型注释时提供类型信息。

### 类型兼容性
+ 简介
    TypeScript中的类型兼容性基于结构子类型，结构类型是一种仅根据其成员关联类型的方式。
    ```ts
    interface Named {
        name: string;
    }

    class Person {
        name: string;
    }

    let p: Named;
    // OK, because of structural typing
    p = new Person();
    ```
+ 开始
    TypeScript的结构类型系统的基本规则下x = y， y至少具有相同成员的兼容x, 检查函数调用参数时使用相同的赋值规则
    ```ts
     class Animal {
        name: string
    }
    class Dog {
        name: string
    }

    const d: Dog = new Animal();
    console.log(d.name);

    const run = (dog: {name: string}): void => {
        console.log(dog.name);
    }

    run(new Animal());
    run(new Dog());
    ```
+ 比较两个函数
    两个函数 x, y 要检查是否x可分配y，我们首先查看参数列表，x函数的每个参数 函数y必须具有兼容类型的相应参数.
    ```ts
    let x = (a: string) => {};
    let y = (b: string, c: number) => {};
    // x = y //Error
    y = x;
    y('c', 1);
    ```
    x = y赋值是一个错误，因为y有一个必需的第二个参数, 而 x 函数 参数类型不包括第二个参数，所以不兼容
    y = x赋值可以成功，x函数的必须参数，y 函数类型都包含，而多余 的c参数，则会被丢弃，所以可以兼容。允许这种赋值的原因是忽略额外的函数参数在JavaScript中实际上很常见
    ```ts
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
    ```
    因为类型系统强制源函数的返回类型是目标类型的返回类型的子类型。所以x2 = y2 ok,但是 y2 = x2 会报错，因为 y2包含必须字段age字段 x2不存在
+ 函数参数差异
    比较函数参数的类型时，如果source参数可分配给目标参数，则赋值成功，反之亦然。这是不合理的，因为调用者可能最终被赋予一个采用更专用类型的函数，但调用具有较少特殊类型的函数。实际上，这种错误很少见，允许这种情况可以实现许多常见的JavaScript模式
    ```ts
    enum EventType { Mouse, Keyboard }

    interface Event { timestamp: number; }
    interface MouseEvent extends Event { x: number; y: number }
    interface KeyEvent extends Event { keyCode: number }

    function listenEvent(eventType: EventType, handler: (n: Event) => void) {
        /* ... */
    }

    // Unsound, but useful and common
    listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + "," + e.y));

    // Undesirable alternatives in presence of soundness
    listenEvent(EventType.Mouse, (e: Event) => console.log((e as MouseEvent).x + "," + (e as MouseEvent).y));
    listenEvent(EventType.Mouse, ((e: MouseEvent) => console.log(e.x + "," + e.y)) as (e: Event) => void);

    // Still disallowed (clear error). Type safety enforced for wholly incompatible types
    listenEvent(EventType.Mouse, (e: number) => console.log(e));

    ```
+ 可选参数和rest扩展参数
    比较兼容功能时，可选参数和必须参数可以互相转换，源类型的额外可选参数不是错误，并且源类型中没有相应参数的目标类型的可选参数也不是错误。
    当函数具有rest参数时，它被视为无限系列的可选参数。
    ```ts
    let fn1 = (x?: number): void => {
        console.log(x);
    }

    let fn2 = (y: number): void => {
        console.log(y);
    }
    fn1 = fn2; // ok
    fn2 = fn1; // ok
    let ffn = (c: (...y: number[]) => void, ...x: number[]) => {
        console.log(x);
        c();
    }
    ffn(fn1, 1); // ok
    ffn(fn2, 1); // ok
    ```
+ 带有重载的函数
    当函数具有重载时，源类型中的每个重载必须与目标类型上的兼容签名匹配。这确保了可以在与源函数相同的所有情况下调用目标函数。
+ 枚举
    枚举与数字兼容，数字与枚举也兼容，但是不同的枚举的值 却不能兼容
    ```ts
    enum Params {
        A, B, C
    }
    enum AnotherParams {
        D, E, F
    }
    let a: number = Params.B;
    let b = Params.A;
    // b = AnotherParams.D; //Error
    ```
+ class 类
    class 比较兼容和对象文字类型和接口的工作方式类似，不同的是 class 具有静态成员和实例成员，比较两个class 时仅仅比较 实例成员，静态成员和构造函数不会影响兼容性。
    ```ts
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
    ```
    类中的私有成员和受保护成员会影响其兼容性, 如果目标类型包含私有成员，则源类型还必须包含源自同一类的私有成员。也就是目标类和 源类都需要继承自同一个私有成员的类才可以互相兼容
    
+ 泛型
    由于TypeScript是结构类型系统，因此类型参数仅在作为成员类型的一部分使用时影响结果类型
    ```ts
    interface Empty<T> {};
    let e1: Empty<string>;
    let e2: Empty<number>;
    e1 = e2;
    e2 = e1; // ok
    ```
    e1和e2是兼容的，因为它们的结构不以区别方式使用类型参数
    添加类型参数作为成员类型时
    ```ts
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
    ```
    对于未指定类型参数的泛型类型，通过指定any代替所有未指定的类型参数来检查兼容性。然后检查生成的类型的兼容性，就像在非通用情况下一样。
    ```ts
    let identity = function<T>(x: T): T {
        // ...
    }

    let reverse = function<U>(y: U): U {
        // ...
    }

    identity = reverse; 
    ```
    
### 高级类型
+ 交叉类型
    交集类型将多种类型组合成一种类型。这允许您将现有类型添加到一起以获得具有所需功能的单一类型。
    ```ts
    class A {
        name: string
    }
    class B {
        age: number
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
    ```
+ 联合类型
    联合类型与交集类型密切相关，但它们的使用方式截然不同。当你需要一个参数 为 多种类型中的一个时 可以使用该类型
    ```ts
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
    ```
+ 类型守护和区分类型
    当值可以在它们可以采用的类型中重叠时，联合类型对于建模情境非常有用。我们需要使用类型断言来访问联合类型不同部分的成员
    ```ts
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
    ```
+ 用户定义类型防护
    TypeScript有一种称为类型保护的东西。类型保护是一些表达式，它执行运行时检查以保证某个范围内的类型。
    - 使用类型谓词
    谓词采用形式parameterName is Type，其中parameterName必须是当前函数签名中参数的名称。如果类型兼容为true，ts会将该变量类型范围缩小到指定类型    
    ```ts
    const isNumber = (n: any): n is number => {
        return typeof n === 'number';
    }

    const isString = (n: any): n is number => {
        return typeof n === 'string';
    }

    class Fish {
        name: string
        swim() {}
    }

    const isFish = (n: any): n is Fish => {
        return (
            typeof n === 'object' &&
            typeof n.name === 'string' &&
            typeof n.swim !== 'undefined'
        )
    }
    ```
    - 使用 in 运算符
    使用 n in x表达式，其中n是字符串文字或字符串文字类型并且x是联合类型，当值为true 时 变量范围缩小为具有可选或必需属性的n类型
    ```ts
    class Fish {
        name: string
        swim() {}
    }
    class Dog {
        age: number
        run(){}
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
    ```
    - typeof 守护
    ts可以识别 typeof 将其自身识别为类型保护。可以不使用函数来确认参数类型，直接使用typeof 判断即可
    ```ts
    const logger = (n: number | string): void => {
        if(typeof n === 'number') {
            console.log(n.toFixed());
        }else {
            console.log(n.slice(1, -1));
        }
    }
    logger(1);
    ```
    - instanceof 守护
    ts也可以识别instanceof 语法作为类型保护
    ```ts
    class Fish {
        name: string
        swim() {}
    }
    class Dog {
        age: number
        run(){}
    }
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
    ```
+ 可空类型 
    - 联合类型
    string | undefined和string | undefined | null。
    - 可选参数和属性
    可选参数属性默认在类型上添加 | undefined
    ```ts
    function f(x: number, y?: number) {
        return x + (y || 0);
    }
    f(1, 2);
    f(1);
    f(1, undefined);
    f(1, null); // error, '
    class C {
        a: number;
        b?: number;
    }
    let c = new C();
    c.a = 12;
    c.a = undefined; // error, 'undefined' is not assignable to 'number'
    c.b = 13;
    c.b = undefined; // ok
    c.b = null; // error, 'null' is not assignable to 'number | undefined'
    ```
    - 类型保护和类型断言
    因为可以使用 联合 类型实现可空类型参数，因此还需要使用类型保护 来删除 null 的情况
    ```ts
    function f(sn: string | null): string {
        return sn || "default";
    }
    ```
    在编译器无法消除null或的情况下undefined，您可以使用类型断言运算符来手动删除它们。语法是后缀!：identifier! 从类型identifier 中 移除了null与undefined：
    ```ts
    // 类型断言
    const fn = (a?: string): void => {
        console.log(a!.slice())
    }
    fn();
    ```
    该断言实现的类型保护并不能消除嵌套在函数内的空值，真实环境还是存在安全风险的
+ 定义别名 类型
    ts 提供的创建类型别名的方法。可以为类型创建新的名称，类型别名在很多场合 和类似接口 interface，但是别名 还可以 命名基础类型 元组类型，联合类型等等任何你想要重新命名的类型
    ```ts
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
    ```
    别名实际上并不创建新类型 - 它会创建一个新名称来引用该类型。对基础类型进行别名化并不是非常有用，但是它可以用作文档的一种形式。
    就像接口一样，类型别名也可以使用泛型
    ```ts
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
    ```

+ 接口与类型别名的区别
    - 接口会创建一个在任何地方使用的新类别名称，类型别名不会创建新名称
    - 无法使用接口表达某种基础类型，联合类型 元组类型等，通常可以使用类型别名
    - 由于软件的理想属性是可扩展的，因此如果可能，应始终在类型别名上使用接口。
    
+ 字符串文字类型
    字符串文字类型允许您指定字符串必须具有的确切值。实际上，字符串文字类型与联合类型，类型保护和类型别名很好地结合在一起。您可以将这些功能一起使用以获得字符串的类似枚举的行为。
    ```ts
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
    ```
    字符串文字类型可以以相同的方式用于区分重载
    ```ts
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
    ```
+ 数字文字类型
    和字符串文字类型差不多
    ```ts
    type All_Number = 1 | 2 | 3 
    function foo(x: All_Number) {
        if (x !== 1 || x !== 2) {
            //         ~~~~~~~
            // Operator '!==' cannot be applied to types '1' and '2'.
        }
    }
    ```
+ 基元数据联合
    你可以组合单例类型 联合类型，类型保护和类型别名来构建与联合不同的高级模式，也称为标记联合，标记联合 或代数数据类型。
    ```ts
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
    ```
+ 穷竭检查
    我们希望编译器告诉我们什么时候我们没有涵盖基元联盟的所有变量 。
+ 多态 this 类型
    多态this类型表示一种类型，它是包含类或接口的子类型。这称为F-有界多态
    ```ts
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
    bc.add(3).
        multiply(3).
        add(3).
        currentValue();
    ```
+ 索引类型
    使用索引类型，您可以让编译器检查使用动态属性名称的代码，以下是使用索引类型查询和索引访问运算符在TypeScript中编写和使用此函数的方法
    ```ts
    const create = <K, T extends keyof K>(o: K, n: T[]): K[T][] => {
        return n.map(v => o[v]);
    }

    const r = create({a: 1, b: 2}, ['a', 'b']);
    // const r2 = create({a: 1, b: 2}, ['d', 'b']); // Error
    ```
    首先keyof T，是索引类型查询操作。对于任何类型 T, keyof T 是T的公共属性名称的联合
    另一个 T[k], 索引访问操作，编译器将实例化键的实际类型，返回类型将根据请求的属性不同而有所不同
+ 索引类型与索引签名
    keyof T 和 T[k] 与索引签名进行交互，索引签名参数类型必须是“string”或“number”。如果你有一个带有字符串索引签名的类型 T, keyof T 为 string | number 联合。
    ```ts
    interface Dict <T> {
        [key: string]: T
    }
    const d: Dict<string> = {
        a: '1'
    }
    let keys: keyof Dict<number>; // string | number
    ```
    如果你有一个带有数字索引签名的类型，那keyof T就是number。   
    ```ts
    interface Dict2 <T> {
        [key: number]: T
    }
    const dd: Dict2<string> = ['d'];
    let keys2: keyof Dict2<number>; // number
    ```
+ 映射类型
    TypeScript提供了一种基于旧类型创建新类型的方法 - 映射类型。在映射类型中，新类型以相同的方式转换旧类型中的每个属性。
    ```ts
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
    ```
    keyof遍历访问索引类型的来源： 返回 索引的 联合类型
    in 遍历访问联合类型 
    ```ts
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
    ```
    readonly partial都属于同态类型
    非同态类型本质上是创建新属性，因此它们无法从任何地方复制属性修饰符。


+ 映射类型推断
    ```ts
    function unproxify<T>(t: Proxify<T>): T {
        let result = {} as T;
        for (const k in t) {
            result[k] = t[k].get();
        }
        return result;
    }

    let originalProps = unproxify(proxyProps); 
    ```
    请注意，此展开类型推断仅适用于同态映射类型。如果映射类型不是同态的，则必须为展开函数提供显式类型参数。

+ 条件类型
    TypeScript 2.8引入了条件类型，它增加了表达非均匀类型映射的能力。条件类型根据表示为类型关系测试的条件选择两种可能类型之一：
    ```ts
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
    ```
    typeName 类型别名嵌套
    ```ts
    type B<T> = T extends string ? string :
                T extends number ? number :
                T extends boolean ? boolean :
                RegExp;
    const b1: B<string> = '1';            
    const b2: B<number> = 2;            
    const bc: B<boolean> = true;            
    ```
+ 分配条件类型
    检查类型 T 是联合类型参数的条件类型称为分布式条件类型。分布式条件类型在实例化期间自动分布在联合类型上, 例如 T extends U ? X : Y， 使用 A | B | C 类型参数给泛型 T， 这里的 条件类型就会被解析为 (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y);
    ```ts
    type A<T> = T extends string ? string :
                T extends number ? number :
                T extends boolean ? boolean :
                RegExp;
    type B = A<string | number>; // string | number;
    type C = A<string[] | object>; // regexp
    ```
    条件类型的分布属性可以方便地用于过滤联合类型
    ```ts
    type Diff<T, K> = T extends K ? never : T;
    type D = Diff<'a'| 'b' | 'c' | 'd', 'b' | 'c'>; // 'a' | 'd'

    type Filter<T, K> = T extends K ? T : K;
    type F = Filter<'a'| 'b' | 'c' | 'd', 'b' | 'c'>; // "b" | "c"

    type NilDiff<T> = Diff<T, null | undefined>;
    type N = NilDiff<null | undefined | 'b' | 'c'>; // b | c
    ```
    条件类型还可以配合映射类型一起使用
    ```ts
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
    ```
    与union和intersection类型类似，不允许条件类型以递归方式引用它们
+ 条件类型的类型推断
    在extends 条件类型中，可以使用 infer U关键字 引入 要推断的 类型变量的声明，可以在条件类型中真实执行分支中使用 推断类型变量，可以在多个位置设置 推断类型变量
    ```ts
    type A<T> = T extends (infer U)[] ? U | T : never;
    type B = A<string[]>; // string | string[]
    type C = A<number[]>; // number | number[]

    type D<T> = T extends (v: infer U, k: infer K) => infer J ? (U | K | J) : never;
    type E = D<(v: string, k: boolean) => void>; // string | boolean | void
    type F = D<number>; // never
    ```
    共变量位置中相同类型变量的多个推断变量如会生成联合类型推断
    ```ts
    type A<T> = T extends (infer U)[] ? U | T : never;
    type B = A<string[]>; // string | string[]
    type C = A<number[]>; // number | number[]

    type D<T> = T extends (v: infer U, k: infer K) => infer J ? (U | K | J) : never;
    type E = D<(v: string, k: boolean) => void>; // string | boolean | void
    type F = D<number>; // never

    type G<T> = T extends [infer U, infer U] ? U : never;
    type H = G<[string, number]>; // string | number
    ```
    反变量位置中相同类型变量的多个推断变量会生成交叉类型推断
    ```ts
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
    ```
    重载函数推断 ，按照最后一个函数 参数来推断
    ```ts
    type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;
    declare function foo(x: string): number;
    declare function foo(x: number): string;
    declare function foo(x: string | number): string | number;
    type M = ReturnType<typeof foo>;  // string | number 
    ```
    infer对于常规类型参数，不可能在约束子句中使用声明,但是，通过去除约束中的类型变量并改为指定条件类型，可以获得大致相同的效果
    ```ts
    type AnyFunction = (...args: any[]) => any;
    type ReturnType<T extends AnyFunction> = T extends (...args: any[]) => infer R ? R : any;
    ```
+ 预定义的条件类型
    Exclude<T, U>- 从T可分配给的那些类型中排除U。
    Extract<T, U>- 从T可分配给的那些类型中提取U。
    NonNullable<T>- 排除null和undefined来自T。
    ReturnType<T> - 获取函数类型的返回类型。
    InstanceType<T> - 获取构造函数类型的实例类型。
    ```ts
    type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
    type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

    type T02 = Exclude<string | number | (() => void), Function>;  // string | number
    type T03 = Extract<string | number | (() => void), Function>;  // () => void

    type T04 = NonNullable<string | number | undefined>;  // string | number
    type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]

    function f1(s: string) {
        return { a: 1, b: s };
    }

    class C {
        x = 0;
        y = 0;
    }

    type T10 = ReturnType<() => string>;  // string
    type T11 = ReturnType<(s: string) => void>;// void
    type T12 = ReturnType<(<T>() => T)>;
    type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
    type T14 = ReturnType<typeof f1>;  // { a:number, b: string }
    type T15 = ReturnType<any>;  // any
    type T16 = ReturnType<never>;  // never
    type T17 = ReturnType<string>;  // Error
    type T18 = ReturnType<Function>;  // Error

    type T20 = InstanceType<typeof C>;  // C
    type T21 = InstanceType<any>;  // any
    type T22 = InstanceType<never>;  // never
    type T23 = InstanceType<string>;  // Error
    type T24 = InstanceType<Function>;  //Error
    ```
### 模块
从 ts 1.5 版本以后，关于模块的命名发生了改变。内联模块称为 namespace X {} 外联模块简称为 module X {}

#### 简介
在ts中，任何包含顶级文件 import / export 的文件视为模块文件，反之没有 import/export 的文件视为脚本文件，在全局范围内可用。（因此也可用与模块）

#### export
+ export 基本语法
    ```ts
    export class A {
        a: string = '1';
        b: number = 2
    }

    export interface B {
        c: string;
        d: number
    }
    ```
+ export 重命名
    ```ts
    type C<T> = {
        name: string
    } 
    export { C as D }
    ```
+ re-export 重导出
    ```ts
    export { A as E } from "./module1";
    ```
+ all-export 全导出
    ```ts
    export * from "./m1";
    export * from "./m2";
    export * from "./m3";
    ```
    全导出貌似不能导出 接口，别名之类的 数据
#### import 导入
+ 单个导入
    ```ts
    import {A} from './m1';
    ```
+ 重命名导入
    ```ts
    import {A as B} from './m1';
    ```
+ 全导入
    ```ts
    import * as C from './m1';
    ```
+ 仅导入副作用模块
    有些模块设置了一些可供其他模块使用的全局状态。这些模块可能没有任何出口，或者消费者对其任何出口都不感兴趣。
    ```ts
    import "./m3";
    ```
#### 默认导出
export default 导出模块 标记default，并且default每个模块只能有一个导出；
```ts
// m1.ts
const a: string = 1;
export default a;
```
```ts
import b from './m1';
console.log(b)
```
#### export =, import module = require()
TypeScript支持export =对传统的CommonJS和AMD工作流进行建模,该导出行为 和 默认导出不兼容
```ts
let numberRegexp = /^[0-9]+$/;
class ZipCodeValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
export = ZipCodeValidator;

```
```ts
import zip = require("./ZipCodeValidator");

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validator = new zip();

// Show whether each string passed each validator
strings.forEach(s => {
  console.log(`"${ s }" - ${ validator.isAcceptable(s) ? "matches" : "does not match" }`);
});
```
#### 动态加载导入
通过require 动态调用，使用typeof关键字保持类型安全
```ts
import G from './m5';
declare function require(moduleName: string): any;

const L = (): void => {
    const K: typeof G = require('./m5');
}

```
    
#### 使用其他js库
js库没有使用ts描绘库的形状，如果ts希望使用js库的话，需要公开库api的声明，在ts中，我们称之为未定义实现“环境”的声明。这些是在.d.ts文件中定义的。

+ 环境模块
在Node.js中，大多数任务是通过加载一个或多个模块来完成的。我们可以.d.ts使用顶级导出声明在自己的文件中定义每个模块，但将它们编写为一个更大的.d.ts文件会更方便，为此，我们使用类似于环境名称空间的构造，但我们使用module关键字和模块的引用名称，以便稍后导入
```ts
// some.d.ts
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
```
引入模块，现在我们可以加上指令 /// <reference> some.d.ts， 然后使用import url = require("url");或者加载模块import * as URL from "url" 来
```ts
/// <reference path="./m7.d.ts"/>
import * as fake from 'fake';
import {fn} from 'rng';
fake.deParse();
fake.parse('');
fn({
    a: '1',
    b: 2
});
```
+ 速计环境模块
有的时候 您不想在使用新模块之前花时间写出声明，则可以使用速记声明环境模块快速使用。
```ts
// some.d.ts
declare module "quick";
```
从速记模块导入的所有内容都具有该any类型。可以当成js 随意使用
```ts
import x, {y} from 'quick';
x(y);
const b = y;
```
+ 通配符模块声明
某些模块加载器（如SystemJS 和AMD）允许导入非JavaScript内容。这些通常使用前缀或后缀来指示特殊的加载语义。通配符模块声明可用于涵盖这些情况。
```ts
declare module "*!text" {
    const content: string;
    export default content;
}
// Some do it the other way around.
declare module "json!*" {
    const value: any;
    export default value;
}
```
现在，您可以导入匹配的东西"*!text"或"json!*"。
```ts
import fileContent from "./xyz.txt!text";
import data from "json!http://example.com/data.json";
console.log(data, fileContent);
```
+ umd 模块
有些库设计用于许多模块加载器，或者没有模块加载（全局变量）。这些被称为UMD模块。可以通过导入或全局变量访问这些库。
```ts
export function getParams(params: string[]): string[];

export as namespace MyLib;
```
该库可用作模块中的导入, 注意不能在一个模块中使用全局变量模式，
```ts
import {getParams} from './m9';

getParams(['1', '2']);
// MyLib.getParams(['1', '2']); // Error
```
在脚本内部。（脚本是没有导入或导出的文件。）可以使用全局变量
```ts
MyLib.getParams(['1', '2']);
```

+ 注意：
1. 一个只有顶级声明的文件export namespace Foo { ... }（删除Foo所有内容并将其移动提升一个层级级别）？？
2. 多个 顶级声明 export namespace Foo,  具有相同名称 Foo, 在使用全局变量访问时 实验结果并不会 合并 或者多选每个 Foo，只会选中先加载的 声明文件

### 命名空间
当我们开发时，需要导出很多方法，我们将需要某种组织方式，以便我们可以跟踪我们的类型，而不用担心与其他对象的名称冲突。不要将许多不同的名称放入全局命名空间，而是让我们将对象包装到命名空间中

```ts
export namespace Util {
    export function add(...nums: number[]) {
        return nums.reduce((prev, cur) => prev + cur, 0)
    }

    export function multi(...nums: number[]) {
        return nums.reduce((prev, cur) => prev * cur, 1)
    }

}
```

引入命名空间
```ts
import {Util} from './n1';

Util.add(1,2,3,4,5);
Util.multi(1,2,3,4,5);
```

**使用环境命名空间**
ts中声明使用命名空间来定义其形状。为了要让TypeScript编译器看到这个形状，我们使用环境命名空间声明，这种被称为环境命名空间
```ts
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

declare var dking: DKing.d; // 描绘全局变量形状

```
使用环境命名空间, 不需要导入，可以直接使用
```ts
const a: DKing.a = 1;
interface b extends DKing.c {
    g: DKing.a
}

dking.exec(1111);
```

一旦涉及多个文件，我们需要确保加载所有已编译的代码,我们可以使用--outFile标记的连接输出将所有输入文件编译成单个JavaScript输出文件

### 模块解析
ts解析器 解析模块顺序模仿node js模块解析机制相同

+ 相对路径的模块
    例如，像import { b } from "./moduleB"in /root/src/moduleA.ts这样的import语句会导致尝试以下位置进行定位"./moduleB"：
    - /root/src/moduleB.ts
    - /root/src/moduleB.tsx
    - /root/src/moduleB.d.ts
    - /root/src/moduleB/package.json（如果它指定了一个"types"属性）
    - /root/src/moduleB/index.ts
    - /root/src/moduleB/index.tsx
    - /root/src/moduleB/index.d.ts
+ 非相对路径模块
    例如，import { b } from "moduleB"在源文件/root/src/moduleA.ts中将导致以下查找：
    - /root/src/node_modules/moduleB.ts
    - /root/src/node_modules/moduleB.tsx
    - /root/src/node_modules/moduleB.d.ts 
    - /root/src/node_modules/moduleB/package.json（如果它指定了一个"types"属性）
    - /root/src/node_modules/@types/moduleB.d.ts
    - /root/src/node_modules/moduleB/index.ts
    - /root/src/node_modules/moduleB/index.tsx
    - /root/src/node_modules/moduleB/index.d.ts 

    - /root/node_modules/moduleB.ts
    - /root/node_modules/moduleB.tsx
    - /root/node_modules/moduleB.d.ts
    - /root/node_modules/moduleB/package.json（如果它指定了一个"types"属性）
    - /root/node_modules/@types/moduleB.d.ts
    - /root/node_modules/moduleB/index.ts
    - /root/node_modules/moduleB/index.tsx
    - /root/node_modules/moduleB/index.d.ts 

    - /node_modules/moduleB.ts
    - /node_modules/moduleB.tsx
    - /node_modules/moduleB/package.json（如果它指定了一个"types"属性）
    - /node_modules/@types/moduleB.d.ts
    - /node_modules/moduleB/index.ts
    - /node_modules/moduleB/index.tsx
    - /node_modules/moduleB/index.d.ts
+ 跟踪模块解析日志    
    编译器在解析模块时可以使用模块解析追踪，深入了解模块解析过程中发生的情况。
    ```ts
    tsc --traceResolution
    ```
## 声明文件
Todo
## 项目配置
[项目详细配置](https://github.com/JohnApache/typescript-usage-doc/blob/master/README_TSCONFIG.md)

## 深入理解typescript
[深入了解typescript](https://github.com/JohnApache/typescript-usage-doc/blob/master/README_TSCONFIG.md)