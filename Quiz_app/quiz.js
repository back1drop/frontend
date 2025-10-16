
      const option1 = document.querySelector(".option1");
      const option2 = document.querySelector(".option2");
      const option3 = document.querySelector(".option3");
      const option4 = document.querySelector(".option4");
      const question = document.querySelector(".question");
      const spans = document.querySelectorAll("span");
      const btn_box = document.querySelector(".btn_box");
      const answers_cont = document.querySelector(".answers_cont");
      const h2 = document.querySelector("h2");
      const main_cont = document.querySelector(".main_cont");
      const inner_cont = document.querySelector(".inner_cont");
      const progressText = document.querySelector(".progress_text");
      const timerDisplay = document.querySelector(".timer");
      const quizCont = document.querySelector(".quiz_cont");
      const startBox = document.querySelector(".start_box");
      const startBtn = document.querySelector(".start_btn");

      const listOfQuiz = [
        {
          question: "1. Which is the smallest continent?",
          answer1: "Asia",
          answer2: "Europe",
          answer3: "Australia",
          answer4: "Africa",
          correctAnswer: "Australia",
        },
        {
          question: "2. Which planet is known as the Red Planet?",
          answer1: "Mars",
          answer2: "Venus",
          answer3: "Jupiter",
          answer4: "Saturn",
          correctAnswer: "Mars",
        },
        {
          question: "3. What is the capital of Japan?",
          answer1: "Beijing",
          answer2: "Tokyo",
          answer3: "Seoul",
          answer4: "Bangkok",
          correctAnswer: "Tokyo",
        },
        {
          question: "4. Which gas do plants absorb?",
          answer1: "Oxygen",
          answer2: "Nitrogen",
          answer3: "Carbon Dioxide",
          answer4: "Hydrogen",
          correctAnswer: "Carbon Dioxide",
        },
      ];

      let current = 0;
      let total_score = 0;
      let timer;
      function LoadQuestion(index) {
        if (listOfQuiz[index]) {
          question.textContent = listOfQuiz[index].question;
          option1.textContent = listOfQuiz[index].answer1;
          option2.textContent = listOfQuiz[index].answer2;
          option3.textContent = listOfQuiz[index].answer3;
          option4.textContent = listOfQuiz[index].answer4;

          spans.forEach((span) => {
            span.classList.remove("wrong", "right");

            span.style.pointerEvents = "auto";
          });
          let progress = (index / listOfQuiz.length) * 100;
          inner_cont.style.width = `${progress}%`;
          progressText.textContent = `Question ${index + 1} of ${
            listOfQuiz.length
          }`;
          startTimer();
        }
      }
      function startTimer() {
        let timeleft = 10;
        timerDisplay.textContent = `Time: ${timeleft}s`;
        clearInterval(timer);
        timer = setInterval(() => {
          timeleft--;
          timerDisplay.textContent = `Timer: ${timeleft}s`;
          if (timeleft <= 0) {
            clearInterval(timer);
            nextQuestion();
          }
        }, 1000);
      }
      //Answers
      spans.forEach((span) => {
        span.addEventListener("click", () => {
          clearInterval(timer);

          spans.forEach((s) => (s.style.pointerEvents = "none"));
          if (span.textContent === listOfQuiz[current].correctAnswer) {
            span.classList.add("right");
            total_score++;
          } else {
            span.classList.add("wrong");
            spans.forEach((s) => {
              if (s.textContent === listOfQuiz[current].correctAnswer) {
                s.classList.add("right");
              }
            });
          }
          NextButton();
        });
      });
      function NextButton() {
        btn_box.innerHTML = "";
        const btn = document.createElement("button");
        btn.textContent = current < listOfQuiz.length - 1 ? "Next" : "Finish";
        btn_box.appendChild(btn);
        btn.addEventListener("click", nextQuestion);
      }
      function nextQuestion() {
        if (current < listOfQuiz.length - 1) {
          current++;
          LoadQuestion(current);
          btn_box.innerHTML = "";
        } else {
          finishQuiz();
        }
      }
      function finishQuiz() {
        inner_cont.style.width = "100%";
        clearInterval(timer);
        question.textContent = "";
        btn_box.innerHTML = "";
        answers_cont.innerHTML = "";

        h2.textContent = "🎉QUIZ COMPLETED!!!";
        const p = document.createElement("p");
        p.textContent = `Your total score is:${total_score} / ${listOfQuiz.length}`;
        p.className = "quiz_score";
        quizCont.appendChild(p);

        let highScore = localStorage.getItem("highScore") || 0;
        if (total_score > highScore) {
          localStorage.setItem("highScore", total_score);
          highScore = total_score;
        }
        const hs = document.createElement("p");
        hs.textContent = `🏆 Highest Score: ${highScore}`;
        quizCont.appendChild(hs);

        //restart
        const restartBtn = document.createElement("button");
        restartBtn.textContent = "Restart Quiz";
        restartBtn.style.marginTop = "15px";
        restartBtn.addEventListener("click", () => location.reload());
        btn_box.appendChild(restartBtn);
      }
      startBtn.addEventListener("click", () => {
        startBox.style.display = "none";
        quizCont.style.display = "flex";
        LoadQuestion(current);
      });
    