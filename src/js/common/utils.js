import _ from 'lodash';
import Spinner from 'spin.js';
import moment from 'moment/min/moment.min';
import qrcode from 'arale-qrcode';
let utils = {
  urlParam: (name) => {
    let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
  },
  setCookie: (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = 'expires='+ d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  },
  getCookie: (cname) => {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length,c.length);
      }
    }
    return '';
  },
  hideMobileMenu: () => {
    $('.mo-navbar__nav-mobile.mo-nav-mobile').removeClass('visible');
  },
  isWechat: () => {
    var ua = navigator.userAgent.toLowerCase();
    return (/micromessenger/.test(ua)) ? true : false ;
  },
  isMobileDevice: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },
  isWindowsWechat: () => {
    return /WindowsWechat/i.test(navigator.userAgent);
  },
  isAndroid: () => {
    return navigator.userAgent.toUpperCase().indexOf('ANDROID') > -1;
  },
  isIos: () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  },
  isNumber: (val) => {
    if (_.isNaN(_.toNumber(val)) || !_.isNumber(_.toNumber(val))){
      return false;
    }
    return true;
  },
  scrollTo: (id) => {
    $('html, body').animate({
        scrollTop: $('#' + id).offset().top
    }, 500);
  },
  showModal: (id) => {
    $('.modal-mask.modal-mask--normal').addClass('visible');
    $('#' + id).addClass('visible');
  },
  hideModal: () => {
    $('.modal-mask.modal-mask--normal').click();
  },
  hideMask: () => {
    $('.modal-mask.modal-mask--normal').click();
  },
  showMask: () => {
    $('.modal-mask.modal-mask--normal').addClass('visible');
  },
  showUnclickableMask: () => {
    $('.modal-mask.modal-mask--unclickable').addClass('visible');
  },
  hideUnclickableMask: () => {
    $('.modal-mask.modal-mask--unclickable').removeClass('visible');
  },
  setupAjaxHeader: (Authorization) => {
    $.ajaxSetup({
        headers: {
        Accept: 'application/json',
        // TODO: change it to 'Authorization: 'Bearer ' + Authorization'
        Authorization: 'Bearer ' + Authorization
        // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlkMjkwYTIyNmM0OGM2NWY1ODYzYTEzYjAyZjYzZjI0M2JmOWE4NzI3ZTk0OTgxNDI5NDViMmE4OWZhOWRkMzY0YzRlMjFlMzVkYTYxNzYxIn0.eyJhdWQiOiIxIiwianRpIjoiOWQyOTBhMjI2YzQ4YzY1ZjU4NjNhMTNiMDJmNjNmMjQzYmY5YTg3MjdlOTQ5ODE0Mjk0NWIyYTg5ZmE5ZGQzNjRjNGUyMWUzNWRhNjE3NjEiLCJpYXQiOjE0Nzg1MDQ2OTcsIm5iZiI6MTQ3ODUwNDY5NywiZXhwIjo0NjM0MTc4Mjk3LCJzdWIiOiI2Iiwic2NvcGVzIjpbXX0.NJEm4j9ExPaW5gBJWVKrkhYBgq3N_SqLlIYVkXGJh5TbKF7k2CHFKGMNm2MPPHye_1c4p--DTyhY5D0CA8O2DdJ9_EgoH5-inPkU3Jj72i9YJX7auq7SoJ8ZQIKJ4RxudFqbiT4yMW_rJ5kZMSEY4RsVr2IP4EQx4cASih1-ACb_HeVDhSstpNVAv9L3dqv_1qsyp79MW_xYQl6JJmwtM_97L_aV78EhdUBKUm3aKSHsI6o1JhMscnl-N4j17njyj2vgNHbpFLNNc0IiuQJMcnf153GpKUqUofqf8hWgrXWKK-Y0trGLyC0jRGZ451ZF4STlLza4V3iQ5LNMDWchn3bu84pJsjW8r4MkMxdVtPFpJgiTNAtWQuw4BpxWx18PlfyPN6kpVPYaTnuvGQSsMmWcwC4NSu3teC7l8-X7HpQkmbHwzsGgIkVYTsy4LCfiSgOTFVekV-34QBywR5wVE046H8Zf9TylUyuim_NKBS7ePGVT0KDEynCB3q9Jjyo4iuovCFI2HVlU3oVOonXG3xMcDm_DG8n8kcDGckogz7GcIMLQNaonOMQCiWGncvQdZr51UhHB2m99-NBVBdS082-kFINwEdCqcAH9BwYvkhQWCUxIZKu6vIUSYWeSTgwBc6rRhYD1qbhis6rh3YJmREcrUwMuEq_G77sXhuCUXIA'
      },
    });
  },
  createNonceStr: () => {
    return Math.random().toString(36).substr(2, 15);
  },
  createTimeStamp: () => {
    return parseInt(new Date().getTime() / 1000) + '';
  },
  showShareArrow: (src, srcSet) => {
    let $img = $('.share-helper__img');
    $img.attr('src', src);
    $img.attr('srcSet', srcSet);
    $('.share-helper').addClass('visible');
  },
  hideShareArrow: () => {
    $('.share-helper').removeClass('visible');
  },
  initSpin: (spinLoaderId, spinnerOpt={length: 20, radius: 20, scale: 0.3, direction: 1, speed: 1.0}) => {
    let $el = document.getElementById(spinLoaderId);
    if ($('#' + spinLoaderId).children().length == 0){
      let spinner = new Spinner(spinnerOpt).spin($el);
      $($el).data('spinner', spinner);
    }
  },
  stopSpin: (spinLoaderId) => {
    let $el = $('#' + spinLoaderId);
    if ($el.length){
      if ($el.data('spinner')){
        $el.data('spinner').stop();
      }
    }
  },
  scrollToFresh: (callback) => {
    $(window).on('scroll', _.throttle(() => {
      let $scrollTo = $('#scroll-to');
      if ($scrollTo.length){
        let hT = $scrollTo.offset().top,
            hH = $scrollTo.outerHeight(),
            wH = $(window).height(),
            wS = $(window).scrollTop();
        if (wS >= (hT+hH-wH - 30)){
          if (typeof callback == 'function'){
            callback();
          }
        }
      }
    }, 500));
  },
  getEventTime: (start_time, end_time) => {
    let weekHash = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    let result = {
      week: '',
      dayIndicator: '',
      date: '',
      time: '',
      endDate: '',
      duration: 0,
      expired: false
    };

    let week = '';
    let dayIndicator = '';
    let duration = '';
    let diff = 0;
    let expired = false;

    let sTime = moment(start_time);
    let eTime = moment(end_time);
    let startTime = sTime.toObject();
    let endTime = eTime.toObject();
    let years = parseInt(startTime.years);
    let months = parseInt(startTime.months) + 1;
    let day = parseInt(startTime.date);
    let hours = parseInt(startTime.hours);
    let minutes = parseInt(startTime.minutes);

    let endTimeMonths = parseInt(endTime.months) + 1;
    let endTimeDay = parseInt(endTime.date);
    let endTimeHours = parseInt(endTime.hours);
    let endTimeMinute = parseInt(endTime.minutes);

    if (months < 10){
      months = '0' + months;
    }

    if (minutes == 0){
      minutes = '00';
    }
    if (hours < 10){
      hours = '0' + hours;
    }

    if (endTimeMinute == 0){
      endTimeMinute = '00';
    }
    if (endTimeHours < 10){
      endTimeHours = '0' + endTimeHours;
    }

    duration = eTime.diff(sTime, 'days');

    week = weekHash[sTime.format('d')];
    let today = moment(new Date());
    let todayObj = today.toObject();
    let tYears = parseInt(todayObj.years);
    let tMonths = parseInt(todayObj.months) + 1;
    let tDay = parseInt(todayObj.date);
    if (years == tYears && tMonths == months){
      let diff = day - tDay;
      if (diff == 0){
        dayIndicator = '今天';
      }
      else if (diff == -1){
        dayIndicator = '昨天';
      }
      else if (diff == 1){
        dayIndicator = '明天';
      }
    }
    diff = sTime.diff(today, 'days');
    if (diff <= 0){
      expired = true;
    }
    result = {
      week: week,
      dayIndicator: dayIndicator,
      date: months + '月' + day + '日',
      time: hours + ':' + minutes,
      endTime: endTimeHours + ':' + endTimeMinute,
      endDate: endTimeMonths + '月' + endTimeDay + '日',
      duration: duration,
      expired: expired,
      years: years,
      months: months,
      day: day,
      startMoment: sTime,
      endMoment: eTime
    };
    return result;
  },
  generatQr: (url, elId) => {
    let qrnode = new qrcode({
      render: 'canvas',
      correctLevel: 3,
      text: url.toString(),
      size: 180,
      image : ''
    });
    $('#' + elId).html(qrnode);
  },
  getRandomNumber: (min, max) => {
    let res = Math.random() * (max - min) + min;
    return _.toNumber(res.toFixed(2));
  }
}

export default utils;