<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card flat>
          <h2>Create Review</h2>
          <v-row align="center">
            <v-col cols="3">
              <v-img :src="product.photos[0]" class="img-fluid"></v-img>
            </v-col>
            <v-col cols="8">
              {{product.title}}
            </v-col>
          </v-row>
          <v-divider class="my-10"></v-divider>
          <v-card-text>
            <v-form>
              <h2 class="mb-3">評価</h2>
              <v-rating v-model="rating" half-icon dense large color="orange"></v-rating>
              <h2 class="mt-12 mb-3">ファイル選択</h2>
              <v-file-input
                label="File input"
                filled
                @change="onFileSelected($event)"
              ></v-file-input>
              <h2 class="mt-10">タイトル</h2>
              <v-text-field
                v-model="headline"
              ></v-text-field>
              <v-card-subtitle class="elevation-3">
                <h3>内容</h3>
                <v-textarea
                  v-model="body"
                ></v-textarea>
              </v-card-subtitle>
            </v-form>
          </v-card-text>
          <v-btn class="mb-8" large dark @click="onSubmitReview">Submit</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: 'authenticated',
  async asyncData({$axios, params}) {
    let response = await $axios.$get(`/api/products/${params.id}`)
    return { product: response.product }
  },
  data() {
    return {
      headline: "",
      rating: 0,
      body: "",
      file: null,
      fileName: null
    }
  },
  methods: {
    onFileSelected(e) {
      this.file = e
      this.fileName     = e.name
    },
    onSubmitReview() {
      let data = new FormData()

      data.append('headline', this.headline)
      data.append('rating', this.rating)
      data.append('body', this.body)
      data.append('productID', this.product._id)
      if (this.file) data.append('photo', this.file, this.fileName)

      this.$axios.$post(`/api/reviews/${this.$route.params.id}`, data)
        .then((result) => {
          this.$toast.success('投稿しました');
          this.$router.push(`/products/${this.$route.params.id}`)
        }).catch((err) => {
          this.$toast.error('投稿失敗しました');
        });
    }
  }
}
</script>