<template>
  <div class="main">
    <v-container>
      <v-row justify="space-between" align="center" class="mt-n4">
        <v-col cols="6">
          <v-btn small outlined @click="sortByAsc('price')">
            <v-icon small left>trending_down</v-icon>
            <span class="caption text-lowercase">安い順</span>
          </v-btn>
          <v-btn small outlined @click="sortByDesc('price')">
            <v-icon small left>trending_up</v-icon>
            <span class="caption text-lowercase">高い順</span>
          </v-btn>
        </v-col>
        <v-col cols="4">
          <v-text-field label="検索"  prepend-inner-icon="search" v-model="search">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" lg="3" v-for="product in filteredProduct" :key="product.title">
          <v-card nuxt-link :to="`/products/${product._id}`">
            <v-img :src="product.topImage" aspect-ratio="1" class="img-fluid" lazy-src="assets/white.webp">
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-card-subtitle>¥{{product.price}}</v-card-subtitle>
            <v-card-text class="title">{{product.title}}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>

export default {
  async asyncData({$axios}) {
    try {
      let response = await $axios.$get("/api/products");
      return {
        products: response.products
      }
    } catch (err) {
      console.log(err)
    }
  },
  data() {
    return {
      search: "",
      now: this.$dayjs
    }
  },
  computed: {
    filteredProduct() {
      return this.products.filter(product => {
        return product.title.toLowerCase().match(this.search.toLowerCase())
      })
    }
  },
  methods: {
    sortByAsc(prop) {
      this.products.sort((a, b) => {
        return a[prop] < b[prop] ? -1 : 1
      })
    },
    sortByDesc(prop) {
      this.products.sort((a, b) => {
        return a[prop] < b[prop] ? 1 : -1
      })
    }
  }
}
</script>
