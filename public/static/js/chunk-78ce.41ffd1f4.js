(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-78ce"],{"3NFY":function(e,t,a){"use strict";a.r(t);var r=a("P2sY"),n=a.n(r),i=a("XJYT"),s=a("BOeb"),o=a("74Dm"),l={data:function(){return{memberForm:{id:"",name:"",phone:"",sex:"",address:""},memberFormRules:{name:[{required:!0,message:"名称不能为空",trigger:"blur"}],phone:[{required:!0,message:"手机号不能为空",trigger:"blur"}],address:[{required:!0,message:"地址不能为空",trigger:"blur"}],sex:[{required:!0,message:"性别不能为空",trigger:"blur"}]},dialogTitle:"create",dialogStatus:{create:"添加",update:"修改"},list:[],listLoading:!1,dialogVisible:!1}},components:{uploadAvatar:s.a},created:function(){this.getList()},methods:{getList:function(){var e=this;this.listLoading=!0,Object(o.c)().then(function(t){e.listLoading=!1,e.list=t.data})},handleCreate:function(){this.resetForm(),this.dialogVisible=!0,this.dialogTitle="create"},handleUpdate:function(e){this.resetForm(),this.dialogVisible=!0,this.dialogTitle="update",this.memberForm=n()({},e)},create:function(){var e=this;this.$refs.memberForm.validate(function(t){if(!t)return!1;Object(o.a)({name:e.memberForm.name,phone:e.memberForm.phone,address:e.memberForm.address,sex:e.memberForm.sex}).then(function(t){200===t.code?i.Message.success("添加成功"):i.Message.error(t.msg),e.dialogVisible=!1,e.getList()})})},update:function(){var e=this;this.$refs.memberForm.validate(function(t){if(!t)return!1;Object(o.d)(e.memberForm).then(function(t){200===t.code?i.Message.success("修改成功"):i.Message.error(t.msg),e.dialogVisible=!1,e.getList()})})},handleDelete:function(e){var t=this;this.$confirm("是否删除此条数据？","提示",{confirmButtonText:"确认",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o.b)({_id:e._id}).then(function(e){200===e.code?i.Message.success("删除成功"):i.Message.error(e.msg),t.getList()})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},resetForm:function(){this.memberForm={name:"",phone:"",sex:"",address:""}}}},u=(a("LQlG"),a("KHd+")),c=Object(u.a)(l,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-card",[a("el-button",{staticClass:"filter-item",attrs:{type:"primary",size:"mini"},on:{click:e.handleCreate}},[e._v("添 加")]),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"姓名",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.name)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"联系电话",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.phone)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"性别",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.sex?0===t.row.sex?"女":"男":"女")+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"区域",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.address)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(a){e.handleUpdate(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){e.handleDelete(t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("el-dialog",{attrs:{title:e.dialogStatus[e.dialogTitle],visible:e.dialogVisible,width:"40%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"memberForm",attrs:{rules:e.memberFormRules,model:e.memberForm,"label-position":"right","label-width":"160px"}},[a("el-form-item",{attrs:{label:"姓名",required:""}},[a("el-input",{attrs:{placeholder:"维修员姓名"},model:{value:e.memberForm.name,callback:function(t){e.$set(e.memberForm,"name",t)},expression:"memberForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"联系电话",required:""}},[a("el-input",{attrs:{placeholder:"维修员联系电话"},model:{value:e.memberForm.phone,callback:function(t){e.$set(e.memberForm,"phone",t)},expression:"memberForm.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"住址",required:""}},[a("el-input",{attrs:{placeholder:"维修员住址"},model:{value:e.memberForm.address,callback:function(t){e.$set(e.memberForm,"address",t)},expression:"memberForm.address"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"性别",required:""}},[a("el-select",{attrs:{placeholder:"维修员性别"},model:{value:e.memberForm.sex,callback:function(t){e.$set(e.memberForm,"sex",t)},expression:"memberForm.sex"}},[a("el-option",{attrs:{value:1,label:"男"}}),e._v(" "),a("el-option",{attrs:{value:0,label:"女"}})],1)],1)],1),e._v(" "),a("span",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),"create"===e.dialogTitle?a("el-button",{attrs:{type:"primary"},on:{click:e.create}},[e._v("添 加")]):e._e(),e._v(" "),"update"===e.dialogTitle?a("el-button",{attrs:{type:"primary"},on:{click:e.update}},[e._v("修 改")]):e._e()],1)],1)],1)},[],!1,null,"739c7332",null);c.options.__file="index.vue";t.default=c.exports},5913:function(e,t,a){"use strict";var r=a("Q8Ng");a.n(r).a},BOeb:function(e,t,a){"use strict";var r=a("vDqi"),n=a.n(r),i={props:{value:{type:String}},data:function(){return{currentValue:this.value,uploadData:{token:""}}},methods:{getToken:function(){var e=this;n.a.get("http://upload.yaojunrong.com/getToken").then(function(t){200==t.data.code?e.uploadData={token:t.data.data}:e.$message.info(t.data.msg)})},uploadSuccess:function(e){console.log(e),this.currentValue=e.url}},created:function(){this.getToken()},watch:{value:function(e){this.currentValue=e},currentValue:function(e){this.$emit("input",e)}}},s=(a("5913"),a("KHd+")),o=Object(s.a)(i,function(){var e=this.$createElement,t=this._self._c||e;return t("el-upload",{staticClass:"avatar-uploader",attrs:{action:"https://upload-z1.qiniup.com",data:this.uploadData,"show-file-list":!1,"on-success":this.uploadSuccess}},[this.currentValue?t("img",{staticClass:"avatar",attrs:{src:this.currentValue,alt:""}}):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])},[],!1,null,null,null);o.options.__file="index.vue";t.a=o.exports},LQlG:function(e,t,a){"use strict";var r=a("UdL6");a.n(r).a},Q8Ng:function(e,t,a){},UdL6:function(e,t,a){}}]);