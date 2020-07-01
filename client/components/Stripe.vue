<template>
  <v-card class="mt-10">
    <v-card-title class="grey darken-4 white--text">決済画面</v-card-title>
    <v-card-text class="mt-5">
      <div ref="card">
      </div>
    </v-card-text>
    <v-card-subtitle>
      <div>合計金額 ¥<span class="title">{{getCartTotalPrice}}</span></div>
      <div>到着予定日<span class="title">{{arrivalDate}}</span></div>
    </v-card-subtitle>

    <v-btn dark rounded large class="mb-5 ml-3" @click="onCheckout">購入</v-btn>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { loadStripe } from '@stripe/stripe-js';
export default {
  props: {
    arrivalDate: {
      type: String
    },
  },
  data() {
    return {
      stripe: null,
      card: null
    }
  },
  async mounted() {
    this.stripe = await loadStripe("pk_test_JSQEwtiZRyNjvArjmMRUF4gY00lClfgxzp");
    let elements = this.stripe.elements();
    this.card = elements.create("card");
    this.card.mount(this.$refs.card);
  },
  computed: {
    ...mapGetters(['getCartTotalPrice','getCart'])
  },
  methods: {
    async onCheckout() {
      try {
        let token = await this.stripe.createToken(this.card);
        let response = await this.$axios.$post('/api/payment', {
          token: token,
          totalPrice: this.getCartTotalPrice,
          cart: this.getCart,
          arrivalDate: this.arrivalDate,
          orderDate: this.$dayjs().format('YYYY-MM-DD')
        });
        if (response.success) {
          this.$toast.success('決済完了 orderページからご確認ください');
          this.$store.commit('clearCart')
          this.$router.push('/')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>