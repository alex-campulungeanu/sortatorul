export const sortJsonByProperty = (property, ascending=false) => {
  return (a, b) => {
    if (a[property] > b[property]) {
      return ascending ? 1 : -1
    } else if (a[property] < b[property]) {
      return ascending ? -1 : 1
    }
    return 0
  }
}