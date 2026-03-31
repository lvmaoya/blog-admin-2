<template>
  <div class="container">
    <div class="login-content">
      <div class="picture">
        <img src="@/assets/img/work.png" alt="login" />
      </div>
      <div class="form">
        <div class="login-form">
          <h3 class="title">Welcome back!</h3>
          <span class="sub-title">Please enter your details</span>
          <form>
            <div>
              <input type="text" placeholder="" v-model="formData.username" />
              <div class="placeholder" data-placeholder="Email"></div>
            </div>
            <div>
              <input
                :type="isPasswordVisible ? 'text' : 'password'"
                placeholder=""
                v-model="formData.password"
              />
              <div class="placeholder" data-placeholder="Password">
                <PasswordVisibilityToggle
                  class="password-toggle-icon"
                  :visible="isPasswordVisible"
                  @toggle="isPasswordVisible = !isPasswordVisible"
                />
              </div>
            </div>
            <div class="captcha">
              <input
                type="text"
                placeholder=""
                maxlength="4"
                v-model="formData.captcha"
                @keypress.enter="submitForm"
              />
              <div class="placeholder" data-placeholder="Captcha"></div>
              <div>
                <img
                  v-if="authCodeUrl"
                  :src="authCodeUrl"
                  @click="getCodeData"
                />
              </div>
            </div>
          </form>

          <div class="w-full">
            <Button class="w-full" @click="submitForm" :disabled="loading">
              <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
              Log in
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { login } from "@/service/login";
import { onMounted, reactive, ref } from "vue";
import { setCache, deleteCache } from "@/utils/cache";
import { useRouter, useRoute } from "vue-router";
import { BASE_API } from "@/service/common/axiosInstance.js";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-vue-next";
import { useToast } from "@/components/ui/toast/use-toast";
import PasswordVisibilityToggle from "@/components/password-visibility-toggle/index.vue";
const router = useRouter();
const route = useRoute();
let formData = reactive({
  username: "",
  password: "",
  captcha: "",
});
const isPasswordVisible = ref(false);

let authCodeUrl = ref("");

// 获取登陆验证码
const getCodeData = async () => {
  const response = await axios.get(BASE_API + "/captcha", {
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "image/png",
      "access-control-allow-credentials": true,
    },
  });
  const base64 = btoa(
    new Uint8Array(response.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      "",
    ),
  );
  authCodeUrl.value = `data:image/png;base64,${base64}`;
};
const loading = ref(false);
const { toast } = useToast();

// 提交登录
const submitForm = async () => {
  loading.value = true;
  try {
    const loginRes = await login(formData);
    const token = loginRes.token;
    setCache("token", token);
    setCache("user", loginRes.user);
    toast({
      title: "Uh! Login Success!",
      description:
        "Welcome back! You have successfully logged into your account.",
    });
    let loginSuccessUrl = route.query.redirect || "/console/dashboard";
    router.replace({
      path: loginSuccessUrl,
    });
  } catch (error) {
    toast({
      title: "Uh oh! Something went wrong.",
      description: error.response.data,
      variant: "destructive",
    });
    console.error(error);
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  getCodeData();
  deleteCache("token");
});
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f6f7;

  .login-content {
    width: 900px;
    height: 580px;
    display: flex;
    background-color: rgb(255, 255, 255);
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 6px 10px #cfd4de;
    overflow: hidden;
    padding: 6px;
    box-sizing: border-box;

    .picture {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      img {
        width: 300px;
        height: 300px;
      }

      &::after {
        content: "";
        position: absolute;
        top: 100px;
        right: 0;
        width: 1px;
        bottom: 100px;
        background-color: #ececec;
      }
    }

    .form {
      width: 50%;
      height: 100%;

      .login-form {
        width: 340px;
        height: 100%;
        margin: 0 auto;
        user-select: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 50px 30px 30px 30px;
        box-sizing: border-box;
        background-color: white;
        border-radius: 10px;

        .title {
          font-size: 22px;
          margin: 10px 0;
          font-weight: 600;
        }

        .sub-title {
          font-size: 14px;
          color: #999;
          text-align: center;
        }

        form {
          margin: 60px 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 40px;

          & > div {
            position: relative;

            &:nth-child(2n) {
              .placeholder .password-toggle-icon {
                width: 35px;
                height: 100%;
                position: absolute;
                right: 0;
                pointer-events: all;
                z-index: 2;
              }
            }

            input {
              width: 100%;
              height: 30px;
              border: none;
              box-sizing: border-box;
              border-bottom: 1px solid #333;
              padding: 0px 35px 0px 0px;
              fill: none;

              &:focus {
                border: none;
                border-bottom: 1px solid #333;
                outline: none;
              }
            }

            input:focus + .placeholder::before {
              transform: scale(0.75) translateY(-30px);
              color: #333;
            }

            input:not(:placeholder-shown) + .placeholder::before {
              transform: scale(0.75) translateY(-30px);
            }

            .placeholder {
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              right: 0;
              z-index: 1;
              pointer-events: none;

              &::before {
                content: attr(data-placeholder);
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                display: flex;
                color: #666;
                align-items: center;
                transform: scale(1);
                transform-origin: left center;
                transition: all 0.15s linear;
              }
            }
          }

          .captcha {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            width: 100%;

            input {
              width: 40%;
            }

            & > div {
              width: 60%;

              img {
                width: 100%;
                height: 30px;
                display: block;
              }
            }
          }
        }
      }
    }
  }
}
</style>
