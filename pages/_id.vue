<template>
  <div class="smch">
    <!-- ------- Action Buttons ------- -->
    <div class="nav">
      <el-button @click="$router.back()" icon="el-icon-back" plain></el-button>
      <p class="title">Title :{{ log.title }}</p>
      <el-button
        v-loading="loading"
        type="danger"
        plain
        size="medium"
        icon="el-icon-delete-solid"
        slot="reference"
        @click="deleteLog"
      >
        Delete
      </el-button>
    </div>
    <br />
    <br />
    <div class="createPost-container container">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="Please input"
        v-model="log.description"
      >
      </el-input>
      <br />
      <br />
      <el-button type="primary" v-if="!isVisible" @click="visible"
        >Update</el-button
      >
      <el-button type="primary" v-else @click="UpdateDescription"
        >Submit</el-button
      >
    </div>
    <br />
    <h1>Tags:</h1>
    <el-tag>Tag 1</el-tag>
    <el-tag type="success">Tag 2</el-tag>
    <el-tag type="info">Tag 3</el-tag>
    <el-tag type="warning">Tag 4</el-tag>
    <el-tag type="danger">Tag 5</el-tag>
    <br />
    <br />
    <br />
    <div class="select">
      <el-select v-model="value1" multiple placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

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
      <el-button type="submit" @click="addTag">Add</el-button>
    </div>
  </div>
</template>

<script>
// import Sticky from '@/components/UI/Sticky'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      description: '',
      isVisible: false,
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
    }
  },

  methods: {
    visible() {
      this.isVisible = true
      this.Description = this.$store.state.Description
    },
    UpdateDescription() {
      this.isVisible = false
      console.log(this.Description)
      this.$store.dispatch('updateDescription', {
        description: this.Description,
      })
    },

    async deleteLog(id, row) {
      console.log(' STOP 1 ' + id)
      await this.$store.dispatch('deleteLog', id)
      await this.$store.dispatch('getAllLogs')
      this.$router.push('/SingleLog')
    },
  },
  computed: {
    ...mapState(['log']),
  },
}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
}
.select {
  display: flex;
  justify-content: space-between;
}
.title {
  font-weight: bold;
}
.smch {
  margin: 30px;
}
</style>
