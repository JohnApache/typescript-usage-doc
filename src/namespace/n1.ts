export namespace Util {
    export function add(...nums: number[]) {
        return nums.reduce((prev, cur) => prev + cur, 0)
    }

    export function multi(...nums: number[]) {
        return nums.reduce((prev, cur) => prev * cur, 1)
    }

}