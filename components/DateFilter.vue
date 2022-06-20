<template>
  <div>
    <div class="block">
      <span class="demonstration">From: </span>
      <el-date-picker
        v-model="filterDate.from_date"
        type="date"
        align="right"
        placeholder="Start date"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">To: </span>
      <el-date-picker
        v-model="filterDate.to_date"
        type="date"
        align="right"
        placeholder="End date"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
      <span class="error" v-if="error"> {{ error }}</span>
      <el-button class="date-button" @click="filterByDate">Get</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filterDate: {
      from_date: '',
      to_date: '',
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      error: '',
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

  methods: {
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
  },
}
</script>

<style>
.error {
  margin-top: 6px !important;
  margin-bottom: 0px !important;
  color: red;
  font-size: 12px;
}
</style>
