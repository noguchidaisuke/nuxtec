<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8" md="6" lg="5">
        <v-card class="text-center">
          <h2 class="text-center pt-4">Address</h2>
          <v-card-text>
            <v-form>
              <v-text-field
                label="国"
                prepend-icon="person"
                v-model="country"
              ></v-text-field>

              <v-text-field
                label="住所"
                prepend-icon="email"
                v-model="address"
              ></v-text-field>

              <v-text-field
                label="電話番号"
                prepend-icon="vpn_key"
                v-model="phoneNumber"
              ></v-text-field>

              <v-text-field
                label="郵便番号"
                prepend-icon="vpn_key"
                v-model="zipCode"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-btn class="mb-8" large dark >Submit</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData() {
  },
  data() {
    return {
      country: "",
      address: "",
      phoneNumber: "",
      zipCode: ""
    }
  }
}
</script>

<style>

</style>