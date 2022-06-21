<template>
  <div class="nav">
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

    <div>
      <el-button type="submit" @click="addTag"
        ><nuxt-link to="/all">All Users</nuxt-link></el-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      search: '',
      queryParams: {
        // title: '',
        // from: '',
        // to: '',
      },
      options: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
      value1: [],
      value2: [],

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
      value1: '',
      value2: '',
    }
  },
  async search() {
    this.filter.search = this.search

    let success = await this.allLogs()
    if (success)
      this.$message({
        message: 'Search applied',
        duration: 3000,
      })
  },

  filterByDate() {
    this.error = ''
    if (!this.filterDate.from_date && !this.filterDate.to_date) {
      this.error = 'Enter at least one value'
      return
    }
    if (this.filterDate.from_date > this.filterDate.to_date) {
      this.error = 'From date cannot be greater than To date'
      return
    }
    this.$emit('filterByDate', this.filterDate)
  },
  computed: {
    ...mapState(['logs']),
  },
}
</script>

<style>
.nav {
  display: flex;
  justify-content: space-between;
}
</style>
