webpackJsonp([2],{"5goy":function(t,e){},qC6X:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={name:"orderQuery",data:function(){var t=function(t){"x"==t.slice(17,18)&&(t=t.replace("x","X"));var e="",r=!0;if((t=t.toString())&&/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(t))if({11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "}[t.substr(0,2)]){if(18==t.length){t=t.split("");for(var s=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],a=[1,0,"X",9,8,7,6,5,4,3,2],i=0,l=0;l<17;l++)i+=t[l]*s[l];a[i%11]!=t[17]&&(e="校验位错误",r=!1)}}else e="地址编码错误",r=!1;else e="身份证号格式错误",r=!1;var o={status:r,msg:e};return o};return{submit:{traveldate:"",idcardno:""},submitrules:{traveldate:[{required:!0,message:"请选择预约日期",trigger:"blur"}],idcardno:[{required:!0,validator:function(e,r,s){return r?t(r).status?void s():s(new Error(t(r).msg)):s(new Error("身份证号不能为空"))},trigger:"blur"}]}}},created:function(){localStorage.removeItem("teamsubmit"),localStorage.removeItem("submit")},methods:{checkOrder:function(){var t=this;this.$refs.submitform.validate(function(e){if(!e)return t.$message({message:"请检查查询信息",type:"error"}),!1;t.$router.push({path:"/orderList",query:{traveldate:t.submit.traveldate,idcardno:t.submit.idcardno,isteam:3}})})}}},a={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"checkbox"},[r("div",{staticClass:"yytitle"},[t._v("团体预约查询")]),t._v(" "),r("el-form",{ref:"submitform",staticClass:"formbox",attrs:{rules:t.submitrules,model:t.submit,"label-width":"140px"}},[r("el-form-item",{attrs:{label:"请选择预约日期：",prop:"traveldate"}},[r("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"请选择预约日期"},model:{value:t.submit.traveldate,callback:function(e){t.$set(t.submit,"traveldate",e)},expression:"submit.traveldate"}}),t._v(" "),r("span",{staticClass:"require_text"},[t._v("（必填）")])],1),t._v(" "),r("el-form-item",{attrs:{label:"身份证号：",prop:"idcardno"}},[r("el-input",{attrs:{type:"text",placeholder:"请输入身份证号"},model:{value:t.submit.idcardno,callback:function(e){t.$set(t.submit,"idcardno","string"==typeof e?e.trim():e)},expression:"submit.idcardno"}}),t._v(" "),r("span",{staticClass:"require_text"},[t._v("（必填）")])],1),t._v(" "),r("el-form-item",{staticClass:"btnbox"},[r("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:t.checkOrder}},[t._v("查询")])],1)],1),t._v(" "),r("div",{staticClass:"yycg"},[t._v("参观须知")]),t._v(" "),t._m(0)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"yyxuzhi"},[e("p",[this._v("观众朋友们您好，欢迎参观滁州博物馆")]),this._v(" "),e("p",[this._v("我馆的开放时间为每周二至周日9:00—17:00（16:00停止发票，16:30停止入馆），每周一（国家法定节假日除外）及农历除夕、正月初一、正月初二闭馆。")]),this._v(" "),e("p",[this._v("本馆遇有重大活动或重要设备设施维修保养时，可根据需要临时闭馆，届时将告示公众。我馆为观众提供网上预约服务，请至少提前一天进行门票预约。每张有效身份证件每天限定预约一次，最多可预约3张门票。")]),this._v(" "),e("p",[this._v("预约成功后，凭有效证件或取票二维码在滁州博物馆自动取票机处取票入馆参观。若未在预约日期到馆，视为无效，谢谢合作")])])}]};var i=r("VU/8")(s,a,!1,function(t){r("5goy")},"data-v-721d63bc",null);e.default=i.exports}});
//# sourceMappingURL=2.83b5be93687ff89fb39e.js.map