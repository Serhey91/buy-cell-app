<template>
  <v-container>
    <v-layout row v-if='!loading && userProducts.length !==0'>
      <v-flex xs12 sm8 offset-sm2>
        <h1 class="text--secondary mb-3">My products</h1>
        <v-card class="mb-5 elevation-10" v-for="product in userProducts" :key="product.id">
          <v-layout row>
            <v-flex xs-4>
              <v-img :src="product.imgSrc" height='100%'></v-img>
            </v-flex>
            <v-flex xs-8>
              <v-card-text>
                <h3 class="text--primary">{{product.title}}</h3>
                <p>{{product.description}}</p>
                <b>{{product.price}}</b>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :to="'/product/' + product.id" class="info">Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>         
        </v-card>
      </v-flex>
    </v-layout>
     <v-layout v-else-if='!loading && userProducts.length === 0'>
              <v-flex xs12 sm8 offset-sm2 class='text-xs-center'>
                <h1 class="text-primary">You have no products</h1>
            </v-flex>
          </v-layout>
            <v-layout v-else>
              <v-flex xs12 sm8 offset-sm2 class='text-xs-center'>
               <v-progress-circular :size="100" :width="5" color="purple" indeterminate></v-progress-circular>
            </v-flex>
          </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    userProducts() {
      return this.$store.getters.userProducts
    },
    loading() {
      this.$store.getters.loading
    }
  }
};
</script>
<style scoped>
</style>