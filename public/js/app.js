// TODO: initialize Days to objects to arrays
/* global $ */
var Days = [ makeDay() ]
var Today = 0

function onDeleteToday () {
  Days.splice(Today, 1)
  if (Days.length === 0) Days.push(makeDay())
  Today = Today === Days.length ? Today - 1 : Today
  refreshPanel()
}

function onAddToDays () {
  Days.push( makeDay() ) 
  refreshPanel()
}

function onSwitchDays (self) {
  return function() {
      console.log(self.Today);
      self.Today = $(this).data('dayIndex')
      self.refreshPanel()
  }
}

function listenToDeleteDayButton () {
  $('#day-title button').on('click', onDeleteToday)
}

function listenToDayBtns () {
  var self = this;
  var $btnList = $('.day-buttons button')
  $btnList.each(function(index) {
    if ($(this).attr('id') === 'day-add') {
      $(this).on('click', onAddToDays)
    } else {
      $(this).on('click', onSwitchDays(self))
    }
  })
}

function refreshPanel () {
  for (var key in Days[Today]) {
    var $lists = $('#today-' + key + '-list')
    $lists.empty()
    Days[Today][key].forEach(function (elemId, index) {
      $lists.append('<div class="itinerary-item" data-index="' + index + '" data-id="' + elemId +
        '"><span class="title">' + findById(this[key + 'List'], elemId).name +
        '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>')
    })
  }
  listenToDeleteBtn()

  var $dayslist = $('.day-buttons')
  $dayslist.empty()
  for (var i = 0; i < Days.length; i++) {
    if (i == Today) {
      $dayslist.append('<button class="btn btn-circle day-btn current-day" data-dayIndex="'+i+'">'+(i+1)+'</button>')
    } else {
      $dayslist.append('<button class="btn btn-circle day-btn" data-dayIndex="'+i+'">'+(i+1)+'</button>')
    }
  }
  $dayslist.append('<button class="btn btn-circle day-btn" id="day-add">+</button>')
  listenToDayBtns()
}

function findById (arr, id) {
  for (var i = 0; i < arr.length; i++) {
    var elem = arr[i]
    if (elem.id === id) return elem
  }
}

function makeDay () {
  return {
    hotel: [],
    restaurant: [],
    activity: []
  }
}

function makeInput (type) {
  var $list = $('#' + type + '-choices')
  var options = this[type + 'List']
  options.forEach(function (option) {
    $list.append('<option data-id="' + option.id + '">' + option.name + '</option>')
  })
}

function makeAddToToday (type) {
  return function () {
    var id = $('#' + type + '-choices option:selected').data('id')
    Days[Today][type].push(id)
    refreshPanel()
  }
}

function listenToDeleteBtn () {
  $('#itinerary button').each(function (index) {
    $(this).on('click', function () {
      var $type = $(this).parents('.list-group').data('type')
      var $index = $(this).parent().data('index')
      Days[Today][$type].splice($index, 1)
      refreshPanel()
    })
  })
}

function listenToAddBtns () {
  var $btns = $('#options-panel div')
  $btns.each(function (index) {
    var type = $(this).children('select').data('type')
    $(this).children('button').on('click', makeAddToToday(type))
  })
}

function run () {
  makeInput('hotel')
  makeInput('restaurant')
  makeInput('activity')

  listenToAddBtns()
  listenToDeleteDayButton()
  listenToDayBtns()
}

$('document').ready(run)
