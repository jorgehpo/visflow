/**
 * @fileoverview LineChart defs.
 */


/** @inheritDoc */
visflow.LineChart.prototype.NODE_CLASS = 'line-chart';

/** @inheritDoc */
visflow.LineChart.prototype.PANEL_TEMPLATE =
  './dist/html/visualization/line-chart/line-chart-panel.html';

/** @inheritDoc */
visflow.LineChart.prototype.defaultOptions = function() {
  return new visflow.options.LineChart({
    // Series dimension.
    xDim: visflow.data.INDEX_DIM,
    // Value dimension.
    yDim: 0,
    // Group by dimension, must be key.
    groupBy: '',
    // Show points.
    points: false,
    // Show legends.
    legends: true,
    // Use curve to draw lines.
    curve: false,
    // Show x-axis ticks.
    xTicks: true,
    // Show y-axis ticks.
    yTicks: true,
    // X domain margin.
    xMargin: 0.1,
    // Y domain margin.
    yMargin: 0.1
  });
};

/** @const {number} */
visflow.LineChart.LEGEND_OFFSET_X = 10;
/** @const {number} */
visflow.LineChart.LEGEND_OFFSET_Y = 15;
/** @const {number} */
visflow.LineChart.LEGEND_MARGIN_RIGHT = 5;
/**
 * This includes the colorbox size.
 * @const {number}
 */
visflow.LineChart.LEGEND_LABEL_OFFSET_X = 15;
/** @const {number} */
visflow.LineChart.LEGEND_LABEL_OFFSET_Y = 10;

/** @inheritDoc */
visflow.LineChart.prototype.defaultProperties = function() {
  return {
    color: '#333',
    border: 'black',
    width: 1.5,
    size: 3,
    opacity: 1
  };
};

/** @inheritDoc */
visflow.LineChart.prototype.selectedProperties = function() {
  return {
    color: 'white',
    border: visflow.const.SELECTED_COLOR
  };
};

/**
 * Rendering properties for selected lines.
 * @return {{
 *   color: string,
 *   width: number
 * }}
 */
visflow.LineChart.prototype.selectedLineProperties = function() {
  return {
    color: visflow.const.SELECTED_COLOR,
    width: 2
  };
};
