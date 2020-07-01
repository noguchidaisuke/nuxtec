<template>
  <v-app>
    <v-containe>
      <v-row justify="center">
        <v-col cols="8" class="text-center">
          <h2 class="grey--text darken-4 mt-12 title">{{ pageNotFound }}</h2>
          <p class="grey--text darken-4 mt-12">ページが見つかりませんでした</p>
          <div class="my-10"></div>
          <v-btn dark>back to home page</v-btn>
        </v-col>
      </v-row>
    </v-containe>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
