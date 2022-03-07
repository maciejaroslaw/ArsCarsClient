<template>
  <div>
    HAHA
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    currentUser(){
      return this.$store.state.auth.user;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
