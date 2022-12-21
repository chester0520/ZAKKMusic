<template lang="pug">
#Service
  .q-pa-md
    .row
      h4 聯絡客服
    .row
      .col
        q-form.q-gutter-md(@submit='submit')
          .row
            .col-2
              p.q-pr-xl.text-right 姓名
            .col-4
              q-input(filled v-model="form.name" :rules="[ val => val.length > 0 || '姓名不能為空']")
          .row
            .col-2
              p.q-pr-xl.text-right 電話
            .col-4
              q-input(filled v-model="form.phone" :rules="[ val => val.length === 10 || '電話最多或最少 10 個字']")
          .row
            .col-2
              p.q-pr-xl.text-right 信箱
            .col-4
              q-input(filled v-model="form.email" :error="!isValid" error-message="信箱格式錯誤" bottom-slots)
          .row
            .col-2
              p.q-pr-xl.text-right 內容
            .col-8
              q-input(filled v-model="form.text" type="textarea" :rules="[ val => val.length > 0 || '內容不能為空']")
          .row
            .col-2
            .col-8
              q-btn(label="送出" type="submit" color="negative")
</template>

<script>
import isEmail from 'validator/es/lib/isEmail'

export default {
  name: 'Service',
  data () {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        text: ''
      }
    }
  },
  methods: {
    submit () {
      this.form = {
        name: '',
        phone: '',
        email: '',
        text: ''
      }
    }
  },
  computed: {
    isValid () {
      const email = this.form.email
      return email.length === 0 ? null : isEmail(email)
    }
  }
}
</script>
