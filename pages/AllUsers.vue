<template>
  <div class="smch">
    <div class="nav">
      <el-button @click="$router.back()" icon="el-icon-back" plain></el-button>
      <el-input
        :data="users"
        v-model="search"
        @click="search"
        placeholder="Type to search"
      />
      <el-button type="submit" @click="goToCreate()">Create</el-button>
    </div>
    <br />
    <br />

    <el-table ref="multipleTable" :data="users" style="width: 100%">
      <el-table-column label="Operations" min-width="180">
        <el-button
          icon="el-icon-edit"
          v-if="(isVisible = true)"
          @click="Visible( )"
        >
        </el-button>
        <el-button type="success" icon="el-icon-check" v-else @click="update()">
        </el-button>
      </el-table-column>
      <el-table-column prop="user_id" label="UserId" width="120">
      </el-table-column>
      <div v-if="update">
        <el-input
          placeholder="Please input"
          v-if="isVisible"
          v-model="user.name"
        ></el-input>
        <el-table-column prop="name" label="Name" width="120">
        </el-table-column>
      </div>

      <div v-if="update">
        <el-input
          placeholder="Please input"
          v-if="isVisible"
          v-model="user.email"
        ></el-input>
        <el-table-column prop="email" label="Email" show-overflow-tooltip>
        </el-table-column>
      </div>
      <div v-if="update">
        <el-input
          placeholder="Please input"
          v-if="isVisible"
          v-model="user.hash_password"
        ></el-input>
        <el-table-column
          prop="hash_password"
          label="Password"
          show-overflow-tooltip
        >
        </el-table-column>
      </div>

      <el-table-column :align="right">
        <template slot-scope="scope">
          <div class="btn">
            <el-button
              v-if="users[scope.$index].status == true"
              size="mini"
              type="danger"
              @click="deleteUser(users[scope.$index].user_id)"
              >Delete</el-button
            >

            <el-button
              v-if="users[scope.$index].status == false"
              size="mini"
              @click="restoreUser(users[scope.$index].user_id)"
              >Deactivate</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { title } from 'process'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      search: '',
      isVisible: false,
      name: '',
      email: '',
      hash_password: '',
    }
  },

  computed: {
    ...mapState(['users', 'user']),
  },

  async mounted() {
    await this.$store.dispatch('getAllUsers')

    return
  },

  methods: {
    Visible() {
      alert()
      this.isVisible = true
      this.name = this.user.name
      this.email = this.user.email
      this.hash_password = this.user.hash_password
      // await this.$$store.dispatch('updatePost', this.title)
    },
    // async goToUpdate() {
    //   await this.$router.push('/UpdateUser')
    // },
    async goToCreate() {
      await this.$router.push('/CreateUserLog')
    },
    async deleteUser(id, row) {
      console.log('reached')
      await this.$store.dispatch('deleteUser', id)
      console.log('reached1')
      this.$router.push('/AllUsers')
      console.log('reached3')
      await this.$store.dispatch('getAllUsers')
    },
    async update(user_id) {
      this.isVisible = false
      await this.$store.dispatch('updateUser', user_id)
      this.$store.commit(
        'updateUser',
        this.name,
        this.email,
        this.hash_password
      )
    },
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
.smch {
  margin: 30px;
}
.btn {
  display: flex;
}
/* .title{
 font-weight: bold;
} */
</style>
