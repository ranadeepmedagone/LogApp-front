<template>
  <div class="smch2">
    <SuperUserHeader />
    <br />
    <br />

    <el-table
      :data="logs"
      style="width: 100%"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      @row-click="rowClick"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <!-- <el-table-column
      label="Date"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column> -->
      <el-table-column prop="log_id" label="Id" width="120"> </el-table-column>
      <el-table-column prop="title" label="Title" width="120">
      </el-table-column>
      <el-table-column prop="description" label="Description" width="120">
      </el-table-column>
      <el-table-column
        prop="stack_trace"
        label="StackTrace"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column :align="right">
        <template slot-scope="scope">
          <div class="s">
            <el-button size="mini" icon="el-icon-view"></el-button>

            <el-button
              size="mini"
              type="danger"
              @click="deleteLog(logs[scope.$index].log_id)"
              >Delete</el-button
            >
          </div>
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
import { mapState } from 'vuex'
export default {
  data() {
    return {
      search: '',
      multipleSelection: [],
    }
  },

  computed: {
    ...mapState(['logs', 'log']),
  },

  // async fetch() {
  //   await this.getAllLogs()
  // },

  async mounted() {
    await this.$store.dispatch('getAllLogs', this.queryParams)

    return
  },

  methods: {
    async rowClick(row, column, event) {
      alert(row.log_id)
      await this.$store.dispatch('goToLog', row.log_id)
      await this.$router.push('/' + row.log_id)
    },

    async deleteLog(id, row) {
      console.log(' STOP 1 ' + id)
      await this.$store.dispatch('deleteLog', id)
      // await this.$store.dispatch('getAllLogs')
      this.$router.push('/SuperUserLoghome')
    },

    // async goToLog(id) {
    // console.log(id)
    // await this.$store.dispatch('goToLog', id)
    // await this.$router.push('/SingleLog')
    // },

    // async refreshData(): Promise<void> {
    //   let success = await this.getList()
    //   if (success)
    //     this.$message({
    //       message: 'Data reloaded',
    //       duration: 3000,
    //       showClose: true,
    //     })
    // },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
  },
}
</script>
<style scoped>
.smch2 {
  margin: 30px;
}
.s {
  display: flex;
}
</style>
