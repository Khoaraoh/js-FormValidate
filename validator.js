function validator(options)
{
    formElement = document.querySelector(options.form);
    if (formElement != null)
    {
        options.rules.forEach(rule => {
            let field = formElement.querySelector(rule.selector);
            let formMessage = field.parentElement.querySelector('.form-message');
            if (field != null)
            {
                field.onblur = () => {
                    const errorMessage = rule.test(field.value);
                    if(errorMessage != undefined)
                    {
                        formMessage.innerText = errorMessage;
                        field.parentElement.classList.add('invalid');
                    }
                    else
                    {
                        formMessage.innerText = "";
                        field.parentElement.classList.remove('invalid');
                    }
                }

                field.onkeyup = () => {
                    formMessage.innerText = "";
                    field.parentElement.classList.remove('invalid');
                }
            }
        })
    }

    //Xử lý submit
    const submitButton = formElement.querySelector('.form-submit');
    submitButton.onclick = () => {
        options.rules.forEach(rule => {
            let field = formElement.querySelector(rule.selector);
            let formMessage = field.parentElement.querySelector('.form-message');
            if (field != null)
            {
                const errorMessage = rule.test(field.value);
                if(errorMessage != undefined)
                {
                    formMessage.innerText = errorMessage;
                    field.parentElement.classList.add('invalid');
                }
                else
                {
                    formMessage.innerText = "";
                    field.parentElement.classList.remove('invalid');
                }
            }
        })
    }
}

validator.isRequire = (selector) => {
    return {
        selector: selector,
        test: (value) => {
            if(value.trim()==0)
            {
                return 'Vui lòng nhập trường này.';
            }
            else
            {
                return undefined;
            }
        }
    }
}

validator.isEmail = (selector) => {
    return {
        selector: selector,
        test: (value) => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
            {
                return undefined;
            }
            else
            {
                return "Vui lòng nhập đúng định dạng email: example@domain.com";
            }
        }
    }
}

validator.isValidPassword = (selector) => {
    return {
        selector: selector,
        test: (value) => {
            if(value.length < 8)
            {
                return "Mật khẩu phải có độ dài ít nhất 8 ký tự";
            }
            else
            {
                return undefined;
            }
        }
    }
}

validator.isCompareWith = (selector, getPassword) => {
    return {
        selector: selector,
        test: (value) => {
            if(value === getPassword())
            {
                return undefined;
            }
            else
            {
                return "Mật khẩu xác nhận không trùng khớp.";
            }
        }
    }
}

