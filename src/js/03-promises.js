const buttonEl = document.querySelector('button[type="submit"]');
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const inputsOfForm = {
    delay: formEl.elements.delay.value,
    step: formEl.elements.step.value,
    amount: formEl.elements.amount.value,
  };

  let delay = Number(inputsOfForm.delay);

  for (let i = 1; i <= inputsOfForm.amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += Number(inputsOfForm.step);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const execFunc = (resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  };

  return new Promise(execFunc);
}
