<template>
  <div>
    <h1>Register Page</h1>
    <form @submit.prevent>
      <my-input v-model="username" type="text" placeholder="Username" />
      <my-input v-model="email" type="text" placeholder="Email" />
      <my-input v-model="password" type="password" placeholder="Password" />
      <my-input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm Password"
      />
      <my-button @click="register">Register</my-button>
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
      username: "",
      password: "",
      email: "",
      confirmPassword: "",
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match");
        return;
      } else if (
        this.password.trim() === "" ||
        this.email.trim() === "" ||
        this.username.trim() === ""
      ) {
        alert("Fill the Fields");
        return;
      } else if (
        /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(this.email) === false
      ) {
        alert(`${this.email} is not an email`);
        return;
      }
      try {
        const resp = await axios.post("http://localhost:3001/auth/register", {
          username: this.username,
          email: this.email,
          password: this.password,
        });

        localStorage.setItem("user", resp.data.accessToken);
        this.username = "";
        this.password = "";
        this.email = "";
        this.$store.commit("setAuth");
        await this.$router.push("/");
      } catch (e) {
        this.username = "";
        this.email = "";
        this.password = "";
        alert("User with this username or email already exists");
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

<style scoped></style>
