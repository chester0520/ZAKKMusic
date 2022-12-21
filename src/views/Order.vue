<template lang="pug">
#Order
  .q-pa-md
    .row
      h4 訂單查詢
    .row
      .col
        q-table.q-mx-xl.q-mb-xl(flat bordered :data="orders" :columns="columns" row-key="name" :pagination.sync="pagination" hide-pagination)
          template(v-slot:body-cell-products="props")
            q-td(:props="props")
              ul
                li(v-for="product in props.row.products") {{ product.product.name }} * {{ product.amount }}
</template>

<script>
export default {
  name: 'Order',
  data () {
    return {
      orders: [],
      columns: [
        { name: '_id', field: '_id', align: 'center', label: '訂單編號' },
        { name: 'date', field: 'date', align: 'center', label: '訂購日期' },
        { name: 'products', field: 'products', align: 'center', label: '商品' }
      ],
      pagination: {
        sortBy: 'order',
        descending: false,
        page: 1,
        rowsPerPage: 10
      }
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/orders', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
      this.orders = data.result.map(order => {
        order.date = new Date(order.date).toLocaleDateString()
        for (const product in order.products) {
          order.products[product].product.image = `${process.env.VUE_APP_API}/files/${order.products[product].product.image}`
        }
        return order
      })
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得訂單失敗'
      })
    }
  }
}
</script>
