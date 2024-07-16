import { Pie } from "react-chartjs-2";
import "../body.css";
function PieChart(props) {
  let obj = props;
  return (
    <div className="chart-container">
      <h2
        style={{
          fontWeight: "bold",
          fontStyle: "oblique",
        }}
      >
        Monthly Payment: $ {obj.monthlypayment}
      </h2>
      <Pie
        data={obj.chartData}
        options={{
          events: ["mousemove"],
          plugins: {
            title: {
              display: false,
              text: "Users Gained between 2016-2020",
            },
          },
        }}
      />
    </div>
  );
}
export default PieChart;
