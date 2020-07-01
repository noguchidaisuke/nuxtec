<template>
  <div class="cart">
    <v-container  class="mb-10">
      <v-row justify="center">
        <!-- product list -->
        <v-col cols="10" md="8">
          <v-row v-for="product in getCart" :key="product.title">
            <v-col cols="4">
              <v-img class="img-fluid" :src="product.photos[0]"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card flat>
                <v-card-title>
                  <v-row class="mx-0" justify="space-between">
                    <div>{{product.title}}</div>
                    <div>
                      <span class="subtitle-1">¥</span>
                      {{product.price}}
                    </div>
                  </v-row>
                </v-card-title>
                <v-card-subtitle>
                  <div class="mt-3">category</div>
                  <div class="mb-10">{{product.description}}</div>
                  <select @change="onChangeQuantity($event, product)">
                    <option v-for="i in 10" :key="i" :value="i" :selected="currentQuantity(product.quantity, i)">量: &nbsp;{{i}}</option>
                  </select>
                  <v-btn text class="grey--text" @click="onRemoveProduct(product)">削除</v-btn>
                </v-card-subtitle>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-divider></v-divider>
            </v-col>
          </v-row>
        </v-col>
        <!-- cash area -->
        <v-col cols="10" md="4">
          <v-card flat>
            <v-card-title class="font-weight-black mb-5">注文合計</v-card-title>
            <v-card-subtitle>
              <div class="subtotal">
                <v-row class="mx-0" justify="space-between">
                  <span class="font-weight-bold">小計</span>
                  <span>
                    ¥
                    <span class="font-weight-bold">{{getCartTotalPrice}}</span>
                  </span>
                </v-row>
              </div>
              <div class="shipment_fee">
                <v-row class="mx-0" justify="space-between">
                  <span class="font-weight-bold">送料</span>
                  <span>
                    $
                    <span class="font-weight-bold">0</span>
                  </span>
                </v-row>
              </div>
              <div class="shipment"></div>
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-title>
              <span>合計</span>
              <v-spacer></v-spacer>
              <span>¥{{getCartTotalPrice}}</span>
            </v-card-title>
          </v-card>
          <v-btn
            block
            dark
            class="mt-10 title font-weight-black d-none d-sm-flex"
            rounded
            color="yellow darken-4"
            large
            @click="validateCart"
          >購入画面に進む</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-btn
      height="60px"
      block
      dark
      class="d-flex d-sm-none title"
      style="position:fixed;bottom:0px;"
      nuxt-link to="/payment"
      color="orange darken-3"
    >購入画面に進む</v-btn>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getCart",  "getCartTotalPrice"])
  },
  created() {
    console.log("//////created")
  },
  methods: {
    currentQuantity(prodQty, qty) {
      if (prodQty === qty) {
        return true;
      } else {
        return false;
      }
    },
    onChangeQuantity(e, product) {
      let quantity = parseInt(e.target.value)
      this.$store.commit('changeQuantity', {product, quantity})
    },
    onRemoveProduct(product) {
      this.$store.commit('removeProductFromCart', product)
    },
    validateCart() {
      if (this.$store.state.cartLength === 0) {
        this.$toast.success('カートが空です');
      } else {
        this.$router.push("/payment")
      }
    }
  }
};
</script>