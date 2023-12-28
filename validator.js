function Validator(options) {
    // Get parent element từ 1 element con và selector

    function getParent(element, selector) {
        var parent = element;
        while (parent.parentElement && !parent.parentElement.matches(selector)) {
            parent = parent.parentElement;
            //console.log(parent.classList)
        }
        //console.log(parent)
        return parent.parentElement
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);

    // Tạo biến lưu các rules
    var selectorRules = {}

    //Hàm thực hiện validation
    function validate(inputElement, rule) {

        var rules = selectorRules[rule.selector];
        var errorMessage;
        console.log(rules)
        //lặp qua các rule và trả về errMessage đầu tiên và dừng vòng lặp
        for (var i = 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    console.log(inputElement)
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }
        //getParent(inputElement, 'auth-form__group')

        var msgElement = getParent(inputElement, options.formGroupSelector).querySelector(options.msgSelector);
        //console.log(msgElement)
        if (errorMessage) {
            msgElement.innerText = errorMessage;
            getParent(inputElement, options.formBoxSelector).classList.add('invalid');
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            msgElement.innerText = ''
            getParent(inputElement, options.formBoxSelector).classList.remove('invalid');
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }


    //console.log(document.querySelector(options.rules[0]))
    if (formElement) {

        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                isValid = validate(inputElement, rule)
                if (!isValid) {
                    isFormValid = false;
                }
            })


            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {


                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])')
                    console.log(enableInputs)
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {

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
                        console.log(values)
                        return values;
                    }, {})
                    options.onSubmit(formValues)
                }
            }
        }

        options.rules.forEach(function (rule) {

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function (inputElement) {
                if (inputElement) {
                    inputElement.onblur = function () {
                        validate(inputElement, rule)
                    }

                    //Khi người dùng nhập vào -> xóa bỏ invalid
                    inputElement.oninput = function (e) {
                        var msgElement = getParent(inputElement, options.formGroupSelector).querySelector(options.msgSelector);
                        if (e.target.value) {
                            console.log(msgElement)
                            msgElement.innerText = ''
                            getParent(inputElement, options.formBoxSelector).classList.remove('invalid');
                            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                        }
                    }

                    inputElement.onchange = function () {
                        validate(inputElement, rule)
                    }
                }
            })

            // tạo mảng lưu các rule với index là rule.selector và value là rule.test
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

        })
        //console.log(selectorRules)

    }
}

Validator.isRequire = function (selector, msg) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : msg || 'Vui lòng nhập trường này';
        }
    };
}

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập email hợp lệ'
        }
    };
}

Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Mật khẩu phải chứa ít nhất ${min} ký tự`;
        }
    };
}

Validator.isConfirm = function (selector, getConfirmValue, confirmMsg) {
    return {
        selector: selector,
        confirmMsg: confirmMsg,
        test: function (value) {
            console.log(getConfirmValue())
            return value === getConfirmValue() ? undefined : confirmMsg || 'Giá trị nhập vào không khớp';
        }
    }
}