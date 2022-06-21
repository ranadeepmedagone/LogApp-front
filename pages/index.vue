<template>
  <div>
    <!-- <Sidebar /> -->

    <title>User Login Page</title>
    <body>
      <div class="content">
        <div class="flex-div">
          <div class="name-content">
            <h1 class="logo">User Log In</h1>
          </div>
          <h4>{{ this.$store.state.errorMsg }}</h4>
          <form @submit.prevent="login">
            <input
              v-model="formData.email"
              type="text"
              placeholder="Enter your email.."
              required
            />
            <input
              v-model="formData.hashed_password"
              type="password"
              placeholder="Password"
              required
            />
            <br />
            <br />
            <button class="login">Log In</button>
            <!-- <br /> -->
            <!-- <button class="login">Register</button> -->
            <!-- <a href="#">Forgot Password ?</a> -->
            <hr />
            <!-- <button class="create-account">Create New Account</button> -->
          </form>
        </div>
        <div class="backdrop" v-show="backdrop">
          <div class="modal">
            <h1 class="modal_title">Allow notifications</h1>
            <div class="modal_actions">
              <a href="#" class="modal_action">Allow</a>
              <button class="modal_action modal_action--negative" type="button">
                Block
              </button>
            </div>
          </div>
        </div>
      </div>
    </body>
    <!-- </html> -->
  </div>
</template>

<script>
import { getAuth, signInAnonymously } from 'firebase/auth'
import { getMessaging, onMessage, getToken } from 'firebase/messaging'
import { messaging } from '@/plugins/firebase'
// import axios from 'axios'
// import UserHeader from "~/components/UserHeader.vue";
export default {
  mounted() {
    const messaging = getMessaging()
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload)
    })
  },
  name: 'login',
  // components: { UserHeader },
  data() {
    return {
      email: '',
      hashed_password: '',
      backdrop: false,
      formData: {
        email: this.email,
        hashed_password: this.hashed_password,
      },
    }
  },
  methods: {
    async login() {
      await signInAnonymously(getAuth())
      this.activate()
    },
    async activate() {
      const token = await getToken(messaging, {
        vapidKey:
          'BJu-UZ1RHzlP24kVK514peQAew0uaZJ4rjGqWkpyxhiwL7hNnbj3CTgRXsVt597StsIa3mhKD_6dB6P6z1NM-t4',
      })
      await this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
        notification_token: token,
      })
      // if (this.$store.state.ErrorMsg) {
      //   this.$router.push('/')
      // } else {
      //   this.$router.push('/log')
      // }
    },
  },
  head() {
    return {
      title: 'login page',
      meta: [
        {
          hid: 'loginpage',
          name: 'loginpage',
          content: 'user can log in here',
        },
      ],
    }
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background: #f2f4f7;
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.flex-div {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.name-content {
  margin-right: 7rem;
}

.name-content .logo {
  font-size: 3.5rem;
  color: #1877f2;
}

.name-content p {
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 5rem;
}

form {
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 2rem;
  width: 530px;
  height: 380px;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

form input {
  outline: none;
  padding: 0.8rem 1rem;
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
}

form input:focus {
  border: 1.8px solid #1877f2;
}

form .login {
  outline: none;
  border: none;
  background: #1877f2;
  padding: 0.8rem 1rem;
  border-radius: 0.4rem;
  font-size: 1.1rem;
  color: #fff;
}

form .login:hover {
  background: #0f71f1;
  cursor: pointer;
}

form a {
  text-decoration: none;
  text-align: center;
  font-size: 1rem;
  padding-top: 0.8rem;
  color: #1877f2;
}

form hr {
  background: #f7f7f7;
  margin: 1rem;
}

form .create-account {
  outline: none;
  border: none;
  background: #06b909;
  padding: 0.8rem 1rem;
  border-radius: 0.4rem;
  font-size: 1.1rem;
  color: #fff;
  width: 75%;
  margin: 0 auto;
}

form .create-account:hover {
  background: #03ad06;
  cursor: pointer;
}

/* //.........Media Query.........// */

@media (max-width: 500px) {
  html {
    font-size: 60%;
  }

  .name-content {
    margin: 0;
    text-align: center;
  }

  form {
    width: 300px;
    height: fit-content;
  }

  form input {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  form .login {
    font-size: 1.5rem;
  }

  form a {
    font-size: 1.5rem;
  }

  form .create-account {
    font-size: 1.5rem;
  }

  .flex-div {
    display: flex;
    flex-direction: column;
  }
}

@media (min-width: 501px) and (max-width: 768px) {
  html {
    font-size: 60%;
  }

  .name-content {
    margin: 0;
    text-align: center;
  }

  form {
    width: 300px;
    height: fit-content;
  }

  form input {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  form .login {
    font-size: 1.5rem;
  }

  form a {
    font-size: 1.5rem;
  }

  form .create-account {
    font-size: 1.5rem;
  }

  .flex-div {
    display: flex;
    flex-direction: column;
  }
}

@media (min-width: 769px) and (max-width: 1200px) {
  html {
    font-size: 60%;
  }

  .name-content {
    margin: 0;
    text-align: center;
  }

  form {
    width: 300px;
    height: fit-content;
  }

  form input {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  form .login {
    font-size: 1.5rem;
  }

  form a {
    font-size: 1.5rem;
  }

  form .create-account {
    font-size: 1.5rem;
  }

  .flex-div {
    display: flex;
    flex-direction: column;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    .header {
      height: 90vmax;
    }
  }
}
</style>
