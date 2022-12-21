<template lang="pug">
#Login
  .container.flex.justify-center.items-center(style='width: 100%;height: 70vh;')
    .q-pa-md(style='width: 400px;height: 400px;')
      q-form.q-gutter-md(@submit='submit')
        h4.text-center 會員登入
        q-input(filled v-model="form.account" label="請輸入信箱" :error="!isValid" error-message="信箱格式錯誤" bottom-slots)
        q-input(filled v-model="form.password" label="請輸入密碼" type="password" :rules="[ val => val.length >= 4 || '密碼必須 4 個字以上', val => val.length <= 10 || '密碼必須 10 個字以下']")
        p
          | 還沒有會員嗎?
          router-link(to='/register') 註冊
        q-btn(label="登入" type="submit" color="negative")
</template>

<script>
import isEmail from 'validator/es/lib/isEmail'

export default {
  data () {
    return {
      form: {
        account: '',
        password: ''
      }
    }
  },
  computed: {
    isValid () {
      const account = this.form.account
      return account.length === 0 ? null : isEmail(account)
    }
  },
  methods: {
    async submit () {
      try {
        const { data } = await this.axios.post('/users/login', this.form)
        this.$swal({
          icon: 'success',
          title: '登入成功',
          text: '歡迎光臨'
        })
        this.$store.commit('login', data)
        this.$router.push('/')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '失敗',
          text: error.response.data.message
        })
      }
    }
  }
}
</script>
