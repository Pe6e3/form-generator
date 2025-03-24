<template>
  <div>
    <navbar></navbar>

    <router-view>

    </router-view>

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

<style scoped></style>
