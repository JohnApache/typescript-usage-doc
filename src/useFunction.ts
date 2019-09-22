// this
const fn1 = (): void => {
    let deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        createCardPicker: function() {
            // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
            return () => {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);
    
                return {suit: this.suits[pickedSuit], card: pickedCard % 13};
            }
        }
    }
    
    let cardPicker = deck.createCardPicker();
}
fn1();

// 函数重载
const fn2 = (): void => {
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
}
fn2();

export default {};