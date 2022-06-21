<template>
  <div class="smch">
    <div class="nav2">
      <div>
        <el-select
          v-model="value2"
          multiple
          collapse-tags
          style="margin-left: 20px"
          placeholder="Select"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="block">
        <span class="demonstration">Default</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        >
        </el-date-picker>
      </div>
      <div>
        <el-input
          :data="logs.filter((data) => !search)"
          v-model="search"
          @click="search"
          placeholder="Type to search"
        />
      </div>
    </div>

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
      // queryParams: {
      // page: 1,
      // limit: 20,
      // title: '',
      // from: '',
      // to: ''
      // },
      search: '',
      multipleSelection: [],
      pickerOptions: {
        shortcuts: [
          {
            text: 'Last week',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: 'Last month',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: 'Last 3 months',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
    }
  },
  async mounted() {
    await this.$store.dispatch('getAllLogs', this.queryParams)
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
.nav2 {
  display: flex;
  justify-content: space-between;
}
</style>
