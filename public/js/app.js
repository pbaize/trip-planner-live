//TODO: initialize Days to objects to arrays
/* global $ */
var Days = [ makeDay() ]
var Today = 0;

function refreshPanel() {
  for (var key in Days[Today]) {
    var $lists = $('#today-' + key + '-list')
    $lists.empty()
    Days[Today][key].forEach(function(elemId) {
        console.log(this[key+'List']);
      $lists.append('<div class="itinerary-item" data-id="'+elemId+'"><span class="title">'
        +this[key+'List'][elemId-1].name+'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>')
    })
  }
}

function makeDay() {
  return {
    hotel: [],
    restaurant: [],
    activity: []
  }
}

function makeInput (type) {
  var $list = $('#' + type + '-choices')
  console.log($list)
  var options = this[type + 'List']
  options.forEach(function (option) {
    $list.append('<option data-id="' + option.id + '">' + option.name + '</option>')
  })
}

function makeAddToToday(type) {
  return function() { 
    var id = $('#'+type+'-choices option:selected').data('id')
    Days[Today][type].push(id)
    refreshPanel()
  }
}

function listenToAddBtns() {
  var $btns = $('#options-panel div')
  $btns.each(function(index) {
    var type = $(this).children('select').data('type');
    $(this).children('button').on('click', makeAddToToday(type))
  })
}

function run () {
  makeInput('hotel')
  makeInput('restaurant')
  makeInput('activity')

  listenToAddBtns()
}


function add () {
    console.log("add!")
}

$('document').ready(run)
