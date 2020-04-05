<template>
  <div>
    <el-table
      :data="studentData"
      stripe
      height="500"
      style="width: 100%">
      <el-table-column
        prop="studentId"
        label="学号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="studentName"
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.studentName"></el-input>
          <span v-show="!scope.row.show">{{scope.row.studentName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="studentCollege"
        label="学院">
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.studentCollege"></el-input>
          <span v-show="!scope.row.show">{{scope.row.studentCollege}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot="header" slot-scope="scope">
          <el-button plain type="primary" size="small" @click="saveClick()" >新增</el-button>
        </template>
        <template slot-scope="scope">
          <el-button v-if=scope.row.show @click="updateClick(scope.row)" type="success" size="small">保存</el-button>
          <el-button v-else type="primary" size="small" @click="editClick(scope.row)">编辑</el-button>
          <el-button v-if=scope.row.show @click="cancelClick(scope.row)" type="info" size="small">取消</el-button>
          <el-button v-else @click="deleteClick(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:center;">
      <el-pagination
        :page-size="2"
        :page-count=page_count
        :pager-count=10
        layout="prev, pager, next"
        @current-change="current_change"
      ></el-pagination>
    </div>

    <el-dialog title="新增学生信息" :visible.sync="dialogTableVisible" width="80%">
      <el-table :data="saveData">
        <el-table-column
          prop="studentId"
          label="工号"
          width="180">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-show="dialogTableVisible" v-model="scope.row.studentId"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="studentName"
          label="姓名"
          width="180">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-show="dialogTableVisible" v-model="scope.row.studentName"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="studentCollege"
          label="学院">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-show="dialogTableVisible" v-model="scope.row.studentCollege"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button  @click="submitClick(scope.row)" type="success" size="small">提交</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>

</template>

<script>
  export default {
    name: "studentinfo",
    inject: ['reload'], // 引入方法 实现更新后自动刷新
    data() {
      return {
        studentData: [],
        currentPage: 1,//当前页码，默认第一页开始
        page_count: 0,
        dialogTableVisible:false,
        currentstudent: {//编辑时选中的行
          studentId: "",
          studentName: "",
          studentCollege: "",
          show: false,

        },
        saveData: [{//
          studentId: "",
          studentName: "",
          studentCollege: "",
        }]
      }

    },
    mounted() {
      this.axios.get("/Student/findAll").then(response => {
        console.log(response);
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data);
          let idata = response.data[i];
          idata.show = false;
          this.studentData.push(idata)//把后端返回的信息存如studentData[]

        }
        console.log(this.studentData)
      }).catch(response => {
        console.log(response);
        console.log(response.data);
      });
      this.axios.get("/Student/pagesum").then(response => {
        this.page_count = response.data;//把后端返回的信息存如studentData[]
      }).catch(response => {
        console.log(response);
        console.log(response.data);
      })


    }, methods: {
      responsealert(result, business) {

        if (result === "success") {//提示成功
          this.$message({
            message: business + `成功 `,
            type: 'success'
          })
        } else {//提示失败
          this.$message({
            message: business + `error `,
            type: 'error'
          });
        }
      },
      //分页 切换页面
      current_change: function (currentPage) {
        this.currentPage = currentPage;
        console.log(this.currentPage);
        this.axios.get("/Student/findAll" + "?page=" + this.currentPage).then(response => {
          console.log(response.data);
          this.studentData = [];
          for (let i = 0; i < response.data.length; i++) {
            console.log(response.data);
            let idata = response.data[i];
            idata.show = false;
            this.studentData.push(idata)//把后端返回的信息存如studentData[]
          }
          this.total = response.data.length;//记录分页信息总条数
          this.loading = false;//loading end
        }).catch(response => {
          console.log(response);
          console.log(response.data);
        })
      }
      ,
      editClick(row) {
        this.currentstudent = row;
        this.currentstudent.show = true;

      }
      ,
      updateClick(row) {

        let data = {
          studentId: row.studentId,
          studentName: row.studentName,
          studentCollege: row.studentCollege
        };
        console.log(data)
        this.axios.post('/Student/update', JSON.stringify(data), {
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
          }
        ).then(response => {
          console.log(response);
          row.show = false;
          this.responsealert(response.data, '更新')
        }).catch(response => {//exception
          console.log(response);
          console.log(response.data);
          this.$message({
            message: `error `,
            type: 'warning'
          });
        })
      }
      ,
      cancelClick(row) {
        row.show = false;
      }
      ,
      deleteClick(row) {
        this.$confirm('此操作将删除' + row.studentId + ', 是否继续?', '删除教师', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() =>
          this.axios.get("/Student/delete?studentId=" + row.studentId).then(response => {
            console.log(response);
            this.responsealert(response.data, '刪除')
          }).catch(response => {//exception
            console.log(response);
            console.log(response.data);
            this.$message({
              message: `error `,
              type: 'warning'
            });
          }).finally(this.reload())
        )

      },saveClick(){
        this.dialogTableVisible=!this.dialogTableVisible
      },
      submitClick(row){
        let data = {
          studentId: row.studentId,
          studentName: row.studentName,
          studentCollege: row.studentCollege
        };
        console.log(data);
        this.axios.post('/Student/save', JSON.stringify(data), {
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
          }
        ).then(response => {
          console.log(response);
          row.show = false;
          this.responsealert(response.data, '新增');
          this.dialogTableVisible=false;
          this.reload();
        }).catch(response => {//exception
          console.log(response);
          console.log(response.data);
          this.$message({
            message: `error `,
            type: 'warning'
          });
        })
      }
    }


  }
</script>

<style scoped>

</style>
