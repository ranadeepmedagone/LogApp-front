<template>


  <div class="smch">

    <Header />
    <br>
    <br>

    
   <el-table
    ref="multipleTable"
    :data="logs"
    @row-click="rowClick(logs.id)"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <!-- <el-table-column
      label="Date"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column> -->
    <el-table-column
      prop="title"
      label="Title"
      width="120">
    </el-table-column>
    <el-table-column
      prop="description"
      label="Description"
      width="120">
    </el-table-column>
    <el-table-column
      prop="stack_trace"
      label="StackTrace"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="log_id"
      :align="right">
      
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)" icon="el-icon-view" ></el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteLog(logs[scope.$index].log_id)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
  <!-- <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">Toggle selection status of second and third rows</el-button>
    <el-button @click="toggleSelection()">Clear selection</el-button>
  </div> -->
</template>

<script>
// import { title } from 'process'
import {mapState} from 'vuex'
  export default {
    data() {
      return {
        
      search: '',
      multipleSelection: [],
        
      }
    },
    

    computed: {
      ...mapState(['logs','log'])
    },

    
    
    async mounted() {
    await this.$store.dispatch('getAllLogs',this.queryParams)
 
    return
  },




    methods: {

      async rowClick(id){
      console.log(id)
      await this.$store.dispatch('goToLog', id)
      await this.$router.push('/_id')

      },

      async deleteLog(id, row) {
        console.log(" STOP 1 " + id);
        await this.$store.dispatch('deleteLog', id)
        await this.$store.dispatch('getAllLogs')
        this.$router.push('/Loghome')
    }
      
    }
  }
</script>
<style scoped>
.smch{
    margin: 30px;
}
</style>
