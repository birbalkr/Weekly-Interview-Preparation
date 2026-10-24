// Q1. in array positive and negative numbers. make sure all negative numbers in left side and all positive numbers in right side of array.

let arr = [1, -2, 3, -4, 5, -6, 7, -8, 9];
let i = 0;
let j = 0;

while (i < arr.length) {
    if (arr[i] < 0) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        j++;
    }
    i++;
}


console.log(arr);
