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
          <a
            href="javascript:void(0)"
            class="price"
            v-bind:class="{'sort-up':order}"
            @click="goodkey"
          >
            价格
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short" />
            </svg>
          </a>
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
                <a href="javascript:void(0)" v-bind:class="{'cur':maxprice==500}" @click="goodsWhere(100,500)" >100 - 500</a>
              </dd>
              <dd>
                <a href="javascript:void(0)" v-bind:class="{'cur':maxprice==1000}" @click="goodsWhere(500,1000)">500 - 1000</a>
              </dd>
              <dd>
                <a  href="javascript:void(0)" v-bind:class="{'cur':maxprice==2000}" @click="goodsWhere(1000,2000)">1000 - 2000</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(shuju,index) in shujus" v-bind:key="index">
                  <div class="pic">
                    <a href="#">
                      <img v-bind:src="shuju.img2" alt />
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{shuju.title}}</div>
                    <div class="price">{{shuju.price}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal :isMdShow="testshow" @close="modelshow"></Modal>
    <Modal :isMdShow="isCartErrorShowFlag" @close="isCartErrorShowFlag = false">
      <template v-slot:main>
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok" />
        </svg>
        <span>加入购物车成!</span>
      </template>
      <template v-slot:btn>
        <a class="btn btn--m" href="javascript:;" @click="isCartErrorShowFlag=false">继续购物</a>
        <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
      </template>
    </Modal>
    <input type="button" value="加入购物车弹框1" @click="isCartErrorShowFlag = true" />
    <input type="button" value="加入购物车弹框2" @click="isCartOkShowFlag = true" />
    <NavFooter></NavFooter>
  </div>
</template>
 
<script>
// 导入CSS
import "@/assets/css/base.css";
import "@/assets/css/product.css";
// 导入组件必须激活
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";
import NavBread from "@/components/NavBread";
import Modal from "@/components/Modal";
import axios from "axios"; //导入模块
export default {
  //模块初始化
  created() {
    this.initdata();
  },
  data() {
    return {
     maxprice:'all',
     minprice:'all',
      shujus: [], //定义变量存放商品数据
      order: false,
      testshow: false,
      isCartErrorShowFlag: false,
      isCartOkShowFlag: false
    };
  },
  methods: {
    modelshow() {
      this.testshow = false;
    },
    //赛选
    goodsWhere(minprice,maxprice){
        this.maxprice=maxprice
        this.minprice=minprice
        this.initdata()
    },
    //order       默认降序desc
    initdata() {
      let order = this.order ? "asc" : "desc";
      axios({
        url: `http://118.31.9.103/api/goods/index?order=${order}&minprice=${this.minprice}&maxprice=${this.maxprice}`,
        method: "get"
      })
        .then(res => {
          this.shujus = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    goodkey() {
      this.order = !this.order;
      this.initdata();
    }
  },
  //导入组件
  components: {
    // NavHeader: NavHeader
    NavHeader,
    // NavFooter: NavFooter
    NavFooter,
    // NavBread: NavBread
    NavBread,
    Modal,
    axios
  }
};
</script>
 
<style scoped>
</style>