<template>
  <v-dialog width="320px" v-model="modal">
    <v-btn flat class="warning" slot="activator">Edit</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Edit ad</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex xs12>
            <v-card-text>
              <v-text-field name="title" label="Title" type="text" v-model="editedTitle"></v-text-field>
              <v-text-field name="price" label="Price" type="number" v-model="editedPrice"></v-text-field>
              <v-text-field
                name="description"
                label="Description"
                type="text"
                v-model="editedDescription"
                multi-line
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>

        <v-layout>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="onCancel">Cancel</v-btn>
              <v-btn class="success" @click="onSave">Save</v-btn>
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
      editedTitle: this.product.title,
      editedPrice: this.product.price,
      editedDescription: this.product.description
    };
  },
  methods: {
    onCancel() {
        this.modal= false;
        this.editedTitle = this.product.title;
        this.editedPrice= this.product.price;
      this.editedDescription= this.product.description;
    },
     onSave() {
      if (this.editedDescription !== '' && this.editedTitle !== '' && this.editedPrice !== 0) {
          this.$store.dispatch('updateProduct', {
              title: this.editedTitle,
              description: this.editedDescription,
              price: this.editedPrice,
              id: this.product.id
          })
          this.modal = false;

      }
  }
  },
 
};
</script>
