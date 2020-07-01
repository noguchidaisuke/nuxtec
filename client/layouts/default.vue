<template>
  <v-app class="text-regular">
    <Header />
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import Header from "@/components/Header"
export default {
  components: {
    Header
  }
};
</script>

<style>
.img-fluid {
  width:100%;
  height:auto;
}
a {
  text-decoration: none;
}

</style>