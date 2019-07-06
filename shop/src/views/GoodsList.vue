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
            <a href="javascript:void(0)" class="price" v-bind:class="{'sort-up':order}" @click="goods">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
        <a href="javascript:void(0)" class="filterby stopPop">过滤规则</a>
        </div>
        <div class="accessory-result">
        <!-- filter -->
        <div class="filter stopPop" id="filter">
            <dl class="filter-price">
           <dt>价格:</dt>
<dd>
<a href="javascript:void(0)" v-bind:class="{'cur':maxprice=='all'}" @click="goodsWhere('all','all')">All</a>
</dd>
<dd>
<a href="javascript:void(0)" v-bind:class="{'cur':maxprice==100}" @click="goodsWhere(0,100)">0 - 100</a>
</dd>
<dd>
<a href="javascript:void(0)" v-bind:class="{'cur':maxprice==500}" @click="goodsWhere(100,500)">100 - 500</a>
</dd>
<dd>
<a href="javascript:void(0)" v-bind:class="{'cur':maxprice==1000}" @click="goodsWhere(500,1000)">500 - 1000</a>
</dd>
<dd>
<a href="javascript:void(0)" v-bind:class="{'cur':maxprice==2000}" @click="goodsWhere(1000,2000)">1000 - 2000</a>
</dd>
</dl>
        </div>

        <!-- search result accessories list -->
        <div class="accessory-list-wrap bscroll"   ref="wrapperMenu">
            <div class="accessory-list col-4 ">
            <ul>
                <li v-for="(goods,index) in goodList" v-bind:key="index">
                <div class="pic">
                    <a href="#"><img :src="goods.img2" alt=""></a>
                </div>
                <div class="main">
                    <div class="name">{{goods.title}}</div>
                    <div class="price">{{goods.price}}</div>
                    <div class="btn-area">
                    <a href="javascript:;" class="btn btn--m" @click="cartdata(goods.id)">加入购物车</a>
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
     <!-- 加入购物车弹框1 -->
    <Modal v-bind:isMdShow="isCartOkShowFlag" @close="isCartOkShowFlag = false">
        <template v-slot:main>
            请先登录，否则无法加入到购物车中!
        </template>
        <template v-slot:btn>
            <a class="btn btn--m" href="javascript:;" @click="isCartOkShowFlag = false">关闭</a>
        </template>
    </Modal>
    <Modal :isMdShow="isCartErrorShowFlag" @close='isCartErrorShowFlag = false'>
      <template v-slot:main>
            <svg class="icon-status-ok">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
            </svg>
            <span>加入购物车成!</span>
        </template>
        <template v-slot:btn>
            <a class="btn btn--m" href="javascript:;" @click="isCartErrorShowFlag=false">
            继续购物
            </a>
            <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">
            查看购物车
            </router-link>
        </template>
    </Modal>
     <input type="button" value="加入购物车弹框1" @click="isCartErrorShowFlag = true" style="display:none">
    <input type="button" value="加入购物车弹框2" @click="isCartOkShowFlag = true" style="display:none">
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
import axios from 'axios'
import BScroll from "better-scroll";
export default {
    created(){
this.initdata()
setTimeout(() => {
                this.$nextTick(()=>{
                    this.scrollFn()
                })
            }, 20)
    },
    data(){
     return{
         dropDown:false,
         pagesize:8,
         maxprice:'all',
         minprice:'all',
         goodList:[],//接收数据
         order:false,
         testshow:false,//声明弹框
         isCartErrorShowFlag:false,
         isCartOkShowFlag:false
     }
    },
    methods:{
         goodsWhere(minprice,maxprice){
            this.initdata()
            this.minprice=minprice
            this.maxprice=maxprice
        },
        goods(){
            this.order=!this.order
           this.initdata()
        },
      modelshow(){
          this.testshow=false
      },
      cartdata(goodsId){
          //用户是否登录
          let userId=localStorage.getItem('userId')
          if(!userId){
            this.isCartOkShowFlag =true
             return//截断下部的代码
          }
          //用户登录发布异步请求
        axios({
           url:'http://118.31.9.103/api/cart/create',
           data:`userId=${userId}&goodsId=${goodsId}`,
           method:'post', 
        }).then(res=>{
            if(res.data.meta.state==201){
                this.isCartErrorShowFlag = true
            }else{
                alert(res.data.meta.msg)
            }
        }).catch(error=>{
            console.log(error)
        }) 
      },
        initdata(){
          let order=this.order? 'asc':'desc'
          axios({
              url:`http://118.31.9.103/api/goods/index?order=${order}&maxprice=${this.maxprice}&minprice=${this.minprice}&pagesize=${this.pagesize}`,
              method:'get',
          }).then(res=>{
              this.goodList=res.data.data
              console.log(this.goodList)
          }).catch(error=>{

          })
      },
        scrollFn(){
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.wrapperMenu, {
                        click: true,
                        
                    });
                }else{
                    this.scroll.refresh();
                }
                this.scroll.on('scroll', (pos) => {
                    console.log(pos.y,this.dropDown)
                    //如果下拉超过50px 就显示下拉刷新的文字
                    if(pos.y>50){
                        this.dropDown = true
                    }else{
                        this.dropDown = false
                    }
                })
                //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
                this.scroll.on('touchEnd', (pos) => {
                    // 下拉动作
                    if(pos.y > 50){
                        console.log("下拉刷新成功")
                        this.dropDown = false
                    }
                    //上拉加载 总高度>下拉的高度+10 触发加载更多
                    if(this.scroll.maxScrollY>pos.y+10){
                        console.log("加载更多")
                        //使用refresh 方法 来更新scroll  解决无法滚动的问题
                        this.scroll.refresh()
                    }
                })
            });
        },
    //    mounted(){
    //       setTimeout(() => {
    //             this.$nextTick(()=>{
    //                 this.scrollFn()
    //             })
    //         }, 20)
    //         console.log(2)
    // },
    },
    
    components: {
        // NavHeader: NavHeader
        NavHeader,
        // NavFooter: NavFooter
        NavFooter,
        // NavBread: NavBread
        NavBread,
        Modal,
        axios,
    }
 }
</script>
 
<style scoped>
 .bscroll{
    width: 100%;
    overflow: hidden;
}

</style>