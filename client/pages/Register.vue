<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8" md="6" lg="5">
        <v-card class="text-center">
          <h2 class="text-center pt-4">Register</h2>
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

              <v-text-field
                label="Password"
                prepend-icon="vpn_key"
                v-model="form.password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-btn class="mb-8" large dark @click="onRegister">Submit</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // middleware: 'guest',
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      }
    }
  },
  methods: {
    async onRegister() {
      try {
        const { success } = await this.$axios.$post('/api/auth/register', this.form)
        if (success) {
          await this.$store.dispatch('auth/login', this.form)
          this.$toast.success('登録完了しました');
          this.$router.push('/')
        }
      } catch (err) {
        this.$toast.error(err.message);
      }
    }
  }
}
</script>

<style>

</style>