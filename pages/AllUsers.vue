<template>

<div class="smch">

    <div class="nav">
        <el-button @click="$router.back()" icon="el-icon-back" plain></el-button>
        <el-input

          :data="users"
          v-model="search"
          @click="search"
          
          placeholder="Type to search"/>
        <el-button type="submit" @click="goToCreate()">Add</el-button>
        
    </div>
    <br>
    <br>


        <el-table
    ref="multipleTable"
    :data="users"
    
    @row-click="rowClick(user.id)"
    style="width: 100%"
    >
    
    
    
    <el-table-column
      prop="user_id"
      label="UserId"
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
      :align="right">
      
      <template slot-scope="">
          <el-button
          size="mini"
          @click="goToUpdate()" icon="el-icon-edit" ></el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteUser(users.user_id)">Delete</el-button>
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
      ...mapState(['users'])
    },

    
    async mounted() {
    await this.$store.dispatch('getAllUsers')
 
    return
  },




    methods: {

      async goToUpdate(){
         await this.$router.push('/UpdateUser')
      },
      async goToCreate(){
         await this.$router.push('/CreateUserLog')
      },
  async deleteUser(id, row) {
       console.log('reached')
        await this.$store.dispatch('deleteUser', id)
        console.log('reached1')
        this.$router.push('/AllUsers')
        console.log('reached3')
     
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