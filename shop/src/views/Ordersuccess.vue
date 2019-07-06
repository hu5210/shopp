<template>
 <div class="ordersuccess">
 <div>
  <div class="container">
    <div class="page-title-normal">
      <!-- <h2 class="page-title-h2"><span>检查</span></h2> -->
    </div>
    <!-- 进度条 -->
    <div class="check-step">
        <ul>
          <li><span>确认</span> 地址</li>
          <li><span>确定</span> 订单</li>
          <li class="cur"><span>查看</span> 订单</li>
        </ul>
    </div>

    <div class="order-create">
      <div class="order-create-pic"><img src="../../static/ok-2.png" alt=""></div>
      <div class="order-create-main">
        <h3>祝贺你! <br>你的订单创建成功!</h3>
        <p>
          <span>订单编号：{{orderinfo.order_no}}</span>
          <span>订单总价：{{orderinfo.total_price}}</span>
        </p>
        <div class="order-create-btn-wrap">
          <div class="btn-l-wrap">
            <a href="javascript:;" class="btn btn--m">返回购物车</a>
          </div>
          <div class="btn-r-wrap">
            <a href="javascript:;" class="btn btn--m">订单列表</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
 </div>
</template>
 
<script>
import axios from 'axios'
export default {
  data(){
return{
  orderinfo:{},
}
  },
  created(){
this.initdata()
  },
  methods:{
   initdata() {
     let userId=localStorage.getItem('userId')
     let orderId = this.$route.params.id
      axios({
        url:"http://118.31.9.103/api/order/detail",
        method:"post",
        data:`userId=${userId}&orderId=${orderId}`
      }).then(res => {
        //将接口数据 保存到 模型中
        this.orderinfo = res.data.data
      }).catch(error=>{
        console.log(error)
      })
    }
    }
  }

</script>
 
<style scoped>
 
</style>