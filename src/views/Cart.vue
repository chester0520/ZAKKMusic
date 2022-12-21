<template lang="pug">
#Cart
  .container
    .row(bordered)
      .col.text-right
        h4.text-left 購物車
        q-table(flat bordered :data="cart" :columns="columns" row-key="name" :pagination.sync="pagination" hide-pagination)
          template(v-slot:body-cell-image="props")
            q-td(:props="props")
              img(:src="props.row.image" style="height: 50px")
          template(v-slot:body-cell-amount="props")
            q-td(:props="props")
              q-input(v-model="props.row.amount" type="number" :rules="[ val => val > 0 || '數量至少一個']")
          template(v-slot:body-cell-action="props")
            q-td(:props="props")
              q-btn(icon="clear" color="primary" @click="delProduct(props.rowIndex)")
        .row.justify-center.q-mt-md
          q-pagination(v-model="pagination.page" :max="pagesNumber" color="grey-8" size="sm")
        p 總金額{{ totalprice }}
        q-btn(label="確定購買" color="primary" @click="checkout")
</template>

<script>
export default {
  name: 'Cart',
  data () {
    return {
      cart: [],
      columns: [
        { name: 'image', field: 'image', align: 'center', label: '圖片' },
        { name: 'name', field: 'name', align: 'center', label: '名稱' },
        { name: 'price', field: 'price', align: 'center', label: '單價' },
        { name: 'amount', field: 'amount', align: 'center', label: '數量' },
        { name: 'action', field: 'action', align: 'center', label: '操作' }
      ],
      pagination: {
        sortBy: 'image',
        descending: false,
        page: 1,
        rowsPerPage: 5
      }
    }
  },
  methods: {
    async delProduct (index) {
      try {
        await this.axios.patch('/users/cart', { product: this.cart[index]._id, amount: 0 }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.cart.splice(index, 1)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '刪除商品失敗'
        })
      }
    },
    async checkout () {
      try {
        await this.axios.post('/users/checkout', {}, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '感謝購買'
        })
        this.$router.push('/userinfo/order')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '結帳失敗'
        })
      }
    }
  },
  computed: {
    pagesNumber () {
      return Math.ceil(this.cart.length / this.pagination.rowsPerPage)
    },
    totalprice () {
      return this.cart.length === 0 ? 0 : this.cart.reduce((accumulator, currentValue) => accumulator + (currentValue.amount * currentValue.price), 0)
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/users/cart', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
      this.cart = data.result.map(item => {
        item = { ...item.product, amount: item.amount }
        item.image = `${process.env.VUE_APP_API}/files/${item.image}`
        item.edit = false
        item.amountModel = item.amount
        return item
      })
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得購物車失敗'
      })
    }
  }
}
</script>
