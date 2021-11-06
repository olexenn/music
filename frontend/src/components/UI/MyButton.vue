<template>
  <div>
    <button class="btn">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "my-button",
};
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  background: #059669;
  color: white;
  border: 1px solid #059669;
  margin-top: 15px;
}
</style>
