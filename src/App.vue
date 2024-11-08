<template>

    <nav>
      <div class="logo">
        <h2>Store</h2>
      </div>
      <ul>
        <li><router-link to="/">Product</router-link></li>
        <li><router-link to="/order">Order</router-link></li>
       
      </ul>
    </nav>


  
  <div class="container">
    {{ test }}
    <router-view></router-view>
  </div>
</template>

<script>



export default {
  data(){
    return{
     
    }
  },
};
</script>


<style>
  nav{
    width:100%;
    background-color: #fff;
    height:60px;
    border-bottom:1px solid #ccc;
    display:flex;
    justify-content: space-between;
    align-items: center;
    .logo{
      color:blue;
      margin-left:30px;
    }
    ul{
      display: flex;
      gap:10px;
      margin-right:30px;
    }
    ul li{
       list-style: none;
    }
    ul li a{
      color:#000;
      padding:10px 15px;
      text-decoration: none;
    }
  }

  body{
 
  background-color: rgb(244, 240, 252);
  
}
.container{
  width:1140px;
  margin:0 auto;
  margin-top:50px;
}
</style>