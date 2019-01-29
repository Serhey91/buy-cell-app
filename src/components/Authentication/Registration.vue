<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="elevation-0">
            <v-toolbar-title>Registration form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" validation>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="email"
                v-model="email"
                :rules="emailRules"
                autocomplete='off'
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                :counter="6"
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
               <v-text-field
                id="confirmPassword"
                prepend-icon="lock"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                :counter="6"
                v-model="confirmPassword"
                :rules="confirmPasswordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
            color="elevation-0" 
            :disabled="!valid || loading" 
            class="elevation-10" 
            :loading='loading'
            @click="onSubmit">Create account</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      valid: false,
      confirmPassword: '',
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
          v => !!v || 'Password is required',
        v => (v && v.length >=6) || 'Password must be more than 6 simbols'
      ],
      confirmPasswordRules: [
           v => !!v || 'Password is required',
           v => v === this.password || 'Passwords should match'
      ]
    };
  },
  methods: {
    onSubmit() {
        if (this.$refs.form.validate()) {
            const user = {
                email: this.email,
                password: this.password
            };
           this.$store.dispatch('registerUser', user)
           .then(() => {
             this.$router.push('')
           })
           .catch(() => {})
        }
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  }
};
</script>
<style scoped>
</style>