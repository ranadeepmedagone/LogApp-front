<template>


  <div>

    <Header />

    
   <el-table
    ref="multipleTable"
    :data="logs"
    
    @row-click="rowClick(log.id)"
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
      align="right">
      
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)" icon="el-icon-view" ></el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
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

    // async fetch() {
    //   await this.getAllLogs()
    // },
    
    async mounted() {
    await this.$store.dispatch('getAllLogs',this.queryParams)
 
    return
  },




    methods: {

      

      async rowClick(id){
      console.log(id)
      await this.$store.dispatch('goToLog', id)
      await this.$router.push('/SingleLog')

      },

      // async goToLog(id) {
      // console.log(id)
      // await this.$store.dispatch('goToLog', id)
      // await this.$router.push('/SingleLog')
    // },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      
    }
  }
</script>
