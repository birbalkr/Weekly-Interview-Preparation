let arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

// first method

let newArr = new Array(arr.length);
let j = 0
for (let i = arr.length-1; i >= 0; i--) {
    newArr[j] = arr[i];
    j++;
}

console.log(newArr);
