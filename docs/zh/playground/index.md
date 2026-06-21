---
title: Playground
layout: page
---

<script setup>
import { onMounted, ref } from 'vue'

const iframeLoaded = ref(false)

onMounted(() => {
  iframeLoaded.value = true
})
</script>

# 🏗️ Playground

在线体验 Legacy Modernizer — 无需安装。

<div class="playground-container">
  <iframe
    v-if="iframeLoaded"
    src="/legacy-modernizer/playground/index.html"
    style="width:100%;height:calc(100vh - 200px);border:1px solid var(--vp-c-divider);border-radius:8px;"
    loading="lazy"
  ></iframe>
</div>

<style>
.playground-container {
  margin: 24px 0;
}
</style>
