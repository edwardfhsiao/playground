import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Input from 'COMPONENTS/Input';
import Select from 'COMPONENTS/Select';
import synaptic from 'synaptic';
import * as d3 from 'd3';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      select: '',
      option: [
        { text: '请', value: '' },
        { text: 'Monday', value: 'Monday' },
        { text: 'Tuesday', value: 'Tuesday' }
      ]
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  componentDidMount() {
    this.initPie();
    // var Neuron = synaptic.Neuron,
    //   Layer = synaptic.Layer,
    //   Network = synaptic.Network,
    //   Trainer = synaptic.Trainer,
    //   Architect = synaptic.Architect;
    // let perceptron = new Architect.Perceptron(2, 1, 1);
    // const trainSet = [
    //   {
    //     input: [0.35, 0.67],
    //     output: [1]
    //   },
    //   {
    //     input: [0.12, 0.75],
    //     output: [0]
    //   },
    //   {
    //     input: [0.16, 0.89],
    //     output: [1]
    //   },
    //   {
    //     input: [0.45, 0.45],
    //     output: [1]
    //   },
    //   {
    //     input: [0.1, 0.9],
    //     output: [0]
    //   }
    // ];
    // const trainingOptions = {
    //   rate: 0.1,
    //   iterations: 20000,
    //   error: 0.005
    // };
    // const res = perceptron.trainer.train(trainSet, trainingOptions);
    // debugger;
  }
  // initPie() {
  //   var tooltip = d3.select('#chart').append('div').attr('class', 'tooltip');

  //   tooltip.append('div').attr('class', 'label');

  //   tooltip.append('div').attr('class', 'count');

  //   tooltip.append('div').attr('class', 'percent');

  //   var dataset = [
  //     { sala: 'Lactantes', value: 74 },
  //     { sala: 'Deambuladores', value: 85 },
  //     { sala: '2 años', value: 840 },
  //     { sala: 'Primera sección', value: 4579 },
  //     { sala: 'Segunda sección', value: 5472 },
  //     { sala: 'Tercera sección', value: 7321 }
  //   ];

  //   var width = 360;
  //   var height = 360;
  //   var radius = Math.min(width, height) / 2;

  //   var color = d3.scaleOrdinal(d3.schemeCategory20c);

  //   var svg = d3
  //     .select('#chart')
  //     .append('svg')
  //     .attr('width', width)
  //     .attr('height', height)
  //     .append('g')
  //     .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

  //   svg.append('g').attr('class', 'slices');
  //   svg.append('g').attr('class', 'labelName');
  //   svg.append('g').attr('class', 'lines');

  //   // add text labels
  //   var label = svg
  //     .select('.labelName')
  //     .selectAll('text')
  //     .data(pie)
  //     .enter()
  //     .append('text')
  //     .attr('dy', '.35em')
  //     .html(function(d) {
  //       // add "key: value" for given category. Number inside tspan is bolded in stylesheet.
  //       return (
  //         d.data[category] +
  //         ': <tspan>' +
  //         percentFormat(d.data[variable]) +
  //         '</tspan>'
  //       );
  //     })
  //     .attr('transform', function(d) {
  //       // effectively computes the centre of the slice.
  //       // see https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
  //       var pos = outerArc.centroid(d);

  //       // changes the point to be on left or right depending on where label is.
  //       pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
  //       return 'translate(' + pos + ')';
  //     })
  //     .style('text-anchor', function(d) {
  //       // if slice centre is on the left, anchor text to start, otherwise anchor to end
  //       return midAngle(d) < Math.PI ? 'start' : 'end';
  //     });

  //   var donutWidth = 75;

  //   var arc = d3.arc().innerRadius(radius - donutWidth).outerRadius(radius);

  //   var pie = d3
  //     .pie()
  //     .value(function(d) {
  //       return d.value;
  //     })
  //     .sort(null);

  //   var legendRectSize = 18;
  //   var legendSpacing = 4;

  //   var path = svg
  //     .selectAll('path')
  //     .data(pie(dataset))
  //     .enter()
  //     .append('path')
  //     .attr('d', arc)
  //     .attr('fill', function(d, i) {
  //       return color(d.data.sala);
  //     });

  //   path.on('mouseover', function(d) {
  //     var total = d3.sum(
  //       dataset.map(function(d) {
  //         return d.value;
  //       })
  //     );
  //     var percent = Math.round(1000 * d.data.value / total) / 10;
  //     tooltip.select('.label').html(d.data.sala);
  //     tooltip.select('.count').html(d.data.value);
  //     tooltip.select('.percent').html(percent + '%');
  //     tooltip.style('display', 'block');
  //   });

  //   path.on('mouseout', function() {
  //     tooltip.style('display', 'none');
  //   });

  //   var legend = svg
  //     .selectAll('.legend')
  //     .data(color.domain())
  //     .enter()
  //     .append('g')
  //     .attr('class', 'legend')
  //     .attr('transform', function(d, i) {
  //       var height = legendRectSize + legendSpacing;
  //       var offset = height * color.domain().length / 2;
  //       var horz = -2 * legendRectSize;
  //       var vert = i * height - offset;
  //       return 'translate(' + horz + ',' + vert + ')';
  //     });

  //   legend
  //     .append('rect')
  //     .attr('width', legendRectSize)
  //     .attr('height', legendRectSize)
  //     .style('fill', color)
  //     .style('stroke', color);

  //   legend
  //     .append('text')
  //     .attr('x', legendRectSize + legendSpacing)
  //     .attr('y', legendRectSize - legendSpacing)
  //     .text(function(d) {
  //       return d;
  //     });
  // }
  initPie() {
    var donut = this.donutChart()
      .width(960)
      .height(500)
      .cornerRadius(3) // sets how rounded the corners are on each slice
      .padAngle(0.015) // effectively dictates the gap between slices
      .variable('Probability')
      .category('Species');

    // d3.tsv('species.tsv', function(error, data) {
    //   if (error) throw error;
    //   d3
    //     .select('#chart')
    //     .datum(data) // bind data to the div
    //     .call(donut); // draw chart in div
    // });
    var dataset = [
      { sala: 'Lactantes', value: 74 },
      { sala: 'Deambuladores', value: 85 },
      { sala: '2 años', value: 840 },
      { sala: 'Primera sección', value: 4579 },
      { sala: 'Segunda sección', value: 5472 },
      { sala: 'Tercera sección', value: 7321 }
    ];

    const data = [
      {
        Species: 'Halobacillus halophilus',
        Probability: 0.10069108308662117
      },
      {
        Species: 'Staphylococcus epidermidis',
        Probability: 0.04076903848429238
      }
      // {
      //   Species: 'Chromobacterium violaceum',
      //   Probability: 0.10318269548054262
      // },
      // {
      //   Species: 'Pseudomonas TKP',
      //   Probability: 0.05880239155316942
      // },
      // {
      //   Species: 'Bacillus subtilis',
      //   Probability: 0.1908578484310064
      // },
      // {
      //   Species: 'Pseudomonas fluorescens',
      //   Probability: 0.10663641563053275
      // },
      // {
      //   Species: 'Micrococcus luteus',
      //   Probability: 0.04523420524963677
      // },
      // {
      //   Species: 'Pseudoalteromonas SM9913',
      //   Probability: 0.08033880363132218
      // },
      // {
      //   Species: 'Enterococcus faecalis',
      //   Probability: 0.07214855298991701
      // },
      // {
      //   Species: 'Escherichia coli',
      //   Probability: 0.2014657031774047
      // }
    ];
    d3
      .select('#chart')
      .datum(data) // bind data to the div
      .call(donut); // draw chart in div
  }
  donutChart() {
    var width,
      height,
      margin = { top: 10, right: 10, bottom: 10, left: 10 },
      color = d3.scaleOrdinal(d3.schemeCategory20c), // color scheme
      variable, // value in data that will dictate proportions on chart
      category, // compare data by
      padAngle, // effectively dictates the gap between slices
      floatFormat = d3.format('.4r'),
      cornerRadius, // sets how rounded the corners are on each slice
      percentFormat = d3.format(',.2%');

    function chart(selection) {
      selection.each(function(data) {
        // generate chart

        // ===========================================================================================
        // Set up constructors for making donut. See https://github.com/d3/d3-shape/blob/master/README.md
        var radius = Math.min(width, height) / 2;
        var arcOver = d3
          .arc()
          .innerRadius(radius * 0.6)
          .outerRadius(radius * 0.8 + 10);
        var arcOut = d3
          .arc()
          .innerRadius(radius * 0.6)
          .outerRadius(radius * 0.8);
        // creates a new pie generator
        var pie = d3
          .pie()
          .value(function(d) {
            return floatFormat(d[variable]);
          })
          .sort(null);

        // contructs and arc generator. This will be used for the donut. The difference between outer and inner
        // radius will dictate the thickness of the donut
        var arc = d3.arc().outerRadius(radius * 0.8).innerRadius(radius * 0.6);
        // .cornerRadius(cornerRadius);
        // .padAngle(padAngle);

        // this arc is used for aligning the text labels
        var outerArc = d3
          .arc()
          .outerRadius(radius * 0.9)
          .innerRadius(radius * 0.9);
        // ===========================================================================================

        // ===========================================================================================
        // append the svg object to the selection
        var svg = selection
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
        // ===========================================================================================

        // ===========================================================================================
        // g elements to keep elements within svg modular
        svg.append('g').attr('class', 'slices');
        svg.append('g').attr('class', 'labelName');
        svg.append('g').attr('class', 'lines');
        // ===========================================================================================
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        color.domain(['Halobacillus halophilus', 'Staphylococcus epidermidis']);
        color.range(['#65C400', '#2290EE']);
        // ===========================================================================================
        // add and color the donut slices
        var path = svg
          .select('.slices')
          .datum(data)
          .selectAll('path')
          .data(pie)
          .enter()
          .append('path')
          .attr('fill', function(d) {
            return color(d.data[category]);
          })
          .attr('d', arc);
        // ===========================================================================================
        // var color = d3.scale.ordinal().range(colorRange.range());
        var legendRectSize = radius * 0.05;
        var legendSpacing = radius * 0.02;
        var legend = svg
          .selectAll('.legend')
          .data(color.domain())
          .enter()
          .append('g')
          .attr('class', 'legend')
          .attr('transform', function(d, i) {
            var height = legendRectSize + legendSpacing;
            var offset = height * color.domain().length / 2;
            var horz = -3 * legendRectSize;
            var vert = i * height - offset;
            return 'translate(' + horz + ',' + vert + ')';
          });

        legend
          .append('rect')
          .attr('width', legendRectSize)
          .attr('height', legendRectSize)
          .style('fill', color)
          .style('stroke', color);

        legend
          .append('text')
          .attr('x', legendRectSize + legendSpacing)
          .attr('y', legendRectSize - legendSpacing)
          .text(function(d) {
            return d;
          });

        // ===========================================================================================
        // add text labels
        var label = svg
          .select('.labelName')
          .selectAll('text')
          .data(pie)
          .enter()
          .append('text')
          .attr('dy', '.35em')
          .html(function(d) {
            // add "key: value" for given category. Number inside tspan is bolded in stylesheet.
            return (
              d.data[category] +
              ': <tspan>' +
              percentFormat(d.data[variable]) +
              '</tspan>'
            );
          })
          .attr('transform', function(d) {
            // effectively computes the centre of the slice.
            // see https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
            var pos = outerArc.centroid(d);

            // changes the point to be on left or right depending on where label is.
            pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
          })
          .style('text-anchor', function(d) {
            // if slice centre is on the left, anchor text to start, otherwise anchor to end
            return midAngle(d) < Math.PI ? 'start' : 'end';
          });
        // ===========================================================================================

        // ===========================================================================================
        // add lines connecting labels to slice. A polyline creates straight lines connecting several points
        var polyline = svg
          .select('.lines')
          .selectAll('polyline')
          .data(pie)
          .enter()
          .append('polyline')
          .attr('points', function(d) {
            // see label transform function for explanations of these three lines.
            var pos = outerArc.centroid(d);
            pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
            return [arc.centroid(d), outerArc.centroid(d), pos];
          })
          .style('opacity', '.3')
          .style('stroke', 'black')
          .style('stroke-width', '2px')
          .style('fill', 'none');
        // ===========================================================================================

        // ===========================================================================================
        // add tooltip to mouse events on slices and labels
        d3.selectAll('.labelName text, .slices path').call(toolTip);
        // ===========================================================================================

        // ===========================================================================================
        // Functions

        // calculates the angle for the middle of a slice
        function midAngle(d) {
          return d.startAngle + (d.endAngle - d.startAngle) / 2;
        }

        // function that creates and adds the tool tip to a selected element
        function toolTip(selection) {
          // add tooltip (svg circle element) when mouse enters label or slice
          selection.on('mouseenter', function(data) {
            // svg
            //   .append('text')
            //   .attr('class', 'toolCircle')
            //   .attr('dy', -15) // hard-coded. can adjust this to adjust text vertical alignment in tooltip
            //   .html(toolTipHTML(data)) // add text to the circle.
            //   .style('font-size', '.9em')
            //   .style('text-anchor', 'middle'); // centres text in tooltip

            // svg
            //   .append('circle')
            //   .attr('class', 'toolCircle')
            //   .attr('r', radius * 0.55) // radius of tooltip circle
            //   .style('fill', color(data.data[category])) // color based on category mouse is over
            //   .style('fill-opacity', 0.35);
            d3.select(this).transition().duration(1).attr('d', arcOver);
          });

          // remove the tooltip when mouse leaves the slice/label
          selection.on('mouseout', function() {
            // d3.selectAll('.toolCircle').remove();
            d3.select(this).transition().duration(1).attr('d', arcOut);
          });
        }

        // function to create the HTML string for the tool tip. Loops through each key in data object
        // and returns the html string key: value
        function toolTipHTML(data) {
          var tip = '', i = 0;

          for (var key in data.data) {
            // if value is a number, format it as a percentage
            var value = !isNaN(parseFloat(data.data[key]))
              ? percentFormat(data.data[key])
              : data.data[key];

            // leave off 'dy' attr for first tspan so the 'dy' attr on text element works. The 'dy' attr on
            // tspan effectively imitates a line break.
            if (i === 0)
              tip += '<tspan x="0">' + key + ': ' + value + '</tspan>';
            else
              tip +=
                '<tspan x="0" dy="1.2em">' + key + ': ' + value + '</tspan>';
            i++;
          }

          return tip;
        }
        // ===========================================================================================
      });
    }

    // getter and setter functions. See Mike Bostocks post "Towards Reusable Charts" for a tutorial on how this works.
    chart.width = function(value) {
      if (!arguments.length) return width;
      width = value;
      return chart;
    };

    chart.height = function(value) {
      if (!arguments.length) return height;
      height = value;
      return chart;
    };

    chart.margin = function(value) {
      if (!arguments.length) return margin;
      margin = value;
      return chart;
    };

    chart.radius = function(value) {
      if (!arguments.length) return radius;
      radius = value;
      return chart;
    };

    chart.padAngle = function(value) {
      if (!arguments.length) return padAngle;
      padAngle = value;
      return chart;
    };

    chart.cornerRadius = function(value) {
      if (!arguments.length) return cornerRadius;
      cornerRadius = value;
      return chart;
    };

    chart.color = function(value) {
      if (!arguments.length) return color;
      color = value;
      return chart;
    };

    chart.variable = function(value) {
      if (!arguments.length) return variable;
      variable = value;
      return chart;
    };

    chart.category = function(value) {
      if (!arguments.length) return category;
      category = value;
      return chart;
    };

    return chart;
  }
  onKeyDown(e) {
    const { value } = this.state;
    if (e.keyCode === 13 && value) {
      const { onAdd } = this.props;
      onAdd && onAdd(value);
      this.clearInput();
    }
  }
  handleNameChange(val) {
    this.setState({ name: val });
  }
  handleSelectionChange(val) {
    this.setState({ select: val });
  }
  render() {
    let { name, select, option } = this.state;
    return (
      <div>
        <Link to={`/`}>{`back`}</Link>
        <Input
          id="1"
          ref={ref => (this.name = ref)}
          value={name}
          type={`number`}
          style="borderless"
          className="underline"
          placeholder={`新增`}
          onChange={this.handleNameChange}
          // onKeyDown={this.onKeyDown}
          validationOption={{
            check: true,
            type: `number`,
            required: true,
            showMsg: true,
            name: `电话`,
            msgOnSuccess: `valid value`,
            msgOnError: `invalid value`,
            max: 10,
            min: 1
          }}
        />
        <Select
          id="3"
          ref={ref => (this.select = ref)}
          value={select}
          option={option}
          style="borderless"
          className="underline"
          placeholder={`请选择`}
          onChange={this.handleSelectionChange}
          validationOption={{
            check: true,
            required: true,
            showMsg: true,
            name: `日期`,
            msgOnSuccess: `valid value`,
            msgOnError: `invalid value`
          }}
        />
        <div id="chart" />
      </div>
    );
  }
}
function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}
Index.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
