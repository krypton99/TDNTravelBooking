function Validator(formSelector) {

    var formRules = {};

    _this = this;
    //Lấy element cha

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) return element.parentElement
            element = element.parentElement;
            //console.log(element.parentElement)
        }
    }

    /*
    Quy ước tạo rule:
    - nếu có lỗi thì return `message lỗi`
    - nếu không lỗi thì return undefined
    */
    var validatorRules = {
        required: function (value) {
            return value ? undefined : 'Vui lòng nhập trường này';
        },
        email: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập email hợp lệ'
        },
        minLength: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} ký tự`;
            }
        },
        maxLength: function (max) {
            return function (value) {
                return value.length <= max ? undefined : `Vui lòng nhập tối đa ${max} ký tự`;
            }
        },
        confirm: function (selector) {
            return function (value) {
                var formElement = document.querySelector(formSelector);
                confirmElement = formElement.querySelector(selector)
                return (value === confirmElement.value) ? undefined : `Giá trị nhập vào không khớp`;
            }
        }
    }

    //Lấy ra form element trong DOM theo `formSelector`
    var formElement = document.querySelector(formSelector);

    //Chỉ xử lý khi lấy được formElement
    if (formElement) {
        var inputElements = formElement.querySelectorAll('input[name][rules]')


        // Lặp qua các input element
        for (var inputElement of inputElements) {

            var rules = inputElement.getAttribute('rules').split('|')

            // Lặp qua các rule trong mỗi inputElement và gán function
            for (var rule of rules) {
                var isRuleHasValue = rule.includes(':');
                var ruleInfo;

                if (rule.includes(':')) {
                    ruleInfo = rule.split(':')
                    rule = ruleInfo[0];
                }

                // Mặc định gán function nếu rule không phải là rule có value
                var ruleFunction = validatorRules[rule];

                // Kiểm tra nếu rule là rule chứa value thì gán lại funciton
                if (isRuleHasValue) {
                    ruleFunction = ruleFunction(ruleInfo[1])
                }


                if (Array.isArray(formRules[inputElement.name])) {
                    formRules[inputElement.name].push(ruleFunction)
                } else {
                    formRules[inputElement.name] = [ruleFunction];
                }
            }



            //Lắng nghe sự kiện
            inputElement.onblur = handleValidate;
            inputElement.oninput = handleClearError;
        }

        function handleValidate(event) {
            var inputRules = formRules[event.target.name];
            var errMessage;

            for (var inputRule of inputRules) {
                errMessage = inputRule(event.target.value);
                if (errMessage) break;
            }


            console.log(errMessage)

            // Nếu có lỗi thì hiển thị message lỗi ra UI
            if (errMessage) {
                var formGroup = getParent(event.target, ".auth-form__group");
                var formBox = getParent(event.target, '.auth-form__box');
                if (formGroup) {
                    var msgElement = formGroup.querySelector('.auth-form__message');
                    console.log(msgElement)
                    formGroup.classList.add('invalid')
                    if (formBox) {
                        formBox.classList.add('invalid')
                    }
                    if (msgElement) {
                        msgElement.innerText = errMessage;
                    }
                }
            }
            return !errMessage;
        }

        function handleClearError(event) {
            var formGroup = getParent(event.target, ".auth-form__group");
            if (formGroup) {
                var msgElement = formGroup.querySelector('.auth-form__message');
                var formBox = getParent(event.target, '.auth-form__box');
                if (event.target.value) {
                    formGroup.classList.remove('invalid')
                    if (msgElement) {
                        msgElement.innerText = '';
                    }
                    if (formBox) {
                        formBox.classList.remove('invalid')
                    }
                }
            }
        }

        //console.log(formRules)
    }

    //Xử lý hành vi submit form
    formElement.onsubmit = submitHandler;
    onSubmit = function () {

    }
    function submitHandler(event) {
        // Ngăn chặn hành vi mặc định
        event.preventDefault()
        var inputElements = formElement.querySelectorAll('input[name][rules]')

        var formValue = {}
        var isValid = true;
        // Lặp qua các input element
        Array.from(inputElements).reduce(function (values, input) {
            if (handleValidate({
                target: input
            })) {
                switch (input.type) {
                    case 'radio':
                        values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value
                        break;
                    case 'checkbox':
                        if (input.matches(':checked')) {
                            if (!Array.isArray(values[input.name])) {
                                values[input.name] = [];
                            }
                            values[input.name].push(input.value)
                        } else {
                            values[input.name] = ""
                        }
                        break;
                    case 'file':
                        values[input.name] = input.files;
                        break;
                    default:
                        values[input.name] = input.value;
                }
            } else {
                values[input.name] = '';
                isValid = false;
            }
            return formValue = values;
        }, {})
        //console.log(isValid)

        //console.log(formValue)

        // Không có lỗi thì submit form
        if (isValid) {
            if (typeof _this.onSubmit === 'function') {
                _this.onSubmit(formValue);
                //console.log(formValue)
            } else {
                formElement.submit();
            }
        }
        //console.log(formValue)
    }
}

var promise1 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve([1])
    }, 2000)
})

var promise2 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve([2, 3])
    }, 5000)
})

var headingElement = document.querySelector('h3')

console.log(headingElement.style.fontSize)
//Lưu ý: cách này chỉ lấy thuộc tính CSS inline của element




var users = [
    {
        id: 1,
        name: 'Dao Nam'
    },
    {
        id: 2,
        name: 'Huy Tran'
    },
    {
        id: 3,
        name: 'Kien Le'
    },
]

var comments = [
    {
        id: 1,
        user_id: 1,
        name: 'Xin Chao moi nguoi'
    },
    {
        id: 2,
        user_id: 2,
        name: 'Hello'
    },
]

//1. Lấy comments
//2. Từ comments lấy ra user_id,
//từ user_id lấy ra user tương ứng

//fake API
function getComments() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(comments)
        }, 3000)
    })
}

function getUsersByIds(userIds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            var result = users.filter(user => userIds.includes(user.id))
            resolve(result)
        }, 1000)
    })
}

getComments()
    .then((comments) => {
        console.log(comments)
        var userIds = comments.map(comment => comment.user_id)
        console.log(userIds)
        return getUsersByIds(userIds)
            .then((users) => {
                return {
                    users: users,
                    comments: comments
                }
            })
    })
    .then((data) => {
        console.log(data)
    })
    .catch(() => {
        console.log('An Error has occured')
    })


var postApi = 'https://jsonplaceholder.typicode.com/posts'

fetch(postApi)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(() => {
        console.log('An error has occured')
    })
    .finally(() => console.log('Done!'))