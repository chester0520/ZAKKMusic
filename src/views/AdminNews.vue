<template lang="pug">
#AdminNews
  .q-px-md
    .row
      h4 最新消息管理
        q-btn.q-mx-lg(round color="negative" icon="add" @click="modal = true")
        q-dialog(persistent v-model="modal")
          q-card
            q-card-section
              h4(v-if="form._id.length > 0") 編輯最新消息
              h4(v-else) 新增最新消息
            q-card-section
              q-form.q-gutter-md(@submit='submit' @reset="reset")
                img-inputer(v-model="form.image" theme="dark" size="large" placeholder="點擊或拖曳選擇圖片" bottom-text="點擊或拖曳以修改")
                q-input(filled v-model="form.title" label="標題" :rules="[ val => val.length >= 1 || '必須 1 個字以上']")
                q-input(filled v-model="form.text" type="textarea" label="內容" :rules="[ val => val.length >= 1 || '必須 1 個字以上']")
                q-option-group(v-model="form.post" :options="options" color="primary" inline dense)
                q-btn(label="取消" type="reset" color="red")
                q-btn(label="確認" type="submit" color="primary")
    .row
      .col
        q-table(flat bordered :data="news" :columns="columns" row-key="date" :pagination.sync="pagination" hide-pagination)
          template(v-slot:body-cell-image="props")
            q-td(:props="props")
              img(:src="props.row.image" style="height: 100px")
          template(v-slot:body-cell-post="props")
            q-td(:props="props")
              | {{ props.row.post ? '公開' : '隱藏' }}
          template(v-slot:body-cell-text="props")
            q-td(:props="props")
              p.tabletext {{ props.row.text }}
          template(v-slot:body-cell-action="props")
            q-td(:props="props")
              q-btn(icon="edit" color="negative" @click="editNews(props.rowIndex)")
        //- .row.justify-center.q-mt-md
        //-   q-pagination(v-model="pagination.page" :max="pagesNumber" color="grey-8" size="sm")
</template>

<script>
export default {
  name: '#AdminNews',
  data () {
    return {
      news: [],
      modal: false,
      columns: [
        { name: 'date', field: 'date', align: 'center', label: '刊登日期' },
        { name: 'image', field: 'image', align: 'center', label: '圖片' },
        { name: 'title', field: 'title', align: 'center', label: '標題' },
        { name: 'text', field: 'text', align: 'center', label: '內容' },
        { name: 'post', field: 'post', align: 'center', label: '刊登' },
        { name: 'action', field: 'action', align: 'center', label: '設定' }
      ],
      pagination: {
        sortBy: 'date',
        descending: false,
        page: 1,
        rowsPerPage: 10
      },
      form: {
        title: '',
        text: '',
        image: null,
        post: true,
        date: '',
        _id: ''
      },
      options: [
        {
          label: '公開',
          value: true
        },
        {
          label: '隱藏',
          value: false
        }
      ]
    }
  },
  methods: {
    editNews (index) {
      this.modal = true
      this.form = {
        title: this.news[index].title,
        text: this.news[index].text,
        date: this.news[index].date,
        image: this.news[index].image,
        post: this.news[index].post,
        _id: this.news[index]._id,
        index
      }
    },
    reset (event) {
      this.form = {
        title: '',
        text: '',
        image: null,
        date: '',
        post: true,
        _id: ''
      }
      this.modal = false
    },
    async submit () {
      try {
        const fd = new FormData()
        for (const key in this.form) {
          fd.append(key, this.form[key])
        }
        if (this.form._id.length === 0) {
          const { data } = await this.axios.post('/news', fd, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
          this.news.push(this.form)
          this.form.image = `${process.env.VUE_APP_API}/files/${data.result.image}`
        } else {
          const { data } = await this.axios.patch('/news/' + this.form._id, fd, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
          this.news[this.form.index] = {
            title: this.form.title,
            text: this.form.text,
            date: this.form.date,
            post: this.form.post,
            image: `${process.env.VUE_APP_API}/files/${data.result.image}`,
            _id: this.form._id
          }
          this.$set(this.news[this.form.index], 'title', this.form.title)
          this.$set(this.news[this.form.index], 'text', this.form.text)
          this.$set(this.news[this.form.index], 'date', this.form.date)
          this.$set(this.news[this.form.index], 'post', this.form.post)
          this.$set(this.news[this.form.index], 'image', this.form.image)
        }
        this.form = {
          title: '',
          text: '',
          image: null,
          date: '',
          post: true,
          _id: ''
        }
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '新增/修改商品'
        })
        this.modal = false
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    }
  },
  computed: {
    pagesNumber () {
      return Math.ceil(this.products.length / this.pagination.rowsPerPage)
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/news/all', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
      this.news = data.result.map(news => {
        if (news.image) {
          news.image = `${process.env.VUE_APP_API}/files/${news.image}`
        }
        news.date = new Date(news.date).toLocaleDateString()
        return news
      })
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得最新消息失敗'
      })
    }
  }
}
</script>
