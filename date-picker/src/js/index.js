class DatePicker {
  monthData = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  // 현재 보이는데 활용될 정보
  #calendarDate = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  }

  selectedDate = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  }

  datePicker
  dateInputEl
  calendarEl
  calendarMonthEl
  monthContentEl
  nextBtnEl
  prevBtnEl
  calendarDatesEl

  constructor() {
    console.log('컨스트럭터', this.#calendarDate)
    this.initCalendarDate()
    this.initSelectedDate()
    this.#assignElement()
    this.setDateInput()
    this.addEvent()
  }

  initSelectedDate() {
    this.selectedDate = { ...this.#calendarDate }
  }

  setDateInput() {
    this.dateInputEl.textContent = this.formatDate(this.selectedDate.data)
    this.dateInputEl.dataset.value = this.selectedDate.data
  }

  #assignElement() {
    this.datePicker = document.getElementById('date-picker')
    this.dateInputEl = this.datePicker.querySelector('#date-input')
    this.calendarEl = this.datePicker.querySelector('#calendar')
    this.calendarMonthEl = this.calendarEl.querySelector('#month')
    this.monthContentEl = this.calendarMonthEl.querySelector('#content')
    this.nextBtnEl = this.calendarMonthEl.querySelector('#next')
    this.prevBtnEl = this.calendarMonthEl.querySelector('#prev')
    // 캘린더의 날짜.
    this.calendarDatesEl = this.calendarEl.querySelector('#dates')
  }

  addEvent() {
    this.dateInputEl?.addEventListener('click', this.#toggleCalendar.bind(this))
    this.nextBtnEl.addEventListener('click', this.moveToNextMonth.bind(this))
    this.prevBtnEl.addEventListener('click', this.moveToPrevMonth.bind(this))
    this.calendarDatesEl.addEventListener(
      'click',
      this.onClickSelectDate.bind(this)
    )
  }

  onClickSelectDate(event) {
    const eventTarget = event.target
    // dataset에 date정보가 있으면?? 날짜 column만 선택하겠다.
    if (eventTarget.dataset.date) {
      this.calendarDatesEl
        .querySelector('.selected')
        ?.classList.remove('selected')
      eventTarget.classList.add('selected')
      this.selectedDate = {
        data: new Date(
          this.#calendarDate.year,
          this.#calendarDate.month,
          eventTarget.dataset.date
        ),
        year: this.#calendarDate.year,
        month: this.#calendarDate.month,
        date: eventTarget.dataset.date,
      }
      this.setDateInput()
      this.calendarEl.classList.remove('active')
    }
  }

  formatDate(dateData) {
    let date = dateData.getDate()
    if (date < 10) {
      date = `0${date}`
    }

    let month = dateData.getMonth() + 1
    if (month < 10) {
      month = `0${month}`
    }

    let year = dateData.getFullYear()
    return `${year}/${month}/${date}`
  }

  moveToNextMonth() {
    this.#calendarDate.month++
    if (this.#calendarDate.month > 11) {
      this.#calendarDate.month = 0
      this.#calendarDate.year++
    }
    this.updateMonth()
    this.updateDates()
  }

  moveToPrevMonth() {
    this.#calendarDate.month--
    if (this.#calendarDate.month < 0) {
      this.#calendarDate.month = 0
      this.#calendarDate.year--
    }
    this.updateMonth()
    this.updateDates()
  }

  #toggleCalendar() {
    // tog
    if (this.calendarEl.classList.contains('active')) {
      this.#calendarDate = { ...this.selectedDate }
    }
    this.calendarEl.classList.toggle('active')
    this.updateMonth()
    this.updateDates()
  }

  updateMonth() {
    this.monthContentEl.textContent = `😀 ${this.#calendarDate.year} ${
      this.monthData[this.#calendarDate.month]
    }`
  }

  updateDates() {
    this.calendarDatesEl.innerHTML = ''
    // 해당 달에 몇일까지 있는지
    const numberOfDates = new Date(
      this.#calendarDate.year,
      this.#calendarDate.month + 1,
      0
    ).getDate()

    const fragment = new DocumentFragment()

    for (let i = 0; i < numberOfDates; i++) {
      const dateEl = document.createElement('div')
      dateEl.classList.add('date')
      dateEl.textContent = i + 1
      dateEl.dataset.date = i + 1
      fragment.appendChild(dateEl)
    }
    fragment.firstChild.style.gridColumnStart =
      // 해당달의 1일이 몇 요일부터 시작하는지 알 수 있다! (인덱스)
      new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay() +
      1
    this.calendarDatesEl.appendChild(fragment)
    this.colorSaturday()
    this.colorSunday()
    this.markToday()
    this.markSelectedDate()
  }

  markSelectedDate() {
    if (
      this.selectedDate.year === this.#calendarDate.year &&
      this.selectedDate.month === this.#calendarDate.month
    ) {
      this.calendarDatesEl
        .querySelector(`[data-date='${this.selectedDate.date}']`)
        .classList.add('selected')
    }
  }

  markToday() {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    const today = currentDate.getDate()

    if (
      currentYear === this.#calendarDate.year &&
      currentMonth === this.#calendarDate.month
    ) {
      this.calendarDatesEl
        .querySelector(`[data-date='${today}']`)
        .classList.add('today')
    }
  }

  colorSaturday() {
    // 모든 토요일 Element을 가져온다.
    const saturdayEls = this.calendarDatesEl.querySelectorAll(
      `.date:nth-child(7n+${
        7 -
        new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay()
      })`
    )
    // 파란색으로 변경해줌
    for (let i = 0; i < saturdayEls.length; i++) {
      saturdayEls[i].style.color = 'blue'
    }
  }

  colorSunday() {
    const sundayEl = this.calendarDatesEl.querySelectorAll(
      `.date:nth-child(7n + ${
        (8 -
          new Date(
            this.#calendarDate.year,
            this.#calendarDate.month,
            1
          ).getDay()) %
        7
      })`
    )

    for (let i = 0; i < sundayEl.length; i++) {
      sundayEl[i].style.color = 'red'
    }
  }

  initCalendarDate() {
    const data = new Date()
    const date = data.getDate()
    const month = data.getMonth()
    const year = data.getFullYear()
    this.#calendarDate = {
      data,
      date,
      month,
      year,
    }

    console.log('캘린더 데이터', this.#calendarDate)
  }
}

new DatePicker()
