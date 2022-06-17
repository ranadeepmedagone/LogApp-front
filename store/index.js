const state = () => ({
    token: null,
    id: null,
    is_superuser: null,
    email: null,
    logs: [],
    users:[],
    // comments: [],
    log: [],
    errorMsg: null,
    description: null,
    title: null

})

const getters = {}

const mutations = {
    Login(state, data) {
        state.token = data.token
        state.id = data.id
        state.is_superuser = data.is_superuser
        state.email = data.email
    },
    allLogs(state, data) {
        state.logs = data;
        console.log(state.Logs);
    },
    allUsers(state, data) {
        state.users = data;
        console.log(state.users);
    },
    setLog(state, data) {
        state.log = data;
        console.log(state.log);
    },
    // allComments(state, data) {
    //     state.comments = data;
    //     console.log(state.comments);
    // },
    CreateUser(state, data) {
           state.CreateUser = data;
    },
    
    // updatePost(state, data) {
    //     state.post.title = data;
    // },
    // updateUser(state, data) {
    //     state.fullname = data;
    // },
    setError(state, data) {
        state.errorMsg = data
    },

    updateDescription(state, data) {
        state.Description = data
    },
    deleteLog(state, id){
        if (!state.list) return 
        let index = state.list.findIndex((x) => x.id ==id)
        if (index != -1) state.list.splice(index, 1)
    },


    updateUser(state,data) {
        const index = state.users.findIndex((user) => user.id === user.id)
        state.users[index].title = data.title
    }



}

const actions = {

    async login({ commit }, data) {
        try {
            const res = await this.$axios.post('http://localhost:5000/api/user/login', data)
            console.log(res.data)
            commit('Login', res.data)
            this.$axios.setHeader('Authorization', 'Bearer ' + res.data.token)
        }
        catch (error) {
            if (error.response.data) {
                commit('setError', error.response.data);
            }

        }
    },
    
    

    async getAllLogs({ commit, state }, data) {
        await this.$axios.get('http://localhost:5000/api/Log', {
            
        }).then((res) => {
            console.log(res.data);
            
            commit('allLogs', res.data);
        })
    },
    async getAllUsers({ commit, state }, data) {
        await this.$axios.get('http://localhost:5000/api/user', {
            
        }).then((res) => {
            console.log(res.data);
            
            commit('allUsers', res.data);
        })
    },
    async goToLog({ commit }, data) {
        console.log(data)
        const res = await this.$axios.get('http://localhost:5000/api/Log?id=' + data);
        console.log("log")
        console.log(res.data)
        commit('setLog', res.data)
    },

    // async getAllComments({ commit, state }) {
    //     await this.$axios.get("http://localhost:5000/api/comment?id=" + state.post.id).then((res) => {
    //         console.log(res.data);
    //         // this.$router.push('/');
    //         commit('allComments', res.data);
    //     })
    // },

    async CreateUser({ commit, state }, data) {

        await this.$axios.post('http://localhost:5000/api/user', {
            name: data.name,
            email: data.email,
            hash_password: data.hash_password,
        }, )
            console.log(data);
            commit('CreateUser', data);
        
    },
    async deleteUser({ }, data) {
        const res = await this.$axios.delete('http://localhost:5000/api/user?id=' + data);
        console.log(res.data); 
    },
    
    // async createComment({ commit, state }, data) {
    //     const res = await this.$axios.post('http://localhost:5000/api/comment?id=' + state.post.id, { commenttext: data });
    //     // commit('commentCreate', data);
    // },
    async deleteLog({ }, data) {
        const res = await this.$axios.delete('http://localhost:5000/api/log/' + data);
        console.log(res.data);
    },
    
    async updateUser({ state }, data) {
        const res = await this.$axios.put('http://localhost:5000/api/user/', );
        console.log(res.data);
    },
    // async updateUser({ state }, data) {
    //     const res = await this.$axios.put('http://localhost:5000/api/user/id', { full_name: data });
    // }

    async addTag({ commit, state }, data) {
        const res = await this.$axios.post('tag', {
          text: data.text,
          log_id: state.Log_id,
        })
        commit('setTags', data)
      },
      async updateDescription({ commit }, data) {
        console.log(data)
        const res = await this.$axios.put('log/update', data)
        console.log(res, 'Updated')
        commit('updateDescription', data.Description)
      }, 

    //   async deleteLog({commit }, id) {
    //     console.log(" atleast reaching here ");
    //     const res = await this.$axios.delete('http://localhost:5000/api/Log?id=' + id);
    //     commit('deleteLog', id)
    //     console.log(res.id); 
    //     return[id, null]
    // },

      


}

export default {
    state,
    mutations,
    actions,
    getters,

}