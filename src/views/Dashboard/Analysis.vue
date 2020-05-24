<template>
  <div>
    <chart :option="charOption" style="height: 300px; width: 1100px;" />
  </div>
</template>
<script>
// import random from "lodash/random";
import request from "@/utils/request";
import Chart from "@/components/Chart";
export default {
  components: {
    Chart
  },
  data() {
    return {
      charOption: null
    };
  },
  mounted() {
    this.getDataChart();
    // this.interval = setInterval(() => {
    //   this.charOption.series[0].data = this.charOption.series[0].data.map(() =>
    //     random(100)
    //   );
    // }, 3000);
  },
  methods: {
    getDataChart() {
      request({
        url: "/api/dashboard/chart",
        methods: "get",
        params: { id: 12345 }
      }).then(res => {
        this.charOption = {
          title: {
            text: "ECharts示例"
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: res.data
            }
          ]
        };
      });
    }
  },
  destroyed() {
    // clearInterval(this.interval);
  }
};
</script>
<style lang="less" scoped></style>
