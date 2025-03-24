<template>
  <div>
    <navbar></navbar>

    <div class="home">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import FormGenerator from './components/FormGenerator.vue'
import Navbar from './Navbar.vue';
export default {
  name: 'App',
  components: {
    FormGenerator, Navbar
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


.app {
  min-height: 100vh;
}


.home {
  background-color: #f5f5f5;

  padding: 20px;

 

  .custom-email-field {
    position: relative;

    .email-hint {
      position: absolute;
      bottom: -20px;
      left: 0;
      font-size: 12px;
      color: #666;
    }
  }
}
</style>
