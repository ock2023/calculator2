// 첫 번째 피연산자 변수에 저장
// 연산자 변수에 저장
// 두 번째 피연산자 변수에 저장

document.addEventListener("DOMContentLoaded", function () {
  let num1 = "";
  let operator = "";
  let num2 = "";

  let formula = document.querySelector(".formula");
  let answer = document.querySelector(".answer");

  const calc = (num1, operator, num2) => {
    let result = 0;

    if (operator === "+") {
      return Number(num1) + Number(num2);
    }
    if (operator === "-") {
      return Number(num1) - Number(num2);
    }
    if (operator === "×") {
      return Number(num1) * Number(num2);
    }
    if (operator === "÷") {
      return Number(num1) / Number(num2);
    }
    return String(result);
  };

  const onClickNum = (e) => {
    // 넘버 버튼 0을 먼저 클릭했을 때, 숫자가 비어있으면 0은 클릭이 되지 않도록 해야한다.
    // ex) 10은 가능 01은 불가능
    // ** num2 는 되는데 num1은 안 됨 => 조건에 연산자 포함하니 해결되었다.

    if (num1.length > 9 || num2.length > 9) {
      alert("숫자는 9자리를 초과하면 안됩니다.");
      num1 = "";
      operator = "";
      num2 = "";
      answer.textContent = "0";
      formula.textContent = "";
      return;
    }

    if (
      (num2 === "" && num1 === "" && e.target.textContent === "0") ||
      (num1 && operator && num2 === "" && e.target.textContent === "0")
    )
      return;

    if (operator) {
      num2 += e.target.textContent;
      answer.textContent = num2;
    } else {
      num1 += e.target.textContent;
      answer.textContent = num1;
    }
    answer.textContent = num1 + operator + num2;
    answer.style.color = "#000000";
    formula.textContent = num1 + operator + num2;
    // 내가 클릭한 버튼(e.target)의 글자(textContet)를 그대로 가져오는
  };
  const onClickOperator = (e) => {
    // 연사자 연속 클릭 안되도록 해야 함
    if (operator && num2 === "") {
      return;
    }
    if (num1) {
      operator = e.target.textContent;
      answer.textContent += e.target.textContent;
      formula.textContent += e.target.textContent; // 화면에 연산자표시
    } else {
      alert("숫자를 먼저 입력해주세요.");
    }
  };
  // 버튼의 텍스트 내용은 textContent로 가져온다. (value X)

  const onClickPoint = (e) => {
    if (num1 && !operator && !num1.includes(".") && num2 === "") {
      num1 += e.target.textContent;
      answer.textContent = num1;
    } else if (num1 && operator && num2 && !num2.includes(".")) {
      num2 += e.target.textContent;
      answer.textContent = num1 + operator + num2;
    }
  };

  const onClickClear = () => {
    answer.textContent = answer.textContent.slice(0, -1);
    formula.textContent = formula.textContent.slice(0, -1);
    if (num2) {
      num2 = num2.slice(0, -1);
    } else if (operator) {
      operator = operator.slice(-1);
      operator = "";
    } else if (num1) {
      num1 = num1.slice(0, -1);
    }

    // 문제 -> '2', '3',  '-' 후 클리어버튼 누르고, 다시 아무 버튼 클릭하면 '3' 자리가 수정이 됨
    // 1. 기호  '+' 를 누르면 지우지 않은 '3'이 사리지고, '2 +' 가 된다.
    // 2. 숫자 '2'를 누르면 지우지 않은 '3'이 사라지고, '22' 가 된다.
    // => '3'이 지워지지 않고, 숫자나 기호가 '3' 뒤로 이어지길 원한다.
    // => operator = ""와 함께 slice를 추가했더니 해결되었다.
  };

  const onClickEqure = () => {
    if (num1 && operator && num2) {
      result = calc(num1, operator, num2);
      answer.textContent = result;
      answer.style.color = "#14b255";
      formula.textContent = num1 + operator + num2;

      // 계산 결과 후 변수 초기화
      num1 = "";
      operator = "";
      num2 = "";
    } else {
      alert("올바른 수식을 입력하세요.");
    }
  };

  const onClickReset = () => {
    num1 = "";
    operator = "";
    num2 = "";
    formula.textContent = "";
    answer.textContent = "0";
  };

  document.querySelector("#num0").addEventListener("click", onClickNum);
  document.querySelector("#num1").addEventListener("click", onClickNum);
  document.querySelector("#num2").addEventListener("click", onClickNum);
  document.querySelector("#num3").addEventListener("click", onClickNum);
  document.querySelector("#num4").addEventListener("click", onClickNum);
  document.querySelector("#num5").addEventListener("click", onClickNum);
  document.querySelector("#num6").addEventListener("click", onClickNum);
  document.querySelector("#num7").addEventListener("click", onClickNum);
  document.querySelector("#num8").addEventListener("click", onClickNum);
  document.querySelector("#num9").addEventListener("click", onClickNum);

  document.querySelector("#plus").addEventListener("click", onClickOperator);
  document.querySelector("#minus").addEventListener("click", onClickOperator);
  document
    .querySelector("#multiply")
    .addEventListener("click", onClickOperator);
  document.querySelector("#divide").addEventListener("click", onClickOperator);

  document.querySelector("#reset").addEventListener("click", onClickReset);
  document.querySelector("#open-bracket").addEventListener("click", () => {
    // 괄호 바로 다음으로 연산자나 닫는 괄호, =, . 이 오지 못하게 해야함
    answer.textContent = e.target.textContent;
    //
  });
  document.querySelector("#close-bracket").addEventListener("click", () => {
    // 여는 괄호가 있을 경우에만 클릭이벤트가 일어나도록.
  });
  document.querySelector("#clear").addEventListener("click", onClickClear);
  document.querySelector("#equal").addEventListener("click", onClickEqure);
  document.querySelector("#point").addEventListener("click", onClickPoint);
});

// 1. 괄호
// 2. 길이제한
