(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-b76f"],{5913:function(t,e,a){"use strict";var n=a("Q8Ng");a.n(n).a},BOeb:function(t,e,a){"use strict";var n=a("vDqi"),s=a.n(n),i={props:{value:{type:String}},data:function(){return{currentValue:this.value,uploadData:{token:""}}},methods:{getToken:function(){var t=this;s.a.get("http://upload.yaojunrong.com/getToken").then(function(e){200==e.data.code?t.uploadData={token:e.data.data}:t.$message.info(e.data.msg)})},uploadSuccess:function(t){console.log(t),this.currentValue=t.url}},created:function(){this.getToken()},watch:{value:function(t){this.currentValue=t},currentValue:function(t){this.$emit("input",t)}}},l=(a("5913"),a("KHd+")),r=Object(l.a)(i,function(){var t=this.$createElement,e=this._self._c||t;return e("el-upload",{staticClass:"avatar-uploader",attrs:{action:"https://upload-z1.qiniup.com",data:this.uploadData,"show-file-list":!1,"on-success":this.uploadSuccess}},[this.currentValue?e("img",{staticClass:"avatar",attrs:{src:this.currentValue,alt:""}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])},[],!1,null,null,null);r.options.__file="index.vue";e.a=r.exports},Q8Ng:function(t,e,a){},d2sJ:function(t,e,a){},"l/H7":function(t,e,a){"use strict";a.r(e);var n=a("P2sY"),s=a.n(n),i=a("QbLZ"),l=a.n(i),r=a("t3Un");function o(t){return r.a.post("/repair/updateStatus",t)}var c={data:function(){return{page:1,size:6,count:0,list:[],listLoading:!1,dialogVisible:!1,month:"",status:"",memberForm:{user:{},type:{},images:""},isShowing:!1,options:[{value:"",label:"全部"},{value:"1",label:"未审核"},{value:"0",label:"已驳回"},{value:"2",label:"已通过"}],isMax:!1,pickerOptions:{disabledDate:function(t){return t.getTime()>Date.now()}}}},components:{uploadAvatar:a("BOeb").a},methods:{handleCurrentChange:function(t){this.page=t},getMonth:function(){this.getData()},imgMax:function(){this.isMax=!0},imgMin:function(){this.isMax=!1},getData:function(){var t=this,e={};if(e.status=this.status,""!==this.month){var a=new Date(this.month);e.month=a.getTime()}console.log(e),function(t){return r.a.get("/repair/get",t)}(e).then(function(e){200===e.code&&(t.list=e.data.map(function(t){return l()({},t,{createTime:t.createdTime.split("T")[0]})}),t.count=t.list.length)})},showDetail:function(t){this.dialogVisible=!0,this.isShowing=!1,this.memberForm=s()({},t)},handlePass:function(t){var e=this;o({_id:t,status:2}).then(function(t){200===t.code&&(e.$message.success(t.msg),e.getData())})},handleReject:function(t,e){var a=this;"1"==e?this.$prompt("请输入驳回理由","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(e){var n=e.value;a.updateM(t,n)}).catch(function(){a.$message({type:"info",message:"取消输入"})}):(this.isShowing=!0,this.memberForm.rejectMsg&&(this.updateM(t,this.memberForm.rejectMsg),this.dialogVisible=!1))},updateM:function(t,e){var a=this;o({_id:t,status:0,rejectMsg:e}).then(function(t){200===t.code&&(a.$message.success(t.msg),a.getData())})}},created:function(){this.getData()}},u=(a("tsUq"),a("KHd+")),m=Object(u.a)(c,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-card",{staticClass:"card-wrap-table"},[a("div",{staticClass:"title-wrap clearfix",attrs:{slot:"header"},slot:"header"},[a("div",{staticClass:"title fll"},[t._v("\n        报修记录\n      ")]),t._v(" "),a("el-date-picker",{staticClass:"flr",staticStyle:{"margin-left":"20px"},attrs:{"picker-options":t.pickerOptions,type:"month",placeholder:"选择月"},on:{change:t.getMonth},model:{value:t.month,callback:function(e){t.month=e},expression:"month"}}),t._v(" "),a("el-select",{staticClass:"flr",attrs:{placeholder:"请选择"},on:{change:t.getMonth},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list.slice((t.page-1)*t.size,t.page*t.size),"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"报修类型",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(e.row.type.name)+"\n        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"报修人",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(e.row.user.name)+"\n        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"报修时间",align:"center",prop:"createTime"}}),t._v(" "),a("el-table-column",{attrs:{label:"报修地址",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(e.row.address)+"\n        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"报修备注",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(e.row.remark)+"\n        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"审核状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:1===e.row.status?"primary":0===e.row.status?"danger":"success","disable-transitions":""}},[t._v("\n            "+t._s(1===e.row.status?"未审核":0===e.row.status?"已驳回":2===e.row.status?"已通过":"已接单")+"\n          ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.status?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.handlePass(e.row._id)}}},[t._v("\n            通过\n          ")]):t._e(),t._v(" "),1===e.row.status?a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){t.handleReject(e.row._id,"1")}}},[t._v("\n            驳回\n          ")]):t._e(),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.showDetail(e.row)}}},[t._v("\n            查看\n          ")])]}}])})],1),t._v(" "),a("el-dialog",{attrs:{visible:t.dialogVisible,width:"40%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-form",{ref:"memberForm",attrs:{model:t.memberForm,"label-position":"left","label-width":"150px"}},[a("el-form-item",{attrs:{label:"报修人姓名"}},[a("span",[t._v(t._s(t.memberForm.user.name))])]),t._v(" "),a("el-form-item",{attrs:{label:"报修人电话"}},[a("span",[t._v(t._s(t.memberForm.user.phone))])]),t._v(" "),a("el-form-item",{attrs:{label:"报修类型"}},[a("span",[t._v(t._s(t.memberForm.type.name))])]),t._v(" "),a("el-form-item",{attrs:{label:"报修图片"}},t._l(t.memberForm.images.split(","),function(e,n){return a("img",{key:n,staticClass:"pic",attrs:{src:e},on:{click:t.imgMax}})})),t._v(" "),a("el-form-item",{attrs:{label:"报修地址"}},[a("span",[t._v(t._s(t.memberForm.address))])]),t._v(" "),a("el-form-item",{attrs:{label:"报修备注"}},[a("span",[t._v(t._s(t.memberForm.remark))])]),t._v(" "),0===t.memberForm.status?a("el-form-item",{attrs:{label:"驳回理由"}},[a("span",[t._v(t._s(t.memberForm.rejectMsg))])]):t._e(),t._v(" "),t.isShowing?a("el-form-item",{attrs:{label:"驳回理由"}},[a("el-input",{model:{value:t.memberForm.rejectMsg,callback:function(e){t.$set(t.memberForm,"rejectMsg",e)},expression:"memberForm.rejectMsg"}})],1):t._e()],1),t._v(" "),a("span",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),1===t.memberForm.status?a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(e){t.handleReject(t.memberForm._id,"2")}}},[t._v("驳 回")]):t._e(),t._v(" "),1===t.memberForm.status?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){t.handlePass(t.memberForm._id)}}},[t._v("通 过")]):t._e()],1),t._v(" "),t.isMax?a("div",{staticClass:"imgMax clearfix",on:{click:t.imgMin}},t._l(t.memberForm.images.split(","),function(t,e){return a("img",{key:e,attrs:{src:t}})})):t._e()],1)],1),t._v(" "),a("el-pagination",{staticClass:"flr",staticStyle:{"margin-top":"20px"},attrs:{"page-size":t.size,"current-page":t.page,layout:"prev, pager, next",total:t.count},on:{"current-change":t.handleCurrentChange}})],1)},[],!1,null,"29664029",null);m.options.__file="index.vue";e.default=m.exports},tsUq:function(t,e,a){"use strict";var n=a("d2sJ");a.n(n).a}}]);