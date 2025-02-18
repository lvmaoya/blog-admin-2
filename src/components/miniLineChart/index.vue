<template>
  <div id="container">
    <svg ref="areaChart" :style="{ width: '100%', height: '100%', overflow: 'visible' }">
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SmoothAreaLineChart',
  props: {
    data: {
      type: Array,
      required: true
    },
    lineColor: {
      type: String,
      default: 'black'
    }
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const svg = this.$refs.areaChart;
      const svgWidth = svg.clientWidth;
      const svgHeight = svg.clientHeight;
      const minX = Math.min(...this.data.map(point => point[0]));
      const maxX = Math.max(...this.data.map(point => point[0]));
      const minY = Math.min(...this.data.map(point => point[1]));
      const maxY = Math.max(...this.data.map(point => point[1]));
      const scaleX = svgWidth / (maxX - minX);
      const scaleY = svgHeight / (maxY - minY);
      const translateX = -minX * scaleX;
      const translateY = svgHeight - maxY * scaleY;

      const createSmoothAreaPath = () => {
        let path = "M" + (this.data[0][0] * scaleX + translateX) + " " + (this.data[0][1] * scaleY + translateY);
        for (let i = 1; i < this.data.length; i++) {
          const x0 = this.data[i - 1][0] * scaleX + translateX;
          const y0 = this.data[i - 1][1] * scaleY + translateY;
          const x1 = this.data[i][0] * scaleX + translateX;
          const y1 = this.data[i][1] * scaleY + translateY;
          const xc1 = (x0 + x1) / 2;
          const yc1 = y0;
          const xc2 = (x0 + x1) / 2;
          const yc2 = y1;
          path += " C " + xc1 + " " + yc1 + ", " + xc2 + " " + yc2 + ", " + x1 + " " + y1;
        }
        path += " L " + (this.data[this.data.length - 1][0] * scaleX + translateX) + " " + svgHeight; // Extend to bottom
        path += " L " + (this.data[0][0] * scaleX + translateX) + " " + svgHeight; // Close the area
        path += " Z";
        return path;
      };

      const createSmoothLinePath = () => {
        let path = "M" + (this.data[0][0] * scaleX + translateX) + " " + (this.data[0][1] * scaleY + translateY);
        for (let i = 1; i < this.data.length; i++) {
          const x0 = this.data[i - 1][0] * scaleX + translateX;
          const y0 = this.data[i - 1][1] * scaleY + translateY;
          const x1 = this.data[i][0] * scaleX + translateX;
          const y1 = this.data[i][1] * scaleY + translateY;
          const xc1 = (x0 + x1) / 2;
          const yc1 = y0;
          const xc2 = (x0 + x1) / 2;
          const yc2 = y1;
          path += " C " + xc1 + " " + yc1 + ", " + xc2 + " " + yc2 + ", " + x1 + " " + y1;
        }
        return path;
      };

      const createGradient = (gradientId, color) => {
        const defs = svg.insertBefore(document.createElementNS("http://www.w3.org/2000/svg", "defs"), svg.firstChild);
        const gradient = defs.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "linearGradient"));
        gradient.setAttribute("id", gradientId);
        gradient.setAttribute("x1", "0%");
        gradient.setAttribute("y1", "0%");
        gradient.setAttribute("x2", "0%");
        gradient.setAttribute("y2", "100%");
        const stop1 = gradient.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "stop"));
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("style", `stop-color:${color};stop-opacity:0.3`);
        const stop2 = gradient.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "stop"));
        stop2.setAttribute("offset", "100%");
        stop2.setAttribute("style", `stop-color:${color};stop-opacity:0.1`);
        return `url(#${gradientId})`;
      };

      // 生成唯一的 gradientId
      const gradientId = `areaGradient-${this.lineColor}-${Date.now()}`;
      const areaFill = createGradient(gradientId, this.lineColor);

      const areaPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      areaPath.setAttribute("id", "areaPath");
      areaPath.setAttribute("d", createSmoothAreaPath());
      areaPath.setAttribute("fill", areaFill);
      areaPath.setAttribute("stroke", "none");
      svg.appendChild(areaPath);

      const linePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      linePath.setAttribute("id", "linePath");
      linePath.setAttribute("d", createSmoothLinePath());
      linePath.setAttribute("stroke", this.lineColor);
      linePath.setAttribute("stroke-width", "1");
      linePath.setAttribute("fill", "none");
      svg.appendChild(linePath);
    }
  }
};
</script>

<style scoped>
#container {
  height: 100%;
  width: 100%;
}
svg {
  border: none;
}
</style>