
<template>
  <div class="message" >
  {{ message }}
  </div>
  <button class="btn-add" >
    <router-link to="/product/create">Add Product</router-link>
  </button>
  <form  @submit.prevent="editProduct(productEditId)" method="post">
    <div v-if="productEdit" class="modal">
    <div class="modal-content">
      <div class="input-box">
        <div class="input">
          <input type="text" v-model="productEditName" >
        <input type="text" v-model="productEditPrice" name="" id="">
        <input type="text" v-model="productEditStock" name="" id="">
        <input type="text" v-model="productEditCategory" name="" id="">
        </div>
        <div class="button-area">
          <button type="submit">Save</button>
        </div>
      </div>
      
    </div>
  </div>
  </form>
    <div class="table-area">
      <h1>Product List</h1>
      <table v-if="products">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product,idx) in products" :key="idx">
            <td></td>
            <td style="width:40%;padding-left:50px;">{{  product.name }}</td>
            <td style="text-align: center;"><span style="background-color: #7f7fee;padding:6px 10px;border-radius:15px;font-size:12px;color:#fff;">{{  product.price }}</span></td>
            <td style="text-align: center;"><span style="background-color: #4ca94c;padding:6px 10px;border-radius:15px;font-size:12px;color:#fff;">{{  product.quantity_in_stock }}</span></td>
            <td style="text-align: center;">{{  product.category }}</td>
            <td style="text-align: center;">{{  product.createdAt }}</td>
            <td style="text-align: center;">
              <button @click="getProduct(product._id)">Edit</button>
              <button @click="deleteProduct(product._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-else class="none">
          <p>
            ตอนนี้ยังไม่มีสินค้าในระบบ
          </p>
      </div>
    </div>
</template>
  
  <script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      productName: '',
      productPrice: '',
      productEditName: '',
      productEditPrice: '',
      productEditCategory: '',
      productEditStock: '',
      productEditId: null,
      productCount: 1,
      message:'',
      add_check: false,
      productEdit: false,
    };
  },
  async mounted() {
    await this.fetchProducts();
    
  },
  methods: {
    addCheck(){

      this.add_check = !this.add_check;
      console.log(this.add_check);
    },
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/products');
        this.products = response.data; // Adjust based on your API response structure
      } catch (err) {
        this.error = 'Failed to fetch products. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    async addProduct() {
      try {
        // ส่งคำขอ POST ไปยัง API เพื่อเพิ่มสินค้า
        const response = await axios.post('http://localhost:3000/products', {
          name: this.productName,
          price: this.productPrice,
        });
        this.products.push(response.data);

       
        this.productName = '';
        this.productPrice = '';

        this.message = "Add Product Successfully";
       
      } catch (error) {// ถ้ามีข้อผิดพลาด
        console.error('Error adding product:', error);
        alert('Error adding product!');
      }
    },

    async getProduct(id){
      const response = await axios.get('http://localhost:3000/products/'+id);
      this.productEdit = true;
      this.productEditName = response.data.name;
      this.productEditPrice = response.data.price;
      this.productEditStock = response.data.quantity_in_stock;
      this.productEditCategory = response.data.category;
      this.productEditId = response.data._id;
      console.log('Product Name:',response.data.name,'\nProduct Price: ', response.data.price);
      
    },


    async deleteProduct(id){
      const response = await axios.delete('http://localhost:3000/products/'+id);
      this.products = this.products.filter(product => product._id !== id);
      console.log(response);
      this.message = 'Delete Product ID: '+id;
      
      const msgBox = document.getElementsByClassName('message')[0]; // เลือกตัวแรกใน HTMLCollection

        // แสดง message box
        msgBox.classList.add('show-message');

        // ซ่อน message box หลังจาก 3 วินาที
        setTimeout(() => {
            msgBox.classList.remove('show-message');
        }, 3000);
      
    },

    async editProduct(id) {
  try {
    const updatedProduct = {
      name: this.productEditName,
      price: this.productEditPrice,
      quantity_in_stock: this.productEditStock,
      category: this.productEditCategory,
    };

    const response = await axios.put(`http://localhost:3000/products/${id}`, updatedProduct);
    console.log('Product updated:', response.data); 
    
    this.products = this.products.map(product => 
      product._id === id ? { ...product, ...response.data } : product
    );

   
    this.message = "Edited Product ID :"+id;
    const msgBox = document.getElementsByClassName('message')[0]; // เลือกตัวแรกใน HTMLCollection

        // แสดง message box
        msgBox.classList.add('show-message');

        // ซ่อน message box หลังจาก 3 วินาที
        setTimeout(() => {
            msgBox.classList.remove('show-message');
        }, 3000);
      


  } catch (error) {
    console.error('Error updating product:', error);
    alert('Failed to update product!');
  }
}


  }


};
</script>


<style>
*{
  margin:0;
  padding:0;
  font-family: kanit, sans-serif;
  box-sizing: border-box;
  
}
table{
  width:100%;
  border-collapse: collapse;
  margin-top:20px;
  th{
    font-weight: 400;
    border-bottom: 1px solid #ccc;
    padding-bottom:20px;
    
  }
  
  td{
    padding-top:10px;
    padding-bottom: 10px;
  }
}

.table-area{
  background-color: #fff;
  width:1140px;
  height:70vh;
  border-radius:20px;
  padding:30px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.none{
  display: flex;
  justify-content: center;
  position: relative;
  top:120px;
  width:100%;
  height:100%;
p{
  margin-top:30px;
 color:gray;
 font-size:14px;
}
}

.btn-add{
  background-color: #4ca94c;
  border-radius: 8px;
  padding:8px 15px;
  color:#fff;
  border:none;
  margin-bottom:10px;
  cursor: pointer;
}
button a{
  text-decoration: none;
  color:#fff;
}

.modal{
  margin:10px;
  background-color: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding:10px;
  border-radius: 8px;
  input{
    border: 1px solid #ccc;
    border-radius: 15px;
    padding:6px 15px;
  }
}

.input-box{
  display:flex;
  align-items: center;
  justify-content: space-between;
  input{
    margin-right:10px;
  }
  button{
    background-color: #000;
    color:#fff;
    border:none;
    padding:6px 15px;
    border-radius: 15px;
    cursor: pointer;
  }
}

button{
  background-color: #000;
    color:#fff;
    border:none;
    padding:6px 15px;
    border-radius: 15px;
    cursor: pointer;
    margin-right:5px; 
}

.message{
  color:#fff;
  position: fixed;
  width:300px;
  top:75px;
  right:10px;
  padding:10px 15px;
  transform: translateX(500px);
  transition: 0.4s;
  background-color: #000;
  
}
.show-message
 {
  transform: translateX(0px);
  transition: 0.4s;
}
</style>