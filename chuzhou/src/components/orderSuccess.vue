<template>
  <div class="yysucess">
    <div class="s_title"><span class="el-icon-check"></span>恭喜您预约成功！</div>
    <div class="s_info">您预约了<span>{{parseInt(submit.people_quantity,10)+parseInt(submit.child_quantity,10)}}</span>人进行博物馆参观，预约信息为：
    </div>
    <div class="sbox" v-if="Object.keys(submit).length">
      <div class="sitem" v-if="submit.ordertype==2">
        <span class="label">团体名称：</span>
        <span class="labelvalue">{{submit.groupname}}</span>
      </div>
      <div class="sitem">
        <span class="label" v-if="submit.ordertype==1">姓名：</span>
        <span class="label" v-if="submit.ordertype==2">团体负责人：</span>
        <span class="labelvalue">{{submit.contactname}}</span>
      </div>
      <div class="sitem">
        <span class="label">证件号码：</span>
        <span class="labelvalue">{{submit.idcardno}}</span>
      </div>
      <div class="sitem">
        <span class="label">联系方式：</span>
        <span class="labelvalue">{{submit.contactmobile}}</span>
      </div>
      <div class="sitem">
        <span class="label">入馆日期：</span>
        <span class="labelvalue">{{submit.traveldate}}</span>
      </div>
      <div class="sitem code">
        <span class="label">取票二维码：</span>
        <span class="labelvalue"><img :src="submit.order_qrcode" alt=""></span>
      </div>
    </div>
    <div class="tips">请凭身份证或取票二维码到滁州博物馆自动取票机处取票入馆参观，预约信息可在预约查询中查找。</div>
  </div>
</template>

<script>
  export default {
    name: "orderSuccess",
    data() {
      return {
        submit: {
          ordertype: 1,
          traveldate: '',
          people_quantity: '',
          contactname: '',
          contactmobile: '',
          idcardno: '',
          child_quantity: 0,
          groupname: ''
        },
        submitpost: {
          traveldate: '',
          idcardno: '',
        },
        isteam: '',
        index: 0,
        tableData: []
      }
    },
    created() {
      this.submitpost.traveldate = this.$route.query.traveldate;
      this.submitpost.idcardno = this.$route.query.idcardno;
      this.index = this.$route.query.i;
      this.isteam = this.$route.query.isteam;
      if (this.$route.query.traveldate && this.$route.query.idcardno && this.$route.query.isteam) {
        this.checkOrder();
      } else {
        if (localStorage.getItem('submit')) {
          this.submit = JSON.parse(localStorage.getItem('submit'))
          // console.log(this.submit)
        } else if (localStorage.getItem('teamsubmit')) {
          this.submit = JSON.parse(localStorage.getItem('teamsubmit'))
          // console.log(this.submit)
        }
      }
    },
    methods: {
      checkOrder() {
        this.$api.SearchOrder(this.submitpost.traveldate, this.submitpost.idcardno).then(res => {
          if (res.status == 1) {
            this.tableData = res.data;
            console.log(res.data)
            // this.tableData[this.index];
            // ordertype: 1,
            //   traveldate: '',
            //   people_quantity: '',
            //   contactname: '',
            //   contactmobile: '',
            //   idcardno: '',
            //   child_quantity: 0,
            //   groupname: ''
            this.submit.ordertype = this.isteam==2?1:2;
            this.submit.traveldate=  this.tableData[this.index].TravelDate;
            this.submit.people_quantity=  this.tableData[this.index].Quantity;
            this.submit.contactname=  this.tableData[this.index].ContactName;
            this.submit.idcardno=  this.tableData[this.index].IdCardNo;
            this.submit.contactmobile=  this.tableData[this.index].ContactMobile;
            this.submit.order_qrcode=  this.tableData[this.index].order_qrcode;
            this.submit.groupname=  this.tableData[this.index].GroupName;
            console.log(this.submit)
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .yysucess {
    .s_title {
      color: #F82633;
      font-size: 25px;
      text-align: center;
      padding: 17px 0;
      border-bottom: 1px solid #C3C3C3;

      .el-icon-check {
        font-weight: bold;
        font-size: 40px;
        margin-right: 10px;
        color: #4DA231;
      }
    }

    .s_info {
      color: #222222;
      font-size: 18px;
      text-align: center;
      padding: 20px 0;

      span {
        color: #F66514;
      }
    }

    .sbox {
      width: 600px;
      margin: 15px auto;

      .sitem {
        margin-bottom: 20px;

        .label {
          font-size: 18px;
          color: #222;
          display: inline-block;
          width: 200px;
          text-align: right;
        }

        .labelvalue {
          font-size: 18px;
          color: #F66514;
          display: inline-block;
        }

        &.code {
          .label {
            height: 114px;
            line-height: 114px;
          }

          .labelvalue {
            width: 114px;
            height: 114px;
            line-height: 114px;
            text-align: center;

            img {
              width: 100%;
              vertical-align: middle;
            }
          }
        }
      }

    }

    .tips {
      margin: 0 auto;
      width: 427px;
      height: 100px;
      background: rgba(255, 249, 239, 1);
      border: 1px dashed rgba(177, 144, 92, 1);
      border-radius: 4px;
      font-size: 18px;
      color: #222;
      padding: 21px 10px;
      line-height: 30px;
    }
  }
</style>
