<template>
  <div class="login-page">
    <div class="container">
      <header>
        <div class="img-wrapper">
          <img :src="require('../assets/img/milogo.png')" alt="logo">
        </div>
        <p class="header-title">小米账号登录</p>
      </header>
      <div class="input-container-phone" v-if="loginUsePhone">
        <div class="form-input phone-number">
          <span class="phone-area">+86</span>
          <input class="phone-number-input" placeholder="手机号码" type="text" v-model="phoneInput">
        </div>
        <div class="form-input sms-number">
          <input type="text" class="sms-number-input" placeholder="短信验证码" v-model="smsInput">

          <template>
            <button
              class="sms-btn"
              :class="[{display: smsKey}]"
              @click="getSMS(phoneInput)"
            >{{ smsMsg }}</button>
          </template>
        </div>
        <div class="error-tip" v-if="isFieldError">
          <em class="error-icon"></em>
          <p>{{ errorTip }}</p>
        </div>
      </div>
      <div class="input-container-name" v-else></div>
      <div class="submit-container">
        <button class="first" type="button" @click="loginByPhone(smsInput)">立即登录/注册</button>
        <button class="second" type="button" @click="loginByName">用户名密码登录</button>
      </div>

      <div class="other-login">
        <p class="title">其他方式登录</p>
        <div class="other-links">
          <div class="login-type" v-for="(loginType, loginIndex) in 3" :key="loginIndex">
            <i class="login-icon"></i>
          </div>
        </div>
      </div>
      <div class="copyright">
        <span>简体</span>
        <span>繁体</span>
        <span>English</span>
        <span>常见问题</span>
        <span>隐私政策</span>
      </div>
    </div>
  </div>
</template>
<script>
const SMSMSG = "获取验证码",
  RESENDMSG = "${smsTime}秒后重发",
  RESENDTIME = 60;
import { mapActions, mapGetters } from "vuex";
import { validatePhone, validateSMS } from "@/utils/utils";
import { getCartList } from "@/utils/api";
export default {
  name: "Login",
  data() {
    return {
      phoneInput: "",
      smsInput: "",
      userPhone: "",
      errorTip: "",
      smsMsg: SMSMSG,
      resendTime: RESENDTIME,
      smsKey: false,
      isFieldError: false,
      loginUsePhone: true,
      phoneErrMsg: "请输入手机号码",
      smsErrMsg: "请输入短信验证码"
    };
  },
  computed: {
    ...mapGetters(["loginUserName", "loginUserToken"])
  },
  methods: {
    ...mapActions(["login"]),
    /**
     * 获取验证码
     * @param { String } phone 手机号码
     */
    getSMS(phone) {
      if (!phone) {
        this.isFieldError = true;
        this.errorTip = "手机号码不能为空";
      } else {
        if (!validatePhone(phone)) {
          this.isFieldError = true;
          this.errorTip = "手机号码格式不对";
        } else {
          this.smsMsg = RESENDMSG.replace("${smsTime}", this.resendTime);
          this.smsKey = true;
          const smsTime = setInterval(() => {
            this.resendTime--;
            this.smsMsg = RESENDMSG.replace("${smsTime}", this.resendTime);
            if (this.resendTime === 0) {
              this.resendTime = RESENDTIME;
              this.smsMsg = SMSMSG;
              this.smsKey = false;
              clearInterval(smsTime);
            }
          }, 1000);
          this.isFieldError = false;
          this.userPhone = this.phoneInput;
          this.$notify({
            message: "验证码输入111111",
            background: "#10ef83"
          });
        }
      }
    },
    /**
     * 通过手机号登录
     * @param { String } userPhone 用户手机号码
     * @param { String } sms 短信验证码
     */
    loginByPhone(sms) {
      if (!sms) {
        this.isFieldError = true;
        this.errorTip = "短信验证码不能为空";
      } else {
        if (!validateSMS(sms)) {
          this.isFieldError = true;
          this.errorTip = "短信验证码不对";
        } else {
          this.isFieldError = false;
          this.userPhone = this.phoneInput;
          this.$store
            .dispatch("login", { userName: this.userPhone, sms: sms })
            .then(res => {
              res = res.data;
              if (res.result.status) {
                this.$notify({
                  message: "登录成功,正在重定向",
                  background: "#1eeda1",
                  duration: 2000
                });
                getCartList({
                  userName: this.loginUserName,
                  token: this.loginUserToken
                })
                  .then(res => {
                    if (JSON.stringify(res) !== "{}") {
                      this.$store.dispatch("initCart", res.cartList);
                    }
                  })
                  .catch(err => {
                    this.$notify({
                      message: "获取购物车信息失败!"
                    });
                  });
                setTimeout(() => {
                  this.$router.push({
                    path: "/"
                  });
                }, 2000);
              } else {
                this.$notify({
                  message: "账号或密码有误",
                  background: "#c30000"
                });
              }
            })
            .catch(err => {
              this.$notify({
                message: "请检查你的网络",
                background: "#c30000"
              });
            });
        }
      }
    },
    /**
     * 通过用户名登录
     */
    loginByName() {}
  }
};
</script>
<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
}
.container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}
header {
  height: 140px;
  margin-bottom: 30px;
  text-align: center;
  img {
    width: 70px;
    height: 70px;
  }
  .header-title {
    font-size: 25px;
  }
}

.input-container-phone {
  padding-bottom: 40px;
  .form-input {
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #cccccc;
  }
  .phone-area {
    position: relative;
    font-size: 25px;
    color: #cccccc;
    vertical-align: middle;
    &::after {
      content: "";
      position: relative;
      margin-left: 10px;
      display: inline-block;
      width: 10px;
      height: 10px;
      border-right: 2px solid #cccccc;
      border-top: 2px solid #cccccc;
      transform: rotate(45deg);
      vertical-align: middle;
    }
  }
  .phone-number-input {
    float: right;
    width: 80%;
    font-size: 25px;
    border: none;
  }
  .sms-number-input {
    width: 70%;
    font-size: 25px;
    border: none;
  }
  .sms-btn {
    font-size: 20px;
    color: #0099ff;
    background: transparent;
    border: none;
  }

  .error-tip {
    margin-top: 10px;
    font-size: 20px;
    color: #f66;
    .error-icon {
      display: inline-block;
      width: 25px;
      height: 25px;
      background: url("../assets/img/err-info.svg") no-repeat center center;
      background-size: cover;
      vertical-align: middle;
    }
    p {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
.submit-container {
  button {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    outline: none;
  }
  button.first {
    margin-bottom: 20px;
    font-size: 25px;
    color: #ffffff;
    background-color: #ff6700;
    border: none;
  }
  button.second {
    font-size: 25px;
    background-color: #ffffff;
    border: 1px solid #cccccc;
  }
}

.other-login {
  margin-top: 60px;
  text-align: center;
  p {
    color: #cccccc;
    vertical-align: middle;
    &::before,
    &::after {
      content: "";
      margin: 0 10px;
      display: inline-block;
      width: 30%;
      height: 1px;
      background-color: #cccccc;
      vertical-align: middle;
    }
  }

  .other-links {
    width: 100%;
    height: 40px;
    .login-type {
      position: relative;
      display: inline-block;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      &:nth-of-type(2) {
        margin: 0 40px;
      }
      .login-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        width: 29px;
        height: 29px;
        background: url("../assets/img/login_icons_type.png") no-repeat;
      }
      &:nth-of-type(1) {
        background-color: #ed9090;
        .login-icon {
          background-position: -46px 0;
        }
      }
      &:nth-of-type(2) {
        background-color: #6bb6ea;
        .login-icon {
          background-position: -76px 0;
        }
      }
      &:nth-of-type(3) {
        background-color: #00be00;
        .login-icon {
          background-position: -112px 0;
        }
      }
    }
  }
}

.copyright {
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: space-around;
  width: 100%;
}
</style>
