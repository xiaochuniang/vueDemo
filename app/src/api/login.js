/**
 * 引用拦截器
 */
import service from '@/utils/request.js'

/**
 * 获取验证码的接口
 */
export function getSms() {
    service.request({
        method: 'post',
        url: '/getSms',
        data: {}
    })
}

/**
 * 登陆
 */

/**
 * 获取用户角色
 */