(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["news"],{"079e":function(t,e,a){"use strict";var s=a("ade3"),r=a("5530"),i=a("2b0e"),n=a("dde5"),c=a("87e8"),l=a("0016"),o=a("8716");e["a"]=i["a"].extend({name:"QBreadcrumbsEl",mixins:[c["a"],o["a"]],props:{label:String,icon:String},render:function(t){var e=[];return void 0!==this.icon&&e.push(t(l["a"],{staticClass:"q-breadcrumbs__el-icon",class:void 0!==this.label?"q-breadcrumbs__el-icon--with-label":null,props:{name:this.icon}})),this.label&&e.push(this.label),t(!0===this.hasRouterLink?"router-link":"span",Object(s["a"])({staticClass:"q-breadcrumbs__el q-link flex inline items-center relative-position",props:!0===this.hasRouterLink?this.routerLinkProps:null},!0===this.hasRouterLink?"nativeOn":"on",Object(r["a"])({},this.qListeners)),Object(n["a"])(e,this,"default"))}})},a2f9:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"News"}},[a("div",{staticClass:"container"},[a("q-breadcrumbs",{staticClass:"q-my-lg"},[a("q-breadcrumbs-el",{attrs:{icon:"home",to:"/"}}),a("q-breadcrumbs-el",{attrs:{label:"最新消息"}})],1)],1),a("div",{staticClass:"container"},[a("div",{staticClass:"row"},t._l(t.news,(function(e){return a("div",{staticClass:"col-xs-12 col-md-6"},[a("q-card",{staticClass:"q-pa-lg q-my-lg newsCard"},[a("q-card-section",{staticClass:"leftsection"},[a("q-img",{attrs:{src:e.image}})],1),a("q-card-section",{staticStyle:{width:"70%",height:"100%"}},[a("h4",{staticClass:"q-my-md"},[t._v(t._s(e.title))]),a("p",{staticClass:"text"},[t._v(t._s(e.text))]),a("p",{staticClass:"date"},[t._v("刊登日期:"+t._s(e.date))])])],1)],1)})),0)])])},r=[],i=a("1da1"),n=(a("96cf"),a("d81d"),a("99af"),{data:function(){return{news:[],columns:[{name:"date",field:"date",align:"center",label:"刊登日期"},{name:"image",field:"image",align:"center",label:"圖片"},{name:"title",field:"title",align:"center",label:"標題"},{name:"text",field:"text",align:"center",label:"內容"},{name:"post",field:"post",align:"center",label:"刊登"},{name:"action",field:"action",align:"center",label:"設定"}],pagination:{sortBy:"date",descending:!1,page:1,rowsPerPage:10},form:{title:"",text:"",image:null,post:!0,date:"",_id:""}}},mounted:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.axios.get("/news",{headers:{authorization:"Bearer "+t.$store.state.jwt.token}});case 3:a=e.sent,s=a.data,t.news=s.result.map((function(t){return t.image&&(t.image="".concat("123","/files/").concat(t.image)),t.date=new Date(t.date).toLocaleDateString(),t})),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),t.$swal({icon:"error",title:"錯誤",text:"取得最新消息失敗"});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()}}),c=n,l=a("2877"),o=a("ead5"),d=a("079e"),u=a("f09f"),m=a("a370"),p=a("068f"),b=a("93dc"),f=a.n(b),h=Object(l["a"])(c,s,r,!1,null,null,null);e["default"]=h.exports;f()(h,"components",{QBreadcrumbs:o["a"],QBreadcrumbsEl:d["a"],QCard:u["a"],QCardSection:m["a"],QImg:p["a"]})},ead5:function(t,e,a){"use strict";var s=a("5530"),r=(a("caad"),a("99af"),a("4de4"),a("8a79"),a("159b"),a("2b0e")),i=a("99b6"),n=a("dde5"),c=a("87e8");e["a"]=r["a"].extend({name:"QBreadcrumbs",mixins:[c["a"],i["a"]],props:{separator:{type:String,default:"/"},separatorColor:String,activeColor:{type:String,default:"primary"},gutter:{type:String,validator:function(t){return["none","xs","sm","md","lg","xl"].includes(t)},default:"sm"}},computed:{classes:function(){return"".concat(this.alignClass).concat("none"===this.gutter?"":" q-gutter-".concat(this.gutter))},sepClass:function(){if(this.separatorColor)return"text-".concat(this.separatorColor)},activeClass:function(){return"text-".concat(this.activeColor)}},render:function(t){var e=this,a=Object(n["c"])(this,"default");if(void 0!==a){var r=1,i=[],c=a.filter((function(t){return void 0!==t.tag&&t.tag.endsWith("-QBreadcrumbsEl")})).length,l=void 0!==this.$scopedSlots.separator?this.$scopedSlots.separator:function(){return e.separator};return a.forEach((function(a){if(void 0!==a.tag&&a.tag.endsWith("-QBreadcrumbsEl")){var s=r<c;r++,i.push(t("div",{staticClass:"flex items-center",class:s?e.activeClass:"q-breadcrumbs--last"},[a])),s&&i.push(t("div",{staticClass:"q-breadcrumbs__separator",class:e.sepClass},l()))}else i.push(a)})),t("div",{staticClass:"q-breadcrumbs",on:Object(s["a"])({},this.qListeners)},[t("div",{staticClass:"flex items-center",class:this.classes},i)])}}})}}]);
//# sourceMappingURL=news.4cec733e.js.map