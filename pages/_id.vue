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
      <div>
        <h1>Description:</h1>
        <el-input
          v-if="isVisible"
          v-model="description"
          type="textarea"
          :rows="2"
          placeholder="Please input"
        ></el-input>
        <el-p v-else>{{ log.description }}</el-p>
        <br />
        <br />
        <el-button type="primary" v-if="!isVisible" @click="Visible"
          >Update</el-button
        >
        <el-button type="primary" v-else @click="update">Submit</el-button>
      </div>
    </div>
    <br />
    <h1>StackTrace:</h1>
    <p>{{ log.stack_trace }}</p>
    <br />
    <br />
    <h1>Tags:</h1>

    <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">
      {{ tag.name }}
    </el-tag>
    <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">
      {{ tag.types }}
    </el-tag>
    <br />
    <br />

    <div>
      <el-select v-model="tag" clearable placeholder="Select Tag">
        <el-option
          v-for="item in tags"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="types"
        multiple
        collapse-tags
        style="margin-left: 20px"
        placeholder="Select"
      >
        <el-option
          v-for="item in tagTypes"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
// import Sticky from '@/components/UI/Sticky'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      textarea: '',
      description: '',
      isVisible: false,
      tag: '',
      types: [],
      options: [],
      value1: [],
      value2: [],
    }
  },
  async mounted() {
    await this.$store.dispatch('getTags')
    await this.$store.dispatch('getTagTypes')
    return
  },

  methods: {
    Visible() {
      this.isVisible = !this.isVisible
      // this.description = this.description
      this.description = this.log.description
    },
    async update() {
      this.isVisible = false
      console.log(this.description)
      await this.$store.dispatch('updateDescription', {
        description: this.description,
        id: this.$route.params.id,
      })
      this.$router.push('/_id')
      this.$store.commit('updateDescription', this.description)
    },

    async deleteLog(id, row) {
      console.log(' STOP 1 ' + id)
      await this.$store.dispatch('deleteLog', id)
      // await this.$store.dispatch('getAllLogs')
      this.$router.push('/SuperUserLoghome')
    },
  },
  computed: {
    ...mapState(['log', 'tags', 'tagTypes']),
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
