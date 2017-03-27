(function(global, factory) {
  'use strict';
  // if (typeof define === 'function' && define.amd) {
  //     define(['jquery'], function($) {
  //       return factory($, global, global.document, global.Math);
  //     });
  // } else if (typeof exports === "object" && exports) {
  //     module.exports = factory(require('jquery'), global, global.document, global.Math);
  // } else {
  //     factory(jQuery, global, global.document, global.Math);
  // }
  $.fn.extend({
    alertWhileClick:function(a) {
      var fun = function(a){
        debugger;
        alert(1);
      }
      $(this).click(fun(a));
    }
  });
})();
