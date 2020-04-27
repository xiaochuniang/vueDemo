<template>
  <div id="login">
    <div class="login-wamp">
      <div class="nav-bars">
        <div
          :class="['nav-bar', { active: nav.current }]"
          v-for="(nav, index) in navBas"
          :key="index"
          @click="changeNav(nav)"
        >
          {{ nav.txt }}
        </div>
      </div>

      <!-- 表单 -->
      <el-form
        ref="ruleForm"
        status-icon
        :model="ruleForm"
        :rules="rules"
        label-position="top"
        size="medium"
      >
        <el-form-item label="邮箱" prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
           type="password"
            v-model="ruleForm.password"
            minlength="6"
            maxlength="20"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="checkPwd"
          v-show="model === 'register'"
        >
          <el-input type="password" v-model="ruleForm.checkPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <div class="verification-code-box">
            <el-input
              class="verification-code-input"
              minlength="6"
              maxlength="6"
              v-model="ruleForm.code"
              autocomplete="off"
            ></el-input>
            <el-button
              class="verification-code-btn"
              type="success"
              @click="getCode()"
              :disabled="codeBtnStatus.type"
              >{{ codeBtnStatus.text }}</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="" class="sub-btn-item">
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            :disabled="loginBtnStatus"
            >{{ model === "login" ? "登陆" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getSms, Register, Login } from "@/api/login";
import {
  stripscript,
  validateEmail,
  validatePass,
  validateVCode
} from "../../utils/validate";
import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api";
export default {
  name: "login",
  setup(props, { refs, root }) {
    /**
     * ====================验证开始
     */
    // 验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入用户名！"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式错误！"));
      } else {
        callback();
      }
    };

    // 验证密码
    let validatePassword = (rule, value, callback) => {
      // 过滤后的字符串
      ruleForm.password = stripscript(value);
      value = ruleForm.password;

      if (value == "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6至20位数字+字母"));
      } else {
        callback();
      }
    };

    // 验证确认密码
    let validateCheckpwd = (rule, value, callback) => {
      if (model.value == "login") {
        callback();
      }
      // 过滤后的字符串
      ruleForm.checkPwd = stripscript(value);
      value = ruleForm.checkPwd;

      if (value == "") {
        callback(new Error("请输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("确认密码不正确"));
      } else {
        callback();
      }
    };

    // 验证验证码
    let validateCode = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入验证码！"));
      } else if (validateVCode(value)) {
        callback(new Error("格式不正确！"));
      } else {
        callback();
      }
    };

    /**
     * ===================验证结束
     */

    const navBas = reactive([
      { txt: "登陆", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);

    const model = ref("login");
    const loginBtnStatus = ref(true);
    // 验证码按钮状态
    const codeBtnStatus = reactive({
      type: false,
      text: "获取验证码"
    });
    // 表单
    const ruleForm = reactive({
      username: "",
      password: "",
      checkPwd: "",
      code: ""
    });
    // 存储倒计时
    const timer = ref(null)

    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      checkPwd: [{ validator: validateCheckpwd, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });

    const changeNav = data => {
      navBas.forEach((item, index) => {
        item.current = false;
      });

      // 高光
      data.current = true;
      // 修改模块值
      model.value = data.type;
      // 还原btn
      resetBtn()
    };

    // 提交表单
    const submitForm = formName => {
      
      refs[formName].validate(valid => {
        if (valid) {
          let param = ruleForm
          param.module = model.value
          param = {...param, ruleForm}

          if (model.value === 'register') {
            Register(param).then( response => {
              root.$message({
                message: response.data.message,
                type: 'success'
              })
              changeNav(navBas[0])
            }).catch( error => {

            })
            // 重置表单
            refs["ruleForm"].resetFields();
          } else {
            Login(param).then( response => {
              if(response.data.resCode === 0) {
                root.$router.push({
                  name: 'Console'
                })
              }
            })
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    // 获取验证码
    const getCode = () => {
      if (ruleForm.username === "") {
        root.$message.error("邮箱不能为空！");
        return false;
      }

      if (validateEmail(ruleForm.username)) {
        root.$message.error("用户名格式错误！");
        return false;
      }

      const params = {
        module: model.value,
        username: ruleForm.username
      };

      // 修改验证码按钮状态
      codeBtnStatus.type = true
      codeBtnStatus.text = '发送中...'

      setTimeout(() => {
        getSms(params)
          .then(response => {
            let data = response.data;
            root.$message({
              message: data.message,
              type: "success"
            });

            // 启用登陆注册按钮
            loginBtnStatus.value = false
            // 调用定时器 倒计时
            countDown(5)
          })
          .catch(error => {
            console.log(error);
          });
      }, 5000);
    };

    /**
     * 倒计时
     */
    const countDown = ((time) => {
      // 判断定时器是否存在 存在则清除
      if (timer.value) { clearInterval(timer.value) }
      /**
       * setTimeout  只执行一次
       * setInterval 不断执行，需要条件进行结束
       */
      
      timer.value = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(timer.value)
          codeBtnStatus.type = false
          codeBtnStatus.text = `再次发送`
        }else {
          codeBtnStatus.text = `倒计时${time}秒`
        }
      }, 1000);
    })

    /**
     * 所有按钮还原为初始状态
     */
    const resetBtn = (() => {
      clearInterval(timer.value)
      // 按钮状态
      codeBtnStatus.type = false
      codeBtnStatus.text = '获取验证码'
      loginBtnStatus.value = true
      // 重置表单
      refs["ruleForm"].resetFields();
    })

    /**
     * 挂载完事件
     */
    onMounted(() => {});

    return {
      navBas,
      model,
      ruleForm,
      rules,
      changeNav,
      submitForm,
      getCode,
      loginBtnStatus,
      codeBtnStatus,
      timer
    };
  }
};
</script>

<style lang="scss">
.el-form {
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-form-item__label {
    font-size: 14px;
    font-family: "Microsoft YaHei";
    color: rgb(238, 238, 238);
    padding: 0px;
  }
  .verification-code-box {
    display: flex;
    flex-wrap: nowrap;
    .verification-code-btn {
      margin-left: 20px;
    }
  }
  .sub-btn-item {
    margin-top: 30px;
    .el-button {
      width: 100%;
    }
  }
}
</style>

<style scoped lang="scss">
#login {
  width: 100%;
  height: 100vh;
  background-color: #344a5f;

  display: flex;
  justify-content: center;
  align-items: center;
  .login-wamp {
    width: 330px;
    .nav-bars {
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      text-align: center;
      .nav-bar {
        width: 90px;
        line-height: 36px;
        cursor: pointer;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        color: rgb(255, 255, 255);
        margin-bottom: 20px;
        &.active {
          border-radius: 2px;
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}
</style>
