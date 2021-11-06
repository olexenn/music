<template>
  <div>
    <h1>Home Page</h1>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    if (!this.$store.state.isAuth) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped></style>
