<template>
  <div>
    <!-- Drawer -->
    <v-navigation-drawer app v-model="drawer" clipped dark class="text-bold">
      <v-container>
        <v-list-item>
          <v-list-item-title class="title grey--text text--darken-2" dark color="primary">
            <v-list-item-icon>
              <v-icon>account_circle</v-icon>
            </v-list-item-icon>
            <template v-if="loggedIn">
              {{ currentUser.name }}
            </template>
            <template v-else>
              "ようこそ"
            </template>
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
          <v-list-item nuxt-link to="/cart">
            <v-list-item-icon>
              <v-badge color="green" :content="cartLength">
                <v-icon>shopping_cart</v-icon>
              </v-badge>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Cart</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-for="nav_list in nav_lists" :key="nav_list.name" nuxt-link :to="nav_list.link">
            <v-list-item-icon>
              <v-icon>{{ nav_list.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-navigation-drawer>

    <!-- Navbar -->
    <v-app-bar app clipped-left dark>
      <v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <n-link to="/" class="white--text">
          <span class="font-weight-light">NUXT</span>
          <span class="title grey--text lighten-4 ml-n1">EC</span>
        </n-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- serch form -->

      <!-- Buttons -->
      <template v-if="loggedIn">
        <v-toolbar-items class="ml-3">
          <v-btn text @click="onLogout">
              Logout
          </v-btn>
        </v-toolbar-items>
      </template>
      <template v-else>
        <v-toolbar-items class="ml-3">
          <v-btn text>
            <nuxt-link to="/login" class="white--text text-bold">
              Login
            </nuxt-link>
          </v-btn>
        </v-toolbar-items>
        <v-btn outlined >
          <nuxt-link to="/register" class="white--text text-bold">
            Get Started
          </nuxt-link>
        </v-btn>
      </template>
    </v-app-bar>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      drawer: false,
      nav_lists: [
        { name: "Profile", icon: "create", link: "/profile" },
        { name: "Orders", icon: "storage", link: "/orders" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/getCurrentUser',
      cartLength: 'getCartLength',
      loggedIn: 'auth/loggedIn'
    })
  },
  methods: {
    onLogout() {
      this.$store.dispatch('auth/logout')
        .then(_ => {
          this.$toast.success('ログアウトしました');
        }).catch(err => {
          this.$toast.error(err);
        });
    }
  }
};
</script>
