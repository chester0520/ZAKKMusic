<template lang="pug">
#Product
  .container
    q-inner-loading.loading(:showing="!sell" style="z-index: 999;")
      h1 已下架
    q-breadcrumbs.q-my-lg
      q-breadcrumbs-el(icon="home" to="/")
      q-breadcrumbs-el(label="商品列表" to="/productlist")
      q-breadcrumbs-el(:label="name")
    .row.q-pa-md
      .col-6.productimg
        q-img(:src="image" style="width: 400px;")
      .col-6
        h4 {{ name }}
        .text-subtitle2 售價
        .text-subtitle1.productPrice NT${{ price }}
        q-form.q-mt-md.q-gutter-md.text-right(@submit='submit' @reset="reset")
          p.text-left 商品數量
          q-input.productAmount(outlined v-model.number="amount" type="number" :rules="[ val => val > 0 || '數量至少一個']")
            //- template(v-slot:prepend)
            //-   q-btn(dense flat icon="remove" @click="amountpre")
            //- template(v-slot:append)
            //-   q-btn(dense flat icon="add" @click="amountadd")
          q-btn(@click="addcart" color="negative") 加入購物車
    .row.q-pa-md
      q-card.introduction(style="width: 100%;")
        q-tabs.text-grey(v-model='tab' dense active-color='negative' indicator-color='negative' align='justify' narrow-indicator)
          q-tab(name='mails' label='商品介紹')
          q-tab(name='alarms' label='規格說明')
          q-tab(name='movies' label='運送方式')
        q-tab-panels(v-model='tab' animated)
          q-tab-panel(name='mails')
            | {{ description }}
          q-tab-panel(name='alarms')
            | {{ description }}
          q-tab-panel(name='movies')
            | {{ description }}
    .row.q-pa-md
      h5 相關商品
      .row.justify-center
        .col-3(v-for="card in cards" :key="card._id")
          router-link(:to="'/'+card._id")
            q-card.q-mx-md.q-mb-xl.q-pa-md.aboutProduct
              q-card-section(style="height: 70%;")
                q-img(:src='card.image')
              q-card-section.text-center(style="height: 30%;")
                .text-subtitle1 {{ card.name }}
                .text-subtitle2 NT${{ card.price }}
</template>

<script>
export default {
  name: 'Product',
  data () {
    return {
      tab: 'mails',
      name: '',
      price: '',
      description: '',
      image: '',
      sell: true,
      amount: 1,
      cards: []
    }
  },
  methods: {
    async addcart () {
      if (this.$store.state.jwt.token.length === 0) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請先登入'
        })
        return
      }
      try {
        await this.axios.post('/users/cart', { product: this.$route.params.id, amount: this.amount, check: false }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '加入購物車成功'
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '加入購物車失敗'
        })
      }
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/products/' + this.$route.params.id)
      this.name = data.result.name
      this.price = data.result.price
      this.description = data.result.description
      this.image = `${process.env.VUE_APP_API}/files/${data.result.image}`
      this.sell = data.result.sell
      this.cards = data.result2.map(card => {
        if (card.image) {
          card.image = `${process.env.VUE_APP_API}/files/${card.image}`
        }
        return card
      })
      document.title = `${this.name} | 購物網`
    } catch (error) {
      this.$router.push('/')
    }
  }
}
</script>
