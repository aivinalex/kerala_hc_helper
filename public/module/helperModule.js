export const debounce = function (passedFunction, delay) {
  // first debounce created
  let timer;

  const debounced = function (...arg) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      passedFunction(...arg);
    }, delay);
  };

  debounced.cancel = () => clearTimeout(timer);
  return debounced;
};
export const toggleErrorMessager = function (input, errorElement, isError) {
  const errorClasses = ["ring-4", "ring-red-500/30", "border-red-500"];
  const normalClasses = ["border-[#c9b79c]"];
  if (isError) {
    errorElement.classList.remove("hidden");
    input.classList.add(...errorClasses);
    input.classList.remove(...normalClasses);
  } else {
    errorElement.classList.add("hidden");
    input.classList.add(...normalClasses);
    input.classList.remove(...errorClasses);
  }
};
export function createElement(elementType, className = '', text = '') {
  const element = document.createElement(elementType);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}
