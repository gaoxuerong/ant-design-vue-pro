<template>
  <div ref="chartDom"></div>
</template>
<script>
import echarts from "echarts";
import { addListener, removeListener } from "resize-detector";
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    option: {
      handler(val) {
        this.chart.setOption(val);
      },
      deep: true
    }
  },
  mounted() {
    this.renderChar();
    addListener(this.$refs.chartDom, this.resize);
  },
  // 防止内存泄漏,引入第三方库最需要注意的一个点
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      this.chart.resize();
    },
    // render
    renderChar() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chartDom);
      // 绘制图表
      this.chart.setOption(this.option);
    }
  }
};
</script>
