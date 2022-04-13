export default function toggleClass(parameter,element,className) {
    if (parameter) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }