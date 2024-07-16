import "./body.css";
import DiscreteSliderSteps from "./bars/bar";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "./chart/pichart";
Chart.register(CategoryScale);

let Body = () => {
  const [homeval, setHomeVal] = useState(3000);
  const [downval, setDownVal] = useState(homeval * 0.2);
  const [loanval, setLoanVal] = useState(homeval - downval);
  const [interestval, setInterestVal] = useState(5);
  const [tenure, setTenure] = useState(5);
  const [payment, setPayment] = useState(0);
  const [interest, setInterest] = useState(0);

  let data = {
    labels: ["Principle", "Interest"],
    datasets: [
      {
        label: "Ration of Principle and Interest ",
        data: [homeval, interest],
        backgroundColor: ["#FCE1E6", "#B2DBFA"],
        borderColor: "rgb(73,165,232)",
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    setDownVal(homeval * 0.2);
    setLoanVal(homeval - downval);
  }, [homeval]);

  useEffect(() => {
    setLoanVal(homeval - downval);
  }, [downval]);

  useEffect(() => {
    let ans1 = loanval * (interestval / 100 / 12);
    let ans2 = 1 + interestval / 100 / 12;
    let ans3 = 1 - Math.pow(ans2, -(12 * tenure));
    let final = ans1 / ans3;
    setPayment(final.toFixed(2));

    let totalInterest = (final * (tenure * 12) - loanval).toFixed(3);
    setInterest(totalInterest);
  }, [homeval, downval, loanval, interestval, tenure]);

  return (
    <div className="box">
      <div className="bars-box">
        <DiscreteSliderSteps
          symbol={"$"}
          min={1000}
          max={10000}
          name={"Home Value"}
          currentVal={homeval}
          default={3000}
          setVal={setHomeVal}
        />

        <DiscreteSliderSteps
          symbol={"$"}
          min={0}
          max={homeval}
          name={"Down Payment"}
          currentVal={downval}
          default={downval}
          setVal={setDownVal}
        />

        <DiscreteSliderSteps
          symbol={"$"}
          min={0}
          max={homeval}
          name={"Loan Amount"}
          currentVal={loanval}
          default={loanval}
          setVal={setLoanVal}
        />

        <DiscreteSliderSteps
          symbol={"%"}
          min={2}
          max={18}
          name={"Interest Rate"}
          currentVal={interestval}
          default={interestval}
          setVal={setInterestVal}
          step={1}
        />

        <div className="tenure">
          <fieldset>
            <legend>Tenure</legend>
            <select onChange={(e) => setTenure(Number(e.target.value))}>
              <option value="5">5 years</option>
              <option value="10">10 years</option>
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="25">25 years</option>
            </select>
          </fieldset>
        </div>
      </div>

      <div className="chart">
        <PieChart chartData={data} monthlypayment={payment} />
      </div>
    </div>
  );
};

export default Body;
