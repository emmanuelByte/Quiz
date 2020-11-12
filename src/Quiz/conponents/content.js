import React, { useEffect, useState } from "react";
import question from "../Quiz_Bank.json";
import uuid from "react-uuid";
let questions = [];
question.forEach((e, i) => {
  let s = question.splice(1, 1);
  if (questions.length >= 10) {
    return;
  } else questions.push(...s);
});
// questions.forEach((e) => {
//   console.log(e.correct);
// });

function Content({ setArr, setS }) {
  const [next, setNext] = useState(0);
  const [clicked, setClicked] = useState({});
  const [score, setScore] = useState({});
  const [fScore, setFScore] = useState(0);
  const [bool, setBool] = useState(false);
  useEffect(() => {
    if (next < 0) setNext(0);
    else if (next > 9) {
      setBool(true);
      setNext(9);
    }

    // console.log(clicked);

    // console.log(fScore);
    setArr(questions);
    setS(score);
    // console.log(clicked);
  }, [next, clicked, score, setArr, setS, fScore]);

  const handleNext = (e) => {
    let options = document.querySelectorAll(".answer-section button");
    options.forEach((e) => {
      if (e.style.backgroundColor !== "#252d4a")
        e.style.backgroundColor = "#252d4a";
    });
    let t = e.target.innerText;
    if (t === "Previous" && next !== 0 && next > 0) {
      //   console.log("Previous");

      setNext((pre) => {
        // console.log(pre);
        return pre - 1;
      });
    } else if (next < 9 && next >= 0) {
      setNext((pre) => pre + 1);

      //   console.log("Next");
    }
    return t;
  };
  const handleScore = () => {
    if (Object.keys(clicked).length > 0) {
      // console.log(clicked);
      questions.forEach((e, i) => {
        if (clicked[i]) {
          // console.log(clicked[i]);
          e.answerOption.forEach((ele, index) => {
            if (clicked[i][index]) {
              // console.log(e, clicked[i][index]);
              if (clicked[i][index].includes(e.correct)) {
                // console.log(e.correct, clicked[i][index]);
                setScore((pre) => {
                  let p = { ...pre };
                  if (fScore < 10 && !p[i]) setFScore((p) => p + 1);
                  return { ...p, [i]: clicked[i] };
                });
              } else {
                setScore((pre) => {
                  let f = pre;
                  if (fScore > 0 && pre[i]) setFScore((p) => p - 1);
                  delete f[i];
                  return { ...f };
                });
              }
            }
            return null;
          });
        }
        //   return null;
      });
      // if ()
    }
  };

  const entities = {
    "&#039;": "'",
    "&quot;": '"',
    // add more if needed
  };
  return (
    <div className="app" key={uuid()}>
      {/* HINT: replace "false" with logic to display the 
      score when the user has answered all the questions */}
      {bool ? (
        <div className="score-section" key={uuid()}>
          You scored 1 out of {questions.length}
        </div>
      ) : (
        <>
          {[questions[next]].map((e) => {
            document
              .querySelectorAll(".answer-section button")
              .forEach((e, i) => {
                if (clicked[next] && clicked[next][i])
                  e.style.backgroundColor = "#a4b0db";
              });
            return (
              <div key={uuid()} style={{ width: "100%" }}>
                <div className="container" key={uuid()}>
                  <div key={uuid()} className="question-section">
                    <div key={uuid()} className="question-count">
                      <span key={uuid()}>Question {next + 1}</span>/
                      {questions.length}
                    </div>
                    <div key={uuid()} className="question-text">
                      {e.questionText.replace(
                        /&#?\w+;/g,
                        (match) => entities[match]
                      )}
                    </div>
                  </div>
                  <div className="answer-section" key={uuid()}>
                    {e.answerOption.map((e, index) => {
                      return (
                        <button
                          key={uuid()}
                          onClick={(ele) => {
                            // console.log(next, index);
                            setClicked((pre) => ({
                              ...pre,
                              [next]: { [index]: e.answerText },
                            }));
                            // console.log(i, index, e.answerText);
                            let btns = ele.target.parentNode.childNodes;
                            btns.forEach((elem) => {
                              if (elem.style.backgroundColor !== "#252d4a")
                                elem.style.backgroundColor = "#252d4a";
                              elem.focus();
                            });
                            ele.target.style.backgroundColor = "GrayText";
                            handleScore();
                          }}

                          //   key={uuid()}
                        >
                          {e.answerText.replace(
                            /&#?\w+;/g,
                            (match) => entities[match]
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="btn" key={uuid()}>
                    <button
                      onClick={(e) => {
                        handleNext(e);
                      }}>
                      Previous
                    </button>
                    <button
                      key={uuid()}
                      onClick={(e) => {
                        handleNext(e);
                      }}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
export default Content;
