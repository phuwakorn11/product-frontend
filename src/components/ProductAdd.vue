<template>

    <div class="content-area">
        <p v-if="message" style="color:#323232;background-color: antiquewhite;padding:10px;border-radius:15px;margin-bottom:10px;">
            {{ message }}
        </p>
        <h2>Product Add</h2>
        <form @submit.prevent="addProduct" method="post">
            <div class="product-add-grid">
                <div class="product-item">
                    <input type="text" v-model="product.name" id="" placeholder="Product name" required>
                </div>
                <div class="product-item">
                    <input type="number" v-model="product.price" id="" placeholder="Product Price" required>
                </div>
                <div class="product-item">
                    <input type="number" v-model="product.quantity_in_stock" id="" placeholder="Product Stock" required>
                </div>
                <div class="product-item">
                    <input type="text" v-model="product.category" id="" placeholder="Product Category" required>
                </div>
            </div>

            <!-- ปุ่ม Save -->
            <div class="bottom">
                <div class="bottom-inner">
                <button type="submit" :disabled="loading">
                    <span v-if="loading">Saving...</span>
                    <span v-else>Save</span>
                </button>
                </div>
            </div>
            
        </form>


       
    </div>
</template>


<style>
.content-area {
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    width: 1140px;
    height: 70vh;
    border-radius: 20px;
    padding: 30px;
}

.product-add-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 60px;

    input[type="text"],
    input[type="number"] {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #ccc;
        padding: 8px 15px;
        border-radius: 15px;
    }

}

.bottom {
    display: flex;
    justify-content: flex-end;
    margin-top: 60px;
}

</style>


<script>

import axios from 'axios';
export default {
    data() {
        return {
            product: {
                name: '',
                price: '',
                quantity_in_stock: '',
                category: '',
                message: '',
            },
            loading: false,
            success: false,
        };
    },
    methods: {
        async addProduct() {
            this.loading = true; // ตั้งค่าการโหลดเมื่อเริ่มทำงาน

            try {
                const newProduct = {
                    name: this.product.name,
                    price: this.product.price,
                    quantity_in_stock: this.product.quantity_in_stock,
                    category: this.product.category,
                };

                console.log(newProduct);
               
                const response = await axios.post('http://localhost:3000/products', newProduct);
                
                console.log(response, "Product added successfully");
                this.message = 'Product added successfully!';
               
              


                setTimeout(() => {
                    
    this.$router.push({ path: '/' });
}, 2000);
             
            

            } catch (error) {
                console.error('Error adding product:', error);
                alert('Error adding product!');
            } finally {
                this.loading = false; // ปิดสถานะการโหลด
            }
        },

        // ฟังก์ชันรีเซ็ตฟอร์ม
        resetForm() {
            this.product.name = '';
            this.product.price = '';
            this.product.quantity_in_stock = '';
            this.product.category = '';
        }
    }
};
</script>
