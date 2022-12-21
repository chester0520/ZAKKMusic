<template lang="pug">
#Personal
  .q-pa-md
    h4 個人資料
    .row
      .col.q-mx-xl
        q-form.q-gutter-md(@submit='submit')
          .row
            .col-2
              p.q-pr-xl.text-right 帳號
            .col-4
              q-input(outlined readonly v-model="form.account")
          .row
            .col-2
              p.q-pr-xl.text-right 姓名
            .col-4
              q-input(outlined v-model="form.name" :rules="[ val => val.length > 0 || '姓名不能為空']")
          .row
            .col-2
              p.q-pr-xl.text-right 電話
            .col-4
              q-input(outlined v-model="form.phone" :rules="[ val => val.length === 10 || '電話最多或最少 10 個字']")
          .row
            .col-2
              p.q-pr-xl.text-right 地址
            .col-4
              q-input(outlined v-model="form.address" :rules="[ val => val.length > 0 || '地址不能為空']")
          .row
            .col-2
            .col-4
              q-btn.q-my-lg(color="primary" label="確認修改" type="negative")
</template>

<script>
export default {
  name: 'personal',
  data () {
    return {
      form: {
        account: '',
        name: '',
        phone: '',
        address: '',
        _id: ''
      }
    }
  },
  methods: {
    async submit () {
      try {
        const { data } = await this.axios.patch('/users/' + this.form._id, this.form, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.form.name = data.result.name
        this.form.phone = data.result.phone
        this.form.address = data.result.address
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '修改個人資料'
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/users', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
      this.form.account = data.result.account
      this.form.name = data.result.name
      this.form.phone = data.result.phone
      this.form.address = data.result.address
      this.form._id = data.result._id
    } catch (error) {
      console.log(error)
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得個人資料失敗'
      })
    }
  }
}
</script>
