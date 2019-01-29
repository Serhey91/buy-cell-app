<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list>
        <v-list-tile v-for="(link, index) of links" :key="index" :to="link.url">
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
         <v-list-tile v-if='isUserLoggedIn' @click='logOut'>
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Logout'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark color="elevation-0">
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer= !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">Vuetify app</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="(link,index) in links" :key="index" :to="link.url" flat>
          <v-icon left>{{link.icon}}</v-icon>
          {{link.title}}
        </v-btn>
         <v-btn v-if='isUserLoggedIn' flat @click='logOut'>
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <template v-if="error">
      <v-snackbar
        @input="closeError"
        :multi-line="true"
        :bottom="true"
        :timeout="6000"
        :value="true"
        color='error'
      >
        {{error}}
        <v-btn dark flat @click="closeError">Close</v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data() {
    return {      
      drawer: false
    };
  },
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    },
    logOut() {
      this.$store.dispatch('logoutUser');
      this.$router.push('/')
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          {
            title: "Orders",
            icon: "description",
            url: "/orders"
          },
          {
            title: "New product",
            icon: "add_circle_outline",
            url: "/new"
          },
          {
            title: "My products",
            icon: "history",
            url: "/list"
          }
        ];
      } else {
        return [
          {
            title: "Login",
            icon: "verified_user",
            url: "/login"
          },
          {
            title: "Registration",
            icon: "how_to_reg",
            url: "/registration"
          }
        ];
      }
    }
  }
};
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
</style>

