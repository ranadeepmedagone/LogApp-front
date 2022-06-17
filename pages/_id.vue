<template>
  <div class="smch">
    <!-- ------- Action Buttons ------- -->
      <div class="nav">
        <el-button @click="$router.back()" icon="el-icon-back" plain></el-button>
        <p class="title">Title : {{ log.title }}</p>
        <el-button v-loading="loading"  type="danger" plain size="medium" icon="el-icon-delete-solid" slot="reference"  @click="deleteLog"> Delete </el-button>
        
    </div>
    <br>
    <br>
    <div class="createPost-container container">
      <el-form 
        ref="form"
        :data="log"
        :rules="rules"
        :model="form"
        label-position="top"
        class="form-container"
        @submit.prevent="doNothing"
        v-loading="loading"
      >
      <br />
      <el-input
  type="textarea"
  :rows="2"
  placeholder="Please input"
  v-model="textarea">
</el-input>
<br>
<br>
<br>
       <el-form-item>
         <el-button type="primary" v-if="!isVisible" @click="visible">Update</el-button>
          <el-button type="primary" v-else @click="UpdateDescription">Submit</el-button>
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
      v-for="item in current_tags"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
           <el-button type="submit" @click="addTag">Add</el-button>

    
</div>

  </div>
</template>

<script>
// import Sticky from '@/components/UI/Sticky'
import {mapState} from 'vuex';
export default {
  data() {
    return {
      rules:'',
      loading:'',
      Title:'',
        isVisible:'',
        textarea:'',
        options: [{
          value: 'tags',
          label: 'tags'
        }, ],
        value1: [],
        value2: [],

        tags: [
          
        ],
      form: {
        
      Description: this.$store.state.Description,
      isVisible: false,
     
        
        
      },
      

      
    }
  },
  computed: {
    ...mapState( 'log'['title', 'description', 'tags']),
  },
  async mounted() {
        await this.$store.dispatch('goToLog', this.$route.params.id)
    },

  methods: {
    // async addTag() {
    //  console.log('in here to create a tag')
    //  await this.$store.dispatch('addTag', {
    //   text: this.newTag,
    //   LogId: this.$route.params.id,
    //  })
    //  await this.$store.dispatch('getAllTags', this.$route.params.id)
      
    // },
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
        console.log(" STOP 1 " + id);
        await this.$store.dispatch('deleteLog', id)
        await this.$store.dispatch('getAllLogs')
        this.$router.push('/SingleLog')
    },
    // async goToLog() {
    //     await this.$store.dispatch('goToLog')
    //     console.log('title');
        
    // },
    

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
.title{
 font-weight: bold;
}
.smch{
    margin: 30px;
}
</style>