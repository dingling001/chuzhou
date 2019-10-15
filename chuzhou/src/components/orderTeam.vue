<template>
  <div class="yybox">
    <div class="yytitle">预约须知</div>
    <div class="yyxuzhi">
      <p>1.为了给广大观众营造安全文明、安静适宜的参观环境，进一步提高观众参观质量，我馆实行团队预约参观制度。</p>
      <p>2.请团队负责人至少提前一天通过博物馆馆方网站、微信公众号、导览APP 团体预约通道进行参观预约。</p>
      <p>3.预约时须详细填写预约信息，并保证信息真实有效。预约成功后，团体负责人凭身份证在滁州博物馆自动取票机处取票入馆参观。</p>
      <p> 4.非预约团队须与普通观众一起排队等候参观。</p>
    </div>
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
      <el-form-item label="团队名称：" prop="groupname">
        <el-input v-model.trim="submit.groupname" type="text" placeholder="请输入团队名称"></el-input>
        <span class="require_text">（必填）</span>
      </el-form-item>
      <el-form-item label="团队负责人：" prop="contactname">
        <el-input v-model.trim="submit.contactname" type="text" placeholder="请输入负责人"></el-input>
        <span class="require_text">（必填）</span>
      </el-form-item>
      <el-form-item label="身份证号：" prop="idcardno">
        <el-input v-model.trim="submit.idcardno" type="text" placeholder="请输入身份证号"></el-input>
        <span class="require_text">（必填）</span>
      </el-form-item>
      <el-form-item label="手机号：" prop="contactmobile">
        <el-input v-model.trim="submit.contactmobile" type="number" placeholder="请输入手机号"></el-input>
        <span class="require_text">（必填）</span>
      </el-form-item>
      <el-form-item label="团体人数：" prop="people_quantity">
        <el-input v-model.trim="submit.people_quantity" type="number" placeholder="请填写预约张数"></el-input>
        <span class="require_text">（必填）</span>
      </el-form-item>
      <el-form-item class="btnbox">
        <el-button type="primary" class="btn" @click="appoint">预约</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "orderTeam",
    data() {
      var phoneReg = /^1\d{10}$/
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
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          setTimeout(() => {
            if (!phoneReg.test(value)) {
              callback(new Error('手机号不正确'));
            } else {
              callback();
            }
          }, 300);
        }
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
      var checkNum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('预约数量不能为空'));
        } else {
          callback();

          setTimeout(() => {
            if (value <= 0) {
              callback(new Error('至少预约1张'));
            } else {
              callback();
            }
          }, 100);
        }
      };
      return {
        value1: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        submit: {
          ordertype: 2,
          traveldate: '',
          people_quantity: '',
          contactname: '',
          contactmobile: '',
          idcardno: '',
          child_quantity: 0,
          groupname:''
        },
        submitrules: {
          traveldate: [{required: true, message: '请选择预约日期', trigger: 'blur'}],
          people_quantity: [{required: true, validator: checkNum, trigger: 'blur'}],
          contactname: [{required: true, message: '请输入负责人姓名', trigger: 'blur'}],
          groupname: [{required: true, message: '请输入团队名称', trigger: 'blur'}],
          idcardno: [{required: true, validator: checkId, trigger: 'blur'}],
          contactmobile: [{required: true, validator: checkPhone, trigger: 'blur'}],
        }
      }
    },
    created(){
      localStorage.removeItem('teamsubmit');
      localStorage.removeItem('submit');

    },
    methods: {
      // 预约
      appoint() {
        this.$refs['submitform'].validate((valid) => {
          if (valid) {
            this.$api.POrder(
              this.submit.traveldate,
              this.submit.people_quantity,
              this.submit.contactname,
              this.submit.contactmobile,
              this.submit.idcardno,
              this.submit.child_quantity,
              this.submit.ordertype,
              this.submit.groupname
            ).then(res => {
              console.log(res)
              if (res.status == 1) {
                this.$message({
                  message: '预约成功',
                  type: 'success'
                });
                this.submit.order_qrcode = res.data.ResponseBody.order_qrcode;
                localStorage.setItem('teamsubmit', JSON.stringify(this.submit));
                this.$router.push({path:'/orderSuccess',query:{isteam:1}})
              } else {
                this.$message({
                  message: res.msg||'稍后再试',
                  type: 'error'
                });
              }
            })
          } else {
            this.$message({
              message: '请检查预约信息',
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
  .yybox {
    .yytitle {
      padding-bottom: 27px;
      color: #000;
      font-size: 18px;
      text-align: center;
    }

    .yyxuzhi {
      color: #333333;
      font-size: 14px;
      line-height: 24px;
      padding: 0 0 20px 0;
      border-bottom: dashed #9F9F9F 1px;
      text-align: justify;
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
  }
</style>
