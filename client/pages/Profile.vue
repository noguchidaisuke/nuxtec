<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8" md="6" lg="5">
        <v-card class="text-center">
          <h2 class="text-center pt-4">プロフィール</h2>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Name"
                prepend-icon="person"
                v-model="form.name"
              ></v-text-field>

              <v-text-field
                label="Email"
                prepend-icon="email"
                v-model="form.email"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-btn class="mb-8" large dark @click="onEditUser">変更</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: 'authenticated',
  data() {
    return {
      form: {
        name: this.$store.getters['auth/getCurrentUser'].name,
        email: this.$store.getters['auth/getCurrentUser'].email
      }
    }
  },
  methods: {
    onEditUser() {
      this.$axios.$put('/api/auth/user',this.form)
        .then(user => {
          this.$store.commit('auth/setUser', user);
          this.$toastr.success('編集しました');
          this.$router.push('/');
        }).catch(err => {
          this.$toastr.error('編集に失敗しました')
          console.log(err);
        });
    }
  }
}
</script>

<style>

</style>