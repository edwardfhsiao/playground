import bowser from 'bowser';
import Utils from './utils';

if (bowser.msie && bowser.version <= 8) {
  if (window.stop) {
    window.stop();
  }
}

$(document).on('click touchend', '.mobile-menu-icon', (event) => {
  event.preventDefault();
  $('.mo-navbar__nav-mobile.mo-nav-mobile').addClass('visible');
});

$(document).on('click touchend', '.mo-nav-mobile__mask', (event) => {
  event.preventDefault();
  $('.mo-navbar__nav-mobile.mo-nav-mobile').removeClass('visible');
  Utils.hideShareArrow();
});

$(document).on('click touchend', '.modal-mask.modal-mask--normal', (event) => {
  let $el = $(event.target);
  let callback = $el.data('callback');
  let trigger = $el.data('trigger');
  if (trigger == 'true' && typeof callback == 'function'){
    callback();
  }
  event.preventDefault();
  $('.my-modal').removeClass('visible');
  $('.modal-mask.modal-mask--normal').removeClass('visible');
  $('.mo-bottom-modal').removeClass('visible');
  Utils.hideShareArrow();
});

$(document).on('click touchend', '.close-modal', (event) => {
  event.preventDefault();
  $('.modal-mask.modal-mask--normal').click();
});

$(window).scroll(function() {
  var currentScrollHight, targetScrollHight;
  currentScrollHight = $(window).scrollTop();
  targetScrollHight = 20;
  if (currentScrollHight > targetScrollHight - 10) {
    $('.mo-navbar').addClass('mo-navbar--up');
  } else {
    $('.mo-navbar').removeClass('mo-navbar--up');
  }
});

$(window).on('resize', () => {
  if(window.myChart){
    window.myChart.resize();
  }
  if(window.myChart1){
    window.myChart1.resize();
  }
  if(window.myChart2){
    window.myChart2.resize();
  }
  if(window.myPatentSearchChart1){
    window.myPatentSearchChart1.resize();
  }
  if(window.myPatentSearchChart2){
    window.myPatentSearchChart2.resize();
  }
  if(window.myPatentSearchChart3){
    window.myPatentSearchChart3.resize();
  }
});