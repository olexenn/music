<template>
  <div>
    <h1>Login Page</h1>
    <form @submit.prevent>
      <my-input v-model="login" type="text" placeholder="Username or Email" />
      <my-input v-model="password" type="password" placeholder="Password" />
      <my-button @click="loginFunc">Login</my-button>
    </form>
  </div>
</template>

<script>
import MyInput from "../components/UI/MyInput";
import MyButton from "../components/UI/MyButton";
import axios from "axios";

export default {
  components: { MyButton, MyInput },
  data() {
    return {
      login: "",
      password: "",
    };
  },
  methods: {
    async loginFunc() {
      if (this.login.trim() === "" || this.password.trim() === "") {
        alert("Enter data to fields");
        return;
      }
      let payload;
      // eslint-disable-next-line
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.login)) {
        payload = {
          email: this.login,
          password: this.password,
        };
      } else {
        payload = {
          username: this.login,
          password: this.password,
        };
      }
      try {
        const resp = await axios.post(
          "http://localhost:3001/auth/login",
          payload
        );
        this.login = "";
        this.password = "";
        localStorage.setItem("user", resp.data.accessToken);
        this.$store.commit("setAuth");
        await this.$router.push("/");
      } catch (e) {
        this.login = "";
        this.password = "";
        alert("Wrong login or password");
      }
    },
  },
  beforeMount() {
    if (localStorage.getItem("user")) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
