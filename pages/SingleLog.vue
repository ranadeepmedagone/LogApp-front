<template>
  <div>
    <!-- ------- Action Buttons ------- -->
      <div class="nav">
        <el-button @click="$router.back()" icon="el-icon-back" plain></el-button>
        
        <el-button v-loading="loading" style:align= "right" type="danger" plain size="medium" icon="el-icon-delete-solid" slot="reference"> Delete </el-button>
        
    </div>
    <br>
    <br>
    <div class="createPost-container container">
      <el-form 
        ref="form"
        :rules="rules"
        :model="form"
        label-position="top"
        class="form-container"
        @submit.prevent="doNothing"
        v-loading="loading"
      >
      <br />
      <el-form-item label="Description" >
         <el-input size="small" type="textarea" ></el-input>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" >Add</el-button>
       </el-form-item>
        <!-- ------- Main Inputs ------- -->
      </el-form>
      <!-- ------- Main Inputs END ------- -->
    </div>
    <br>
    <h1>Tags:</h1>
    <div class="select">

        

         <el-tag
        
        v-for="tag in tags"
       :key="tag.name"
       closable
       :type="tag.type">
       {{tag.name}}
      </el-tag>
    

         <el-select
        v-model="value2"
         multiple
        collapse-tags
        style="margin-left: 20px;"
        placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
           <el-button type="primary" @click="addTag">Add</el-button>

    
</div>

  </div>
</template>

<script>
// import Sticky from '@/components/UI/Sticky'

export default {
  data() {
    return {
        options: [{
          value: 'tags',
          label: 'tags'
        }, ],
        value1: [],
        value2: [],

        tags: [
          
        ],
      form: {
        
        description: 'Default description...',
        
        
      },
      

      
    }
  },
  computed: {
    ...mapState(['log', 'description', 'tags']),
  },

  methods: {
    async addTag() {
      console.log(this.tag)
      this.$store.commit('setTags', this.tag)
      // await this.$store.dispatch('addTag', {
      //   tag: this.tag,
      //   logId: this.LogId,
      // })
      // await this.$store.dispatch('getAllTags', this.LogId)
      this.tag = ''
    },
  }

  
}
</script> 

<style scoped>
.nav{
    display: flex;
    justify-content: space-between;
}
.select{
    display: flex;
    justify-content: space-between;
}
</style>