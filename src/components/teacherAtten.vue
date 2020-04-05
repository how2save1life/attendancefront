<template>
  <el-table
    :data="mycourse"
    stripe
    height="500"
    style="width: 100%">
    <el-table-column
      prop="courseWeek"
      label="上课时间"
    ></el-table-column>
    <el-table-column
      prop="courseId"
      label="课程号"
    ></el-table-column>
    <el-table-column
      prop="courseName"
      label="课程名"
    ></el-table-column>
    <el-table-column
      prop="courseAddr"
      label="上课教室">
    </el-table-column>
    <el-table-column
      prop="courseCredit"
      label="学分"
    >
    </el-table-column>
    <el-table-column
      prop="courseType"
      label="课程类型">
    </el-table-column>
    <el-table-column
      prop="coursePeriod"
      label="课时">
    </el-table-column>
    <el-table-column
      prop="courseAttTimes"
      label="考勤次数">
    </el-table-column>
    <el-table-column
      label="操作"
      >
      <template slot-scope="scope">
        <router-link :to="{name:'goCheck',params:{courseId:scope.row.courseId,courseName:scope.row.courseName}}">
        <el-button   type="success" size="small" @click="toCourse(scope.row)">考勤</el-button>
        </router-link>
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
  export default {
    name: "teacherAtten",
    inject: ['reload'], // 引入方法 实现更新后自动刷新
    data() {
      return {
        mycourse: [],
        userId: this.$store.getters.getUserId,
        roles: this.$store.getters.getRoles,
      }

    },
    mounted(){
      this.axios.get("/Course/mycourse/teacher/?teacherId=" + this.userId).then(response => {
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          // console.log(response.data);
          // let idata = response.data[i];
          // idata.show = false;
          this.mycourse.push(response.data[i])//把后端返回的信息存mycourse[]
        }
      }).catch(response => {
        console.log(response);
        console.log(response.data);
      })
    },
    methods:{
      toCourse(row){
        this.$store.commit('storecourseId',row.courseId)
        this.$store.commit('storecourseName',row.courseName)
      }
    }
  }
</script>

<style scoped>

</style>
