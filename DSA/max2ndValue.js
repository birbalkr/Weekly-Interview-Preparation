let arr = [43, 5, 76, 85, 3, 57, 3, 6, 235, 56, 3, 5, 64, 7, 54, 4, 90]

let firstMax = arr[0];
let secondMax = arr[1];

for (let i = 2; i < arr.length; i++) {
    if (arr[i] > firstMax) {
        secondMax = firstMax;
        firstMax = arr[i];
    }
    else if (arr[i] > secondMax && firstMax != arr[i]) {
        secondMax = arr[i];
    }
}
console.log("first max: ", firstMax, " second max ", secondMax);
