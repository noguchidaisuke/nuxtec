<template>
  <div class="order">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" lg="8" sm="10">
          <h1 class="my-5">Your Orders</h1>
          <v-card v-for="order in orders" :key="order._id" class="mb-8">
            <v-card-title class="grey darken-4 white--text py-0">
              <v-row ma-0>
                <v-col cols="3">
                  <div class="overline pb-0">注文日</div>
                  <div class="subline-2">{{order.orderDate}}</div>
                </v-col>
                <v-col cols="4">
                  <div class="overline">合計金額</div>
                  <div class="subline-2">¥ {{order.totalPrice}}</div>
                </v-col>
                <v-col cols="5">
                  <div class="overline">到着日</div>
                  <div class="subline-2">{{order.arrivalDate}}</div>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text v-for="product in order.products" :key="product.title" class="py-0">
              <v-row align="center">
                <v-col cols="4" md="3"><v-img :src="product.productID.photos[0]" max-height="150px"></v-img></v-col>
                <v-col cols="4" md="6">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="title">
                        {{product.productID.title}}
                      </v-list-item-title>
                      <v-list-item-subtitle class="mt-3">
                        ¥{{product.productID.price}}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        注文数: {{product.quantity}}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="4" md="3" class="text-center">
                  <v-btn dark  class="mb-4 mt-n2" nuxt-link :to="`/products/${product.productID._id}`">商品詳細画面へ</v-btn>
                  <v-btn dark nuxt-link :to="`/reviews/${product.productID._id}`">レビューを書く</v-btn>
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  async asyncData({$axios, req}) {
    // if (process.server) {
    //   $axios.setHeader('cookie', req.headers.cookie)
    // }

    const { orders } = await $axios.$get('/api/orders');
    return {
      orders
    }
  }
}
</script>

<style>

</style>