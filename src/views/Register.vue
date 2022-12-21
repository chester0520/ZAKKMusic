<template lang="pug">
#Register
  .container.flex.justify-center.items-center(style='width: 100%;height: 70vh;')
    .q-pa-md(style='width: 400px;height: 600px;')
      q-form.q-gutter-md(@submit='submit')
        h4.text-center 會員註冊
        q-input(filled v-model="form.account" label="請輸入信箱" :error="!isValid" error-message="信箱格式錯誤" bottom-slots)
        q-input(filled v-model="form.password" label="請輸入密碼" type="password" :rules="[ val => val.length >= 4 && val.length <= 10 || '密碼必須 4 個字以上 或 10個字以下']")
        q-input(filled v-model="form.name" label="請輸入姓名" :rules="[ val => val.length > 1 || '姓名最少兩個字']")
        q-input(filled v-model="form.phone" label="請輸入電話" :rules="[ val => val.length === 10 || '電話最多或最少 10 個字']")
        q-input(filled v-model="form.address" label="請輸入地址" :rules="[ val => val.length > 0 || '請填入地址']")
        p
          | 已經有會員嗎?
          router-link(to='/login') 登入
        q-btn(label="註冊" type="submit" color="negative")
</template>

<script>
import isEmail from 'validator/es/lib/isEmail'

export default {
  data () {
    return {
      form: {
        account: '',
        password: '',
        name: '',
        phone: '',
        address: ''
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
        await this.axios.post('/users', this.form)
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '註冊成功'
        })
        this.$router.push('/login')
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
