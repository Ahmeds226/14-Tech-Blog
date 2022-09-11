// Date format:
function formDate(dt) {
  return `${new Date(dt).getMonth() + 1}/${new Date(dt).getDate()}/${new Date(
    dt
  ).getFullYear()}`;
}

// Export:
module.exports = {
  formDate,
};
