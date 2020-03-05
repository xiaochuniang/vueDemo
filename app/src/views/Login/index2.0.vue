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
        <el-form-item label="邮箱" prop="userName">
          <el-input v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input
            v-model="ruleForm.passWord"
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
          <el-input v-model="ruleForm.checkPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="Code">
          <div class="verification-code-box">
            <el-input
              class="verification-code-input"
              minlength="6"
              maxlength="6"
              v-model="ruleForm.Code"
              autocomplete="off"
            ></el-input>
            <el-button class="verification-code-btn" type="success"
              >获取验证码</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="" class="sub-btn-item">
          <!-- <el-button type="danger" disabled v-if="isDisable == false"
            >登陆</el-button
          > -->
          <el-button type="danger" @click="submitForm('ruleForm')"
            >登陆</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  stripscript,
  validateEmail,
  validatePass,
  validateVCode
} from "../../assets/js/rule.js";
export default {
  name: "login",
  data() {
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
      this.ruleForm.passWord = stripscript(value);
      value = this.ruleForm.passWord;

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
      if (this.model == "login") {
        callback();
      }
      // 过滤后的字符串
      this.ruleForm.checkPwd = stripscript(value);
      value = this.ruleForm.checkPwd;

      if (value == "") {
        callback(new Error("请输入密码"));
      } else if (value != this.ruleForm.passWord) {
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

    return {
      navBas: [
        { txt: "登陆", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" }
      ],
      model: "login",
      isDisable: false,
      ruleForm: {
        userName: "",
        passWord: "",
        checkPwd: "",
        Code: ""
      },
      rules: {
        userName: [{ validator: validateUsername, trigger: "blur" }],
        passWord: [{ validator: validatePassword, trigger: "blur" }],
        checkPwd: [{ validator: validateCheckpwd, trigger: "blur" }],
        Code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    changeNav(data) {
      this.navBas.forEach((item, index) => {
        item.current = false;
      });

      data.current = true;
      this.model = data.type;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
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
