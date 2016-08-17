/* global $ */

function makeInput (type) {
  var $list = $('#' + type + '-choices')
  console.log($list)
  var options = this[type + 'List']
  options.forEach(function (option) {
    $list.append('<option data-id="' + option.id + '">' + option.name + '</option>')
  })
}

function run () {
  makeInput('hotel')
  makeInput('restaurant')
  makeInput('activity')
}

$('document').ready(run)
