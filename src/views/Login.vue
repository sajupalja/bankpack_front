<template>
  <div class="login">
    <v-container class="login-form-container">
      <h1 class="login-header">로그인</h1>
      <v-text-field
        class="text-field id-text-field"
        label="id"
        solo
        hide-details
      ></v-text-field>
      <v-text-field
        class="text-field password-text-field"
        label="password"
        solo
        hide-details
      ></v-text-field>
      <v-btn
        class="login-btn"
        elevation="2"
        block
      >
        로그인
      </v-btn>
      <v-btn
        class="test-login-btn"
        outlined
        block
      >
        테스트 로그인
      </v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
}
</script>

<style scoped>
  .login {
    display: flex;
    flex-direction: column;
    background-color: var(--background);
    height: 92vh;
    padding-top: 20vh;
  }

  .login-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .id-text-field {
    margin-bottom: 10px !important;
  }

  .password-text-field {
    margin-bottom: 20px !important;
  }

  .login-btn {
    background-color: var(--primary) !important;
    color: white;
    margin-bottom: 10px;
  }

  .test-login-btn {
    color: gray;
  }
</style>