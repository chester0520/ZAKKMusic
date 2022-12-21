<template lang="pug">
#AdminProducts
  .q-px-md
    h4 商品管理
      q-btn.q-mx-lg(round color="negative" icon="add" @click="modal = true")
    .row
      q-dialog(persistent v-model="modal")
        q-card
          q-card-section
            h4(v-if="form._id.length > 0") 編輯商品
            h4(v-else) 新增商品
          q-card-section
            q-form.q-gutter-md(@submit='submit' @reset="reset")
              img-inputer(v-model="form.image" theme="dark" size="large" placeholder="點擊或拖曳選擇圖片" bottom-text="點擊或拖曳以修改")
              q-input(filled v-model="form.name" label="商品名稱" :rules="[ val => val.length >= 1 || '必須 1 個字以上']")
              q-input(filled v-model="form.price" type="number" label="商品價格" :rules="[ val => val >= 0 || '價格需為 0 以上']")
              q-input(filled v-model="form.description" type="textarea" label="商品說明" :rules="[ val => val.length >= 1 || '必須 1 個字以上']")
              q-option-group(v-model="form.sell" :options="options1" color="primary" inline dense)
              q-option-group(v-model="form.category" :options="options2" color="primary" inline dense)
              q-btn(label="取消" type="reset" color="red")
              q-btn(label="確認" type="submit" color="primary")
    .row
      .col
        q-table(flat bordered :data="products" :columns="columns" row-key="name" :pagination.sync="pagination" hide-pagination)
          template(v-slot:body-cell-name="props")
            q-td(:props="props")
              p.tabletext {{ props.row.name }}
          template(v-slot:body-cell-image="props")
            q-td(:props="props")
              img(:src="props.row.image" style="height: 50px")
          template(v-slot:body-cell-sell="props")
            q-td(:props="props")
              | {{ props.row.sell ? '上架' : '下架' }}
          template(v-slot:body-cell-description="props")
            q-td(:props="props")
              p.tabletext {{ props.row.description }}
          template(v-slot:body-cell-action="props")
            q-td(:props="props")
              q-btn(icon="edit" color="negative" @click="editProduct(props.rowIndex)")
        .row.justify-center.q-mt-md.q-mb-xl
          q-pagination(v-model="pagination.page" :max="pagesNumber" color="grey-8" size="sm")
</template>

<script>
export default {
  name: 'AdminProducts',
  data () {
    return {
      products: [],
      columns: [
        { name: 'image', field: 'image', align: 'center', label: '圖片' },
        { name: 'name', field: 'name', align: 'center', label: '名稱' },
        { name: 'price', field: 'price', align: 'center', label: '價格' },
        { name: 'description', field: 'description', align: 'center', label: '說明' },
        { name: 'sell', field: 'sell', align: 'center', label: '狀態' },
        { name: 'category', field: 'category', align: 'center', label: '分類' },
        { name: 'action', field: 'action', align: 'center', label: '設定' }
      ],
      pagination: {
        sortBy: 'image',
        descending: false,
        page: 1,
        rowsPerPage: 10
      },
      modal: false,
      form: {
        name: '',
        price: 0,
        description: '',
        sell: true,
        image: null,
        category: '樂器',
        _id: ''
      },
      options1: [
        {
          label: '上架',
          value: true
        },
        {
          label: '下架',
          value: false
        }
      ],
      options2: [
        {
          label: '樂器',
          value: '樂器'
        },
        {
          label: '音響',
          value: '音響'
        },
        {
          label: '效果器',
          value: '效果器'
        },
        {
          label: '週邊耗材',
          value: '週邊耗材'
        }
      ]
    }
  },
  methods: {
    editProduct (index) {
      this.form = {
        name: this.products[index].name,
        price: this.products[index].price,
        description: this.products[index].description,
        sell: this.products[index].sell,
        image: this.products[index].image,
        category: this.products[index].category,
        _id: this.products[index]._id,
        index
      }
      this.modal = true
    },
    reset (event) {
      this.form = {
        name: '',
        price: 0,
        description: '',
        sell: true,
        image: null,
        category: '樂器',
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
          const { data } = await this.axios.post('/products', fd, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
          this.products.push(this.form)
          this.form.image = `${process.env.VUE_APP_API}/files/${data.result.image}`
        } else {
          const { data } = await this.axios.patch('/products/' + this.form._id, fd, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
          this.products[this.form.index] = {
            name: this.form.name,
            price: this.form.price,
            description: this.form.description,
            sell: this.form.sell,
            image: `${process.env.VUE_APP_API}/files/${data.result.image}`,
            category: this.form.category,
            _id: this.form._id
          }
          this.$set(this.products[this.form.index], 'name', this.form.name)
          this.$set(this.products[this.form.index], 'price', this.form.price)
          this.$set(this.products[this.form.index], 'description', this.form.description)
          this.$set(this.products[this.form.index], 'sell', this.form.sell)
          this.$set(this.products[this.form.index], 'category', this.form.category)
          this.$set(this.products[this.form.index], 'image', this.form.image)
        }
        this.form = {
          name: '',
          price: 0,
          description: '',
          sell: true,
          image: null,
          category: '樂器',
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
      const { data } = await this.axios.get('/products/all', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
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
