<template lang="pug">
q-card.q-mx-md.q-mb-xl.q-pa-md.ProductCard
  q-card-section.q-mb-md(style="height: 75%;")
    q-img(:src='product.image')
  q-card-section.text-center(style="height: 20%;")
    .text-subtitle1 {{ product.name }}
    .text-subtitle2 NT${{ product.price }}
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>
