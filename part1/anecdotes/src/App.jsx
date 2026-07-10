import { useState } from "react";

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const VotesLine = (props) => {
  const key = Object.keys(props.votes)[props.selected];
  const value = props.votes[key];
  return (
    <div>
      <p>has {value} votes</p>
    </div>
  );
};

const MostVotes = (props) => {
  const maxVotes = Math.max(...Object.values(props.votes));
  const mostVotedAnecdote = Object.keys(props.votes).find(
    (key) => props.votes[key] === maxVotes,
  );

  return (
    <div>
      <p>{mostVotedAnecdote}</p>
      <p>has {maxVotes} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const texts = {
    name1: "Anecdote of the day",
    name2: "Anecdote with most votes",
  };

  const [selected, setSelected] = useState(0);

  const RandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const [votes, setCounts] = useState(
    Object.fromEntries(anecdotes.map((item) => [item, 0])),
  );

  const voteFor = (selected) => {
    const key = Object.keys(votes)[selected];
    setCounts((prevVotes) => ({
      ...prevVotes,
      [key]: prevVotes[key] + 1,
    }));
  };

  return (
    <div>
      <Header text={texts.name1} />
      <p>{anecdotes[selected]}</p>
      <VotesLine votes={votes} selected={selected} />
      <Button onClick={() => voteFor(selected)} text="vote" />
      <Button onClick={RandomAnecdote} text="next anecdote" />
      <Header text={texts.name2} />
      <MostVotes votes={votes} />
    </div>
  );
};

export default App;
