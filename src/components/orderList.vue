<template>
  <div class="checkbox">
    <div class="yytitle">预约查询</div>
    <div v-if="tableData.length&&isflag">
      <!--      <span class="el-icon-check"></span>-->
      <div class="s_title" v-if="isteam==2">个人预约查询</div>
      <div class="s_title" v-else-if="isteam==3">团体预约查询</div>
      <el-table
        :data="tableData"
        :header-cell-style="{background:'#E3D7AF',color:'#000'}"
        style="width: 100%"
        border
        border-color="#C3C3C3"
        v-if="isteam==2"
      >
        <el-table-column
          prop="ListNo"
          label="预约单号"
          width="165"
        >
        </el-table-column>
        <el-table-column
          prop="ContactName"
          label="预约人"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="IdCardNo"
          label="证件号码"
          width="165"
        >
        </el-table-column>
        <el-table-column
          prop="TravelDate"
          label="入馆日期"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="状态"
          width="100"
        >
          <template slot-scope="scope">
            <div v-if="scope.status"></div>
            <div v-else class="success">预约成功</div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="138"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showcode(scope.$index)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        :data="tableData"
        :header-cell-style="{background:'#E3D7AF',color:'#000'}"
        style="width: 100%"
        border
        border-color="#C3C3C3"
        v-else
      >
        <el-table-column
          prop="idcardno"
          label="预约单号"
        >
        </el-table-column>
        <el-table-column
          prop="groupname"
          label="团队名称"
          width="100"
        >
        </el-table-column>==]
        <el-table-column
          prop="contactname"
          label="负责人"
          width="80"

        >
        </el-table-column>
        <el-table-column
          prop="idcardno"
          label="证件号码"
        >
        </el-table-column>
        <el-table-column
          prop="traveldate"
          label="入馆日期"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="状态"
          width="80"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.status==1" class="success">预约成功</div>
            <div v-else-if="scope.row.status==0" class="fail">待审核</div>
            <div v-else-if="scope.row.status==2" class="fail">预约失败</div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="80"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showcodeTeam(scope.$index)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="teamtips" v-if="isteam==3">团体负责人需下载<a class="teamdown" href="/static/团体观众介绍信.doc"
                                                        download="团体观众介绍信.doc">团体观众介绍信<span></span></a>填写相关内容并盖公章，参观当天交至讲解接待中心。
      </div>
      <div class="teamtips" v-else>请凭身份证或取票二维码到滁州博物馆自动取票机处取票入馆参观，预约信息可在预约查询中查找。</div>
    </div>
    <div v-if="tableData.length==0&&isflag" class="nodatabox">
      <div class='nodatatitle'><span class="el-icon-warning-outline"></span><span>未查询到您的预约信息</span></div>
      <div class="nodatatips">您可以重新预约</div>
      <el-button type="primary" class="btn">
        <router-link to="/orderIndex" tag="span">个人预约</router-link>
      </el-button>
      <el-button type="primary" class="btn">
        <router-link to="/orderTeam" tag="span">团体预约</router-link>
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "orderList",
    data() {
      return {
        submit: {
          traveldate: '',
          idcardno: '',
        },
        isflag: false,
        tableData: [],
        isteam: 2,

      }
    },
    created() {
      this.submit.traveldate = this.$route.query.traveldate;
      this.submit.idcardno = this.$route.query.idcardno;
      this.isteam = this.$route.query.isteam;
      if (this.submit.traveldate && this.submit.idcardno) {
        if (this.isteam == 2) {
          this.checkOrder()
        } else {
          this.checkOrderTeam();
        }
      } else {
        this.$router.push('/')
      }
    },
    methods: {
      // 个人查询
      checkOrder() {
        this.$api.SearchOrder(this.submit.traveldate, this.submit.idcardno).then(res => {
          this.isflag = true;
          if (res.status == 1) {
            this.tableData = res.data;
          }
        })
      },
      // 团队查询
      checkOrderTeam() {
        this.$api.SearchOrderTeam(this.submit.traveldate, this.submit.idcardno).then(res => {
          this.isflag = true
          if (res.status == 1) {
            this.tableData = res.data;
            // this.$router.push({
            //   path: '/orderList',
            //   query: {traveldate: this.submit.traveldate, idcardno: this.submit.idcardno,isteam:3}
            // })
          }
          // else {
          //   this.$message({
          //     message: res.msg||'稍后再试',
          //     type: 'error'
          //   });
          // }
        })
      },
      showcode(index) {
        console.log(index)
        // this.$alert('<img src=' + src + '> ', '', {
        //   dangerouslyUseHTMLString: true,
        //   showConfirmButton: false,
        //   customClass: 'codebox',
        //   closeOnClickModal:true,
        //   closeOnPressEscape:true
        // });
        this.$router.push({
          path: '/orderSuccess',
          query: {traveldate: this.submit.traveldate, idcardno: this.submit.idcardno, isteam: 2, i: index}
        })
      },
      showcodeTeam(index) {
        console.log(index)
        // this.$alert('<img src=' + src + '> ', '', {
        //   dangerouslyUseHTMLString: true,
        //   showConfirmButton: false,
        //   customClass: 'codebox',
        //   closeOnClickModal:true,
        //   closeOnPressEscape:true
        // });
        this.$router.push({
          path: '/orderSuccessTeam',
          query: {traveldate: this.submit.traveldate, idcardno: this.submit.idcardno, isteam: 2, i: index}
        })
      },

    }
  }
</script>

<style scoped lang="scss">
  .checkbox {
    .yytitle {
      padding: 20px 0;
      border-bottom: 1px solid #C3C3C3;
      color: #000;
      font-size: 18px;
      text-align: center;
    }

    .s_title {
      /*color: #F82633;*/
      font-size: 25px;
      text-align: center;
      padding: 17px 0;

      .el-icon-check {
        font-weight: bold;
        font-size: 40px;
        margin-right: 10px;
        color: #4DA231;
      }

    }

    .teamtips {
      font-size: 18px;
      color: #222222;
      padding: 53px 130px 53px 0;
      line-height: 30px;

      .teamdown {
        color: #C82727;
        text-decoration: underline;
        /*padding: 20px 0;*/
        cursor: pointer;
        font-weight: bold;
      }
    }

    /deep/ .el-table {
      .success {
        color: #4DA231;
        font-weight: bold;
      }

      .fail {
        color: #C82727;
        font-weight: bold;
      }

      .el-table__header-wrapper {
        font-size: 16px;
      }

      font-size: 14px;

      .el-button {
        color: #1EA1DE;
        font-size: 14px;
      }
    }

    .nodatabox {
      font-size: 18px;
      color: #222222;

      .nodatatitle {
        text-align: center;
        font-size: 25px;
        color: #333;
        padding: 50px 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .el-icon-warning-outline {
          color: #F82633;
          margin-right: 10px;
          font-size: 40px;
        }
      }

      .nodatatips {
        text-align: center;
      }

      .btn {
        width: 321px;
        height: 40px;
        background: rgba(241, 229, 191, 1);
        border: 1px solid rgba(225, 208, 156, 1);
        border-radius: 6px;
        display: block;
        margin: 30px auto;
        font-size: 18px;
        font-weight: bold;
        color: #FE9829;

      }
    }
  }
</style>
