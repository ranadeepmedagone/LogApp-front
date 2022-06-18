<template>
  <el-row :gutter="20">
    <el-col :span="10" :offset="6"
      ><div class="grid-content bg-purple">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="name" prop="name">
            <el-input
              type="text"
              v-model="ruleForm.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="hash_password" prop="hash_password">
            <el-input
              type="hash_password"
              v-model="ruleForm.hash_password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="UpdateUser()">Submit</el-button>
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
          </el-form-item>
        </el-form>
      </div></el-col
    >
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        hash_password: '',
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    async UpdateUser() {
      console.log(this.ruleForm.name)
      console.log(this.ruleForm.hash_password)
      await this.$store.dispatch('updateUser', this.ruleForm)
      await this.$router.push({ path: '/AllUsers' })
    },
  },
}
</script>

<style scoped>
.grid-content {
  margin-top: 100px;
}
</style>
