const state = () => ({
    token: null,
    id: null,
    is_superuser: null,
    email: null,
    logs: [],
    tags:[],
    users:[],
    // current_tags: [],
    log: [],
    tag:[],
    user:[],
    errorMsg: null,
    
    title: null,
    

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
    },
    setUser(state, data) {
        state.user = data;
    },
    byIdTags(state, data) {
        state.tags = data;
        console.log(state.tags);
    },
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
        state.log.description = data;
    },
    deleteLog(state, id){
        if (!state.list) return 
        let index = state.list.findIndex((x) => x.id ==id)
        if (index != -1) state.list.splice(index, 1)
    },
    deleteUser(state, id){
        if (!state.list) return 
        let index = state.list.findIndex((x) => x.id ==id)
        if (index != -1) state.list.splice(index, 1)
    },


    updateUser(state,data) {
        const index = state.users.findIndex((user) => user.id === user.id)
        state.users[index].title = data.title
    },
    // allTags(state, data) {
    //     state.tags = data;
    //     console.log(state.Logs);
    // },
    setTag(state, data) {
        state.tag = data;
    },

    


}

const actions = {

    async login({ commit }, data) {
        try {
            const res = await this.$axios.post('http://localhost:5000/api/user/login', data)
            console.log(res.data)
            commit('Login', res.data)
            if(res.data.is_superuser==true){
                this.$axios.setHeader('Authorization', 'Bearer ' + res.data.token)
                this.$router.push({ path: '/SuperUserLoghome' })
            }else{
                this.$axios.setHeader('Authorization', 'Bearer ' + res.data.token)
                this.$router.push({ path: '/Loghome' })
            }
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
        const res = await this.$axios.get('http://localhost:5000/api/Log/' + data);
        console.log("log")
        console.log(res.data)
        commit('setLog', res.data)
    },
    async goToUser({ commit }, data) {
        console.log(data)
        const res = await this.$axios.get('http://localhost:5000/api/user/' + data);
        console.log("log")
        console.log(res.data)
        commit('setUser', res.data)
    },

    
   
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
        const res = await this.$axios.delete('http://localhost:5000/api/user/' + data);
        //console.log(res.data); 
        console.log('at least reaching this point');
    },
    async updateUser({ state }, data) {
        const res = await this.$axios.put('http://localhost:5000/api/user/', +state.user.user_id, { name: data.name,hash_password:data.hash_password });
    },

    
    
    async deleteLog({ }, data) {
        const res = await this.$axios.delete('http://localhost:5000/api/log/' + data);
        console.log(res.data);
    },
    
    
    async updateDescription({ state }, data) {
        console.log(data)
        const res = await this.$axios.put('http://localhost:5000/api/Log/' + state.log.log_id, {description: data})
        console.log(res, 'Updated')
        commit('updateDescription', data.description)
    }, 

    // async addTag({ commit, state}, data) {
    //     const res = await this.$axios.post('tag',{
    //         text: data.text,
    //         log_id: state.Log_id,
    //     })
    // },

    // async getAllTags({ commit, state }, data) {
    //     await this.$axios.get('http://localhost:5000/api/Tag', {
            
    //     }).then((res) => {
    //         console.log(res.data);
            
    //         commit('allTags', res.data);
    //     })
    // },
    async getTags({ commit, state }) {
        await this.$axios.get("http://localhost:5000/api/Tag/" + state.log.tag_id).then((res) => {
            console.log(res.data);
            // this.$router.push('/');
            commit('byIdTags', res.data);
        })
    },
    // async goToTag({ commit }, data) {
    //     console.log(data)
    //     const res = await this.$axios.get('http://localhost:5000/api/Tag/' + data);
    //     console.log("log")
    //     console.log(res.data)
    //     commit('setTag', res.data)
    // },

      


}

export default {
    state,
    mutations,
    actions,
    getters,

}