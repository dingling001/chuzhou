<template>
  <div class="checkbox">
    <div class="yytitle">预约查询</div>
    <div v-if="tableData.length&&isflag">
      <div class="s_title"><span class="el-icon-check"></span>恭喜您预约成功！</div>
      <el-table
        :data="tableData"
        :header-cell-style="{background:'#E3D7AF',color:'#000'}"
        style="width: 100%"
        border
        border-color="#C3C3C3"
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
          label="入馆日期">
        </el-table-column>
        <el-table-column
          prop="Quantity"
          label="人数">
        </el-table-column>
        <el-table-column
          label="取票二维码"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showcode(scope.row.order_qrcode)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
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
        tableData: []
      }
    },
    created() {
      this.submit.traveldate = this.$route.query.traveldate
      this.submit.idcardno = this.$route.query.idcardno
      if (this.submit.traveldate && this.submit.idcardno) {
        this.checkOrder()
      } else {
        this.$router.push('/')
      }
    },
    methods: {
      checkOrder() {
        this.$api.SearchOrder(this.submit.traveldate, this.submit.idcardno).then(res => {
          this.isflag = true;
          if (res.status == 1) {
            this.tableData = res.data;
          }
        })
      },
      showcode(src) {
        this.$alert('<img src=' + src + '> ', '', {
          dangerouslyUseHTMLString: true,
          showConfirmButton: false,
          customClass: 'codebox'
        });
      }
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
      color: #F82633;
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

    /deep/ .el-table {
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
      .nodatatips{
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
