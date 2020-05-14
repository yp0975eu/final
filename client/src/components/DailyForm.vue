<template>
  <div>
    <p v-if="showEmojiMessage" class="emoji">{{ emoji }} <span v-if="showErrorMessage">{{ errorMessage }}</span></p>
  <form>
    <div class="form-group">
      <label for="date">Select a day, please.</label>
      <input id="formDate" class="form-control" type="date" 
       v-model="selectedDay"
       v-mind:min="minDate"
       v-bind:max="maxDate"
     >
    </div>
    <div class="form-group">
      <label for="formSelect">How are you feeling today?</label>
      <select id="formSelect" class="form-control" v-model="mood">
        <option value="" selected disabled></option>
        <option value="3">Happy</option>
        <option value="2">Nuetral</option>
        <option value="1">Sad</option>
      </select>
    </div>
    <button type="button" class="btn btn-primary" v-on:click="formSubmit">Submit</button>
  </form>
  </div>
</template>
<script>

export default {
  name: 'DailyForm',
  data() {
    return {
      mood: '',
      showErrorMessage: false,
      errorMessage: '',
      showEmojiMessage: false,
      emoji: '',
      maxDate: '',
      minDate: '',
      selectedDay: ''
    }
  },
  methods: {
    formSubmit() {
      if(!this.mood) {
        this.showMessage(`Did you select a mood?`)
        this.showEmoji('🙄')
        return 
      }
      const d  = new Date(this.selectedDay)
      d.setDate(d.getDate() + 1)
      const entry = {
        value: this.mood,
        date: d
      }

      this.$entriesServices.create(entry)
        .then(() => {
          this.$router.push('/detail/mood')
        })
        .catch(e => {
          let message = e.message
          let emoji = '😶'
          if(e.response.data[0] === "date must be unique") {
            message = "Only one entry per day."
            emoji = '😳'
          }
          this.showMessage(`${message} `)
          this.showEmoji(emoji)
        })
    },
    showMessage(message) {
      this.showErrorMessage = true
      this.errorMessage = message
      setTimeout(() => {
        this.showErrorMessage = false
        this.errorMessage = ''
      }, 3000)
    },
    showEmoji(emoji) {
      this.showEmojiMessage = true
      this.emoji = emoji
    }
  },
  mounted: function() { 
    var date = new Date()
    const d = new Date(date.setDate(date.getDate()))
    const month = d.getMonth() + 1
    const formattedMonth  = month < 10 ? `0${month}`: month
    const fullDate = `${d.getFullYear()}-${formattedMonth}-${d.getDate()}`
    this.maxDate = fullDate
    this.selectedDay = fullDate
    this.minDate = `${date.getFullYear()}-01-01`
  }
}
</script>

<style scoped>
.emoji {
  font-size: 40px;
}
</style>