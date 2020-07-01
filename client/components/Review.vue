<template>
  <div class="review">
    <v-card flat class="pa-1 mt-3" v-for="review in reviews" :key="review._id">
      <div>
        <v-avatar class="mr-2" size="25">
          <v-icon color="indigo" size="25px">account_circle</v-icon>
        </v-avatar>
        <span>{{ review.user.name }}</span>
      </div>
      <div>
        <v-rating
          :value="review.rating"
          background-color="white"
          color="orange accent-4"
          dense
          half-icons
          hover
          size="18"
          style="display: inline-block"
          class="ml-n1 mr-2"
          readonly
        ></v-rating>
        <span class="subtitle-2 font-weight-bold">{{ review.headline }}</span>
      </div>
      <v-card-text class="py-2">{{review.body}}</v-card-text>
      <v-img :src="review.photo" max-width="100px" max-height="100px"></v-img>
      <!-- <v-btn dark small class="mt-5">役に立った！</v-btn> -->
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["reviews"]
};
</script>