<template>

<div class="smch">

    <div class="nav">
        <el-button @click="$router.back()" icon="el-icon-back" plain></el-button>
        <el-input

          :data="logs.filter(data => !search )"
          v-model="search"
          @click="search"
          
          placeholder="Type to search"/>
        <el-button v-loading="loading"   plain size="medium"  slot="reference"  @click="deleteLog"> CreateUser </el-button>
        
    </div>


        <el-table
    ref="multipleTable"
    :data="logs"
    
    @row-click="rowClick(log.id)"
    style="width: 100%"
    >
    
    
    
    <el-table-column
      prop="id"
      label="Id"
      width="120">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name"
      width="120">
    </el-table-column>
    <el-table-column
      prop="email"
      label="Email"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      align="right">
      
      <template slot-scope="scope">
          <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit" ></el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteLog(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>

  



          </div>
</template>

<script>
// import { title } from 'process'
import {mapState} from 'vuex'
  export default {
    data() {
      return {
        
      search: '',
      
        
      }
    },
    

    computed: {
      ...mapState(['logs','log'])
    },

    // async fetch() {
    //   await this.getAllLogs()
    // },
    
    async mounted() {
    await this.$store.dispatch('getAllLogs',this.queryParams)
 
    return
  },




    methods: {


      async deleteLog(id) {
        await this.$store.dispatch('deleteLog', id)
        await this.$store.dispatch('getAllLogs')
        this.$router.push('/Loghome')
    }
      
    }
  }
</script>


<style scoped>
.nav{
    display: flex;
    justify-content: space-between;
}
.select{
    display: flex;
    justify-content: space-between;
}
.smch{
    margin: 30px;
}
/* .title{
 font-weight: bold;
} */
</style>