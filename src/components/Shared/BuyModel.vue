<template>
  <v-dialog width="320px" v-model="modal">
    <v-btn flat class="primary" slot="activator">Buy</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h2 class="text--primary">Do you want to buy it?</h2>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex xs12>
            <v-card-text>
              <v-text-field name="name" label="Your name" type="text" autocomplete='off' v-model="clientName"></v-text-field>
              <v-text-field name="phone" label="Your phone" type="text" autocomplete='off' v-model="clientPhone"></v-text-field>
              <v-text-field name="product_price" label="Product price" type="number" disabled v-model="product.price"></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>

        <v-layout>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="onCancel" :disabled="localLoading">Close</v-btn>
              <v-btn class="success" @click="onOrder" :disabled="localLoading"
              :loading="localLoading">Order</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["product"],
  data() {
    return {
      modal: false,
      clientName: "",
      clientPhone: "",
      localLoading: false
    };
  },
  methods: {
    onCancel() {
      this.modal = false;
      this.clientName = '';
      this.clientPhone = '';

      
    },
    onOrder() {
      if (
        this.clientName !== "" &&
        this.clientPhone !== "" 
      ) {
        this.localLoading = true;
        this.$store.dispatch("createOrder", {
          name: this.clientName,
          phone: this.clientPhone,
          productId: this.product.id,
          ownerId: this.product.ownerId
        }).finally(() => {
          this.name = '';
          this.phone='';
          this.localLoading = false;
          this.modal = false;
        });
      }
    }
  }
};
</script>

