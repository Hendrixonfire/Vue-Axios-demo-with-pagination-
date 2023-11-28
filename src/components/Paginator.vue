<template>
    <div class="transactions">
          <h2>User Info:</h2>
          <div class="head">
              <div class="row">
                  <div class="col">id</div>
                  <div class="col">Name</div>
                  <div class="col">Username</div>
                  <div class="col">Email</div>
              </div>
          </div>
          <hr>
          <div class="items">
              <div class="row" v-for="(transaction, index) in paginatedData" :key="index" > 
                  <div class="col">{{transaction.id}}</div>
                  <div class="col">{{transaction.name}}</div>
                  <div class="col">{{transaction.username}}</div>
                  <div class="col">{{transaction.email}}</div>
                  <!--
                  <div class="col" v-if="transaction.type === 'success'"><span style="color: green">{{transaction.type}}</span></div>
                  <div class="col" v-if="transaction.type === 'error'"><span style="color: red">{{transaction.type}}</span></div>
                  <div class="col" v-if="transaction.type === 'processing'"><span style="color: gold">{{transaction.type}}</span></div>
                  -->
              </div>
          </div>
  
          <ul class="pagination" v-if="data.length > 5 || currentPage > 1" >
          <li class="pagination-item" title="First Page">
            <button type="button" class="imageButton" id="glow-on-hover" @click="onClickFirstPage" :disabled="isInFirstPage">
              First Page
            </button>
          </li>
  
          <li class="pagination-item" title="Previous Page">
            <button type="button" class="imageButton" id="glow-on-hover" @click="onClickPreviousPage" :disabled="isInFirstPage">
              Previous Page
            </button>
          </li>
  
          <li class="pagination-item" v-for="(page, index) in pages" :key="index">
            <button class="imageButton" id="glow-on-hover"
            type="button" 
            @click="onClickPage(page.number)" 
            :disabled="page.isDisabled" 
            :class="{ active: isPageActive(page.number) }">
              {{ page.number }}
            </button>
          </li>
  
          <li class="pagination-item" title="Next Page">
            <button type="button" class="imageButton" id="glow-on-hover" @click="onClickNextPage" :disabled="isInLastPage">
           Next Page
            </button>
          </li>
          <li class="pagination-item" title="Last Page">
            <button type="button" class="imageButton" id="glow-on-hover" @click="onClickLastPage" :disabled="isInLastPage">
             Last Page
            </button>
          </li>
        </ul>
        
      </div>
      <p >Choose a key for the last collumn:</p>
    
      <select required v-model="category">
      
        <option v-for="(item, index) in  paginatedDataKeys"  :key="index" :value="item" >{{item}}</option>

      </select>
       
         <div class="colTwo" v-for="(transaction, index) in paginatedData" :key="index"> 
           {{transaction.id}}: {{transaction[category]}}
         </div>
         
      <p class="idSelection">Choose a user data by ID:</p>

     <select required v-model="id">
      
        <option v-for="(item, index) in paginatedDataID"  :key="index" :value="index">ID: {{index+1}}</option>

      </select>

            <div v-if="this.$store.getters.getTransById(id+1)">
            
      
              <div class="colThree">User Data: {{this.$store.getters.getTransById(id+1).name}}</div>
           
              <div class="colThree">Username: {{this.$store.getters.getTransById(id+1).username}}</div>
              <div class="colThree">Email: {{this.$store.getters.getTransById(id+1).email}}</div>
              <div class="colThree">Address:
                street: {{this.$store.getters.getTransById(id+1).address.street}},
                suite: {{this.$store.getters.getTransById(id+1).address.suite}},
                city: {{this.$store.getters.getTransById(id+1).address.city}},
                zipcode: {{this.$store.getters.getTransById(id+1).address.zipcode}}<br>
                Geo:
                lat: {{this.$store.getters.getTransById(id+1).address.geo.lat}},
                lng: {{this.$store.getters.getTransById(id+1).address.geo.lng}},
                </div>
                <div class="colThree">Phone number: {{this.$store.getters.getTransById(id+1).phone}}</div>
                <div class="colThree">Website: {{this.$store.getters.getTransById(id+1).website}}</div>
                <div class="colThree">Company name: {{this.$store.getters.getTransById(id+1).company.name}},
                  Catch phrase: {{this.$store.getters.getTransById(id+1).company.catchPhrase}},
                  bs: {{this.$store.getters.getTransById(id+1).company.bs}}
                  </div>
                  <button type="button" class="imageButtonThree" id="glow-on-hover" @click="consoleLogUser((id+1))">
                  Console log it:
                    </button>

            </div>
            <div v-else>
              Loading
            </div>
  </template>


<script>
import { Transition } from 'vue'
import { Store } from 'vuex'

export default {
  name: 'transaction-paginated',
  data(){
   return {
    category:'',
    id:0,
    newUser:{}
   }
  },
  props: {
    data:{
      type: Array,
      required: true
    },

    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      requred: true
    },
    total:{
      type: Number,
      required: true
    },
    perPage:{
      type: Number,
      required: true
    },
    currentPage:{
      type: Number,
      required: true
    },

 
  
  },

  computed: {
    paginatedData(){
      let start = (this.currentPage - 1) * this.perPage
      let end = start + this.perPage
      return this.data.slice(start, end)
    },
  
    paginatedDataKeys(){
    let keys = [];
 
   
      this.data.forEach(d =>{
           keys.push(Object.keys(d).filter((key)=>{
            if (key != "id" && key != "name" && key != "username" && key != "email"){
              return key;
            }
           }));
      })
   
     return keys[0];
    },
    paginatedDataID(){
    let keysId = [];
    console.log(this.data);
    this.data.forEach(d=>{
        keysId.push(Object.keys(d).filter((key)=>{
            if (key = "id"){
              return keysId;
            }
           }));
      })
   
     return keysId;
    },
    startPage(){
      if (this.currentPage === 1) return 1
      if (this.currentPage === this.totalPages) return this.totalPages - this.maxVisibleButtons + (this.maxVisibleButtons - 1)
      return this.currentPage - 1
    },
    endPage(){
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages)
    },
    pages(){
      let range = []
      for (let i = this.startPage; i<=this.endPage; i++){
        range.push({
          number: i,
          isDisabled: i === this.currentPage
        });
      }
      return range;
    },
  isInFirstPage() {return this.currentPage === 1},
  isInLastPage() {return this.currentPage === this.totalPages},
  },
  methods:{
    onClickFirstPage(){
      this.$emit('pagechanged', 1)
    },
    onClickLastPage(){
      this.$emit('pagechanged', this.totalPages)
    },
    onClickNextPage(){
      this.$emit('pagechanged', this.currentPage + 1)
    },
    onClickPreviousPage(){
      this.$emit('pagechanged', this.currentPage  - 1)
    },
    onClickPage(page){
      this.$emit('pagechanged', page)
    },
    isPageActive(page){
      return this.currentPage === page;
    },
    onPageChanged(page){
      this.currentPage = page;
    },
    consoleLogUser(id){
      const newUser = (this.$store.getters.getTransById(id));
      return console.table(newUser);
    }
  
  
   
  },
}
</script> 