import questions from './database.js';
import { useState, useEffect } from 'react';

function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [restTime, setRestTime] = useState(10);
  const [areDisabled, setAreDisabled] = useState(false);
  const [anwserShown, setAnwserShown] = useState(false);

  function handleSubmit(isCorrect, e) {
    //ad score
    if(isCorrect)setScore(score + 1);
    //add styles
    e.target.classList.add(isCorrect ? 'correct' : 'incorrect');
    //next question
    setTimeout(() => {
      if(currentQuestion === questions.length - 1){
        setIsFinished(true);
      }else{
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if(restTime > 0) setRestTime((prev) =>  prev - 1);
      if(restTime === 0) setAreDisabled(true);
    }, 1000);

    return () => clearInterval(interval);
  }, [restTime]);

  if(isFinished)
    return(
      <main className='app'>
        <div className='game-finished'>
          <span>Obtuviste {score} de {questions.length}</span>
          <button onClick={() => (window.location.href = '/')}>
            Volver a jugar
          </button>
          <button onClick={() => {
            setIsFinished(false);
            setAnwserShown(true);
            setCurrentQuestion(0);
          }}>
            Ver respuestas
          </button>
        </div>
      </main>
    )
  if(anwserShown)
    return(
      <main className='app'>
           <div className="left-side-shown">
        <div className="num-question">
          <span>Pregunta {currentQuestion + 1} de {questions.length} </span>
        </div>
        <div className="title-question">
          {questions[currentQuestion].title}
        </div>
        <div>
          {questions[currentQuestion].options.filter(
            (option) => option.isCorrect)[0].textResponse}
        </div>
        <button onClick={() => {
           if(currentQuestion === questions.length - 1){
              window.location.href='/';
            }else{
              setCurrentQuestion(currentQuestion + 1);
            }
        }}>
          {currentQuestion === questions.length - 1 ? 'Volver a jugar' : 'Continuar'}
        </button>
      </div>
      </main>
    )

  return (
    <main className="app">

      <div className="left-side">
        <div className="num-question">
          <span>Pregunta {currentQuestion + 1} de {questions.length} </span>
        </div>
        <div className="title-question">
          {questions[currentQuestion].title}
        </div>
        <div>
          {!areDisabled ? (<span className='restTime'>Tiempo restante: {restTime}</span>
          ) : (<button onClick={() => {
            setRestTime(10);
            setAreDisabled(false);
            setCurrentQuestion(currentQuestion + 1);
          }}>Continuar</button>)}
          
        </div>
      </div>

      <div className="right-side">

      {questions[currentQuestion].options.map((response) => (
        <button 
        key={response.textResponse}
        onClick={(e) => handleSubmit(response.isCorrect, e)}
        disabled={areDisabled}
        >
        {response.textResponse}
        </button>
      ))}

      </div>
    </main>
  )
}

export default App
