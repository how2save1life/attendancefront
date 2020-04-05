<template>
  <div class="leftBox">
    <el-col>
      <div class="left">
<el-input></el-input>
      </div>
    </el-col>



  </div>
</template>

<script>
  export default {
    name: "LeftBox",
    data() {
      return {
        user: this.$store.getters.getRoles,
        userId: this.$store.getters.getUserId,
        url: '',
        //head:'this.src="' + require('../../assets/images/moren.png') + '"'
        //url: '../static' + this.$store.getters.getUserHead
        headpic: 'this.src="../../static/pics/head/head.jpg"',
      };
    },
    mounted() {
      // if (this.$store.getters.getRoles !== 'visitor') {
      //   this.$axios.get("http://localhost:8080/" + this.$store.getters.getRoles + /findMe/ + this.$store.getters.getUserId).then(response => {
      //     console.log(response.data)
      //     switch (this.$store.getters.getRoles) {
      //       case"Agency":
      //         this.url = '../static' + response.data.agencyHead
      //         //this.$store.commit('storeUserHead', response.data.agencyHead);////修改vuex中用户头像
      //         //console.log(this.$store.getters.getUserHead)
      //         break;
      //       case "Buyer":
      //         this.url = '../static' + response.data.buyerHead
      //         //this.$store.commit('storeUserHead', response.data.buyerHead);////修改vuex中用户头像
      //         //console.log(this.$store.getters.getUserHead)
      //         break;
      //       case "Owner":
      //         this.url = '../static' + response.data.ownerHead
      //         //this.$store.commit('storeUserHead', response.data.ownerHead);////修改vuex中用户头像
      //         //console.log(this.$store.getters.getUserHead)
      //         break;
      //     }
      //   })
      // }
    },
    methods: {
      // imageUrl() {
      //   console.log(this.$store.getters.getRoles, this.$store.getters.getUserId, his.$store.getters.getUserHead)
      //   if (this.$store.getters.getUserHead === '' || this.$store.getters.getUserHead === null) {
      //     // return '../../static/pics/head/head.jpg'
      //   }
      //   else {
      //     return '../static' + this.$store.getters.getUserHead
      //   }
      // },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      showdata() {
        this.$router.push('/data')
      },
      showhouse() {
        this.$router.push('/showhouse')
      },
      showmyhouse() {
        this.$router.push('/myhouse')
      },
      savehouse() {
        this.$router.push('/savehouse')
      },
      showuser() {
        this.$router.push('/me')
      },
      showcollect() {
        this.$router.push('/mycollect')
      },
      showagency() {
        this.$router.push('/showagency')
      },
      showdeal() {
        this.$router.push('/mydeal')
      }
    }
  };
</script>

<style>
  .userHeadPic {
    height: 50px;
  }

  .el-menu {
    /* //margin: auto;*/
  }

  .el-menu-item {
    width: 154px;
  }

  .el-submenu.is-opened {
    width: 154px;
  }

  .el-menu-item-group {
    padding: 0;
    width: 154px;
  }

  .el-submenu .el-menu-item {
    padding: 0;
    width: 154px;
    min-width: 100px;
  }

  .el-submenu {
    margin: auto;
    padding: 0;
    width: 154px;
  }

  .userHeadPic {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border-style: dotted;
    border-width: 1px;
    border-color: white;
    padding: 1%;
  }
</style>

