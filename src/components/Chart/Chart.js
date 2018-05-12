import React from 'react';
import Chart from 'chart.js';
import pattern from 'patternomaly';

class Charts extends React.Component {
    constructor(){
        super()
    }
    render(){
        let ctx = 'myChart';
      let chart = new Chart(ctx, {
          // The type of chart we want to create
          type: 'line',
      
          // The data for our dataset
          data: {
              labels: ["Cash", "Credit"],
              datasets: [{
                //   label: "temp",
                //   backgroundColor: [
                //     pattern.draw('square', '#ff6384')
                    
                // ],
                  borderColor: 'rgb(255, 99, 132)',
                  data: [1,2,3,4,5,6,7,8,9,10],
                  label: 'Cash Payments',

                    // This binds the dataset to the left y axis
                    yAxisID: 'left-y-axis',
              }]
          },
      
          // Configuration options go here
          options: {
            scales: {
                yAxes: [
                    {ticks: {
                        suggestedMin: 1,
                        suggestedMax: 20
                    }
                },
                    {
                    id: 'left-y-axis',
                    type: 'linear',
                    position: 'left'
                }, {
                    id: 'right-y-axis',
                    type: 'linear',
                    position: 'right'
                }]
            }
          }
      });
      let ctx1 = 'myChart1';
      let chart1 = new Chart(ctx1, {
          // The type of chart we want to create
          type: 'bar',
      
          // The data for our dataset
          data: {
              labels: ["high", "low"],
              datasets: [{
                  label: "temp",
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgb(255, 99, 132)',
                  data: [this.props.maxHum, this.props.minHum],
              }]
          },
      
          // Configuration options go here
          options: {
            tooltips: {
                mode: 'point'
            }
          }
      });
      let ctx2 = 'myChart2';
      let chart2 = new Chart(ctx2, {
          // The type of chart we want to create
          type: 'doughnut',
      
          // The data for our dataset
          data: {
              labels: ["high", "low"],
              datasets: [{
                  label: "temp",
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgb(255, 99, 132)',
                  data: [this.props.maxHum, this.props.maxTemp],
              }]
          },
      
          // Configuration options go here
          options: {}
      });
      let ctx3 = 'myChart3';
      let chart3 = new Chart(ctx3, {
          // The type of chart we want to create
          type: 'doughnut',
      
          // The data for our dataset
          data: {
              labels: ["high", "low"],
              datasets: [{
                  label: "temp",
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgb(255, 99, 132)',
                  data: [this.props.maxHum, this.props.maxTemp],
              }]
          },
      
          // Configuration options go here
          options: {}
      });
      let ctx4 = 'myChart4';
      let chart4 = new Chart(ctx4, {
          // The type of chart we want to create
          type: 'line',
      
          // The data for our dataset
          data: {
            labels: ["high", "low"],
            datasets: [{
                label: "temp",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [this.props.maxHum, this.props.maxTemp],
            }]
        },
      });
      let ctx5 = 'myChart5';
      let chart5 = new Chart(ctx5, {
          // The type of chart we want to create
          type: 'line',
      
          // The data for our dataset
          data: {
              labels: ["high", "low"],
              datasets: [{
                  label: "temp",
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgb(255, 99, 132)',
                  data: [this.props.maxHum, this.props.maxTemp],
              }]
          },
      
          // Configuration options go here
          options: {}
      });
        return(
            <div>
                <h1>{this.props.cashActions}</h1>
            <canvas id="myChart" maxWidth="200" maxHeight="200"></canvas>
            <canvas id="myChart1" maxWidth="200" maxHeight="200"></canvas>
            <canvas id="myChart2" maxWidth="200" maxHeight="200"></canvas>
            <canvas id="myChart3" maxWidth="200" maxHeight="200"></canvas>
            <canvas id="myChart4" maxWidth="200" maxHeight="200"></canvas>
            <canvas id="myChart5" maxWidth="200" maxHeight="200"></canvas>
            </div>
        )
    }
}
export default Charts;