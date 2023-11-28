<template>
  <div id="app">
      <transaction-paginated 
      :data="trans"
      :total-pages = "Math.ceil(trans.length) / 5"
      :total = "trans.length"
      :per-page = "5"
      :current-page="currentPage"
      @pagechanged = "onPagechanged"
      />
  </div>
</template>



<script>
import TransactionPaginated from '../src/components/Paginator.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
mounted(){
  this.loadTrans()
},

data(){
  return{
    currentPage: 1,
   
   
  }
},
methods:{
  ...mapActions(['loadTrans']),
  onPagechanged(page){
    this.currentPage = page;
  }

},
computed:{
  ...mapGetters([
    'trans',
    'getTransById'
  ])
},


components: {
  TransactionPaginated
}
}
</script>



<style >

</style>