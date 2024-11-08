<template>
    <div class="content-area">
       <h2>Order</h2>
       <table>
        <thead>
            <th>#</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
        </thead>
        <tbody>
            <tr v-for="(order,idx) in orders" :key="idx">
                <td></td>
                <td style="width:40%">{{ order.products[0].name }}</td>
                <td style="text-align: center;"><span style="background-color: #4ca94c;padding:6px 10px;border-radius:15px;font-size:12px;color:#fff;">{{ order.totalAmount }}</span></td>
                <td style="width:20%;text-align: center;">
                {{  order.status }}
                    
                </td>
            </tr>
        </tbody>
       </table>
    </div>
</template>


<script>



import axios from 'axios';
    export default {
        data() {
            return {
                orders: [],
                selectedStatus: '0',
                orderStatus: '',
            }
        },
        methods:{
            
            async getAllOrders(){
                try {
                    const response = await axios.get('http://localhost:3000/orders');
                    console.log('Orders',response.data);
                    this.orders = response.data;
                    
     
                } catch (error) {
                    console.log('fetch order error',error);
                }
                
            },

            async changeStatus(id){
                try {

                   const response = await axios.put(`http://localhost:3000/orders/`+id, {
                    status: this.selectedStatus
                });
                    console.log('order: ',response.data);
                } catch (error) {
                    console.log('change status error', error);
                }
            },
        },
        async mounted() {
    await this.getAllOrders();
   
  },
    };
</script>