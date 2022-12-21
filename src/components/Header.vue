<template lang="pug">
#Header
  q-header(elevated)
    .container
      q-toolbar
        .logo
          router-link(to="/")
            img(:src="image")
        .column
          .row
            q-btn(flat round icon="person")
              q-menu(transition-show='scale' transition-hide='scale')
                q-list(style='min-width: 100px')
                  q-item(clickable v-if="!user.islogin")
                    q-item-section
                      router-link(to="/login") 登入
                  q-item(clickable v-if="!user.islogin")
                    q-item-section
                      router-link(to="/register") 註冊
                  q-item(clickable v-if="user.islogin && !user.isAdmin")
                    q-item-section
                      router-link(to="/userinfo/personal") 會員專區
                  q-item(clickable v-if="user.islogin && user.isAdmin")
                    q-item-section
                      router-link(to="/admin/AdminNews") 管理專區
                  q-item(clickable v-if="user.islogin")
                    q-item-section(@click="logout") 登出
            router-link(to="/cart")
              q-btn(flat round icon="shopping_cart")
            q-btn.lt-md(flat round icon="menu")
              q-menu(transition-show='scale' transition-hide='scale')
                q-list(style='min-width: 100px')
                  q-item(clickable)
                    q-item-section
                      router-link(to="/") 首頁
                  q-item(clickable)
                    q-item-section
                      router-link(to="/news") 最新消息
                  q-item(clickable)
                    q-item-section
                      router-link(to="/productlist") 商品列表
                  q-item(clickable)
                    q-item-section
                      router-link(to="/aboutus") 關於我們
          .navbar.row.gt-sm
            router-link(to="/")
              q-btn(flat) 首頁
            router-link(to="/news")
              q-btn(flat) 最新消息
            router-link(to="/productlist")
              q-btn(flat) 商品列表
            router-link(to="/aboutus")
              q-btn(flat) 關於我們
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      image: `${process.env.VUE_APP_API}/files/ZAKK.png`
    }
  },
  methods: {
    async logout () {
      try {
        await this.axios.delete('/users/logout', {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$store.commit('logout')
        this.$swal({
          icon: 'success',
          title: '登出成功',
          text: '期待下次見面'
        })
        if (this.$route.path !== '/') this.$router.push('/')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '發生錯誤'
        })
      }
    }
  },
  async mounted () {
    if (this.$store.state.jwt.token.length === 0) return
    const diff = Date.now() - this.$store.state.jwt.received
    try {
      // 如果進入網頁時，距離收到 jwt 過了六天，重新取得一次新的 jwt
      // 1000 * 60 * 60 * 24 * 6 = 6 天的毫秒數
      if (diff > 1000 * 60 * 60 * 24 * 6) {
        const { data } = await this.axios.post('/users/extend', {}, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$store.commit('extend', data.result)
      }
      // 進入網頁時重新取一次使用者資料
      const { data } = await this.axios.get('/users/', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
      this.$store.commit('getinfo', data.result)
    } catch (error) {
      this.$store.commit('logout')
    }
  }
}
</script>
