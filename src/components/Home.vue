<template>
  <div v-if='!loading'>
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item 
            v-for="(item,i) in promoProducts" 
            :key="i" 
            :src="item.imgSrc">
            <div class="product-link">
                <v-btn class="error" :to="'/product/' + item.id">{{item.title}}</v-btn>
            </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex md4 sm6 xs12 v-for="(item,i) in products" :key="i">
          <v-card>
            <v-img :src="item.imgSrc" aspect-ratio="2.75"></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{item.title}}</h3>
                <div>{{item.description}}</div>
                <b>{{item.price}}</b>
              </div>
            </v-card-title>
            <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn flat :to="'/product/' + item.id">Open</v-btn>
             <app-buy-modal :product='item' v-if='!isOwner(item)'></app-buy-modal>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs12 class='text-xs-center' pt-5>
          <v-progress-circular
          :size="100"
          :width='5'
          color='purple'
          indeterminate></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  computed: {
    promoProducts() {
      return this.$store.getters.promoProducts
    },
    products() {
      return this.$store.getters.products
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {    
    isOwner(item) {
      console.log(item)
      if (!this.$store.getters.user) {        
        return false
      }   
      else {
        return item.ownerId === this.$store.getters.user.id
      }
    }
  }
};
</script>
<style scoped>
.product-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(0, 0, 0, 0.5);
    transform: translate(-50%, 0);
    padding: 5px 15px;
    border-radius: 5px 5px 0px 0px;
}
</style>

