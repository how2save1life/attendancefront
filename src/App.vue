<template>
  <div id="app">
    <div v-show="!(path ==='/login')">
      <el-container class="leftContainer" >
        <el-aside width="154px">
          <!--<router-view name="left" v-if="isRouterAlive"></router-view>-->
          <router-view name="left"></router-view>
        </el-aside>
        <el-container class="mainContainer">
          <el-header>
            <router-view name="header"></router-view>
          </el-header>
          <el-main>
            <router-view name="main"></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
<router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        isRouterAlive: true,
        clientHeight: '',
        path: ''
      }

    },
    mounted() {
      this.path = this.$route.path;
      console.log(this.$route.path)
      // console.log(this.$route.path)
    },
    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
          console.log('reload')
        })
      }
    },
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  .leftContainer {
    height: 100%;
  }

  .el-header {
    background-color: #4272AE;
    padding-left: 0;
  }

  .mainContainer {
    display: flex;
    /*min-height: 575px;*/

  }

  .el-aside {
    background-color: #315580;
    color: navy;
    width: 154px;
    min-height: 632px;
  }

  .el-main {
    background-color: #ffffff;
    flex: 15;
  }
</style>
