<template>
  <div class="checkbox">
    <div class="yytitle">预约查询</div>
    <el-form ref="submitform" :rules="submitrules" :model="submit" label-width="140px" class="formbox">
      <el-form-item label="请选择预约日期：" prop="traveldate">
        <el-date-picker
          v-model="submit.traveldate"
          type="date"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          placeholder="请选择预约日期"
        >
        </el-date-picker>
        <span class="require_text">（必填）</span>
      </el-form-item>
      <el-form-item label="身份证号：" prop="idcardno">
        <el-input v-model.trim="submit.idcardno" type="text" placeholder="请输入身份证号"></el-input>
        <span class="require_text">（必填）</span>
      </el-form-item>
      <el-form-item class="btnbox">
        <el-button type="primary" class="btn" @click="checkOrder">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="yycg">参观须知</div>
    <div class="yyxuzhi">
      <p>观众朋友们您好，欢迎参观滁州博物馆</p>
      <p>我馆的开放时间为每周二至周日9:00—17:00（16:00停止发票，16:30停止入馆），每周一（国家法定节假日除外）及农历除夕、正月初一、正月初二闭馆。</p>
      <p>本馆遇有重大活动或重要设备设施维修保养时，可根据需要临时闭馆，届时将告示公众。我馆为观众提供网上预约服务，请至少提前一天进行门票预约。每张有效身份证件每天限定预约一次，最多可预约3张门票。</p>
      <p>预约成功后，凭有效证件或取票二维码在滁州博物馆自动取票机处取票入馆参观。若未在预约日期到馆，视为无效，谢谢合作</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "orderQuery",
    data() {
      const checkIdcard = idCard => {
        if (idCard.slice(17, 18) == "x") {
          idCard = idCard.replace("x", "X");
        }
        idCard = idCard.toString();
        var city = {
          11: "北京",
          12: "天津",
          13: "河北",
          14: "山西",
          15: "内蒙古",
          21: "辽宁",
          22: "吉林",
          23: "黑龙江 ",
          31: "上海",
          32: "江苏",
          33: "浙江",
          34: "安徽",
          35: "福建",
          36: "江西",
          37: "山东",
          41: "河南",
          42: "湖北 ",
          43: "湖南",
          44: "广东",
          45: "广西",
          46: "海南",
          50: "重庆",
          51: "四川",
          52: "贵州",
          53: "云南",
          54: "西藏 ",
          61: "陕西",
          62: "甘肃",
          63: "青海",
          64: "宁夏",
          65: "新疆",
          71: "台湾",
          81: "香港",
          82: "澳门",
          91: "国外 "
        };
        var tip = "";
        var pass = true;
        if (
          !idCard ||
          !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
            idCard
          )
        ) {
          tip = "身份证号格式错误";
          pass = false;
        } else if (!city[idCard.substr(0, 2)]) {
          tip = "地址编码错误";
          pass = false;
        } else {
          //18位身份证需要验证最后一位校验位
          if (idCard.length == 18) {
            idCard = idCard.split("");
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
              ai = idCard[i];
              wi = factor[i];
              sum += ai * wi;
            }
            var last = parity[sum % 11];
            if (parity[sum % 11] != idCard[17]) {
              tip = "校验位错误";
              pass = false;
            }
          }
        }
        var obj = {
          status: pass,
          msg: tip
        };
        if (!pass) {
          return obj;
        }
        return obj;
      };
      var checkId = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('身份证号不能为空'));
        } else if (!checkIdcard(value).status) {
          return callback(new Error(checkIdcard(value).msg));
        } else {
          callback();
        }
      };
      return {
        submit: {
          traveldate: '',
          idcardno: ''
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        submitrules: {
          traveldate: [{required: true, message: '请选择预约日期', trigger: 'blur'}],
          idcardno: [{required: true, validator: checkId, trigger: 'blur'}]
        }
      }
    },
    created() {
    },
    methods: {
      checkOrder() {
        this.$refs['submitform'].validate((valid) => {
          if (valid) {
            this.$api.SearchOrder(this.submit.traveldate, this.submit.idcardno).then(res => {
              if (res.status == 1) {
                this.$router.push({
                  path: '/orderList',
                  query: {traveldate: this.submit.traveldate, idcardno: this.submit.idcardno,isteam:2}
                })
              } else {
                this.$message({
                  message: res.msg||'稍后再试',
                  type: 'error'
                });
              }
            })
          } else {
            this.$message({
              message: '请检查查询信息',
              type: 'error'
            });
            return false;
          }
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

    .formbox {
      margin: 29px 0;

      /deep/ .el-input {
        width: 321px;
      }

      /deep/ .child {
        .el-input-number {
          width: 100px;
        }

        .el-input {
          width: 38px;
          margin: 0 auto;
          border: 0;
          font-size: 20px;
          color: #575757;

          .el-input__inner {
            border: 0;
            padding: 0;
          }
        }

        .el-input-number__decrease, .el-input-number__increase {
          color: #fff;
          border-radius: 50%;
          width: 25px;
          height: 25px;
          line-height: 25px;
          font-weight: bold;
          background-color: #575757;
          top: 7px;
        }

        .el-input-number__decrease.is-disabled, .el-input-number__increase.is-disabled {
          background-color: #ccc;
        }

        .require_text {
          color: #666666;
        }
      }

      .require_text {
        color: #E70000;
        font-size: 14px;
      }

      .btnbox {
        /deep/ .el-form-item__content {
          /*margin: 0;*/
        }

        .btn {
          width: 321px;
          height: 40px;
          background: rgba(241, 229, 191, 1);
          border: 1px solid rgba(225, 208, 156, 1);
          border-radius: 6px;
          display: block;
          margin: 30px 0;
          color: #FE9829;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }

    .yycg {
      color: #333333;
      font-size: 20px;
      padding: 20px 0;
    }

    .yyxuzhi {
      color: #333333;
      font-size: 14px;
      line-height: 24px;
      padding: 0 0 20px 0;
      /*border-bottom: dashed #9F9F9F 1px;*/
      text-align: justify;
    }
  }
</style>
