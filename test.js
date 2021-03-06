let objTest = {
  user_1: {
    value: 'username',
    flag: 'user-name'
  },
  user_2: {
    value: 'username_2',
    flag: 'user-name-2'
  },
};

let testArr = [
  {
    status: 'active'
  },
  {
    status: 'unActive'
  }
];

// Object.keys(objTest).forEach(el => console.table(objTest[el]))

//every return boolean
let status_every = testArr.every(el => el.status != 'unActive');
let status_some = testArr.some(el => el.status != 'unActive');
let newArr = testArr.map(el => {
  return {
    ...el,
    name: 'hi'
  }
});
testArr = newArr;

let newFilter = testArr.filter(el => el.name == 'hi')


async function resturnData() {
  setTimeout(() => {
    return {
      name: 'hi'
    };
  }, 1200);
}

async function callTodos() {
  const res = await resturnData();
  console.log(res);
}

function sayHi() {
  console.log('hi');
}

// callTodos();
// sayHi();


const testAsync = async _=> Promise.resolve('hi');
// testAsync().then(console.log);

testInit = {
  user: (res = 2) => {
    console.log(res)
  },
  user2: {}
}

// testInit.user(123);

// const test = console.log
// test(12);

class AppError extends Error {
  errors_arr;
  
  constructor(message) {
    super(message);
    this.errors_arr = message;
  }

  get errors() {
    return this.errors_arr;
  }
}

const testErrorClass = async () => {
  try {
    const arr = [
      {
        message: 'Not found..'
      }
    ]

    const test = 'test';

    throw new AppError(arr);
  } catch(err) {
    console.log(err.errors);
  }
}

let testingS = ['hi','man'];
// console.log(testingS.join(','))

// testErrorClass();


class Test {
  number = 0;

  incNumber() {
    this.number++;
    return this;
  }

  multiNumber() {
    this.number = this.number * 2;
    return this
  }
}
// console.log([1,2,3,4,5].filter(e=>e>2).map(e=>e*2));
let testClass = new Test();
// console.log(testClass.multiNumber().number); //? 
// console.log(testClass.incNumber().number);
// console.log(testClass.incNumber().multiNumber().number);

function ElementRef(name, subName) {
  this.name = name;
  this.subName = subName;
}

ElementRef.prototype.unicha = function() {
  return this.name;
}


const test = new ElementRef('mohammed', 'vector'); //? console.log(test)
//?
const { existsSync } = require('fs');
// console.log(test.__proto__.unicha);

const path = require('path');
// const imagePath = 'src/product-panel2'; 
// console.log(existsSync(imagePath)); 
// if (existsSync(imagePath)) {
//   console.log('hi');
// }

// const {exec} = require('child_process');

// exec(`mkdir ${path.join(__dirname, 'src', 'gu')}`, (err, stdout, stderr)=> {
//   if(err) {
//     console.log(err);
//     return;
//   }
//   if(stdout) {
//     console.log(stdout);
//     return;
//   }
//   console.log(stderr);
// })

const anonymos = (path, callBack) => {
  callBack(path);
}

anonymos('test',(test)=> {
  console.log(test)
})