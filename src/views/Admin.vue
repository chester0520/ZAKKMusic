<template lang="pug">
#Admin
  .container
    .row
      .col-2
        .q-pa-md
          q-list(bordered)
            q-item(v-ripple clickable :active="link === 'link1'" @click="link = 'link1'" active-class="my-menu-link")
              q-item-section
                router-link(to='/admin/AdminNews') 最新消息管理
            q-item(v-ripple clickable :active="link === 'link2'" @click="link = 'link2'" active-class="my-menu-link")
              q-item-section
                router-link(to='/admin/AdminProducts') 商品管理
            q-item(v-ripple clickable :active="link === 'link3'" @click="link = 'link3'" active-class="my-menu-link")
              q-item-section
                router-link(to='/admin/AdminOrders') 訂單處理
      .col
        router-view
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      link: 'link1'
    }
  }
}
</script>
