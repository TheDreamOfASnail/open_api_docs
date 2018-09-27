var cl_tracker = {
    param: {
        name: 'cl_tracker',
        tenantId: '',
        domain: 'cbe.convertlab.com',
        maxStringLength: 255,
        autoTrack: false,
        register: {
            identityType: 'wechat',
            pageType: 'wechatMiniPgm'
        }
    }
};

try {
  var config = require('conf.js');
  for(var key in config) {
      if (config[key]) {
          cl_tracker.param[key] = config[key];
      }
  }
} catch (e) {

}

// mock lodash
var _ = {};
var ArrayProto = Array.prototype,
    ObjProto = Object.prototype,
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty;

var nativeForEach = ArrayProto.forEach, breaker = {};

_.each = function(obj, iterator, context) {
    if (obj == null) {
        return false;
    }
    if (nativeForEach && obj.forEach === nativeForEach) {
        obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
        for (var i = 0,
                 l = obj.length; i < l; i++) {
            if ( i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
                return false;
            }
        }
    } else {
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                if (iterator.call(context, obj[key], key, obj) === breaker) {
                    return false;
                }
            }
        }
    }
};

_.isObject = function(obj) {
    return (toString.call(obj) == '[object Object]') && (obj != null);
};

_.isEmptyObject = function(obj) {
    if (_.isObject(obj)) {
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                return false;
            }
        }
        return true;
    }
    return false;
};

_.isString = function(obj) {
    return toString.call(obj) == '[object String]';
};

_.isJSONString = function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

_.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
};

_.formatDate = function(d) {
    function pad(n) {
        return n < 10 ? '0' + n : n;
    }

    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) + '.' + pad(d.getMilliseconds());
};

// 把日期格式全部转化成日期字符串
_.searchObjDate = function(o) {
    if (_.isObject(o)) {
        _.each(o, function(a, b) {
            if (_.isObject(a)) {
                _.searchObjDate(o[b]);
            } else {
                if (_.isDate(a)) {
                    o[b] = _.formatDate(a);
                }
            }
        });
    }
};
// 把字符串格式数据限制字符串长度
_.formatString = function(str) {
    if (str.length > cl_tracker.param.maxStringLength) {
        logger.info('字符串长度超过限制，已经做截取--' + str);
        return str.slice(0, cl_tracker.param.maxStringLength);
    } else {
        return str;
    }
};

// 把字符串格式数据限制字符串长度
_.searchObjString = function(o) {
    if (_.isObject(o)) {
        _.each(o, function(a, b) {
            if (_.isObject(a)) {
                _.searchObjString(o[b]);
            } else {
                if (_.isString(a)) {
                    o[b] = _.formatString(a);
                }
            }
        });
    }
};

_.utf8Encode = function(string) {
    string = (string + '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    var utftext = '',
        start,
        end;
    var stringl = 0,
        n;

    start = end = 0;
    stringl = string.length;

    for ( n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
            end++;
        } else if ((c1 > 127) && (c1 < 2048)) {
            enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.substring(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }

    if (end > start) {
        utftext += string.substring(start, string.length);
    }

    return utftext;
};

_.base64Encode = function(data) {
    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var o1,
        o2,
        o3,
        h1,
        h2,
        h3,
        h4,
        bits,
        i = 0,
        ac = 0,
        enc = '',
        tmp_arr = [];
    if (!data) {
        return data;
    }
    data = _.utf8Encode(data);
    do {
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    switch (data.length % 3) {
        case 1:
            enc = enc.slice(0, -2) + '==';
            break;
        case 2:
            enc = enc.slice(0, -1) + '=';
            break;
    }

    return enc;
};

// 普通的extend，不能到二级
_.extend = function(obj) {
    _.each(slice.call(arguments, 1), function(source) {
        for (var prop in source) {
            if (source[prop] !==
                void 0) {
                obj[prop] = source[prop];
            }
        }
    });
    return obj;
};

_.fnvHash = function(s){
    var h =0x811c9dc5;
    for (var i = 0, l = s.length; i < l; i++) {
        h ^= s.charCodeAt(i)
        h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)
    }

    return h >>> 0
};
// finish mock lodash

cl_tracker._ = _;

var logger = {
    info: function() {
        if (typeof console === 'object' && console.log) {
            try {
                return console.log.apply(console, arguments);
            } catch (e) {
                console.log(arguments[0]);
            }
        }
    }
};

cl_tracker._queue = [];
// 是否已经获取到系统信息
cl_tracker.getSystemInfoComplete = false;

cl_tracker.store = {
    _state: {
        props: {}
    },
    getUtma: function (doNotNeedIdentityValue) {
        var tid = cl_tracker.param.tenantId;
        var now = parseInt(new Date().getTime() / 1000);
        if (!this._state.props.identityValue && !doNotNeedIdentityValue) {
            return;
        }

        var ustr = '0.' + _.fnvHash(this._state.props.identityValue || '0');
        var ctma = this._state.utma;

        if (!ctma) {
            ctma = ustr + '.' + tid + '.' + now + '.' + now + '.1';
            this.set('utma', ctma);
        } else {
            var xr2 = ctma.split('.');
            if (xr2[2] != tid) {
                ctma = ustr + '.' + tid + '.' + xr2[3] + '.' + xr2[4] + '.' + xr2[5];
                this.set('utma', ctma);
            } else {
                ctma = ustr + '.' + xr2[2] + '.' + xr2[4] + '.' + now + '.' + (parseInt(xr2[5]) + 1);
                this.set('utma', ctma);
            }
        }
    },
    toState: function (ds) {
        var state = null;
        if (_.isJSONString(ds)) {
            state = JSON.parse(ds);
            if (state.utma) {
                this._state = state;
            } else {
                this.getUtma();
            }
        } else {
            this.getUtma();
        }
    },
    getStorage: function () {
        var state = wx.getStorageSync('cl_data_wechat');
        if (state) {
            this.toState(state);
            return true;
        }
    },
    setStorage: function () {
        wx.setStorageSync('cl_data_wechat', JSON.stringify(this._state));
    },
    getProps: function () {
        return this._state.props || {};
    },
    setProps: function (newp, isCover) {
        var props = this._state.props || {};
        if (!isCover) {
            _.extend(props, newp);
            this.set('props', props);
        } else {
            this.set('props', newp);
        }
        this.setStorage();
    },
    set: function (name, value) {
        var obj = {};
        if (typeof name === 'string') {
            obj[name] = value;
        } else if (typeof name === 'object') {
            obj = name;
        }


        for (var i in obj) {
            this._state[i] = obj[i];
        }
        this.setStorage();
    },
    get: function (name) {
        return this._state[name];
    },
    change: function (name, value) {
        this._state[name] = value;
    },
    init: function () {
        this.getStorage();
    }
};

cl_tracker.prepareData = function (p, callback) {
    if (!cl_tracker.getSystemInfoComplete) {
        cl_tracker._queue.push(arguments);
        return false;
    }

    var data = {
        properties: {}
    };

    _.extend(data, p);

    // 合并properties里的属性
    if (_.isObject(p.properties) && !_.isEmptyObject(p.properties)) {
        _.extend(data.properties, p.properties);
    }

    // profile时不传公用属性
    if (!p.type || p.type.slice(0, 7) !== 'profile') {
        // 传入的属性 > 当前页面的属性 > session的属性 > cookie的属性 > 预定义属性
        data.properties = _.extend({}, cl_tracker.info.properties, cl_tracker.store.getProps(), data.properties);
    }

    data.time = new Date().getTime();

    _.searchObjDate(data);
    _.searchObjString(data);

    cl_tracker.send(data, callback);
};

cl_tracker.setProfile = function (p, c) {
    cl_tracker.prepareData({
        type: 'profile_set',
        properties: p
    }, c);
};

cl_tracker.setOnceProfile = function (p, c) {
    cl_tracker.prepareData({
        type: 'profile_set_once',
        properties: p
    }, c);
};

cl_tracker.track = function (e, p, c) {
    this.prepareData({
        type: 'track',
        event: e,
        properties: p
    }, c);
};

cl_tracker.push = function (obj) {
    if (_.isObject(obj) && !_.isEmptyObject(obj)) {
        cl_tracker.store.setProps(obj);
    }
};

cl_tracker.clearAllRegister = function () {
    cl_tracker.store.setProps({}, true);
};

cl_tracker.info = {
    properties: {},
    getSystem: function () {
        var props = this.properties;
        var self = this;

        function getNetwork() {
            wx.getNetworkType({
                success: function (t) {
                    props.network_type = t.networkType
                },
                complete: getSystemInfo
            })
        }

        function getSystemInfo() {
            wx.getSystemInfo({
                success: function (t) {
                    props.model = t.model;
                    props.screen_width = Number(t.windowWidth);
                    props.screen_height = Number(t.windowHeight);
                    props.os = t.system.split(' ')[0];
                    props.os_version = t.system.split(' ')[1];
                },
                complete: self.setStatusComplete
            })
        }

        getNetwork();
    },
    setStatusComplete: function () {
        cl_tracker.getSystemInfoComplete = true;
        if (cl_tracker._queue.length > 0) {
            _.each(cl_tracker._queue, function (content) {
                cl_tracker.prepareData.apply(cl_tracker, slice.call(content));
            });
            cl_tracker._queue = [];
        }
    }
};

cl_tracker.init = function () {
    this.info.getSystem();
    this.store.init();
    if (_.isObject(this.param.register)) {
        this.info.properties = _.extend(this.info.properties, this.param.register);
    }
};

cl_tracker.send = function (t) {
    var url = '', query = _.extend({}, t.properties), queryArr = [];
    query.tenantId = this.param.tenantId;
    query.event = t.event;
    this.store.getUtma(true);
    query.utma = this.store.get('utma');

    for (var key in query) {
        queryArr.push(key + '=' + encodeURIComponent(query[key]))
    }

    url = 'https://' + cl_tracker.param.domain + '/cbe/__utm?' + queryArr.join('&');

    logger.info(t.event, query, url);

    wx.request({
      url: url,
      method: 'GET'
    })
};

function e(t, n, o) {
    if (t[n]) {
        var e = t[n];
        t[n] = function(t) {
            o.call(this, t, n), e.call(this, t)
        }
    } else
        t[n] = function(t) {
            o.call(this, t, n)
        }
}

function appLaunch() {
    this[cl_tracker.param.name] = cl_tracker;
    cl_tracker.init();
};

function appShow() {

};

function appHide(n, e) {

};

var p = App;

App = function(t) {
    e(t, "onLaunch", appLaunch);
    e(t, "onShow", appShow);
    e(t, "onHide", appHide);
    p(t);
};

function pageOnunload(n, e) {

}

function pageOnload(t, n) {

};

function pageOnshow(t, n) {
    if (cl_tracker.param.autoTrack) {
        var router = typeof this["__route__"] === 'string' ? this["__route__"] : '';
        if (router) {
            cl_tracker.track('open_page', {
                targetName: router,
            });
        }
    }
};

var v = Page;

Page = function(t) {
    e(t, "onLoad", pageOnload);
    e(t, "onUnload", pageOnunload);
    e(t, "onShow", pageOnshow);
    e(t, "onHide", pageOnunload);

    v(t);

}

module.exports = cl_tracker;
