<template>
  <div class="container">
    <div class="login-content">
      <div class="picture">
        <img src="@/assets/img/work.png" alt="登录插图" />
      </div>
      <div class="form">
        <div class="login-form">
          <h3 class="title">欢迎回来！</h3>
          <span class="sub-title">请输入账号信息</span>
          <form>
            <div class="field">
              <input type="text" placeholder="" v-model="formData.username" />
              <div class="placeholder" data-placeholder="邮箱"></div>
            </div>
            <div class="field password-field">
              <input
                :type="isPasswordVisible ? 'text' : 'password'"
                placeholder=""
                v-model="formData.password"
              />
              <div class="placeholder" data-placeholder="密码">
                <PasswordVisibilityToggle
                  class="password-toggle-icon"
                  :visible="isPasswordVisible"
                  @toggle="isPasswordVisible = !isPasswordVisible"
                />
              </div>
            </div>
            <div class="captcha">
              <div class="field captcha-input">
                <input
                  type="text"
                  placeholder=""
                  maxlength="4"
                  v-model="formData.captcha"
                  @keypress.enter="submitForm"
                />
                <div class="placeholder" data-placeholder="验证码"></div>
              </div>
              <div class="captcha-image">
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
              登录
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
      title: "登录成功",
      description: "欢迎回来，你已成功登录账号。",
    });
    let loginSuccessUrl = route.query.redirect || "/console/dashboard";
    router.replace({
      path: loginSuccessUrl,
    });
  } catch (error) {
    toast({
      title: "登录失败",
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
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
  background-color: #f8f6f7;

  .login-content {
    width: min(900px, 100%);
    min-height: 580px;
    display: flex;
    background-color: #fff;
    justify-content: center;
    align-items: stretch;
    border-radius: 10px;
    box-shadow: 0 6px 10px #cfd4de;
    overflow: hidden;
    padding: 6px;
    box-sizing: border-box;

    .picture {
      width: 50%;
      min-height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      img {
        width: min(300px, 80%);
        height: auto;
        aspect-ratio: 1 / 1;
      }

      &::after {
        content: "";
        position: absolute;
        top: 96px;
        right: 0;
        width: 1px;
        bottom: 96px;
        background-color: #ececec;
      }
    }

    .form {
      width: 50%;
      min-height: 100%;

      .login-form {
        width: min(360px, 100%);
        min-height: 100%;
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
          margin: 50px 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 28px;

          .field {
            position: relative;

            input {
              width: 100%;
              height: 36px;
              border: none;
              box-sizing: border-box;
              border-bottom: 1px solid #333;
              padding: 0 35px 0 0;
              fill: none;
              font-size: 14px;
              background: transparent;

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

          .password-field {
            .password-toggle-icon {
              width: 35px;
              height: 100%;
              position: absolute;
              right: 0;
              pointer-events: all;
              z-index: 2;
            }
          }

          .captcha {
            display: grid;
            grid-template-columns: minmax(110px, 42%) 1fr;
            align-items: end;
            gap: 12px;
            width: 100%;

            .captcha-input {
              min-width: 0;

              input {
                padding-right: 0;
              }
            }

            .captcha-image {
              width: 100%;

              img {
                width: 100%;
                height: 30px;
                display: block;
                border-radius: 4px;
                object-fit: cover;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 980px) {
  .container {
    padding: 16px;

    .login-content {
      min-height: 520px;

      .picture {
        img {
          width: min(240px, 78%);
        }
      }

      .form .login-form {
        width: min(340px, 100%);
        padding: 40px 24px 24px;
      }
    }
  }
}

@media (max-width: 768px) {
  .container {
    align-items: stretch;
    padding: 12px;

    .login-content {
      min-height: 100%;
      flex-direction: column;
      padding: 0;
      border-radius: 14px;

      .picture {
        width: 100%;
        min-height: 180px;
        padding: 20px 0 6px;

        img {
          width: min(220px, 56%);
        }

        &::after {
          display: none;
        }
      }

      .form {
        width: 100%;
        min-height: auto;

        .login-form {
          width: 100%;
          min-height: auto;
          padding: 24px 20px 30px;

          .title {
            font-size: 20px;
          }

          form {
            margin: 26px 0;
            gap: 22px;

            .field input {
              height: 40px;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0;
    background-color: #fff;

    .login-content {
      min-height: 100dvh;
      border-radius: 0;
      box-shadow: none;

      .picture {
        min-height: 140px;
        padding-top: 16px;

        img {
          width: min(170px, 46%);
        }
      }

      .form .login-form {
        padding: 32px;

        form {
          margin: 0px 0 60px;
        }
      }
    }
  }
}
</style>
