"use strict";(self["webpackChunkcrm_vue_2"]=self["webpackChunkcrm_vue_2"]||[]).push([[382],{5382:function(t,e,s){s.r(e),s.d(e,{default:function(){return p}});var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"app-page"},[e("div",[e("div",{staticClass:"page-title"},[e("h3",[t._v("Планирование")]),e("h4",[t._v(t._s(t._f("currency")(t.info.bill,"RUB")))])]),t.loading?e("my-loader"):t.categories.length?e("section",t._l(t.categories,(function(s){return e("div",{key:s.id},[e("p",[e("strong",[t._v(t._s(s.title)+":")]),t._v(" "+t._s(t._f("currency")(s.spend))+" из "+t._s(t._f("currency")(s.limit))+" ")]),e("div",{directives:[{name:"tooltip",rawName:"v-tooltip",value:s.tooltip,expression:"cat.tooltip"}],staticClass:"progress"},[e("div",{staticClass:"determinate",class:[s.progressColor],style:{width:s.progressPercent+"%"}})])])})),0):e("p",{staticClass:"center"},[t._v("Категорий нет")])],1)])},r=[],o=s(3822),a=s(379),c={name:"MyPlanning",data:()=>({loading:!0,categories:[]}),async mounted(){this.$store.getters.info.bill,this.categories=await this.$store.dispatch("fetchCategories");const t=await this.$store.dispatch("fetchRecords");console.log(this.categories,t),this.categories=this.categories.map((e=>{const s=t.filter((t=>t.categoryId===e.id)).filter((t=>"outcome"===t.type)).reduce(((t,e)=>t+ +e.amount),0),i=100*s/e.limit,r=i>100?100:i,o=i<60?"green":i<100?"yellow":"red",c=e.limit-s,n=`${c<0?"Превышение на":"Осталось"} ${(0,a.Z)(Math.abs(c))}`;return{...e,progressColor:o,progressPercent:r,spend:s,tooltip:n}})),this.loading=!1},computed:{...(0,o.Se)(["info"])},methods:{}},n=c,l=s(1001),d=(0,l.Z)(n,i,r,!1,null,null,null),p=d.exports}}]);
//# sourceMappingURL=382.7213737c.js.map