// function User(firstName, lastName, avata) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.avata = avata;

//     this.getName = function() {
//         return `${firstName} ${lastName}`;
//     }
// }

// var admin = new User('duy', 'dinh', 'avata');
// var user = new User('thanh', 'huyen', 'avata');

// admin.title = 'hoc voi f8';
// user.comment = 'amazing goodchop';

// console.log(admin.title);
// console.log(user.getName());




// function Student(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
// }

// Student.prototype.getFullname = function() {
//     return this.firstName + ' ' + this.lastName;
// }

// var student = new Student('van', 'duy');
// console.log(student.firstName)
// console.log(student.lastName)
// console.log(student.getFullname())




// var random = Math.floor(Math.random() * 4);

// function getRandom(array) {
//     return array[random];
// }

// var fruits = [
//     'banana', 'tomato', 'potato', 'orange', 'apple'
// ]
// console.log(getRandom(fruits));



// Làm bài
// function getRandNumbers(min, max, length) {
//     var array = [];
//     for (var i = 0; i < length; i++) {
//         var random = Math.random() * (max - min) + min;
//         array[i] = random;
//     }
//     return array;
// }

// console.log(getRandNumbers(1, 3, 5))



// function getTotal(arr) {
//     var results = 0;
//     for (var i = 0; i < arr.length; i++) {
//         results += arr[i];
//     }
//     return results;
// }

// // Expected results
// console.log(getTotal([1, 2, 3])) // Output: 6
// console.log(getTotal([4, 5, -3])) // Output: 6
// console.log(getTotal([4, 5, 3, 5])) // Output: 17





// var orders = [{
//         name: 'Khóa học HTML - CSS Pro',
//         price: 3000000
//     },
//     {
//         name: 'Khóa học Javascript Pro',
//         price: 2500000
//     },
//     {
//         name: 'Khóa học React Pro',
//         price: 3200000
//     },
//     {
//         name: 'Khóa học PHP Pro',
//         price: 3200000
//     }
// ]

// var ordersLength = orders.length;

// function getTotal(array) {
//     var sum = 0;
//     for (var i = 0; i < ordersLength; i++) {
//         sum += array[i].price;
//     }
//     return sum;
// }

// // Expected results:
// console.log(getTotal(orders)) // Output: 8700000



// function run(object) {
//     var full = [];
//     for (var key in object) {
//         var cofull = 'Thuộc tính ' + key + ' có giá trị ' + object[key];
//         full.push(cofull);
//     }
//     return full;
// }

// // Expected results:
// console.log(run({ name: 'Nguyen Van A', age: 16 }));







// var courses = [{
//         id: 1,
//         name: 'javascript',
//         coin: 0
//     },
//     {
//         id: 2,
//         name: 'php',
//         coin: 32
//     },
//     {
//         id: 3,
//         name: 'java',
//         coin: 0
//     },
//     {
//         id: 4,
//         name: 'html css',
//         coin: 1
//     },
//     {
//         id: 5,
//         name: 'ruby',
//         coin: 1
//     },
//     {
//         id: 6,
//         name: 'sql',
//         coin: 32
//     },
// ];

// function courseHandler(course, index) {
//     return {
//         id: course.id,
//         name: `khoa hoc: ${course.name}`,
//         coin: course.coin,
//         coinText: `gia: ${course.coin}`,
//         index: index,

//     };
// }

// var newCourse = courses.map(courseHandler);
// console.log(newCourse);


// var result = 0;
// do {
//     result += 0.1;
//     console.log(result);
// } while (result < 1);




function run(n) {
    var i = n;
    var countx = 0;
    do {
        if (n % 2 == 0) { countx++ };
        n = n / 2;
    }
    while (n >= 1);

    console.log(countx);
}
run(7);