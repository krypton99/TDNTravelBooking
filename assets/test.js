var a = false || 8 || 0;

if (languages == undefined) {
    var languages = new Array(
        'Javascript',
        'PHP',
        'Java',
    )
}

// languages2 = languages.slice(0)

// languages.push('PHP', 'Dart')

// console.log(languages.toString());
// console.log(languages2.toString());


var courses = [
    {
        id: 0,
        name: 'PHP',
        coin: 0
    },
    {
        id: 1,
        name: 'Javascript',
        coin: 0
    },
    {
        id: 2,
        name: 'C#',
        coin: 0
    },
    {
        id: 3,
        name: 'f',
        coin: 400
    },
    {
        id: 4,
        name: 'Dart',
        coin: 600
    },
    {
        id: 5,
        name: 'Dart',
        coin: 500,
        isDisable: true,
    },
    {
        id: 6,
        name: 'Dart',
        coin: 700,
        isDisable: true,
    }
];

courses.length = 100
// var newCourse = courses.find(function(course, index) {
//     return course.name === 'Dart'
// })
// console.log(newCourse)

// Array.prototype.filter2 = function (callback) {
//     var arrayLength = this.length;
//     var foundElements = [];
//     for(var i = 0; i < arrayLength; i++) {
//         if (callback(this[i], i)) {
//              foundElements.push(this[i]);
//         }
//     }
//     return foundElements
// }

// var newCourse2 = courses.filter2(function(course, index) {
//     return course.name === 'Dart'
// })
// console.log(newCourse2)

// console.log(Object.keys(courses[1]))

// for (var course of Object.keys(courses[1])) {
//     console.log(courses[1][course])
// }


// var depthArray = [1,2,[3,4],5,6,[7,8,9]];

// var flatArray = depthArray.reduce(function (flat, arrayItem) {
//     return flat.concat(arrayItem)
// }, [])

// var totalCoin = courses.reduce( (a,b) =>
//     a + ` ${b.id}: ${b.name} \n`
// ,'')

// console.log(Math.random());

// function callback(param) {
//     if(typeof param === 'function'){
//         param('haha')
//     }
// }

// function myCallback(value) {
//     console.log('value: ' + value)
// }

// callback(myCallback('dddd'))



// var totalCoin = courses.reduce(function (total, course) {
//     return total + course.coin
// }, 0)

// console.log(totalCoin)

// Array.prototype.reduce2 = function (callback, initialElement) {


//     for (var index in this) {
//         if (this.hasOwnProperty(index)) {
//             var previousValue = callback(initialElement, this[index])
//             initialElement = previousValue;
//             //console.log(callback(initialElement, this[index]))
//         }
//     }
//     return previousValue
// }

// var totalCoin2 = courses.reduce2(function (total, course) {
//     return total + course['coin']
// }, 0)

// console.log(totalCoin2)

// let john = { name: "John", age: 25 };
// let pete = { name: "Pete", age: 30 };
// let mary = { name: "Mary", age: 28 };

// let users = [ john, pete, mary ];

// let names = users.map(function (user) {
//     return user.name;
// })

// alert( names ); // Jo


// console.log(document.querySelector('#heading1'))
// // document.querySelector('#heading1').draggable = true
// // document.querySelector('#heading1').isContentEditable=true
// console.log(document.querySelector('#heading1'))

// var textListener;

// document.querySelector('.footer__form-input').oninput = function (e) {
//     textListener = e.target.value
//     console.log(textListener)
// }

// console.log(textListener)



//Click on "Đăng ký"

var authButtons = document.querySelectorAll('span.header__navbar-item-link')
console.log(authButtons)

var modal = document.querySelector('.modal')
function authControl(...selector) {
    Array.from(authButtons).forEach((authButton, index) => {
        var formElement = document.querySelector(selector[index])
        var closeButton = formElement.querySelector('.auth-form__close')
        var switchBtn = formElement.querySelector('.auth-form__switch-btn')
        authButton.onclick = e => {
            if (modal) {
                modal.style.display = 'flex'
                formElement.classList.add('auth-form--active')
            }
            var overlay = modal.querySelector(".modal__overlay")
            overlay.onclick = () => {
                modal.style.display = 'none'
                formElement.classList.remove('auth-form--active')
            }
        }
        if (switchBtn) {
            switchBtn.onclick = function (e) {
                var otherForm;
                if (index === 0) {
                    otherForm = modal.querySelector(selector[1])
                } else {
                    otherForm = modal.querySelector(selector[0])
                }
                formElement.classList.remove('auth-form--active')
                otherForm.classList.add('auth-form--active')
            }
        }
        if (closeButton) {
            closeButton.onclick = function (e) {
                modal.style.display = 'none'
                formElement.classList.remove('auth-form--active')
            }
        }
    })
}
authControl('#register-form', '#login-form')

//close form when blur



//Nav items hover handler

var navItems = document.querySelectorAll('.header__navbar-item')
console.log(navItems)

Array.from(navItems).forEach(navItem => {
    navItem.onmouseover = e => {
        navItem.classList.add('header__navbar-link--active')
    }
    navItem.onmouseout = e => {
        navItem.classList.remove('header__navbar-link--active')
    }
})

//Header navbar scrolling handler
var headerNavbar = document.querySelector('.nav-wrapper')
console.log(headerNavbar)
var sticky = headerNavbar.offsetTop

if (headerNavbar) {
    window.onscroll = () => {
        if (window.scrollY > sticky) {
            headerNavbar.classList.add('sticky')
        } else {
            headerNavbar.classList.remove('sticky')
        }
    }
}