<template>
  <div class="smch3">
    <!-- ------- Action Buttons ------- -->
    <div class="nav">
      <el-button @click="$router.back()" icon="el-icon-back" plain></el-button>
      <p class="title">Title :{{ log.title }}</p>

      <div>
        <el-button
          v-loading="loading"
          type="danger"
          size="medium"
          icon="el-icon-delete-solid"
          slot="reference"
          @click="deleteLog(log.log_id)"
        >
          Delete
        </el-button>
        <el-button
          v-if="log.partiallly_deleted == true"
          size="mini"
          @click="restoreUser()"
          >Deleted</el-button
        >
      </div>
    </div>
    <br />
    <br />
    <div v-if="update" class="createPost-container container">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="Please input"
        v-model="log.description"
      >
      </el-input>
      <br />
      <br />
      <el-button type="primary" v-if="!isVisible" @click="Visible"
        >Update</el-button
      >
      <el-button type="primary" v-else @click="update">Submit</el-button>
    </div>
    <br />
    <h1>Tags:</h1>
    <!-- <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">
      {{ tags.name }}
    </el-tag> -->
    <el-tag type="success" v-for="(tags, i) in tags" :key="i">{{
      tags.name
    }}</el-tag>
    <br />
    <br />
    <br />
    <!-- <div class="select">
      <el-select v-model="value1" multiple placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div> -->
  </div>
</template>

<script>
// import Sticky from '@/components/UI/Sticky'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      name: '',
      // tags: [
      //   { name: 'Tag 1', type: '' },
      //   { name: tags.name, type: 'success' },
      //   { name: 'Tag 3', type: 'info' },
      //   { name: 'Tag 4', type: 'warning' },
      //   { name: 'Tag 5', type: 'danger' },
      // ],
      // options: [
      //   {
      //     value: 'Option1',
      //     label: 'Option1',
      //   },
      // ],

      textarea: '',
      description: '',
      isVisible: false,
      // options: [
      //   {
      //     value: '',
      //     label: '',
      //   },
      // ],
    }
  },
  async created() {
    await this.$store.dispatch('getTags')
    return
  },

  methods: {
    Visible() {
      this.isVisible = !this.isVisible
      this.description = this.$store.state.description
    },
    update() {
      this.isVisible = false
      console.log(this.Description)
      this.$store.dispatch('updateDescription', this.description)
    },

    async deleteLog(id, row) {
      console.log(' STOP 1 ' + id)
      await this.$store.dispatch('deleteLog', id)
      // await this.$store.dispatch('getAllLogs')
      this.$router.push('/SuperUserLoghome')
    },
  },
  computed: {
    ...mapState(['log', 'tags']),
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
.smch3 {
  margin: 30px;
}
</style>
