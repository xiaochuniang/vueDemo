

let loginRules = {
    userName: [
        { required: true , message: '请输入用户名', trigger: 'blur' },
        // { 
        //     required: true, 
        //     pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        //     message: '请输入正确的邮箱',
        //     trigger: 'blur'
        // },
        {
            type: 'email', //要检验的类型（number，email，date等）
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
        }
    ],
    password: [
        { required: true, validator: validatePass, trigger: 'blur' },
    ],
    checkPwd: {
        required: true , message: '确认密码不能为空！', trigger: 'blur'
    },
    authCode: {
        required: true , message: '验证码不正确', trigger: 'blur'
    }
}

let setRules = function(params) {
    console.log(params)
}

// 正则表达式

/**
 * 过滤特殊字符
 */
export function stripscript(str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

/**
 * 验证邮箱
 * @param {*} value 
 */
export function validateEmail(value) {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !reg.test(value) ? true : false;
}

/**
 * 验证密码
 * @param {*} value 
 */
export function validatePass(value) {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(value) ? true : false;
}

/**
 * 验证验证码
 * @param {*} value 
 */
export function validateVCode(value) {
    let reg = reg = /^[a-z0-9]{6}$/;
    return !reg.test(value) ? true : false;
}

export default {
    setRules,
    loginRules
}