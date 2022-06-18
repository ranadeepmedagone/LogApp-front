<template>
  <div id="app">
    <el-tooltip
      content="Click on any of the cells or on the edit button to edit content"
    >
      <i class="el-icon-info"></i>
    </el-tooltip>
    <el-table :data="users" style="width: 100%">
      <el-table-column label="Operations" min-width="180">
        <template slot-scope="{ row, index }">
          <el-button icon="el-icon-edit" @click="setEditMode(row, index)">
          </el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            @click="saveRow(row, index)"
          >
          </el-button>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="Name" min-width="180">
        <editable-cell
          :show-input="row.editMode"
          slot-scope="{ row }"
          v-model="row.name"
        >
          <span slot="content">{{ row.name }}</span>
        </editable-cell>
      </el-table-column>

      <el-table-column min-wwidth="150" label="Gender">
        <editable-cell
          :show-input="row.editMode"
          slot-scope="{ row }"
          editable-component="el-select"
          close-event="change"
          v-model="row.gender"
        >
        </editable-cell>
      </el-table-column>

      <el-table-column prop="email" label="Email" min-width="180">
        <editable-cell
          :show-input="row.editMode"
          slot-scope="{ row }"
          v-model="row.email"
        >
          <span slot="content">{{ row.email }}</span>
        </editable-cell>
      </el-table-column>
      <el-table-column prop="hash_password" label="Password" min-width="180">
        <editable-cell
          :show-input="row.editMode"
          slot-scope="{ row }"
          v-model="row.hash_password"
        >
          <span slot="content">{{ row.hash_password }}</span>
        </editable-cell>
      </el-table-column>
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
import EditableCell from '../components/EditableCell.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    EditableCell,
  },
  data() {
    return {
      name: '',
      email: '',
      hash_password: '',
      editMode: false,
      gridData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          gender: 'M',
        },
        {
          date: '2016-05-02',
          name: 'Lisa',
          gender: 'F',
        },
        {
          date: '2016-05-04',
          name: 'Jon',
          gender: 'M',
        },
        {
          date: '2016-05-01',
          name: 'Mary',
          gender: 'F',
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
    saveRow(row, index) {
      row.editMode = false
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
</style>
