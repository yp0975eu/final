import axios from 'axios'

export default {
  getAll: function () {
    return axios.get('/api/entries').then( response => response.data)
  },
  create: function (entry) {
    const d = new Date(entry.date)
    const data = {
      ...entry,
      date: `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`
    }

    return axios.post('/api/entries', data).then( response => response.data)
  },
  updateEntry: function (entry) {
    return axios.patch('/api/entries', entry).then( response => response.data)
  }
}