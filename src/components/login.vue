<template>
  <div>
    <div style="width:100%">
      <el-form ref="form" :model="form" style="text-align: center" class="demo-ruleForm login-page">
        <h3 v-if="this.form.user==='admin'">管理员{{msg}}</h3>
        <h3 v-else-if="this.form.user==='teacher'">教师{{msg}}</h3>
        <h3 v-else-if="this.form.user==='student'">学生{{msg}}</h3>
        <h3 v-else>{{msg}}</h3>
        <el-form-item label="">
          <el-input prefix-icon="el-icon-edit" v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input prefix-icon="el-icon-edit" v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <!--选择登录角色-->
        <el-form-item style="text-align: left">

          <el-radio-group v-model="form.user" size="small" >
            <el-radio-button label="admin">管理员</el-radio-button>
            <el-radio-button label="teacher">教师</el-radio-button>
            <el-radio-button label="student">学生</el-radio-button>
          </el-radio-group>

        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit" size="medium" style="width:100%;">登录</el-button>
        </el-form-item>

      </el-form>
    </div>

  </div>
</template>

<script>
  import $store from "../store";

  export default {
    inject: ["reload"],

    data() {
      //判定两次输入的密码是否一致

      return {
        //登陆数据
        form: {
          username: '',
          password: '',
          user: '',
        },
        msg: '登录',

      }

    },
    methods:{
      onLogMessage: function (info) {
        if (info === "success") {
          this.loading = false;
          this.dialogFormVisible = false;
          this.$message({
            showClose: true,
            message: '登陆成功',
            type: 'success'
          });
          this.$store.commit('storeRoles', this.form.user);//修改vuex中roles
          this.$store.commit('storeUserId', this.form.username);////修改vuex中用户账号
          // this.$axios.get("http://localhost:8080/" + this.form.user + /findMe/ + this.form.username).then(response => {
          //   console.log(response.data)
          //   switch (this.form.user) {
          //     case"Agency":
          //       this.$store.commit('storeUserHead', response.data.agencyHead);////修改vuex中用户头像
          //       //console.log(this.$store.getters.getUserHead)
          //       break;
          //     case "Buyer":
          //       this.$store.commit('storeUserHead', response.data.buyerHead);////修改vuex中用户头像
          //       //console.log(this.$store.getters.getUserHead)
          //       break;
          //     case "Owner":
          //       this.$store.commit('storeUserHead', response.data.ownerHead);////修改vuex中用户头像
          //       //console.log(this.$store.getters.getUserHead)
          //       break;
          //   }
          // });
          // setTimeout(() =>{
          //   window.location.reload()
          // },500);
          // this.$router.push('/showhouse')
        } else if (info === "failed") {
          this.$message({
            showClose: true,
            message: '密码或账号有误',
            type: 'error'
          });
        }
      },
      submit(){
        if (this.form.user === "") {//判断是否选择身份
          this.$message({
            showClose: true,
            message: '请选择您的身份类型'
          });
        }else if (this.form.user === "student") {//student login
          let data = {
            studentId: this.form.username,
            studentPasswd: this.form.password
          };
          this.axios.post('http://localhost:8085/login/' + this.form.user, JSON.stringify(data),
            {
              headers: {'Content-Type': 'application/json;charset=UTF-8'}
            }
          ).then(response => {
            console.log(response);
            console.log(response.data);
            this.onLogMessage(response.data)//响应
          }).catch(response => {
            console.log(response);
            this.$message({
              message: `error`,
              type: 'error'
            });
          })
        }else if (this.form.user === "teacher") {//teacher login
          let data = {
            teacherId: this.form.username,
            teacherPasswd: this.form.password
          };
          this.axios.post('http://localhost:8085/login/' + this.form.user, JSON.stringify(data),
            {
              headers: {'Content-Type': 'application/json;charset=UTF-8'}
            }
          ).then(response => {
            console.log(response.data);
            this.onLogMessage(response.data)//响应
          }).catch(response => {
            console.log(response.data);
            this.$message({
              message: `error`,
              type: 'error'
            });
          })
        }
      }
    }

  }
</script>

<style scoped>
  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 5% auto;
    width: 30%;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
</style>
