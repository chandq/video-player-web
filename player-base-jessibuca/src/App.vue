<template>
  <div class="container">
    <JessibucaDemo />
    <JessibucaDemo />
    <JessibucaDemo />
    <JessibucaDemo />
    <JessibucaDemo />
    <JessibucaDemo />
    <JessibucaDemo />
    <JessibucaDemo />
    <JessibucaDemo />
  </div>
</template>

<script>
import JessibucaDemo from "./components/JessibucaDemo.vue";

export default {
  name: "App",
  components: {
    JessibucaDemo,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container{
  width:100vw;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
