(function(global, _, Backbone, undefined) {

  app.views.EquationView = Backbone.View.extend({
    el: '.equation-box',
    events: {
      'blur input': 'getValues',
      'focus input': 'getValues',
      'input input': 'getValues',
      'click .evaluate': 'getValues',
    },

    getValues : function(){
      var equation = $('#equation').val();
      var rangeMin = $('#range-min').val();
      var rangeMax = $('#range-max').val();

      this.graphDisplay(this.evaluate(equation,rangeMin,rangeMax));
    },

    evaluate : function(equation,rangeMin,rangeMax){
      equation = this.reformatEquation(equation);
      var data = [];
      for(var x=rangeMin;x<=rangeMax;x++){
        data.push({x:(parseInt(x)),y:eval(equation)});
      }
      console.log("Data = "+JSON.stringify(data));
      return data;
    },

    reformatEquation: function(equation){

      m = equation.match(/x\^(\d+)/g)
      if(m) {
        for(var i=0;i<m.length;i++){
          var power = parseInt(m[i].match(/x\^(\d+)/)[1]);
          var newPowerString = '';
          for(var j=0;j<power-1;j++){
            newPowerString = newPowerString+'x'+'*'
          }
          newPowerString = newPowerString+'x';
          equation = equation.replace(m[i],newPowerString)
        };
      }

      m = equation.match(/(\d+)x/g)
      if(m) {
        for(var i=0;i<m.length;i++){
          var coeff = parseInt(m[i].match(/(\d+)x/)[1]);
          equation = equation.replace(m[i],coeff+'*x');
        };
      }

      console.log("Reformatted Equation = "+equation);
      return equation;
    },

    graphDisplay: function (data) {
     // $('.graph-container').empty();

      function make_x_axis() {        
        return d3.svg.axis()
          .scale(x)
           .orient("bottom")
           .ticks(10)
      }

      function make_y_axis() {        
        return d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(10)
      }

      var margin = {top: 10, right: 20, bottom: 10, left: 50},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      var x = d3.scale.linear()
          .range([0, width]);

      var y = d3.scale.linear()
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      var line = d3.svg.line()
          .interpolate("basis")
          .x(function(d) { return x(d.x); })
          .y(function(d) { return y(d.y); });

      if(d3.select("svg").empty()) {

        var svg = d3.select(".graph-container").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          x.domain([-50,50]);
          maxy = d3.max(data, function(d) { return d.y; });
          y.domain([-maxy,maxy]);
          
          svg.append("path")
              .datum(data)
              .attr("class", "line")
              .attr("d", line);

          svg.append("g")
            .attr("class", "xaxis")
            .attr("transform", "translate(0," + (height/2) + ")")
            .call(xAxis);

          svg.append("g")
            .attr("class", "yaxis")
            .attr("transform", "translate(" + width/2 + ",0)")
            .call(yAxis);

          svg.append("g")         
            .attr("class", "grid")
            .attr("transform", "translate(0," + height + ")")
            .call(make_x_axis()
                .tickSize(-height, 0, 0)
                .tickFormat("")
              )

          svg.append("g")         
            .attr("class", "grid")
            .call(make_y_axis()
                .tickSize(-width, 0, 0)
                .tickFormat("")
              ) 
          }
          else{
            var svg = d3.select("svg");

            x.domain([-50,50]);
            maxy = d3.max(data, function(d) { return d.y; });
            y.domain([-maxy,maxy]);

          svg.selectAll("path")
            .data([data])
            .attr("d", line)
            .transition()
            .duration(750);
          
          svg.select(".yaxis").transition() // change the y axis
              .duration(750)
              .call(yAxis);  

          }
    },

    render: function () {
      var template = _.template($('#equation-template').html());
      this.$el.html(template);
    }
  });

  var equationView = new app.views.EquationView();
  equationView.render();

})(this, _, Backbone);