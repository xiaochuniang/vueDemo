/**
 * 引用拦截器
 */
import service from '@/utils/request.js'

/**
 * 获取验证码的接口
 */
export function getSms(data) {
    return service.request({
        method: "post",
        url: "/getSms/",
        data: data
    })
}

/**
 * 登陆
 */
export function Login(data) {
    return service.request({
        method: 'post',
        url:'/login/',
        data
    })
}

 /**
  * 注册
  */
 export function Register(data) {
    return service.request({
        method: 'post',
        url: '/register/',
        data
    })
 }

/**
 * 获取用户角色
 */