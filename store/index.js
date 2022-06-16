const state = () => ({
    token: null,
    id: null,
    is_superuser: null,
    email: null,
    logs: [],
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
    setLog(state, data) {
        state.log = data;
        console.log(state.log);
    },
    // allComments(state, data) {
    //     state.comments = data;
    //     console.log(state.comments);
    // },
    // CreatePost(state, data) {
    //     //    state.CreateTodo = data;
    // },
    
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
            params: {
                // page: data.page,
                // limit: data.limit,
                // title: data.title,
                // from: data.from,
                // to: data.to
            }
        }).then((res) => {
            console.log(res.data);
            // console.log("hi")
            // this.$router.push('/');
            commit('allLogs', res.data);
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

    // async CreatePosts({ commit, state }, data) {

    //     await this.$axios.post("http://localhost:5000/api/post", {
    //         title: data.title,
    //     }, { headers: { 'Authorization': 'Bearer ' + state.token } }).then((res) => {
    //         console.log(res.data);
    //         commit('CreatePost', res.data);
    //     })
    // },
    
    // async createComment({ commit, state }, data) {
    //     const res = await this.$axios.post('http://localhost:5000/api/comment?id=' + state.post.id, { commenttext: data });
    //     // commit('commentCreate', data);
    // },
    // async deleteComment({ }, data) {
    //     const res = await this.$axios.delete('http://localhost:5000/api/comment/id?id=' + data);
    //     console.log(res.data);
    // },
    // async deletePost({ }, data) {
    //     const res = await this.$axios.delete('http://localhost:5000/api/post/' + data);
    //     console.log(res.data);
    // },
    // async updatePost({ state }, data) {
    //     const res = await this.$axios.put('http://localhost:5000/api/post/' + state.post.id, { title: data });
    //     console.log(res.data);
    // },
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

      


}

export default {
    state,
    mutations,
    actions,
    getters,

}