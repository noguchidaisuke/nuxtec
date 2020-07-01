<template>
  <div class="address_index">
    <v-container>
      <h1 class="my-5">お届け先住所一覧</h1>
      <v-btn dark class="font-weight-bold mb-8">Add New Address</v-btn>
      <v-row>
        <v-col cols="6" md="4" v-for="address in addressData" :key="address.zipCode">
          <v-card>
            <v-card-text>
              <div>{{address.country}}</div>
              <div>{{address.address}}</div>
              <div>{{address.zipCode}}</div>
              <div>{{address.phoneNumber}}</div>
            </v-card-text>
            <v-card-subtitle>
              <span class="mr-3">Edit</span>|
              <span class="mx-3">Remove</span>|
              <span class="ml-3">Set as Default</span>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addressData: [
        {
          country: "JPN",
          address: "東京都墨田区",
          phoneNumber: "123-345-567",
          zipCode: "123-0000"
        },
        {
          country: "JPN",
          address: "東京都墨田区",
          phoneNumber: "123-345-567",
          zipCode: "123-0000"
        }
      ]
    };
  }
};
</script>

<style>
  .address_outline {
    border-radius: 4px;
  }
</style>