<template>
  <div class="header" style="height: 100%;">

    <div class="headerTitle">
      <!--<img :src="imageTitle" style="height: 60px">-->
    </div>
    <div class="headerUserId">
      <!--<i v-if="this.$store.getters.getRoles==='Agency'">当前业务员：{{this.$store.getters.getUserId}}</i>-->
      <!--<i v-else-if="this.$store.getters.getRoles==='Buyer'">当前买家：{{this.$store.getters.getUserId}}</i>-->
      <!--<i v-else-if="this.$store.getters.getRoles==='Owner'">当前房主：{{this.$store.getters.getUserId}}</i>-->
      <!--<el-button v-else type="text" @click="login" ><i>登录/注册</i></el-button>-->
      <div class="headerCheckout">
        <el-tooltip content="注销" placement="top">
          <i class="el-icon-circle-close" @click="checkOut"></i>
        </el-tooltip>
      </div>
    </div>



  </div>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        imageTitle: '../static/pics/title.png',
      };
    },
    methods: {
      // login(){
      //   console.log("KK")
      //   this.$router.push('/login')
      // },
      checkOut() {
        if (this.$store.getters.getRoles !== 'visitor') {
          this.$confirm('确认退出登录吗？', '注销', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
              this.$store.commit('storeRoles', "visitor");
              this.$store.commit('storeUserId', "");
            setTimeout(() =>{
              window.location.reload()
            },1000);
              this.$router.push("/login");
            }
          )
        }
        else {
          this.$message({
            message: `未登录 `,
            type: 'info'
          });
        }


      }
    }
  }
  ;
</script>

<style scoped>
  .headerTitle {
    text-align: left;
    width: 49%;
    height: 100%;
    line-height: 60px;
    display: inline-block;
    color: #fff;
    font-family: 黑体;
    font-size: 16pt;
    float: left;
  }

  .headerUserId {
    text-align: right;
    width: 50%;
    height: 100%;
    line-height: 60px;
    display: inline-block;
    font-size: 10pt;
    color: #fff;
  }

  .headerCheckout {
    text-align: right;
    /*width: 5%;*/
    height: 100%;
    line-height: 60px;
    display: inline-block;
    color: #fff;
  }


</style>

