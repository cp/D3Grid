import * as d3 from 'd3';

class D3Grid {
  constructor(layout, settings) {
    this.settings = {};
    this.settings.cols = settings.cols || 12;
    this.settings.width = settings.width || 200;
    this.settings.margin = settings.margin || 10;
    this.settings.height = settings.height || 200;
    this.settings.rowHeight = settings.rowheight || 20;

    this.layout = layout;
  }

  getWH(w, h) {
    const wVal = (this.settings.width / this.settings.cols) * w;

    return { w: wVal, h: this.settings.rowHeight };
  }

  getXY(x, y) {
    const yVal = this.settings.rowHeight * y;
    const xVal = (this.settings.width / this.settings.cols) * x;

    return { x: xVal, y: yVal };
  }

  renderItem(container, layout) {
    const { w, h } = this.getWH(layout.w, layout.h);
    const { x, y } = this.getXY(layout.x, layout.y);

    container.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', w)
      .attr('height', h);
  }

  render(elem) {
    let container = d3.select(elem)
      .append('svg')
      .attr('width', this.settings.height)
      .attr('height', this.settings.width);

    this.layout.forEach(item => this.renderItem(container, item));
  }
}

module.exports = D3Grid;