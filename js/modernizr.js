/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-flexboxlegacy-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-csstransforms-csstransforms3d-csstransitions-audio-video-inputtypes-localstorage-inlinesvg-svg-touch-shiv-mq-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-css_mediaqueries-css_remunit-css_vhunit-css_vmaxunit-css_vminunit-css_vwunit-elem_details-elem_time-url_data_uri-load
 */
;



window.Modernizr = (function( window, document, undefined ) {

  var version = '2.8.3',

    Modernizr = {},

    enableClasses = true,

    docElement = document.documentElement,

    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    inputElem  = document.createElement('input')  ,

    smile = ':)',

    toString = {}.toString,

    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),



    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),

    ns = {'svg': 'http://www.w3.org/2000/svg'},

    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName,


    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node, docOverflow,
        div = document.createElement('div'),
        body = document.body,
        fakeBody = body || document.createElement('body');

      if ( parseInt(nodes, 10) ) {
        while ( nodes-- ) {
          node = document.createElement('div');
          node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
          div.appendChild(node);
        }
      }

      style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
      (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
        fakeBody.style.background = '';
        fakeBody.style.overflow = 'hidden';
        docOverflow = docElement.style.overflow;
        docElement.style.overflow = 'hidden';
        docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
      if ( !body ) {
        fakeBody.parentNode.removeChild(fakeBody);
        docElement.style.overflow = docOverflow;
      } else {
        div.parentNode.removeChild(div);
      }

      return !!ret;

    },

    testMediaQuery = function( mq ) {

      var matchMedia = window.matchMedia || window.msMatchMedia;
      if ( matchMedia ) {
        return matchMedia(mq) && matchMedia(mq).matches || false;
      }

      var bool;

      injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) {
        bool = (window.getComputedStyle ?
          getComputedStyle(node, null) :
          node.currentStyle)['position'] == 'absolute';
      });

      return bool;

    },
    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

  if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
    hasOwnProp = function (object, property) {
      return _hasOwnProperty.call(object, property);
    };
  }
  else {
    hasOwnProp = function (object, property) {
      return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
    };
  }


  if (!Function.prototype.bind) {
    Function.prototype.bind = function bind(that) {

      var target = this;

      if (typeof target != "function") {
        throw new TypeError();
      }

      var args = slice.call(arguments, 1),
        bound = function () {

          if (this instanceof bound) {

            var F = function(){};
            F.prototype = target.prototype;
            var self = new F();

            var result = target.apply(
              self,
              args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
              return result;
            }
            return self;

          } else {

            return target.apply(
              that,
              args.concat(slice.call(arguments))
            );

          }

        };

      return bound;
    };
  }

  function setCss( str ) {
    mStyle.cssText = str;
  }

  function setCssAll( str1, str2 ) {
    return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
  }

  function is( obj, type ) {
    return typeof obj === type;
  }

  function contains( str, substr ) {
    return !!~('' + str).indexOf(substr);
  }

  function testProps( props, prefixed ) {
    for ( var i in props ) {
      var prop = props[i];
      if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
        return prefixed == 'pfx' ? prop : true;
      }
    }
    return false;
  }

  function testDOMProps( props, obj, elem ) {
    for ( var i in props ) {
      var item = obj[props[i]];
      if ( item !== undefined) {

        if (elem === false) return props[i];

        if (is(item, 'function')){
          return item.bind(elem || obj);
        }

        return item;
      }
    }
    return false;
  }

  function testPropsAll( prop, prefixed, elem ) {

    var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
      props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

    if(is(prefixed, "string") || is(prefixed, "undefined")) {
      return testProps(props, prefixed);

    } else {
      props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
      return testDOMProps(props, prefixed, elem);
    }
  }    tests['flexbox'] = function() {
    return testPropsAll('flexWrap');
  };


  tests['flexboxlegacy'] = function() {
    return testPropsAll('boxDirection');
  };



  tests['touch'] = function() {
    var bool;

    if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      bool = true;
    } else {
      injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
        bool = node.offsetTop === 9;
      });
    }

    return bool;
  };    tests['rgba'] = function() {
    setCss('background-color:rgba(150,255,150,.5)');

    return contains(mStyle.backgroundColor, 'rgba');
  };


  tests['multiplebgs'] = function() {
    setCss('background:url(https://),url(https://),red url(https://)');

    return (/(url\s*\(.*?){3}/).test(mStyle.background);
  };    tests['backgroundsize'] = function() {
    return testPropsAll('backgroundSize');
  };

  tests['borderimage'] = function() {
    return testPropsAll('borderImage');
  };



  tests['borderradius'] = function() {
    return testPropsAll('borderRadius');
  };

  tests['boxshadow'] = function() {
    return testPropsAll('boxShadow');
  };

  tests['textshadow'] = function() {
    return document.createElement('div').style.textShadow === '';
  };


  tests['opacity'] = function() {
    setCssAll('opacity:.55');

    return (/^0.55$/).test(mStyle.opacity);
  };


  tests['cssanimations'] = function() {
    return testPropsAll('animationName');
  };


  tests['csscolumns'] = function() {
    return testPropsAll('columnCount');
  };


  tests['cssgradients'] = function() {
    var str1 = 'background-image:',
      str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
      str3 = 'linear-gradient(left top,#9f9, white);';

    setCss(
      (str1 + '-webkit- '.split(' ').join(str2 + str1) +
      prefixes.join(str3 + str1)).slice(0, -str1.length)
    );

    return contains(mStyle.backgroundImage, 'gradient');
  };    tests['csstransforms'] = function() {
    return !!testPropsAll('transform');
  };


  tests['csstransforms3d'] = function() {

    var ret = !!testPropsAll('perspective');

    if ( ret && 'webkitPerspective' in docElement.style ) {

      injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
        ret = node.offsetLeft === 9 && node.offsetHeight === 3;
      });
    }
    return ret;
  };


  tests['csstransitions'] = function() {
    return testPropsAll('transition');
  };



  tests['fontface'] = function() {
    var bool;

    injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {
      var style = document.getElementById('smodernizr'),
        sheet = style.sheet || style.styleSheet,
        cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';

      bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
    });

    return bool;
  };

  tests['generatedcontent'] = function() {
    var bool;

    injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''), function( node ) {
      bool = node.offsetHeight >= 3;
    });

    return bool;
  };
  tests['video'] = function() {
    var elem = document.createElement('video'),
      bool = false;

    try {
      if ( bool = !!elem.canPlayType ) {
        bool      = new Boolean(bool);
        bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');

        bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

        bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
      }

    } catch(e) { }

    return bool;
  };

  tests['audio'] = function() {
    var elem = document.createElement('audio'),
      bool = false;

    try {
      if ( bool = !!elem.canPlayType ) {
        bool      = new Boolean(bool);
        bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
        bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');

        bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
        bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||
        elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
      }
    } catch(e) { }

    return bool;
  };


  tests['localstorage'] = function() {
    try {
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      return true;
    } catch(e) {
      return false;
    }
  };


  tests['svg'] = function() {
    return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
  };

  tests['inlinesvg'] = function() {
    var div = document.createElement('div');
    div.innerHTML = '<svg/>';
    return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
  };    function webforms() {
    Modernizr['inputtypes'] = (function(props) {

      for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

        inputElem.setAttribute('type', inputElemType = props[i]);
        bool = inputElem.type !== 'text';

        if ( bool ) {

          inputElem.value         = smile;
          inputElem.style.cssText = 'position:absolute;visibility:hidden;';

          if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

            docElement.appendChild(inputElem);
            defaultView = document.defaultView;

            bool =  defaultView.getComputedStyle &&
            defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
            (inputElem.offsetHeight !== 0);

            docElement.removeChild(inputElem);

          } else if ( /^(search|tel)$/.test(inputElemType) ){
          } else if ( /^(url|email)$/.test(inputElemType) ) {
            bool = inputElem.checkValidity && inputElem.checkValidity() === false;

          } else {
            bool = inputElem.value != smile;
          }
        }

        inputs[ props[i] ] = !!bool;
      }
      return inputs;
    })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
  }
  for ( var feature in tests ) {
    if ( hasOwnProp(tests, feature) ) {
      featureName  = feature.toLowerCase();
      Modernizr[featureName] = tests[feature]();

      classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
    }
  }

  Modernizr.input || webforms();


  Modernizr.addTest = function ( feature, test ) {
    if ( typeof feature == 'object' ) {
      for ( var key in feature ) {
        if ( hasOwnProp( feature, key ) ) {
          Modernizr.addTest( key, feature[ key ] );
        }
      }
    } else {

      feature = feature.toLowerCase();

      if ( Modernizr[feature] !== undefined ) {
        return Modernizr;
      }

      test = typeof test == 'function' ? test() : test;

      if (typeof enableClasses !== "undefined" && enableClasses) {
        docElement.className += ' ' + (test ? '' : 'no-') + feature;
      }
      Modernizr[feature] = test;

    }

    return Modernizr;
  };


  setCss('');
  modElem = inputElem = null;

  ;(function(window, document) {
    var version = '3.7.0';

    var options = window.html5 || {};

    var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

    var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

    var supportsHtml5Styles;

    var expando = '_html5shiv';

    var expanID = 0;

    var expandoData = {};

    var supportsUnknownElements;

    (function() {
      try {
        var a = document.createElement('a');
        a.innerHTML = '<xyz></xyz>';
        supportsHtml5Styles = ('hidden' in a);

        supportsUnknownElements = a.childNodes.length == 1 || (function() {
          (document.createElement)('a');
          var frag = document.createDocumentFragment();
          return (
          typeof frag.cloneNode == 'undefined' ||
          typeof frag.createDocumentFragment == 'undefined' ||
          typeof frag.createElement == 'undefined'
          );
        }());
      } catch(e) {
        supportsHtml5Styles = true;
        supportsUnknownElements = true;
      }

    }());

    function addStyleSheet(ownerDocument, cssText) {
      var p = ownerDocument.createElement('p'),
        parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

      p.innerHTML = 'x<style>' + cssText + '</style>';
      return parent.insertBefore(p.lastChild, parent.firstChild);
    }

    function getElements() {
      var elements = html5.elements;
      return typeof elements == 'string' ? elements.split(' ') : elements;
    }

    function getExpandoData(ownerDocument) {
      var data = expandoData[ownerDocument[expando]];
      if (!data) {
        data = {};
        expanID++;
        ownerDocument[expando] = expanID;
        expandoData[expanID] = data;
      }
      return data;
    }

    function createElement(nodeName, ownerDocument, data){
      if (!ownerDocument) {
        ownerDocument = document;
      }
      if(supportsUnknownElements){
        return ownerDocument.createElement(nodeName);
      }
      if (!data) {
        data = getExpandoData(ownerDocument);
      }
      var node;

      if (data.cache[nodeName]) {
        node = data.cache[nodeName].cloneNode();
      } else if (saveClones.test(nodeName)) {
        node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
      } else {
        node = data.createElem(nodeName);
      }

      return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
    }

    function createDocumentFragment(ownerDocument, data){
      if (!ownerDocument) {
        ownerDocument = document;
      }
      if(supportsUnknownElements){
        return ownerDocument.createDocumentFragment();
      }
      data = data || getExpandoData(ownerDocument);
      var clone = data.frag.cloneNode(),
        i = 0,
        elems = getElements(),
        l = elems.length;
      for(;i<l;i++){
        clone.createElement(elems[i]);
      }
      return clone;
    }

    function shivMethods(ownerDocument, data) {
      if (!data.cache) {
        data.cache = {};
        data.createElem = ownerDocument.createElement;
        data.createFrag = ownerDocument.createDocumentFragment;
        data.frag = data.createFrag();
      }


      ownerDocument.createElement = function(nodeName) {
        if (!html5.shivMethods) {
          return data.createElem(nodeName);
        }
        return createElement(nodeName, ownerDocument, data);
      };

      ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
        'var n=f.cloneNode(),c=n.createElement;' +
        'h.shivMethods&&(' +
        getElements().join().replace(/[\w\-]+/g, function(nodeName) {
          data.createElem(nodeName);
          data.frag.createElement(nodeName);
          return 'c("' + nodeName + '")';
        }) +
        ');return n}'
      )(html5, data.frag);
    }

    function shivDocument(ownerDocument) {
      if (!ownerDocument) {
        ownerDocument = document;
      }
      var data = getExpandoData(ownerDocument);

      if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
        data.hasCSS = !!addStyleSheet(ownerDocument,
          'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
          'mark{background:#FF0;color:#000}' +
          'template{display:none}'
        );
      }
      if (!supportsUnknownElements) {
        shivMethods(ownerDocument, data);
      }
      return ownerDocument;
    }

    var html5 = {

      'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',

      'version': version,

      'shivCSS': (options.shivCSS !== false),

      'supportsUnknownElements': supportsUnknownElements,

      'shivMethods': (options.shivMethods !== false),

      'type': 'default',

      'shivDocument': shivDocument,

      createElement: createElement,

      createDocumentFragment: createDocumentFragment
    };

    window.html5 = html5;

    shivDocument(document);

  }(this, document));

  Modernizr._version      = version;

  Modernizr._prefixes     = prefixes;
  Modernizr._domPrefixes  = domPrefixes;
  Modernizr._cssomPrefixes  = cssomPrefixes;

  Modernizr.mq            = testMediaQuery;


  Modernizr.testProp      = function(prop){
    return testProps([prop]);
  };

  Modernizr.testAllProps  = testPropsAll;


  Modernizr.testStyles    = injectElementWithStyles;    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

  (enableClasses ? ' js ' + classes.join(' ') : '');

  return Modernizr;

})(this, this.document);
/*yepnope1.5.4|WTFPL*/
(function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);
Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0));};


Modernizr.addTest('mediaqueries', Modernizr.mq('only all'));
// test by github.com/nsfmc

// "The 'rem' unit ('root em') is relative to the computed
// value of the 'font-size' value of the root element."
// http://www.w3.org/TR/css3-values/#relative0
// you can test by checking if the prop was ditched

// http://snook.ca/archives/html_and_css/font-size-with-rem

Modernizr.addTest('cssremunit', function(){

  var div = document.createElement('div');
  try {
    div.style.fontSize = '3rem';
  } catch(er){}
  return (/rem/).test(div.style.fontSize);

});
// https://github.com/Modernizr/Modernizr/issues/572
// Similar to http://jsfiddle.net/FWeinb/etnYC/
Modernizr.addTest('cssvhunit', function() {
  var bool;
  Modernizr.testStyles("#modernizr { height: 50vh; }", function(elem, rule) {
    var height = parseInt(window.innerHeight/2,10),
      compStyle = parseInt((window.getComputedStyle ?
        getComputedStyle(elem, null) :
        elem.currentStyle)["height"],10);

    bool= (compStyle == height);
  });
  return bool;
});// https://github.com/Modernizr/Modernizr/issues/572
// http://jsfiddle.net/glsee/JDsWQ/4/
Modernizr.addTest('cssvmaxunit', function(){
  var bool;
  Modernizr.testStyles("#modernizr { width: 50vmax; }", function(elem, rule) {
    var one_vw = window.innerWidth/100,
      one_vh = window.innerHeight/100,
      compWidth = parseInt((window.getComputedStyle ?
        getComputedStyle(elem, null) :
        elem.currentStyle)['width'],10);
    bool = ( parseInt(Math.max(one_vw, one_vh)*50,10) == compWidth );
  });
  return bool;
});// https://github.com/Modernizr/Modernizr/issues/572
// http://jsfiddle.net/glsee/JRmdq/8/
Modernizr.addTest('cssvminunit', function(){
  var bool;
  Modernizr.testStyles("#modernizr { width: 50vmin; }", function(elem, rule) {
    var one_vw = window.innerWidth/100,
      one_vh = window.innerHeight/100,
      compWidth = parseInt((window.getComputedStyle ?
        getComputedStyle(elem, null) :
        elem.currentStyle)['width'],10);
    bool = ( parseInt(Math.min(one_vw, one_vh)*50,10) == compWidth );
  });
  return bool;
});
// https://github.com/Modernizr/Modernizr/issues/572
// http://jsfiddle.net/FWeinb/etnYC/
Modernizr.addTest('cssvwunit', function(){
  var bool;
  Modernizr.testStyles("#modernizr { width: 50vw; }", function(elem, rule) {
    var width = parseInt(window.innerWidth/2,10),
      compStyle = parseInt((window.getComputedStyle ?
        getComputedStyle(elem, null) :
        elem.currentStyle)["width"],10);

    bool= (compStyle == width);
  });
  return bool;
});
// <time> element
// http://www.whatwg.org/specs/web-apps/current-work/multipage/rendering.html#the-time-element-0
// by Addy Osmani
Modernizr.addTest('time', 'valueAsDate' in document.createElement('time'));
// By @mathias, based on http://mths.be/axh
Modernizr.addTest('details', function() {
  var doc = document,
    el = doc.createElement('details'),
    fake,
    root,
    diff;
  if (!('open' in el)) { // return early if possible; thanks @aFarkas!
    return false;
  }
  root = doc.body || (function() {
    var de = doc.documentElement;
    fake = true;
    return de.insertBefore(doc.createElement('body'), de.firstElementChild || de.firstChild);
  }());
  el.innerHTML = '<summary>a</summary>b';
  el.style.display = 'block';
  root.appendChild(el);
  diff = el.offsetHeight;
  el.open = true;
  diff = diff != el.offsetHeight;
  root.removeChild(el);
  fake && root.parentNode.removeChild(root);
  return diff;
});// data uri test.
// https://github.com/Modernizr/Modernizr/issues/14

// This test is asynchronous. Watch out.


// in IE7 in HTTPS this can cause a Mixed Content security popup. 
//  github.com/Modernizr/Modernizr/issues/362
// To avoid that you can create a new iframe and inject this.. perhaps..


(function(){

  var datauri = new Image();


  datauri.onerror = function() {
    Modernizr.addTest('datauri', function () { return false; });
  };
  datauri.onload = function() {
    Modernizr.addTest('datauri', function () { return (datauri.width == 1 && datauri.height == 1); });
  };

  datauri.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

})();
;