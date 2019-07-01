import get from 'lodash/get'
export default (TABLE) => (key) => get(TABLE, key)
