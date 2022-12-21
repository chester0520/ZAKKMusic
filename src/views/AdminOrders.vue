<template lang="pug">
#AdminOrders
  .q-px-md
    .row
      h4 訂單管理
    .row
      .col
        q-table(flat bordered :data="orders" :columns="columns" row-key="name" :pagination.sync="pagination" hide-pagination)
          template(v-slot:body-cell-name="props")
            q-td(:props="props")
              | {{ props.row.user.name }}
          template(v-slot:body-cell-product="props")
            q-td(:props="props")
              ul
                li(v-for="product in props.row.products") {{ product.product.name }} * {{ product.amount }}
          template(v-slot:body-cell-price="props")
            q-td(:props="props")
              | {{ props.row.products.reduce((accumulator, currentValue) => accumulator + (currentValue.amount * currentValue.product.price), 0) }}
        .row.justify-center.q-mt-md
          q-pagination(v-model="pagination.page" :max="pagesNumber" color="grey-8" size="sm")
</template>

<script>
export default {
  name: 'AdminOrders',
  data () {
    return {
      orders: [],
      columns: [
        { name: 'name', field: 'name', align: 'center', label: '訂購者' },
        { name: '_id', field: '_id', align: 'center', label: '訂單編號' },
        { name: 'date', field: 'date', align: 'center', label: '訂單日期' },
        { name: 'product', field: 'product', align: 'center', label: '訂單內容' },
        { name: 'price', field: 'price', align: 'center', label: '訂單金額' }
      ],
      pagination: {
        sortBy: 'image',
        descending: false,
        page: 1,
        rowsPerPage: 10
      }
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/orders/all', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
      this.orders = data.result.map(order => {
        order.date = new Date(order.date).toLocaleDateString()
        return order
      })
    } catch (error) {
      console.log(error)
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得訂單失敗'
      })
    }
  }
}
</script>
