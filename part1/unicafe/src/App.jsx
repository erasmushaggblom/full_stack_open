import { useState } from "react";

const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Mean = ({ numbers }) => {
  const total = numbers.reduce((sum, count) => sum + count, 0);
  const mean = (numbers[0] - numbers[2]) / total;
  return mean;
};

const PercentPositive = ({ numbers }) => {
  const percentage =
    (numbers[0] / numbers.reduce((sum, value) => sum + value, 0)) * 100;
  return percentage;
};

const Total = ({ numbers }) => {
  console.log(numbers);
  const total = numbers.reduce((sum, count) => sum + count, 0);
  return total;
};

const StatisticLine = (props) => {
  console.log(props);
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  console.log(props);

  if (
    !props.contents ||
    props.contents.reduce((sum, count) => sum + count, 0) === 0
  ) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }

  const mean = Mean({ numbers: props.contents });
  const percentage = PercentPositive({ numbers: props.contents });
  const total = Total({ numbers: props.contents });

  return (
    <div>
      <StatisticLine text="good" value={props.contents[0]} />
      <StatisticLine text="neutral" value={props.contents[1]} />
      <StatisticLine text="bad" value={props.contents[2]} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={mean} />
      <StatisticLine text="positive" value={percentage} />
    </div>
  );
};

const App = () => {
  const texts = {
    name1: "give feedback",
    name2: "statistics",
  };
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodFeedback = () => {
    setGood(good + 1);
  };

  const neutralFeedback = () => {
    setNeutral(neutral + 1);
  };

  const badFeedback = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header text={texts.name1} />
      <Button onClick={goodFeedback} text="good" />
      <Button onClick={neutralFeedback} text="neutral" />
      <Button onClick={badFeedback} text="bad" />
      <Header text={texts.name2} />
      <Statistics contents={[good, neutral, bad]} />
    </div>
  );
};

export default App;
