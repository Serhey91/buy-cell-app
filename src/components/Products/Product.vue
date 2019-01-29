<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="!loading">
          <v-img :src="product.imgSrc" height="300px"></v-img>
          <v-card-text>
            <h1>{{product.title}}</h1>
            <p>{{product.description}}</p>
            <b>{{product.price}}</b>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="danger" @click="$router.go(-1)">Go back</v-btn>
            <product-modal :product="product" v-if='isOwner'></product-modal>
            <app-buy-modal :product="product" v-if='!isOwner'></app-buy-modal>
          </v-card-actions>
        </v-card>
        <div v-else class="text-xs-center" pt-5>
          <v-progress-circular :size="100" :width="5" color="purple" indeterminate></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Modal from "./EditModal";
export default {
  props: ["id"],
  computed: {
    product() {
      const id = this.id;
      return this.$store.getters.productById(id);
    },
    loading() {
      return this.$store.getters.loading;
    },
    isOwner() {
      if (!this.$store.getters.user) {        
        return false
      }   
      else {
        return this.product.ownerId === this.$store.getters.user.id
      }
    }
  },
  components: {
    productModal: Modal
  },
  created() {
    console.log(this.$store.getters.user)
  }
};
</script>
<style scoped>
</style>