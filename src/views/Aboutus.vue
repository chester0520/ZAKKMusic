<template lang="pug">
#Aboutus
  .container.text-center.q-mb-xl
    q-breadcrumbs.q-my-lg
      q-breadcrumbs-el(icon="home" to="/")
      q-breadcrumbs-el(label="關於我們")
    .col
      img(:src="image")
      h4 關於我們
      p 本店約在1987年由老闆所創立,秉持著學以致用的心態，希望能把自己所學的音樂宣揚出去，途中也遇到了現在美麗的老闆娘，也慢慢的從一個人的小店變成兩個人的小店！創業的過程是辛苦的，辛苦的耕耘不一定會有豐富的收穫，但不嘗試耕耘就一定不會有收穫，這就是創業的浪漫，好險我們的努力有被大家看到，也有被大家支持！現在我們又從兩個人的小店變了成五個人的小店！之後也會由二代繼續為您服務下去，謝謝大家的讚美或批評，我們都有聽進去，也一定會改進，往後我們也會繼續的為大家服務下去。”保留著老字號的品質，用年輕人的方式呈現，讓音樂更加貼近生活“
</template>

<script>
export default {
  name: 'Aboutus',
  data () {
    return {
      image: `${process.env.VUE_APP_API}/files/aboutus.jpg`
    }
  }
}
</script>
