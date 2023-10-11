<script lang="ts" setup>
import { h } from "vue"
import { useTheme } from "@/hooks/useTheme"
import { ElNotification } from "element-plus"
// 将 Element Plus 的语言设置为中文
import zhCn from "element-plus/es/locale/lang/zh-cn"

const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()
// 提示
ElNotification({
  title: "常青藤志愿服务后台管理系统",
  type: "success",
  message: h(
    "a",
    {
      style: "color: teal",
      target: "_blank",
      href: "http://www.olrando.cn"
    },
    "学长开发不易记得坚持志愿服务哦"
  ),
  duration: 0,
  position: "bottom-right"
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
