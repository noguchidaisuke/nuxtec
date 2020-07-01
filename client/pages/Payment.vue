<template>
  <div class="payment">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="9">
          <div class="subtitle-2">合計金額</div>
          <div class="title mb-6">
            <span>{{getCartLength}}点</span>
            <span>{{getCartTotalPrice}}円</span>
          </div>
          <v-card>
            <v-card-title class="grey darken-4 white--text">
              お届け先住所
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="名前"
                      outlined
                      dense
                      class="mb-n5 mt-3"
                      v-model="address.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="国"
                      outlined
                      dense
                      class="mb-n8"
                      v-model="address.country"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="都道府県"
                      outlined
                      dense
                      class="mb-n8"
                      v-model="address.state"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="住所"
                      outlined
                      dense
                      class="mb-n3"
                      v-model="address.address"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="郵便番号"
                      outlined
                      dense
                      v-model="address.zipCode"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="電話番号"
                      outlined
                      dense
                      v-model="address.phoneNumber"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-btn large rounded dark @click="onSubmitAddress">保存して次へ</v-btn>
                  </v-col>
                  <template v-if="addedAddress">
                    <v-col cols="12">
                      <v-radio-group v-model="arrivalDate" :mandatory="true" block>
                        <v-radio :label="`通常配送(配達予定日: ${defaultArrivalDate})`" :value="defaultArrivalDate"></v-radio>
                        <v-radio :label="`最短(配達予定日: ${earlyArrivalDate}, )`" :value="earlyArrivalDate"></v-radio>
                      </v-radio-group>
                      <v-btn large rounded dark @click="checkdShipment = true">支払いに進む</v-btn>
                    </v-col>
                  </template>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
          <template v-if="checkdShipment">
           <Stripe :arrivalDate="arrivalDate"/>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Stripe from '@/components/Stripe'
import { mapGetters } from 'vuex'
export default {
  middleware: 'authenticated',
  components: {
    Stripe,
  },
  async asyncData({$axios}) {
    const { address } = await $axios.$get('/api/addresses')
    return {
      address
    }
  },
  computed: {
    ...mapGetters(["getCartTotalPrice", "getCartLength"]),
    defaultArrivalDate() {
      return this.$dayjs().add(5, "d").format('YYYY-MM-DD');
    },
    earlyArrivalDate() {
      return this.$dayjs().add(2, "d").format('YYYY-MM-DD');
    }
  },
  data() {
    return {
      addedAddress: false,
      checkdShipment: false,
      arrivalDate: ""
    }
  },
  methods: {
    async onSubmitAddress() {
      const data = {
        country: this.address.country,
        state: this.address.state,
        address: this.address.address,
        name: this.address.name,
        zipCode: this.address.zipCode,
        phoneNumber: this.address.phoneNumber
      }
      const response = await this.$axios.$post('/api/addresses', data)

      if (response.success) this.addedAddress = true
    },
    onSubmitShipment() {
      this.checkdShipment = true
    }
  }
}
</script>
