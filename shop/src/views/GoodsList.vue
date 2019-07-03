<template>
 <div class="goodsList">
    <NavHeader></NavHeader>
    <div class="nav-breadcrumb-wrap">
    <div class="container">
        <NavBread>
            <template v-slot:content>
                <a href="/">首页</a>
                <span>商品列表</span>
            </template>
        </NavBread>
    </div> 
    </div>
    <div class="accessory-result-page accessory-page">
    <div class="container">
        <div class="filter-nav">
        <span class="sortby">排序:</span>
        <a href="javascript:void(0)" class="default cur">默认</a>
        <a href="javascript:void(0)" class="price">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
        <a href="javascript:void(0)" class="filterby stopPop">过滤规则</a>
        </div>
        <div class="accessory-result">
        <!-- filter -->
        <div class="filter stopPop" id="filter">
            <dl class="filter-price">
            <dt>价格:</dt>
            <dd><a href="javascript:void(0)">All</a></dd>
            <dd>
                <a href="javascript:void(0)">0 - 100</a>
            </dd>
            <dd>
                <a href="javascript:void(0)">100 - 500</a>
            </dd>
            <dd>
                <a href="javascript:void(0)">500 - 1000</a>
            </dd>
            <dd>
                <a href="javascript:void(0)">1000 - 2000</a>
            </dd>
            </dl>
        </div>

        <!-- search result accessories list -->
        <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
            <ul>
                <li>
                <div class="pic">
                    <a href="#"><img src="static/9.jpg" alt=""></a>
                </div>
                <div class="main">
                    <div class="name">XX</div>
                    <div class="price">999</div>
                    <div class="btn-area">
                    <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                </div>
                </li>
                <li>
                <div class="pic">
                    <a href="#"><img src="static/3.jpg" alt=""></a>
                </div>
                <div class="main">
                    <div class="name">XX</div>
                    <div class="price">1000</div>
                    <div class="btn-area">
                    <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                </div>
                </li>
                <li>
                <div class="pic">
                    <a href="#"><img src="static/7.jpg" alt=""></a>
                </div>
                <div class="main">
                    <div class="name">XX</div>
                    <div class="price">500</div>
                    <div class="btn-area">
                    <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                </div>
                </li>
                <li>
                <div class="pic">
                    <a href="#"><img src="static/6.jpg" alt=""></a>
                </div>  
                <div class="main">
                    <div class="name">XX</div>
                    <div class="price">2499</div>
                    <div class="btn-area">
                    <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                </div>
                </li>
            </ul>
            </div>
        </div>
        </div>
    </div>
    </div>
    <Modal :isMdShow="testshow" @close='modelshow'></Modal>
    <!--登录出现 -->
        <template>

        </template>
        <template>
            
        </template>
        <template>
            
        </template>
    <NavFooter></NavFooter>
 </div>
</template>
 
<script>
// 导入CSS
import '@/assets/css/base.css'
import '@/assets/css/product.css'
// 导入组件必须激活
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import NavBread from '@/components/NavBread'
import Modal from '@/components/Modal'
export default {
    data(){
     return{
         testshow:true
     }
    },
    methods:{
      modelshow(){
          this.testshow=false
      }
    },
    components: {
        // NavHeader: NavHeader
        NavHeader,
        // NavFooter: NavFooter
        NavFooter,
        // NavBread: NavBread
        NavBread,
        Modal,
    }
 }
</script>
 
<style scoped>
 
</style>