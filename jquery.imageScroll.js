;(function(g) {
   var imageScroll = function() {
       
   };
   imageScroll.prototype = {
       construct: imageScroll,
       timeOutHandle: null,
       oScroll: null,
       oScrolls: null,
       init: function(id) {
            id = id || '';
            this.oScroll = document.getElementById(id);
            this.oScrolls = this.oScroll.childNodes;
            this.oScrollWidth = 0;
            this.oScrollNums = oScrolls.length;
            this.oScrollNums && (this.oScrollWidth = this.oScrolls[0].clientWidth);
            for (var i=0; i<oScrollNums; i++) {
                oScrolls[i].style.left = i * oScrollWidth + 'px';
                window.onmouseover = imageScroll.run;
                window.onmouseout = imageScroll.stop;
            }
       },
       run: function() {
           for (var i=0; i<this.oScrollNums; i++) {
               var left = this.oScrolls[i].style.left;
               left = parseInt(left)-1 + 'px';
           }
           imageScroll.check();
           this.timeOutHandle = window.setTimeout("this.run()", 10);
       },
       stop: function() {
           this.timeOutHandle && window.clearTimeout(this.timeOutHandle);
       },
       check: function() {
           for (var i=0; i<this.oScrollNums; i++) {
               var left = parseInt(this.oScrolls[i].style.left);
               if (left < -parseInt(this.oScrollWidth)) {
                   this.oScrolls[i].style.left = (this.oScrollNums-1) * this.oScrollWidth + 'px';
               }
           }
       }
   };
})(window, 'yangbai.me');
