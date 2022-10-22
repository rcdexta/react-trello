export default (message) => {
  if (process.env.NODE_ENV === 'test') { return }
  if (typeof message === 'object') {
    console.dir(message)
  } else {
    console.log(message)
  }
}
