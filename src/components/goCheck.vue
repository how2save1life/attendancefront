<template>
  <div>

    <el-table
      stripe
      border
      style="width: 100%"
      :data="courseAtten"
    >
      <el-table-column type="expand" prop="children">
        <template slot-scope="scope">
          <el-form style="width: 100%">
            <el-table :data="scope.row.children" border stripe>
              <el-table-column
                type="index">
              </el-table-column>
              <el-table-column
                label="考勤次数"
                prop="attendanceTime">
              </el-table-column>
              <el-table-column
                label="学号"
                prop="studentId">
              </el-table-column>
              <el-table-column
                label="姓名"
                prop="studentName">
              </el-table-column>
              <el-table-column
                label="学院"
                prop="studentCollege">
              </el-table-column>
              <el-table-column
                label="考勤情况"
                prop="attendanceStates"
                :filters="[{ text: '签到', value: '1' }, { text: '缺勤', value: '0' },{ text: '请假', value: '2' }]"
                :filter-method="filterType"
              >
                <template slot-scope="scope1">

                  <div>
                    <el-tag type="success" v-if="scope1.row.attendanceStates==='1'" effect="dark">
                      签到
                    </el-tag>
                    <el-tag type="danger" v-if="scope1.row.attendanceStates==='0'" effect="dark">
                      缺勤

                    </el-tag>
                    <el-tag type="warning" v-if="scope1.row.attendanceStates==='2'" effect="dark">
                      请假
                    </el-tag>
                  </div>
                </template>

              </el-table-column>
              <el-table-column
                label="更改考勤状态"
              >
                <template slot-scope="scope1">
                  <el-select v-model="scope1.row.attendanceStates" placeholder="考勤状态" size="mini">
                    <el-option label="签到" value="1"></el-option>
                    <el-option label="缺勤" value="0"></el-option>
                    <el-option label="请假" value="2"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="确认操作"
              >
                <template slot-scope="scope1">
                  <el-button @click="editClick(scope1.row)" type="primary" size="small"
                             icon="el-icon-s-claim">提交修改
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="attTimes">
        <template slot="header" slot-scope="scope">
          <el-button size="small" @click="dialogShow=true">新增考勤</el-button>
        </template>
        <template slot-scope="T">
          第{{T.row.attTimes}}次
        </template>
      </el-table-column>
      <el-table-column
        label="课程号"
        prop="courseId">
      </el-table-column>
      <el-table-column
        label="课程名"
        prop="courseName">
      </el-table-column>
      <el-table-column
        label="应到人数"
        prop="supposeNum">
      </el-table-column>
      <el-table-column
        label="实到人数"
        prop="actualNum">
      </el-table-column>
      <el-table-column
        label="考勤时间"
        prop="attenDate"
      >
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogShow">
      <el-upload
        class="upload-demo"
        ref="upload"
        :http-request="httpRequest"
        :action="imgAction()"
        multiple
        :limit="5"
        :before-upload="beforePicsUpload"
        list-type="picture"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :on-success="handleSuccess"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "goCheck",
    inject: ['reload'], // 引入方法 实现更新后自动刷新
    data() {
      return {
        courseId: '',
        courseAtten: [],
        currentAttenInfo: {
          attTimes: "",
          courseId: "",
          studentId: "",
          attendanceStates: ""
        },
        dialogShow: false,
        fileList:[],
      }
    },
    mounted() {
      this.courseId = this.$store.getters.getcourseId;
      this.courseName = this.$store.getters.getcourseName;
      console.log(this.courseId, this.courseName);
      this.axios.get("/Attendance/teacher?courseId=" + this.courseId).then(response => {
        // console.log(response);
        // console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          this.courseAtten.push(response.data[i]); //把后端返回的信息存如courseData[]
          let idata = response.data[i];
          idata.show = false;
          //拼接
          this.axios.get("/Attendance/getSpecificInfo?courseId=" + this.courseAtten[i].courseId + "&&attTimes=" + this.courseAtten[i].attTimes).then(
            res => {
              console.log(res.data);
              this.courseAtten[i].children = res.data;
            });
          console.log(i, this.courseAtten[i])
        }


      })
    },
    methods: {
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
      filterType(value, row) {
        return row.attendanceStates === value;
      },
      editClick(row) {
        console.log(row);
        this.$confirm('此操作将修改' + row.studentName + '的考勤信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            attendanceStates: row.attendanceStates,
            attendanceTime: row.attendanceTime,
            studentId: row.studentId,
            courseId: row.courseId
          };

          this.axios.post("/Attendance/updateAtteninfo", JSON.stringify(data), {
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
          }).then(response => {
            this.responsealert(response.data, '更新')
          }).catch(response => {//exception
            console.log(response);
            console.log(response.data);
            this.$message({
              message: `error `,
              type: 'warning'
            });
          }).finally(
            this.reload()
          )
        })


      },
      handlePreview(file) {
        console.log(file);
      },
      handleRemove(){

      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      submitUpload() {
        console.log('a');
        this.$refs.upload.submit();
      },
      imgAction() {
        let length=this.courseAtten.length;
        let url='http://localhost:8085/Attendance/checkPicsPost?courseId='+this.courseId+'&attenNum='+length;
        console.log(url);
        return url;
      },
      beforePicsUpload(file, id) {
        console.log(file);
        const isJPG = file.type === 'image/jpg';
        const isJPEG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isJPG && !isJPEG) {
          this.$message.error('上传图片只能是 JPG/JPEG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 10MB!');
        }
        return (isJPG||isJPEG) && isLt2M;
      },
      handleSuccess(response, file, fileList){
        console.log(response)
      },
      httpRequest(){

      }


    }
  }
</script>

<style scoped>

</style>
