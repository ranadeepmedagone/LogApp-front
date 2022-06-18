<template>
  <div class="smch">
    <Header />
    <br />
    <br />
    <el-table
      ref="multipleTable"
      slot-scope=""
      :data="logs"
      @row-click="rowClick"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
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
      <el-table-column prop="log_id" :align="right">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-view"></el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteLog(logs[scope.$index].log_id)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      search: '',
      multipleSelection: [],
    }
  },
  async mounted() {
    await this.$store.dispatch('getAllLogs')
    return
  },
  methods: {
    async rowClick(row, column) {
      alert(row.id)
      await this.$store.dispatch('goToLog', row.id)
      await this.$router.push('/' + row.id)
    },

    async deleteLog(id) {
      console.log(' STOP 1 ' + id)
      await this.$store.dispatch('deleteLog', id)
      await this.$store.dispatch('getAllLogs')
      this.$router.push('/Loghome')
    },
  },
  computed: {
    ...mapState(['logs', 'log']),
  },
}
</script>
<style scoped>
.smch {
  margin: 30px;
}
</style>
