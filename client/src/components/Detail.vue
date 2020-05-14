<template>
  <div>
    <div><router-link to="/">Home /</router-link> {{ name }}</div>
    <div class="graph">
      <ul class="months">
        <li>Jan</li>
        <li>Feb</li>
        <li>Mar</li>
        <li>Apr</li>
        <li>May</li>
        <li>Jun</li>
        <li>Jul</li>
        <li>Aug</li>
        <li>Sep</li>
        <li>Oct</li>
        <li>Nov</li>
        <li>Dec</li>
      </ul>
      <ul class="days">
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>
      <ul class="squares">
        <li
          v-for="entry in entries"
          v-bind:key="entry.id"
          v-bind:data-level="entry.value"
          v-bind:title="entry.date"
          v-on:click="show(entry)"
        ></li>
      </ul>
    </div>
    <div v-if="showEntry">
      <p>On {{selectedEntry.date}} {{emoji}}</p>
      <p v-if="selectedEntry.note">{{selectedEntry.note}}</p>
      <button type="button" class="btn btn-primary" v-on:click="edit(selectedEntry)">edit?</button>
    </div>
    <div v-if="showOptions">
      <form>
        <div class="form-group">
          <label class="form-label" for="note">Enter a note for {{selectedEntry.date}}</label>
          <textarea id="note" class="form-control" v-model="selectedEntry.note"></textarea>
        </div>
        <div class="form-group">
          <label for="mood">Select a new mood</label>
          <select id="mood" class="form-control" v-model="selectedEntry.value">
            <option value="3">Happy</option>
            <option value="2">Nuetral</option>
            <option value="1">Sad</option>
          </select>
        </div>
        <button type="button" class="btn btn-secondary mr-2" v-on:click="cancel">Cancel</button>
        <button type="button" class="btn btn-primary" v-on:click="update">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  components: {},
  data() {
    return {
      entries: [],
      entriesByDate: {},
      name: "",
      showOptions: false,
      selectedEntry: "",
      mood: "",
      showEntry: false,
    };
  },
  mounted() {
    this.getAll();
    this.name = this.$route.params.name.toUpperCase();
  },
  methods: {
    getAll() {
      this.$entriesServices
        .getAll()
        .then(data => {
          /* map array to object keyed by date
          {
            '01-02-2020': entry
          }
          */
          let mapped = {};
          data.forEach(element => {
            const d = new Date(element.date);
            const formattedDate = this.formatDate(d);
            mapped[formattedDate] = element;
          });
          this.entriesByDate = mapped;
          this.entries = this.populatePastDates(mapped);
        })
        .catch(e => console.log(e));
    },
    populatePastDates(formattedEntries) {
      var entries = [];
      var today = new Date();
      var d1 = new Date(`${today.getFullYear()}-01-01`);
      while (d1.getTime() < today.getTime()) {
        var d2 = new Date(d1.setDate(d1.getDate() + 1));
        const formattedDate = this.formatDate(d2);
        entries.push({
          ...formattedEntries[formattedDate],
          value: formattedEntries[formattedDate]
            ? formattedEntries[formattedDate].value
            : 0,
          date: formattedDate,

        });
      }
      return entries;
    },
    formatDate(date) {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const formattedMonth = month < 10 ? `0${month}` : month;
      const formattedDay = day < 10 ? `0${day}` : day;
      return `${formattedMonth}-${formattedDay}-${date.getFullYear()}`;
    },
    cancel() {
      this.showEntry = false;
      this.showOptions = false;
      this.selectedEntry = '';
    },
    show(entry) {
      this.selectedEntry = entry;
      this.showEntry = true;
      this.showOptions = false;
    },
    edit(entry) {
      this.selectedEntry = entry;
      this.showEntry = false
      this.showOptions = true;
    },
    update() {
      const oldEntry = this.entriesByDate[this.selectedEntry.date]
      const oldMood = oldEntry.value
      const oldNote = oldEntry.note
      if (this.selectedEntry.note === oldNote || this.selectedEntry.value === oldMood) {
        return;
      }
      const data = {
        ...this.selectedEntry,
        note: this.selectedEntry.note
      };
      this.$entriesServices
        .updateEntry(data)
        .then(() => {
          this.entries[this.selectedEntry.date] = data
          this.showOptions = false
          this.selectedEntry = ''
        })
        .catch(e => console.log(e));
    }
  },
  computed: {
    emoji() {
      return ['😶','😐','😃','😞'][this.selectedEntry.value]
    }
  }
};
</script>

<style scoped>
/* Article - https://bitsofco.de/github-contribution-graph-css-grid/ */

/* Grid-related CSS */

.months {
  grid-area: months;
}
.days {
  grid-area: days;
}
.squares {
  grid-area: squares;
}

.graph {
  display: inline-grid;
  grid-template-areas:
    "empty months"
    "days squares";
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  --square-size: 10px;
  --square-gap: 5px;
  --week-width: calc(var(--square-size) + var(--square-gap));
}

.months {
  display: grid;
  grid-template-columns:
    calc(var(--week-width) * 4) /* Jan */
    calc(var(--week-width) * 4) /* Feb */
    calc(var(--week-width) * 4) /* Mar */
    calc(var(--week-width) * 5) /* Apr */
    calc(var(--week-width) * 4) /* May */
    calc(var(--week-width) * 4) /* Jun */
    calc(var(--week-width) * 5) /* Jul */
    calc(var(--week-width) * 4) /* Aug */
    calc(var(--week-width) * 4) /* Sep */
    calc(var(--week-width) * 5) /* Oct */
    calc(var(--week-width) * 4) /* Nov */
    calc(var(--week-width) * 5) /* Dec */;
}

.days,
.squares {
  display: grid;
  grid-gap: var(--square-gap);
  grid-template-rows: repeat(7, var(--square-size));
}

.squares {
  grid-auto-flow: column;
  grid-auto-columns: var(--square-size);
}

.graph {
  padding: 20px;
  border: 1px #e1e4e8 solid;
  margin: 20px;
}

.graph li {
  list-style: none;
}

.days li:nth-child(odd) {
  visibility: hidden;
}

.squares li {
  list-style: none;
  border: 1px solid;
  background-color: #f2f5f8;
}

.squares li[data-level="3"] {
  background-color: #c6e48b;
}

.squares li[data-level="2"] {
  background-color: #7bc96f;
}

.squares li[data-level="1"] {
  background-color: #196127;
}
</style>