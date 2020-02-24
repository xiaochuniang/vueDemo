<template>
  <div id="login">
    <div class="login-wamp">
      <div class="nav-bars">
        <div
          :class="['nav-bar', { active: isActive === index }]"
          v-for="(nav, index) in navBas"
          :key="index"
          @click="isActive = index"
        >
          {{ nav.txt }}
        </div>
      </div>

      <!-- 表单 -->
      <el-form ref="form" label-position="top">
        <el-form-item label="邮箱">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <div class="verification-code-box">
            <el-input class="verification-code-input"></el-input>
            <el-button class="verification-code-btn" type="success"
              >获取验证码</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="" class="sub-btn-item">
          <el-button type="danger" disabled v-if="isDisable == false">登陆</el-button>
          <el-button type="success" v-else>登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      navBas: [
        { index: 0, txt: "登陆" },
        { index: 1, txt: "注册" }
      ],
			isActive: 0,
			isDisable: false
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.el-form {
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
	.sub-btn-item{
		margin-top: 20px;
		.el-button{
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
