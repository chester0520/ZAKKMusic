<template lang="pug">
#Userinfo
  .container
    q-breadcrumbs.q-my-lg
      q-breadcrumbs-el(icon="home" to="/")
      q-breadcrumbs-el(label="會員專區" to="/userinfo")
    .row
      .col-2
        q-list.q-mx-md(bordered)
          q-item(v-ripple clickable @click="link = 'link1'" active-class="my-menu-link" to='/userinfo/personal')
            q-item-section
              | 個人資料
          q-item(v-ripple clickable @click="link = 'link2'" active-class="my-menu-link" to='/userinfo/order')
            q-item-section
              | 訂單查詢
          q-item(v-ripple clickable @click="link = 'link3'" active-class="my-menu-link" to='/userinfo/service')
            q-item-section
              | 聯絡客服
      .col
        router-view
</template>

<script>
export default {
  name: 'Userinfo',
  data () {
    return {
      link: 'link1'
    }
  }
}
</script>
