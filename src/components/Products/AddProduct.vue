<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2>
        <h1 class="text-secondary mb-3">Create new product</h1>
        <v-form ref="form" v-model="valid" class='mb-3' validation>
          <v-text-field
            name="title"
            label="Ad title"
            type="text"
            v-model="title"
            required
            :rules="[v => !!v || 'Title is required']"
            autocomplete="off"
          ></v-text-field>
            <v-text-field
            name="price"
            label="Ad price"
            type="number"
            v-model="price"
            required
            :rules="[v => !!v || 'Price is required']"
            autocomplete="off"
          ></v-text-field>
          <v-textarea
            name="description"
            label="Ad description"
            type="text"
            v-model="description"
            :rules="[v => !!v || 'Description is required']"
          ></v-textarea>
        </v-form>
        <v-layout row mb-3>
          <v-flex xs12>
            <v-btn color="error" @click='uploadImage'>Upload
              <v-icon  right dark>cloud_upload</v-icon>
            </v-btn>
            <input 
            type="file" 
            ref='fileInput' 
            accept='image/*' 
            style='display:none'
            @change='onFileChanged'>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img v-if='imageSrc'
              :src="imageSrc"
              height="150px"
              width='200px'
              alt
            >
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-switch 
            label="Add to promo" 
            v-model="promo"></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
           <v-spacer></v-spacer>
            <v-btn class='success'
             :disabled="!valid || !image || loading"
              @click='createProduct'
              :loading='loading'>Create new product</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
        title: '',
        description: '',
        promo: false,
        valid: false,
        price: 0,
        image: null,
        imageSrc: ''
    };
  },
  methods: {
    uploadImage() {
      this.$refs.fileInput.click();
    },
    onFileChanged(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result

      }
      reader.readAsDataURL(file);
      this.image = file
    },
      createProduct() {
          if(this.$refs.form.validate() && this.image){
              const product = {
                  title: this.title,
                  description: this.description,
                  price: this.price,
                  promo: this.promo,
                  image: this.image
              }
              console.log(product)
              this.$store.dispatch('createNewProduct', product).
              then(() => {
                this.$router.push('/list')
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