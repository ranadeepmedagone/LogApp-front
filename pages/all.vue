<template>
  <div id="app">
    <sticky class="st">
      <div class="smch">
        <el-button
          @click="$router.back()"
          icon="el-icon-back"
          plain
        ></el-button>
        <el-input
          :data="users"
          v-model="search"
          @click="search"
          placeholder="Type to search"
        />
        <el-button type="submit" @click="goToCreate()">Create</el-button>
      </div>
    </sticky>
    <br />
    <br />

    <!-- <el-tooltip
      content="Click on any of the cells or on the edit button to edit content"
    >
      <i class="el-icon-info"></i>
    </el-tooltip> -->
    <el-table :data="users" style="width: 100%">
      <el-table-column label="Operations" min-width="180">
        <template slot-scope="scope">
          <!-- <el-button
            v-if="users[scope.$index].status == true"
            icon="el-icon-edit"
            @click="setEditMode(row, index)"
          > -->
          <!-- </el-button> -->
          <div class="btn">
            <el-button
              v-if="users[scope.$index].status == true"
              type="success"
              icon="el-icon-check"
              @click="saveRow(row, index)"
            >
            </el-button>
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
              @click="restoreUser()"
              >Deactivate</el-button
            >
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="user_id" label="UserId" width="120">
      </el-table-column>
      <el-table-column prop="name" label="Name" min-width="180">
        <editable-cell
          :show-input="row.editMode"
          slot-scope="{ row }"
          v-model="user.name"
        >
          <span slot="content">{{ row.name }}</span>
        </editable-cell>
      </el-table-column>

      <el-table-column prop="email" label="Email" min-width="180">
      </el-table-column>
      <el-table-column prop="hash_password" label="Password" min-width="180">
        <editable-cell
          :show-input="row.editMode"
          slot-scope="{ row }"
          v-model="user.hash_password"
        >
          <span slot="content">{{ row.hash_password }}</span>
        </editable-cell>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import EditableCell from '../components/EditableCell.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    EditableCell,
  },
  data() {
    return {
      editMode: false,
      user: [
        {
          name: '',
        },
        {
          hash_password: '',
        },
      ],
    }
  },
  computed: {
    ...mapState(['users', 'user']),
  },

  async mounted(row) {
    await this.$store.dispatch('getAllUsers')

    return {
      ...row,
      editMode: false,
    }
  },
  methods: {
    setEditMode(row, index) {
      row.editMode = true
    },
    // saveRow(row, index) {
    //   row.editMode = false
    // },
    // Visible() {
    //   alert()
    //   this.isVisible = true
    //   this.name = this.user.name
    //   this.email = this.user.email
    //   this.hash_password = this.user.hash_password
    //   // await this.$$store.dispatch('updatePost', this.title)
    // },
    // async goToUpdate() {
    //   await this.$router.push('/UpdateUser')
    // },
    async goToCreate() {
      await this.$router.push('/CreateUserLog')
    },
    async restoreUser() {
      this.$router.push('/all')
    },

    async deleteUser(id, row) {
      console.log('reached')
      await this.$store.dispatch('deleteUser', id)
      console.log('reached1')
      this.$router.push('/all')
      console.log('reached3')
      await this.$store.dispatch('getAllUsers')
    },
    async saveRow(row, index) {
      row.editMode = false
      await this.$store.dispatch(
        'updateUser',
        this.name,

        this.hash_password
      )
    },
  },
  //   mounted() {
  //     this.gridData = this.gridData.map((row) => {
  //       return {
  //         ...row,
  //         editMode: false,
  //       }
  //     })
  //   },
}
</script>

<style>
.edit-cell {
  min-height: 35px;
  cursor: pointer;
}
#app {
  margin: 20px;
}
.smch {
  display: flex;
  justify-content: space-between;
}
.st {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: yellow;
}
</style>
