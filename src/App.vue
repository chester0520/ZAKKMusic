<template lang="pug">
#app
  q-layout(view='hHh lpR fff')
    Header
    q-page-container
      router-view(:key="$route.fullPath")
    Footer
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>
