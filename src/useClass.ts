// private / protected
const fn1 = (): void => {
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
}
fn1();
// readonly
const fn2 = (): void => {
    class People {
        readonly name: string;
        constructor(name: string) {
            this.name = name;
        }
    }
    const p = new People('nn');
    console.log(p.name);
    // p.name = 'mm'; Error readonly
}
fn2();

// param property 参数属性
const fn3 = (): void => {
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

}
fn3();
// getter /setter
const fn4 = (): void => {
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
}
fn4();
// static 成员
const fn5 = (): void => {
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
}
fn5();
// abstract 抽象类
const fn6 = (): void => {
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
}
fn6();

// 先进的技术
const fn8 = (): void => {
    class People {
        static userName: string = '11111';
        constructor(public age: number) {};
        sayHi(): void {
            console.log(People.userName, 'Hi');
        }
    }

    let MakePeople: typeof People = People;
    MakePeople.userName = '2222'
    const c = new MakePeople(1);
    c.sayHi();
    const p = new People(1);
    p.sayHi();
}
fn8();

// 接口 扩展类
const fn9 = (): void => {
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
}
fn9();
export default {};