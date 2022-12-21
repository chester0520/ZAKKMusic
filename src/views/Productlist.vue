<template lang="pug">
#Products
  .container
    q-breadcrumbs.q-my-lg
      q-breadcrumbs-el(icon="home" to="/")
      q-breadcrumbs-el(label="商品列表")
    .row
      .col-12.col-md-2
        q-list.q-mx-md.q-mb-xl(bordered)
          q-item(v-ripple clickable :active="link === 'all'" @click="showCategory('all')" active-class="my-menu-link")
            q-item-section 全部商品
          q-item(v-ripple clickable :active="link === 'category1'" @click="showCategory('category1')" active-class="my-menu-link")
            q-item-section 樂器
          q-item(v-ripple clickable :active="link === 'category2'" @click="showCategory('category2')" active-class="my-menu-link")
            q-item-section 音響
          q-item(v-ripple clickable :active="link === 'category3'" @click="showCategory('category3')" active-class="my-menu-link")
            q-item-section 效果器
          q-item(v-ripple clickable :active="link === 'category4'" @click="showCategory('category4')" active-class="my-menu-link")
            q-item-section 週邊耗材
      .col
        .row.q-mb-xl
          .col-md-4(v-for="product in filterProducts" :key="product._id")
            router-link(:to="'/'+product._id")
              ProductCard(:product="product")
</template>

<script>
import ProductCard from '../components/ProductCard.vue'

export default {
  data () {
    return {
      link: 'all',
      products: []
    }
  },
  methods: {
    showCategory (cate) {
      this.link = cate
      this.$router.replace('/productlist?category=' + this.link)
    }
  },
  computed: {
    filterProducts () {
      return this.products.filter(product => {
        if (this.link === 'all') {
          return true
        } else if (this.link === 'category1' && product.category === '樂器') {
          return true
        } else if (this.link === 'category2' && product.category === '音響') {
          return true
        } else if (this.link === 'category3' && product.category === '效果器') {
          return true
        } else if (this.link === 'category4' && product.category === '週邊耗材') {
          return true
        }
      })
    }
  },
  components: {
    ProductCard
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/products')
      this.products = data.result.map(product => {
        if (product.image) {
          product.image = `${process.env.VUE_APP_API}/files/${product.image}`
        }
        return product
      })
      if (this.$route.query.category) {
        this.link = this.$route.query.category
      }
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得商品失敗'
      })
    }
  }
}
</script>
