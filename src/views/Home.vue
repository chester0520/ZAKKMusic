<template lang="pug">
#home
  q-carousel(animated v-model='slide' navigation infinite :autoplay='autoplay' arrows transition-prev='slide-right' transition-next='slide-left' @mouseenter='autoplay = false' @mouseleave='autoplay = true')
    q-carousel-slide(:name='1' :img-src='image.carousel1')
    q-carousel-slide(:name='2' :img-src='image.carousel2')
    q-carousel-slide(:name='3' :img-src='image.carousel3')
    q-carousel-slide(:name='4' :img-src='image.carousel4')
  .container
    h4 精選商品
    .row.justify-center
      .col-xs-12.col-sm-6.col-md-3(v-for="product in products" :key="product._id")
          router-link(:to="'/'+product._id")
            q-card.q-mx-md.q-mb-xl.q-pa-md.homeProduct
              q-card-section.q-mb-md(style="height: 75%;")
                q-img(:src='product.image')
              q-card-section.text-center(style="height: 20%;")
                .text-subtitle1 {{ product.name }}
                .text-subtitle2 NT${{ product.price }}
  .container.q-mb-xl
    h4 商品分類
    .row.justify-center
      .col-xs-12.col-sm-6.col-md-3
        router-link(to="/productlist?category=category1" @click="link = 'category1'")
          q-card.q-mx-md.q-mb-md.category
            q-img(:src="image.category1")
              .absolute-bottom.text-subtitle2.text-center 樂器
      .col-xs-12.col-sm-6.col-md-3
        router-link(to="/productlist?category=category2" @click="link = 'category2'")
          q-card.q-mx-md.q-mb-md.category
            q-img(:src="image.category2")
              .absolute-bottom.text-subtitle2.text-center 音響
      .col-xs-12.col-sm-6.col-md-3
        router-link(to="/productlist?category=category3" @click="link = 'category3'")
          q-card.q-mx-md.q-mb-md.category
            q-img(:src="image.category3")
              .absolute-bottom.text-subtitle2.text-center 效果器
      .col-xs-12.col-sm-6.col-md-3
        router-link(to="/productlist?category=category4" @click="link = 'category4'")
          q-card.q-mx-md.q-mb-md.category
            q-img(:src="image.category4")
              .absolute-bottom.text-subtitle2.text-center 週邊耗材
</template>

<script>
import ProductCard from '../components/ProductCard.vue'

export default {
  data () {
    return {
      slide: 1,
      autoplay: true,
      image: {
        carousel1: `${process.env.VUE_APP_API}/files/carousel1.jpg`,
        carousel2: `${process.env.VUE_APP_API}/files/carousel2.jpg`,
        carousel3: `${process.env.VUE_APP_API}/files/carousel3.jpg`,
        carousel4: `${process.env.VUE_APP_API}/files/carousel4.jpg`,
        category1: `${process.env.VUE_APP_API}/files/music1.jpg`,
        category2: `${process.env.VUE_APP_API}/files/music2.jpg`,
        category3: `${process.env.VUE_APP_API}/files/music3.jpg`,
        category4: `${process.env.VUE_APP_API}/files/music4.jpg`
      },
      products: [],
      link: ''
    }
  },
  methods: {
    showCategory () {
      return this.$store.commit('showCategory', this.link)
    }
  },
  components: {
    ProductCard
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/products/random')
      this.products = data.result.map(product => {
        if (product.image) {
          product.image = `${process.env.VUE_APP_API}/files/${product.image}`
        }
        return product
      })
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
