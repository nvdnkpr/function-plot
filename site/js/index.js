'use strict';
$(document).on('markupLoaded', function () {
  var d3 = window.d3;
  var width = 450, height = 300;
  //var width = 740, height = 450;
  var simpleFunctionPlot = window.simpleFunctionPlot;
  var graphs = {};
  var instance;
  /**
   * ## Plotting a curve
   *
   * The shortest example, the curve y = x^2 is evaluated with values inside the range
   * defined by the canvas size (default dimensions of the canvas are `550x350`),
   * whenever the local space is modified (because of a translate/scale operation)
   * the function is evaluated again with the new bounds, result: infinite graphs!
   */
  instance = simpleFunctionPlot({
    data: [{
      fn: function (x) {
        return Math.sin(x);
      }
    }]
  });
  d3.select('#linear').call(instance);

  /**
   * ## Additional options
   *
   * The shortest example, the curve y = x^2 is evaluated with values inside the range
   * defined by the canvas size (default dimensions are `600x400`), whenever the canvas size
   * is modified (because of a translate/scale operation) the function is evaluated
   * again with the new bounds
   */
  instance = simpleFunctionPlot({
    title: 'area',
    width: width,
    height: height,
    labelX: 'x - axis',
    labelY: 'y - axis',
    domainX: [0, 10],
    data: [{
      title: 'f(x) = x',
      fn: function (x) {
        return Math.sin(x);
      },
      graphOptions: {
        closed: true
      },
      range: [0, 10]
    }]
  });
  d3.select('#closed').call(instance);

  graphs.multiple = simpleFunctionPlot({
    title: 'multiple',
    width: width,
    height: height,
    data: [
      { fn: function (x) { return x; }},
      { fn: function (x) { return -x; }},
      { fn: function (x) { return x * x; }},
      { fn: function (x) { return x * x * x; }},
      { fn: function (x) { return x * x * x * x; }}
    ]
  });

  graphs.withLimits = simpleFunctionPlot({
    title: 'With limits',
    width: width,
    height: height,
    data: [{
      title: 'f(x) = 1/x',
      fn: function (x) {
        return 1 / x;
      },
      graphOptions: {
        limits: [0],
        interpolate: 'linear'
      }
    }]
  });

// scatter
  graphs.scatter = simpleFunctionPlot({
    title: 'scatter',
    width: width,
    height: height,
    domainY: [-1, 9],
    data: [{
      fn: function (x) {
        return Math.sqrt(x);
      },
      graphOptions: {
        type: 'scatter'
      }
    }]
  });

// tip option
  graphs.tip = simpleFunctionPlot({
    title: 'tip',
    width: width,
    height: height,
    tip: {
      xLine: true,
      yLine: true
    },
    domainY: [-1, 9],
    data: [
      { fn: function (x) { return x * x; }}
    ]
  });

// tip option
  graphs.noTitle = simpleFunctionPlot({
    width: width,
    height: height,
    domainY: [-1, 9],
    tip: {
      renderer: function () { return ''; }
    },
    data: [
      { fn: function (x) { return x * x; }}
    ]
  });


// derivative option
  graphs.derivative = simpleFunctionPlot({
    title: 'derivative x0=2',
    width: width,
    height: height,
    domainY: [-1, 9],
    data: [{
      fn: function (x) {
        return x * x;
      },
      derivative: {
        fn: function (x) {
          return 2 * x;
        },
        x0: 2
      }
    }]
  });

// derivative autoupdate
  graphs.derivativeLive = simpleFunctionPlot({
    title: 'derivative autoupdate',
    width: width,
    height: height,
    domainY: [-1, 9],
    data: [{
      fn: function (x) {
        return x * x;
      },
      derivative: {
        fn: function (x) {
          return 2 * x;
        },
        updateOnMouseOver: true
      }
    }]
  });

// derivative autoupdate multiple
  graphs.derivativeLiveMulti = simpleFunctionPlot({
    title: 'multi - derivative autoupdate',
    width: width,
    height: height,
    data: [{
      fn: function (x) {
        return x * x;
      },
      derivative: {
        fn: function (x) {
          return 2 * x;
        },
        updateOnMouseOver: true
      }
    }, {
      fn: function (x) {
        return x * x * x;
      },
      derivative: {
        fn: function (x) {
          return 3 * x * x;
        },
        updateOnMouseOver: true
      }
    }]
  });

// derivative live option
  graphs.linkedA = simpleFunctionPlot({
    title: 'A',
    width: width,
    height: height,
    data: [{ fn: function (x) { return x * x; } }]
  });
  graphs.linkedB = simpleFunctionPlot({
    title: 'B',
    width: width,
    height: height,
    disableZoom: true,
    data: [{ fn: function (x) { return 2 * x; } }]
  });
  graphs.linkedA.addLink(graphs.linkedB);
});


$('#content').load('partials/all.html', function () {
  $(document).trigger('markupLoaded');
});