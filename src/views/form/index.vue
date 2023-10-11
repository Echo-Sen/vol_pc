<template>
  <div>
    <Wform
      ref="form"
      class="avatar-uploader"
      label-width="100px"
      :options="options"
      @on-change="handleChange"
      @before-upload="handleBeforeUpload"
      @on-preview="handlePreview"
      @on-remove="handleRemove"
      @before-remove="beforeRemove"
      @on-success="handleSuccess"
      @on-exceed="handleExceed"
      @http-request="handleHttpRequest"
    >
      <template #uploadArea>
        <el-button type="primary" size="small">点击上传</el-button>
      </template>
      <template #uploadTip>
        <div style="color: #ccc; font-size: 12px">请上传图片</div>
      </template>
      <template #action="scope">
        <el-button type="primary" @click="submitForm(scope)">提 交</el-button>
        <el-button @click="resetForm">重 置</el-button>
      </template>
    </Wform>
  </div>
</template>

<script lang="ts" setup>
import { FormOptions, FormInstance } from "@/components/Form/types/types.ts"
import { ElMessage, ElMessageBox } from "element-plus"
import Wform from "@/components/Form/index.vue"
import utils from "@/utils/util.ts"
import { ref } from "vue"
import { uploadActivityImage } from "@/api/activity/index"

const form = ref()

interface Scope {
  form: FormInstance
  model: any
}

const options: FormOptions[] = [
  {
    type: "input",
    value: "",
    label: "活动标题",
    prop: "title",
    rules: [
      {
        required: true,
        message: "活动标题不能为空",
        trigger: "blur"
      },
      {
        min: 4,
        max: 15,
        message: "活动标题在4-15位置之间",
        trigger: "blur"
      }
    ],
    attrs: {
      clearable: true
    }
  },
  {
    type: "input",
    value: "",
    label: "参与对象",
    prop: "scope",
    rules: [
      {
        required: true,
        message: "参与对象不能为空",
        trigger: "blur"
      },
      {
        min: 6,
        max: 10,
        message: "长度6-10位置之间",
        trigger: "blur"
      }
    ],
    attrs: {
      clearable: true
    }
  },
  {
    type: "input",
    value: "",
    label: "活动地点",
    prop: "place",
    rules: [
      {
        required: true,
        message: "活动地点不能为空",
        trigger: "blur"
      },
      {
        min: 6,
        max: 20,
        message: "长度6-20位置之间",
        trigger: "blur"
      }
    ],
    attrs: {
      clearable: true
    }
  },
  {
    type: "input",
    value: "",
    label: "参与人数",
    prop: "number",
    rules: [
      {
        required: true,
        message: "参与人数不能为空",
        trigger: "blur"
      },
      {
        min: 1,
        max: 5,
        message: "长度1-5位置之间",
        trigger: "blur"
      }
    ],
    attrs: {
      clearable: true
    }
  },
  {
    type: "input",
    value: "",
    label: "联系人",
    prop: "contact",
    rules: [
      {
        required: true,
        message: "联系人不能为空",
        trigger: "blur"
      },
      {
        min: 2,
        max: 10,
        message: "长度2-10位置之间",
        trigger: "blur"
      }
    ],
    attrs: {
      clearable: true
    }
  },
  {
    type: "input",
    value: "",
    label: "联系电话",
    prop: "contact_way",
    rules: [
      {
        required: true,
        message: "联系电话不能为空",
        trigger: "blur"
      },
      {
        min: 6,
        max: 11,
        message: "长度6-11位置之间",
        trigger: "blur"
      }
    ],
    attrs: {
      clearable: true
    }
  },
  {
    type: "upload",
    label: "上传",
    prop: "pic",
    uploadAttrs: {
      action: "#",
      multiple: true,
      // 图片大小可以设置大一些，自定义的处理事件中有图片压缩的方法
      limit: 20
    },
    rules: [
      {
        required: true,
        message: "请上传活动宣传图",
        trigger: "blur"
      }
    ]
  },
  {
    type: "editor",
    value: "",
    prop: "desc",
    placeholder: "请输入内容",
    label: "描述",
    rules: [
      {
        required: true,
        message: "描述不能为空"
      }
    ]
  }
]

const submitForm = (scope: Scope) => {
  scope.form.validate((valid) => {
    if (valid) {
      console.log(scope.model)
      ElMessage.success("提交成功")
      // resetForm()
    } else {
      ElMessage.error("表单填写错误")
    }
  })
}

const resetForm = () => {
  console.log("重置")
  form.value.resetFields()
}

const handleHttpRequest = async (file: any) => {
  const sawFile = file.file
  const fileName = sawFile.name
  // 文件转base64
  const base64 = await utils.fileToDataURL(sawFile)
  const newBase64 = await utils.compressionFile(fileName, base64, 0.5)
  try {
    const result = await uploadActivityImage(newBase64)
    // 这里需要根据后端再做错误处理
    file.onSuccess(result.data.img)
    console.log(result)
  } catch {
    console.log("错误")
  }
}

const handleRemove = (file: any, fileList: any) => {}

const handlePreview = (file: any) => {}

const beforeRemove = (val: any) => {
  return ElMessageBox.confirm(`确认删除图片 ${val.file.name} ?`)
}

const handleExceed = (val: any) => {
  console.log("handleExceed", val)
  ElMessage.warning(
    `The limit is 20, you selected ${val.files.length} files this time, add up to ${
      val.files.length + val.fileList.length
    } totally`
  )
}

const handleSuccess = (val: any) => {}

const handleChange = (val: any) => {}

const handleBeforeUpload = (val: any) => {}
</script>
