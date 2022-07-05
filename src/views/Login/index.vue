<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <!-- ref自定义事件可以获取到表单内的所有数据 -->
    <van-form @submit="onSubmit" ref="from">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
      >
        <!-- 利用插槽定义字体图标 -->
        <template #left-icon> <TouTiaoIcon icon="shouji" /> </template>
      </van-field>
      <van-field
        v-model="user.code"
        type="number"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
        required
        maxlength="6"
      >
        <!-- 利用插槽定义字体图标 -->
        <!-- 而且要放在template里面 -->
        <template #left-icon> <TouTiaoIcon icon="yanzhengma" /> </template>
        <!--获取验证码 native-type="button"设置不跳转 -->
        <template #button>
          <van-count-down
            @finish="isShowTime = false"
            v-if="isShowTime"
            :time="8000"
            format="ss s"
          />
          <van-button
            v-else
            native-type="button"
            class="send-sms-btn"
            size="small"
            @click="shendGetCode"
            :loading="isDisabled"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmscode } from "@/api/user.js";
import { Toast } from "vant";
export default {
  name: "LogonPage",
  data() {
    return {
      isShowTime: false, //倒计时是否展示
      isDisabled: false,
      user: {
        mobile: "13911111112",
        code: "246810",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "请输入手机号",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码错误",
          },
        ],
      },
    };
  },
  methods: {
    // values取什么名字都行，获取上面的账户密码值
    // 获取到的值是对象：key >>是表单name值 value>>是用户输入的值
    async onSubmit() {
      try {
        const res = await login(this.user);
        console.log(res);
        Toast.success("登陆成功");
      } catch (e) {
        console.log(e);
        Toast.fail(e?.response?.data.message);
      }
    },
    // async  判断await后面的parmis是否成功执行,成功就继续执行下一步
    async shendGetCode() {
      // vant验证表单，支持传入 name 来验证单个或部分表单项
      //   此处效验表单的格式是否合格
      try {
        await this.$refs.from.validate("mobile");
      } catch (e) {
        console.log(e);
        return;
      }
      //   此处效验服务器返回来的错误
      try {
        // 发送期间让按钮变灰
        this.isDisabled = true;
        await getSmscode(this.user.mobile);
        this.isShowTime = true;
        this.$toast.success("发送验证码成功");
      } catch (e) {
        this.$toast.fail(e?.response?.data?.message || "出错了");
        // this.isShowTime = false;
      } finally {
        // 不管成功还是失败都会执行的逻辑
        this.isDisabled = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .TouTiaoIcon {
    font-size: 37px;
  }
}
.van-button--small {
  width: 2.4111rem;
  height: 0.6rem;
  line-height: 0.6rem;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
</style>
