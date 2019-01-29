<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 v-if='loading' class='text-xs-center pt-5'>
          <v-progress-circular :size="100" :width="5" color="purple" indeterminate></v-progress-circular>
      </v-flex>
      <v-flex xs12 sm8 offset-sm2 v-else-if='!loading && orders.length !==0 '>
          <h1 class='text--secondary mb-3'>Orders</h1>
        <v-list
          subheader
          two-line
        >
        <h2 class='text--secondary text-xs-center pt-1' v-if='undoneOrders.length!==0'>New orders</h2>
          <v-list-tile avatar v-for='order in undoneOrders' :key='order.id'>
            <v-list-tile-action>
              <v-checkbox 
              color="orange darken-3"
              @change='markedDone(order)'
              :input-value="order.done"
              ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{order.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{order.phone}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-btn class="primary" :to="'/product/' + order.productId">Open</v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
           <h2 class='text--secondary text-xs-center pt-1' v-if='doneOrders.length!==0'>Done orders</h2>
           <v-list-tile class='pt-2' avatar v-for='order in doneOrders' :key='order.id'>
            <v-list-tile-action>
              <v-checkbox 
              color="orange darken-3"
              @change='markedDone(order)'
              :input-value="order.done"
              ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{order.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{order.phone}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-btn class="primary" :to="'/product/' + order.productId">Open</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
       <v-flex xs12 v-else class='text-xs-center '>
         <h1 class="text-secondary">You have no orders</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
        
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    doneOrders() {
      return this.$store.getters.doneOrders
    },
    undoneOrders() {
      return this.$store.getters.undoneOrders
    },
    orders() {
      return this.$store.getters.orders
    }
  },
  methods: {
      markedDone(order) {
          this.$store.dispatch('markOrderDone', {id:order.id, done:!order.done})
          .then(() => {
            order.done = !order.done
          })
          .catch(() => {})
      }
  },
  created() {
    this.$store.dispatch('takeOrders')
  }
};
</script>
<style scoped>
</style>