//----------------------------------------------------------
// Copyright (C) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------
// MicrosoftAjax.js
Function.__typeName = "Function";
Function.__class = true;
Function.createCallback = function (b, a) { return function () { var e = arguments.length; if (e > 0) {
    var d = [];
    for (var c = 0; c < e; c++)
        d[c] = arguments[c];
    d[e] = a;
    return b.apply(this, d);
} return b.call(this, a); }; };
Function.createDelegate = function (a, b) { return function () { return b.apply(a, arguments); }; };
Function.emptyFunction = Function.emptyMethod = function () { };
Function._validateParams = function (e, c) { var a; a = Function._validateParameterCount(e, c); if (a) {
    a.popStackFrame();
    return a;
} for (var b = 0; b < e.length; b++) {
    var d = c[Math.min(b, c.length - 1)], f = d.name;
    if (d.parameterArray)
        f += "[" + (b - c.length + 1) + "]";
    a = Function._validateParameter(e[b], d, f);
    if (a) {
        a.popStackFrame();
        return a;
    }
} return null; };
Function._validateParameterCount = function (e, a) { var c = a.length, d = 0; for (var b = 0; b < a.length; b++)
    if (a[b].parameterArray)
        c = Number.MAX_VALUE;
    else if (!a[b].optional)
        d++; if (e.length < d || e.length > c) {
    var f = Error.parameterCount();
    f.popStackFrame();
    return f;
} return null; };
Function._validateParameter = function (c, a, h) { var b, g = a.type, l = !!a.integer, k = !!a.domElement, m = !!a.mayBeNull; b = Function._validateParameterType(c, g, l, k, m, h); if (b) {
    b.popStackFrame();
    return b;
} var e = a.elementType, f = !!a.elementMayBeNull; if (g === Array && typeof c !== "undefined" && c !== null && (e || !f)) {
    var j = !!a.elementInteger, i = !!a.elementDomElement;
    for (var d = 0; d < c.length; d++) {
        var n = c[d];
        b = Function._validateParameterType(n, e, j, i, f, h + "[" + d + "]");
        if (b) {
            b.popStackFrame();
            return b;
        }
    }
} return null; };
Function._validateParameterType = function (a, c, n, m, k, d) { var b; if (typeof a === "undefined")
    if (k)
        return null;
    else {
        b = Error.argumentUndefined(d);
        b.popStackFrame();
        return b;
    } if (a === null)
    if (k)
        return null;
    else {
        b = Error.argumentNull(d);
        b.popStackFrame();
        return b;
    } if (c && c.__enum) {
    if (typeof a !== "number") {
        b = Error.argumentType(d, Object.getType(a), c);
        b.popStackFrame();
        return b;
    }
    if (a % 1 === 0) {
        var e = c.prototype;
        if (!c.__flags || a === 0) {
            for (var i in e)
                if (e[i] === a)
                    return null;
        }
        else {
            var l = a;
            for (var i in e) {
                var f = e[i];
                if (f === 0)
                    continue;
                if ((f & a) === f)
                    l -= f;
                if (l === 0)
                    return null;
            }
        }
    }
    b = Error.argumentOutOfRange(d, a, String.format(Sys.Res.enumInvalidValue, a, c.getName()));
    b.popStackFrame();
    return b;
} if (m) {
    var h;
    if (typeof a.nodeType !== "number") {
        var g = a.ownerDocument || a.document || a;
        if (g != a) {
            var j = g.defaultView || g.parentWindow;
            h = j != a && !(j.document && a.document && j.document === a.document);
        }
        else
            h = typeof g.body === "undefined";
    }
    else
        h = a.nodeType === 3;
    if (h) {
        b = Error.argument(d, Sys.Res.argumentDomElement);
        b.popStackFrame();
        return b;
    }
} if (c && !c.isInstanceOfType(a)) {
    b = Error.argumentType(d, Object.getType(a), c);
    b.popStackFrame();
    return b;
} if (c === Number && n)
    if (a % 1 !== 0) {
        b = Error.argumentOutOfRange(d, a, Sys.Res.argumentInteger);
        b.popStackFrame();
        return b;
    } return null; };
Error.__typeName = "Error";
Error.__class = true;
Error.create = function (d, b) { var a = new Error(d); a.message = d; if (b)
    for (var c in b)
        a[c] = b[c]; a.popStackFrame(); return a; };
Error.argument = function (a, c) { var b = "Sys.ArgumentException: " + (c ? c : Sys.Res.argument); if (a)
    b += "\n" + String.format(Sys.Res.paramName, a); var d = Error.create(b, { name: "Sys.ArgumentException", paramName: a }); d.popStackFrame(); return d; };
Error.argumentNull = function (a, c) { var b = "Sys.ArgumentNullException: " + (c ? c : Sys.Res.argumentNull); if (a)
    b += "\n" + String.format(Sys.Res.paramName, a); var d = Error.create(b, { name: "Sys.ArgumentNullException", paramName: a }); d.popStackFrame(); return d; };
Error.argumentOutOfRange = function (c, a, d) { var b = "Sys.ArgumentOutOfRangeException: " + (d ? d : Sys.Res.argumentOutOfRange); if (c)
    b += "\n" + String.format(Sys.Res.paramName, c); if (typeof a !== "undefined" && a !== null)
    b += "\n" + String.format(Sys.Res.actualValue, a); var e = Error.create(b, { name: "Sys.ArgumentOutOfRangeException", paramName: c, actualValue: a }); e.popStackFrame(); return e; };
Error.argumentType = function (d, c, b, e) { var a = "Sys.ArgumentTypeException: "; if (e)
    a += e;
else if (c && b)
    a += String.format(Sys.Res.argumentTypeWithTypes, c.getName(), b.getName());
else
    a += Sys.Res.argumentType; if (d)
    a += "\n" + String.format(Sys.Res.paramName, d); var f = Error.create(a, { name: "Sys.ArgumentTypeException", paramName: d, actualType: c, expectedType: b }); f.popStackFrame(); return f; };
Error.argumentUndefined = function (a, c) { var b = "Sys.ArgumentUndefinedException: " + (c ? c : Sys.Res.argumentUndefined); if (a)
    b += "\n" + String.format(Sys.Res.paramName, a); var d = Error.create(b, { name: "Sys.ArgumentUndefinedException", paramName: a }); d.popStackFrame(); return d; };
Error.format = function (a) { var c = "Sys.FormatException: " + (a ? a : Sys.Res.format), b = Error.create(c, { name: "Sys.FormatException" }); b.popStackFrame(); return b; };
Error.invalidOperation = function (a) { var c = "Sys.InvalidOperationException: " + (a ? a : Sys.Res.invalidOperation), b = Error.create(c, { name: "Sys.InvalidOperationException" }); b.popStackFrame(); return b; };
Error.notImplemented = function (a) { var c = "Sys.NotImplementedException: " + (a ? a : Sys.Res.notImplemented), b = Error.create(c, { name: "Sys.NotImplementedException" }); b.popStackFrame(); return b; };
Error.parameterCount = function (a) { var c = "Sys.ParameterCountException: " + (a ? a : Sys.Res.parameterCount), b = Error.create(c, { name: "Sys.ParameterCountException" }); b.popStackFrame(); return b; };
Error.prototype.popStackFrame = function () { if (typeof this.stack === "undefined" || this.stack === null || typeof this.fileName === "undefined" || this.fileName === null || typeof this.lineNumber === "undefined" || this.lineNumber === null)
    return; var a = this.stack.split("\n"), c = a[0], e = this.fileName + ":" + this.lineNumber; while (typeof c !== "undefined" && c !== null && c.indexOf(e) === -1) {
    a.shift();
    c = a[0];
} var d = a[1]; if (typeof d === "undefined" || d === null)
    return; var b = d.match(/@(.*):(\d+)$/); if (typeof b === "undefined" || b === null)
    return; this.fileName = b[1]; this.lineNumber = parseInt(b[2]); a.shift(); this.stack = a.join("\n"); };
Object.__typeName = "Object";
Object.__class = true;
Object.getType = function (b) { var a = b.constructor; if (!a || typeof a !== "function" || !a.__typeName || a.__typeName === "Object")
    return Object; return a; };
Object.getTypeName = function (a) { return Object.getType(a).getName(); };
String.__typeName = "String";
String.__class = true;
String.prototype.endsWith = function (a) { return this.substr(this.length - a.length) === a; };
String.prototype.startsWith = function (a) { return this.substr(0, a.length) === a; };
String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, ""); };
String.prototype.trimEnd = function () { return this.replace(/\s+$/, ""); };
String.prototype.trimStart = function () { return this.replace(/^\s+/, ""); };
String.format = function () { return String._toFormattedString(false, arguments); };
String.localeFormat = function () { return String._toFormattedString(true, arguments); };
String._toFormattedString = function (l, j) { var c = "", e = j[0]; for (var a = 0; true;) {
    var f = e.indexOf("{", a), d = e.indexOf("}", a);
    if (f < 0 && d < 0) {
        c += e.slice(a);
        break;
    }
    if (d > 0 && (d < f || f < 0)) {
        c += e.slice(a, d + 1);
        a = d + 2;
        continue;
    }
    c += e.slice(a, f);
    a = f + 1;
    if (e.charAt(a) === "{") {
        c += "{";
        a++;
        continue;
    }
    if (d < 0)
        break;
    var h = e.substring(a, d), g = h.indexOf(":"), k = parseInt(g < 0 ? h : h.substring(0, g), 10) + 1, i = g < 0 ? "" : h.substring(g + 1), b = j[k];
    if (typeof b === "undefined" || b === null)
        b = "";
    if (b.toFormattedString)
        c += b.toFormattedString(i);
    else if (l && b.localeFormat)
        c += b.localeFormat(i);
    else if (b.format)
        c += b.format(i);
    else
        c += b.toString();
    a = d + 1;
} return c; };
Boolean.__typeName = "Boolean";
Boolean.__class = true;
Boolean.parse = function (b) { var a = b.trim().toLowerCase(); if (a === "false")
    return false; if (a === "true")
    return true; };
Date.__typeName = "Date";
Date.__class = true;
Date._appendPreOrPostMatch = function (e, b) { var d = 0, a = false; for (var c = 0, g = e.length; c < g; c++) {
    var f = e.charAt(c);
    switch (f) {
        case "'":
            if (a)
                b.append("'");
            else
                d++;
            a = false;
            break;
        case "\\":
            if (a)
                b.append("\\");
            a = !a;
            break;
        default:
            b.append(f);
            a = false;
    }
} return d; };
Date._expandFormat = function (a, b) { if (!b)
    b = "F"; if (b.length === 1)
    switch (b) {
        case "d": return a.ShortDatePattern;
        case "D": return a.LongDatePattern;
        case "t": return a.ShortTimePattern;
        case "T": return a.LongTimePattern;
        case "F": return a.FullDateTimePattern;
        case "M":
        case "m": return a.MonthDayPattern;
        case "s": return a.SortableDateTimePattern;
        case "Y":
        case "y": return a.YearMonthPattern;
        default: throw Error.format(Sys.Res.formatInvalidString);
    } return b; };
Date._expandYear = function (c, a) { if (a < 100) {
    var b = (new Date).getFullYear();
    a += b - b % 100;
    if (a > c.Calendar.TwoDigitYearMax)
        return a - 100;
} return a; };
Date._getParseRegExp = function (b, e) { if (!b._parseRegExp)
    b._parseRegExp = {};
else if (b._parseRegExp[e])
    return b._parseRegExp[e]; var c = Date._expandFormat(b, e); c = c.replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g, "\\\\$1"); var a = new Sys.StringBuilder("^"), j = [], f = 0, i = 0, h = Date._getTokenRegExp(), d; while ((d = h.exec(c)) !== null) {
    var l = c.slice(f, d.index);
    f = h.lastIndex;
    i += Date._appendPreOrPostMatch(l, a);
    if (i % 2 === 1) {
        a.append(d[0]);
        continue;
    }
    switch (d[0]) {
        case "dddd":
        case "ddd":
        case "MMMM":
        case "MMM":
            a.append("(\\D+)");
            break;
        case "tt":
        case "t":
            a.append("(\\D*)");
            break;
        case "yyyy":
            a.append("(\\d{4})");
            break;
        case "fff":
            a.append("(\\d{3})");
            break;
        case "ff":
            a.append("(\\d{2})");
            break;
        case "f":
            a.append("(\\d)");
            break;
        case "dd":
        case "d":
        case "MM":
        case "M":
        case "yy":
        case "y":
        case "HH":
        case "H":
        case "hh":
        case "h":
        case "mm":
        case "m":
        case "ss":
        case "s":
            a.append("(\\d\\d?)");
            break;
        case "zzz":
            a.append("([+-]?\\d\\d?:\\d{2})");
            break;
        case "zz":
        case "z": a.append("([+-]?\\d\\d?)");
    }
    Array.add(j, d[0]);
} Date._appendPreOrPostMatch(c.slice(f), a); a.append("$"); var k = a.toString().replace(/\s+/g, "\\s+"), g = { "regExp": k, "groups": j }; b._parseRegExp[e] = g; return g; };
Date._getTokenRegExp = function () { return /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z/g; };
Date.parseLocale = function (a) { return Date._parse(a, Sys.CultureInfo.CurrentCulture, arguments); };
Date.parseInvariant = function (a) { return Date._parse(a, Sys.CultureInfo.InvariantCulture, arguments); };
Date._parse = function (g, c, h) { var e = false; for (var a = 1, i = h.length; a < i; a++) {
    var f = h[a];
    if (f) {
        e = true;
        var b = Date._parseExact(g, f, c);
        if (b)
            return b;
    }
} if (!e) {
    var d = c._getDateTimeFormats();
    for (var a = 0, i = d.length; a < i; a++) {
        var b = Date._parseExact(g, d[a], c);
        if (b)
            return b;
    }
} return null; };
Date._parseExact = function (s, y, j) { s = s.trim(); var m = j.dateTimeFormat, v = Date._getParseRegExp(m, y), x = (new RegExp(v.regExp)).exec(s); if (x === null)
    return null; var w = v.groups, f = null, c = null, h = null, g = null, d = 0, n = 0, o = 0, e = 0, k = null, r = false; for (var p = 0, z = w.length; p < z; p++) {
    var a = x[p + 1];
    if (a)
        switch (w[p]) {
            case "dd":
            case "d":
                h = parseInt(a, 10);
                if (h < 1 || h > 31)
                    return null;
                break;
            case "MMMM":
                c = j._getMonthIndex(a);
                if (c < 0 || c > 11)
                    return null;
                break;
            case "MMM":
                c = j._getAbbrMonthIndex(a);
                if (c < 0 || c > 11)
                    return null;
                break;
            case "M":
            case "MM":
                var c = parseInt(a, 10) - 1;
                if (c < 0 || c > 11)
                    return null;
                break;
            case "y":
            case "yy":
                f = Date._expandYear(m, parseInt(a, 10));
                if (f < 0 || f > 9999)
                    return null;
                break;
            case "yyyy":
                f = parseInt(a, 10);
                if (f < 0 || f > 9999)
                    return null;
                break;
            case "h":
            case "hh":
                d = parseInt(a, 10);
                if (d === 12)
                    d = 0;
                if (d < 0 || d > 11)
                    return null;
                break;
            case "H":
            case "HH":
                d = parseInt(a, 10);
                if (d < 0 || d > 23)
                    return null;
                break;
            case "m":
            case "mm":
                n = parseInt(a, 10);
                if (n < 0 || n > 59)
                    return null;
                break;
            case "s":
            case "ss":
                o = parseInt(a, 10);
                if (o < 0 || o > 59)
                    return null;
                break;
            case "tt":
            case "t":
                var u = a.toUpperCase();
                r = u === m.PMDesignator.toUpperCase();
                if (!r && u !== m.AMDesignator.toUpperCase())
                    return null;
                break;
            case "f":
                e = parseInt(a, 10) * 100;
                if (e < 0 || e > 999)
                    return null;
                break;
            case "ff":
                e = parseInt(a, 10) * 10;
                if (e < 0 || e > 999)
                    return null;
                break;
            case "fff":
                e = parseInt(a, 10);
                if (e < 0 || e > 999)
                    return null;
                break;
            case "dddd":
                g = j._getDayIndex(a);
                if (g < 0 || g > 6)
                    return null;
                break;
            case "ddd":
                g = j._getAbbrDayIndex(a);
                if (g < 0 || g > 6)
                    return null;
                break;
            case "zzz":
                var q = a.split(/:/);
                if (q.length !== 2)
                    return null;
                var i = parseInt(q[0], 10);
                if (i < -12 || i > 13)
                    return null;
                var l = parseInt(q[1], 10);
                if (l < 0 || l > 59)
                    return null;
                k = i * 60 + (a.startsWith("-") ? -l : l);
                break;
            case "z":
            case "zz":
                var i = parseInt(a, 10);
                if (i < -12 || i > 13)
                    return null;
                k = i * 60;
        }
} var b = new Date; if (f === null)
    f = b.getFullYear(); if (c === null)
    c = b.getMonth(); if (h === null)
    h = b.getDate(); b.setFullYear(f, c, h); if (b.getDate() !== h)
    return null; if (g !== null && b.getDay() !== g)
    return null; if (r && d < 12)
    d += 12; b.setHours(d, n, o, e); if (k !== null) {
    var t = b.getMinutes() - (k + b.getTimezoneOffset());
    b.setHours(b.getHours() + parseInt(t / 60, 10), t % 60);
} return b; };
Date.prototype.format = function (a) { return this._toFormattedString(a, Sys.CultureInfo.InvariantCulture); };
Date.prototype.localeFormat = function (a) { return this._toFormattedString(a, Sys.CultureInfo.CurrentCulture); };
Date.prototype._toFormattedString = function (e, h) { if (!e || e.length === 0 || e === "i")
    if (h && h.name.length > 0)
        return this.toLocaleString();
    else
        return this.toString(); var d = h.dateTimeFormat; e = Date._expandFormat(d, e); var a = new Sys.StringBuilder, b; function c(a) { if (a < 10)
    return "0" + a; return a.toString(); } function g(a) { if (a < 10)
    return "00" + a; if (a < 100)
    return "0" + a; return a.toString(); } var j = 0, i = Date._getTokenRegExp(); for (; true;) {
    var l = i.lastIndex, f = i.exec(e), k = e.slice(l, f ? f.index : e.length);
    j += Date._appendPreOrPostMatch(k, a);
    if (!f)
        break;
    if (j % 2 === 1) {
        a.append(f[0]);
        continue;
    }
    switch (f[0]) {
        case "dddd":
            a.append(d.DayNames[this.getDay()]);
            break;
        case "ddd":
            a.append(d.AbbreviatedDayNames[this.getDay()]);
            break;
        case "dd":
            a.append(c(this.getDate()));
            break;
        case "d":
            a.append(this.getDate());
            break;
        case "MMMM":
            a.append(d.MonthNames[this.getMonth()]);
            break;
        case "MMM":
            a.append(d.AbbreviatedMonthNames[this.getMonth()]);
            break;
        case "MM":
            a.append(c(this.getMonth() + 1));
            break;
        case "M":
            a.append(this.getMonth() + 1);
            break;
        case "yyyy":
            a.append(this.getFullYear());
            break;
        case "yy":
            a.append(c(this.getFullYear() % 100));
            break;
        case "y":
            a.append(this.getFullYear() % 100);
            break;
        case "hh":
            b = this.getHours() % 12;
            if (b === 0)
                b = 12;
            a.append(c(b));
            break;
        case "h":
            b = this.getHours() % 12;
            if (b === 0)
                b = 12;
            a.append(b);
            break;
        case "HH":
            a.append(c(this.getHours()));
            break;
        case "H":
            a.append(this.getHours());
            break;
        case "mm":
            a.append(c(this.getMinutes()));
            break;
        case "m":
            a.append(this.getMinutes());
            break;
        case "ss":
            a.append(c(this.getSeconds()));
            break;
        case "s":
            a.append(this.getSeconds());
            break;
        case "tt":
            a.append(this.getHours() < 12 ? d.AMDesignator : d.PMDesignator);
            break;
        case "t":
            a.append((this.getHours() < 12 ? d.AMDesignator : d.PMDesignator).charAt(0));
            break;
        case "f":
            a.append(g(this.getMilliseconds()).charAt(0));
            break;
        case "ff":
            a.append(g(this.getMilliseconds()).substr(0, 2));
            break;
        case "fff":
            a.append(g(this.getMilliseconds()));
            break;
        case "z":
            b = this.getTimezoneOffset() / 60;
            a.append((b <= 0 ? "+" : "-") + Math.floor(Math.abs(b)));
            break;
        case "zz":
            b = this.getTimezoneOffset() / 60;
            a.append((b <= 0 ? "+" : "-") + c(Math.floor(Math.abs(b))));
            break;
        case "zzz":
            b = this.getTimezoneOffset() / 60;
            a.append((b <= 0 ? "+" : "-") + c(Math.floor(Math.abs(b))) + d.TimeSeparator + c(Math.abs(this.getTimezoneOffset() % 60)));
    }
} return a.toString(); };
Number.__typeName = "Number";
Number.__class = true;
Number.parseLocale = function (a) { return Number._parse(a, Sys.CultureInfo.CurrentCulture); };
Number.parseInvariant = function (a) { return Number._parse(a, Sys.CultureInfo.InvariantCulture); };
Number._parse = function (b, o) { b = b.trim(); if (b.match(/^[+-]?infinity$/i))
    return parseFloat(b); if (b.match(/^0x[a-f0-9]+$/i))
    return parseInt(b); var a = o.numberFormat, g = Number._parseNumberNegativePattern(b, a, a.NumberNegativePattern), h = g[0], e = g[1]; if (h === "" && a.NumberNegativePattern !== 1) {
    g = Number._parseNumberNegativePattern(b, a, 1);
    h = g[0];
    e = g[1];
} if (h === "")
    h = "+"; var j, d, f = e.indexOf("e"); if (f < 0)
    f = e.indexOf("E"); if (f < 0) {
    d = e;
    j = null;
}
else {
    d = e.substr(0, f);
    j = e.substr(f + 1);
} var c, k, m = d.indexOf(a.NumberDecimalSeparator); if (m < 0) {
    c = d;
    k = null;
}
else {
    c = d.substr(0, m);
    k = d.substr(m + a.NumberDecimalSeparator.length);
} c = c.split(a.NumberGroupSeparator).join(""); var n = a.NumberGroupSeparator.replace(/\u00A0/g, " "); if (a.NumberGroupSeparator !== n)
    c = c.split(n).join(""); var l = h + c; if (k !== null)
    l += "." + k; if (j !== null) {
    var i = Number._parseNumberNegativePattern(j, a, 1);
    if (i[0] === "")
        i[0] = "+";
    l += "e" + i[0] + i[1];
} if (l.match(/^[+-]?\d*\.?\d*(e[+-]?\d+)?$/))
    return parseFloat(l); return Number.NaN; };
Number._parseNumberNegativePattern = function (a, d, e) { var b = d.NegativeSign, c = d.PositiveSign; switch (e) {
    case 4:
        b = " " + b;
        c = " " + c;
    case 3:
        if (a.endsWith(b))
            return ["-", a.substr(0, a.length - b.length)];
        else if (a.endsWith(c))
            return ["+", a.substr(0, a.length - c.length)];
        break;
    case 2:
        b += " ";
        c += " ";
    case 1:
        if (a.startsWith(b))
            return ["-", a.substr(b.length)];
        else if (a.startsWith(c))
            return ["+", a.substr(c.length)];
        break;
    case 0: if (a.startsWith("(") && a.endsWith(")"))
        return ["-", a.substr(1, a.length - 2)];
} return ["", a]; };
Number.prototype.format = function (a) { return this._toFormattedString(a, Sys.CultureInfo.InvariantCulture); };
Number.prototype.localeFormat = function (a) { return this._toFormattedString(a, Sys.CultureInfo.CurrentCulture); };
Number.prototype._toFormattedString = function (d, j) { if (!d || d.length === 0 || d === "i")
    if (j && j.name.length > 0)
        return this.toLocaleString();
    else
        return this.toString(); var o = ["n %", "n%", "%n"], n = ["-n %", "-n%", "-%n"], p = ["(n)", "-n", "- n", "n-", "n -"], m = ["$n", "n$", "$ n", "n $"], l = ["($n)", "-$n", "$-n", "$n-", "(n$)", "-n$", "n-$", "n$-", "-n $", "-$ n", "n $-", "$ n-", "$ -n", "n- $", "($ n)", "(n $)"]; function g(a, c, d) { for (var b = a.length; b < c; b++)
    a = d ? "0" + a : a + "0"; return a; } function i(j, i, l, n, p) { var h = l[0], k = 1, o = Math.pow(10, i), m = Math.round(j * o) / o; if (!isFinite(m))
    m = j; j = m; var b = j.toString(), a = "", c, e = b.split(/e/i); b = e[0]; c = e.length > 1 ? parseInt(e[1]) : 0; e = b.split("."); b = e[0]; a = e.length > 1 ? e[1] : ""; var q; if (c > 0) {
    a = g(a, c, false);
    b += a.slice(0, c);
    a = a.substr(c);
}
else if (c < 0) {
    c = -c;
    b = g(b, c + 1, true);
    a = b.slice(-c, b.length) + a;
    b = b.slice(0, -c);
} if (i > 0) {
    if (a.length > i)
        a = a.slice(0, i);
    else
        a = g(a, i, false);
    a = p + a;
}
else
    a = ""; var d = b.length - 1, f = ""; while (d >= 0) {
    if (h === 0 || h > d)
        if (f.length > 0)
            return b.slice(0, d + 1) + n + f + a;
        else
            return b.slice(0, d + 1) + a;
    if (f.length > 0)
        f = b.slice(d - h + 1, d + 1) + n + f;
    else
        f = b.slice(d - h + 1, d + 1);
    d -= h;
    if (k < l.length) {
        h = l[k];
        k++;
    }
} return b.slice(0, d + 1) + n + f + a; } var a = j.numberFormat, e = Math.abs(this); if (!d)
    d = "D"; var b = -1; if (d.length > 1)
    b = parseInt(d.slice(1), 10); var c; switch (d.charAt(0)) {
    case "d":
    case "D":
        c = "n";
        if (b !== -1)
            e = g("" + e, b, true);
        if (this < 0)
            e = -e;
        break;
    case "c":
    case "C":
        if (this < 0)
            c = l[a.CurrencyNegativePattern];
        else
            c = m[a.CurrencyPositivePattern];
        if (b === -1)
            b = a.CurrencyDecimalDigits;
        e = i(Math.abs(this), b, a.CurrencyGroupSizes, a.CurrencyGroupSeparator, a.CurrencyDecimalSeparator);
        break;
    case "n":
    case "N":
        if (this < 0)
            c = p[a.NumberNegativePattern];
        else
            c = "n";
        if (b === -1)
            b = a.NumberDecimalDigits;
        e = i(Math.abs(this), b, a.NumberGroupSizes, a.NumberGroupSeparator, a.NumberDecimalSeparator);
        break;
    case "p":
    case "P":
        if (this < 0)
            c = n[a.PercentNegativePattern];
        else
            c = o[a.PercentPositivePattern];
        if (b === -1)
            b = a.PercentDecimalDigits;
        e = i(Math.abs(this) * 100, b, a.PercentGroupSizes, a.PercentGroupSeparator, a.PercentDecimalSeparator);
        break;
    default: throw Error.format(Sys.Res.formatBadFormatSpecifier);
} var k = /n|\$|-|%/g, f = ""; for (; true;) {
    var q = k.lastIndex, h = k.exec(c);
    f += c.slice(q, h ? h.index : c.length);
    if (!h)
        break;
    switch (h[0]) {
        case "n":
            f += e;
            break;
        case "$":
            f += a.CurrencySymbol;
            break;
        case "-":
            f += a.NegativeSign;
            break;
        case "%": f += a.PercentSymbol;
    }
} return f; };
RegExp.__typeName = "RegExp";
RegExp.__class = true;
Array.__typeName = "Array";
Array.__class = true;
Array.add = Array.enqueue = function (a, b) { a[a.length] = b; };
Array.addRange = function (a, b) { a.push.apply(a, b); };
Array.clear = function (a) { a.length = 0; };
Array.clone = function (a) { if (a.length === 1)
    return [a[0]];
else
    return Array.apply(null, a); };
Array.contains = function (a, b) { return Array.indexOf(a, b) >= 0; };
Array.dequeue = function (a) { return a.shift(); };
Array.forEach = function (b, e, d) { for (var a = 0, f = b.length; a < f; a++) {
    var c = b[a];
    if (typeof c !== "undefined")
        e.call(d, c, a, b);
} };
Array.indexOf = function (d, e, a) { if (typeof e === "undefined")
    return -1; var c = d.length; if (c !== 0) {
    a = a - 0;
    if (isNaN(a))
        a = 0;
    else {
        if (isFinite(a))
            a = a - a % 1;
        if (a < 0)
            a = Math.max(0, c + a);
    }
    for (var b = a; b < c; b++)
        if (typeof d[b] !== "undefined" && d[b] === e)
            return b;
} return -1; };
Array.insert = function (a, b, c) { a.splice(b, 0, c); };
Array.parse = function (value) { if (!value)
    return []; return eval(value); };
Array.remove = function (b, c) { var a = Array.indexOf(b, c); if (a >= 0)
    b.splice(a, 1); return a >= 0; };
Array.removeAt = function (a, b) { a.splice(b, 1); };
if (!window)
    this.window = this;
window.Type = Function;
Type.prototype.callBaseMethod = function (a, d, b) { var c = this.getBaseMethod(a, d); if (!b)
    return c.apply(a);
else
    return c.apply(a, b); };
Type.prototype.getBaseMethod = function (d, c) { var b = this.getBaseType(); if (b) {
    var a = b.prototype[c];
    return a instanceof Function ? a : null;
} return null; };
Type.prototype.getBaseType = function () { return typeof this.__baseType === "undefined" ? null : this.__baseType; };
Type.prototype.getInterfaces = function () { var a = [], b = this; while (b) {
    var c = b.__interfaces;
    if (c)
        for (var d = 0, f = c.length; d < f; d++) {
            var e = c[d];
            if (!Array.contains(a, e))
                a[a.length] = e;
        }
    b = b.__baseType;
} return a; };
Type.prototype.getName = function () { return typeof this.__typeName === "undefined" ? "" : this.__typeName; };
Type.prototype.implementsInterface = function (d) { this.resolveInheritance(); var c = d.getName(), a = this.__interfaceCache; if (a) {
    var e = a[c];
    if (typeof e !== "undefined")
        return e;
}
else
    a = this.__interfaceCache = {}; var b = this; while (b) {
    var f = b.__interfaces;
    if (f)
        if (Array.indexOf(f, d) !== -1)
            return a[c] = true;
    b = b.__baseType;
} return a[c] = false; };
Type.prototype.inheritsFrom = function (b) { this.resolveInheritance(); var a = this.__baseType; while (a) {
    if (a === b)
        return true;
    a = a.__baseType;
} return false; };
Type.prototype.initializeBase = function (a, b) { this.resolveInheritance(); if (this.__baseType)
    if (!b)
        this.__baseType.apply(a);
    else
        this.__baseType.apply(a, b); return a; };
Type.prototype.isImplementedBy = function (a) { if (typeof a === "undefined" || a === null)
    return false; var b = Object.getType(a); return !!(b.implementsInterface && b.implementsInterface(this)); };
Type.prototype.isInstanceOfType = function (b) { if (typeof b === "undefined" || b === null)
    return false; if (b instanceof this)
    return true; var a = Object.getType(b); return !!(a === this) || a.inheritsFrom && a.inheritsFrom(this) || a.implementsInterface && a.implementsInterface(this); };
Type.prototype.registerClass = function (c, b, d) { this.prototype.constructor = this; this.__typeName = c; this.__class = true; if (b) {
    this.__baseType = b;
    this.__basePrototypePending = true;
} Sys.__upperCaseTypes[c.toUpperCase()] = this; if (d) {
    this.__interfaces = [];
    for (var a = 2, f = arguments.length; a < f; a++) {
        var e = arguments[a];
        this.__interfaces.push(e);
    }
} return this; };
Type.prototype.registerInterface = function (a) { Sys.__upperCaseTypes[a.toUpperCase()] = this; this.prototype.constructor = this; this.__typeName = a; this.__interface = true; return this; };
Type.prototype.resolveInheritance = function () { if (this.__basePrototypePending) {
    var b = this.__baseType;
    b.resolveInheritance();
    for (var a in b.prototype) {
        var c = b.prototype[a];
        if (!this.prototype[a])
            this.prototype[a] = c;
    }
    delete this.__basePrototypePending;
} };
Type.getRootNamespaces = function () { return Array.clone(Sys.__rootNamespaces); };
Type.isClass = function (a) { if (typeof a === "undefined" || a === null)
    return false; return !!a.__class; };
Type.isInterface = function (a) { if (typeof a === "undefined" || a === null)
    return false; return !!a.__interface; };
Type.isNamespace = function (a) { if (typeof a === "undefined" || a === null)
    return false; return !!a.__namespace; };
Type.parse = function (typeName, ns) { var fn; if (ns) {
    fn = Sys.__upperCaseTypes[ns.getName().toUpperCase() + "." + typeName.toUpperCase()];
    return fn || null;
} if (!typeName)
    return null; if (!Type.__htClasses)
    Type.__htClasses = {}; fn = Type.__htClasses[typeName]; if (!fn) {
    fn = eval(typeName);
    Type.__htClasses[typeName] = fn;
} return fn; };
Type.registerNamespace = function (f) { var d = window, c = f.split("."); for (var b = 0; b < c.length; b++) {
    var e = c[b], a = d[e];
    if (!a) {
        a = d[e] = { __namespace: true, __typeName: c.slice(0, b + 1).join(".") };
        if (b === 0)
            Sys.__rootNamespaces[Sys.__rootNamespaces.length] = a;
        a.getName = function () { return this.__typeName; };
    }
    d = a;
} };
window.Sys = { __namespace: true, __typeName: "Sys", getName: function () { return "Sys"; }, __upperCaseTypes: {} };
Sys.__rootNamespaces = [Sys];
Sys.IDisposable = function () { };
Sys.IDisposable.prototype = {};
Sys.IDisposable.registerInterface("Sys.IDisposable");
Sys.StringBuilder = function (a) { this._parts = typeof a !== "undefined" && a !== null && a !== "" ? [a.toString()] : []; this._value = {}; this._len = 0; };
Sys.StringBuilder.prototype = { append: function (a) { this._parts[this._parts.length] = a; }, appendLine: function (a) { this._parts[this._parts.length] = typeof a === "undefined" || a === null || a === "" ? "\r\n" : a + "\r\n"; }, clear: function () { this._parts = []; this._value = {}; this._len = 0; }, isEmpty: function () { if (this._parts.length === 0)
        return true; return this.toString() === ""; }, toString: function (a) { a = a || ""; var b = this._parts; if (this._len !== b.length) {
        this._value = {};
        this._len = b.length;
    } var d = this._value; if (typeof d[a] === "undefined") {
        if (a !== "")
            for (var c = 0; c < b.length;)
                if (typeof b[c] === "undefined" || b[c] === "" || b[c] === null)
                    b.splice(c, 1);
                else
                    c++;
        d[a] = this._parts.join(a);
    } return d[a]; } };
Sys.StringBuilder.registerClass("Sys.StringBuilder");
if (!window.XMLHttpRequest)
    window.XMLHttpRequest = function () { var b = ["Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP"]; for (var a = 0, c = b.length; a < c; a++)
        try {
            return new ActiveXObject(b[a]);
        }
        catch (d) { } return null; };
Sys.Browser = {};
Sys.Browser.InternetExplorer = {};
Sys.Browser.Firefox = {};
Sys.Browser.Safari = {};
Sys.Browser.Opera = {};
Sys.Browser.agent = null;
Sys.Browser.hasDebuggerStatement = false;
Sys.Browser.name = navigator.appName;
Sys.Browser.version = parseFloat(navigator.appVersion);
Sys.Browser.documentMode = 0;
if (navigator.userAgent.indexOf(" MSIE ") > -1) {
    Sys.Browser.agent = Sys.Browser.InternetExplorer;
    Sys.Browser.version = parseFloat(navigator.userAgent.match(/MSIE (\d+\.\d+)/)[1]);
    if (Sys.Browser.version >= 8)
        if (document.documentMode >= 7)
            Sys.Browser.documentMode = document.documentMode;
    Sys.Browser.hasDebuggerStatement = true;
}
else if (navigator.userAgent.indexOf(" Firefox/") > -1) {
    Sys.Browser.agent = Sys.Browser.Firefox;
    Sys.Browser.version = parseFloat(navigator.userAgent.match(/Firefox\/(\d+\.\d+)/)[1]);
    Sys.Browser.name = "Firefox";
    Sys.Browser.hasDebuggerStatement = true;
}
else if (navigator.userAgent.indexOf(" AppleWebKit/") > -1) {
    Sys.Browser.agent = Sys.Browser.Safari;
    Sys.Browser.version = parseFloat(navigator.userAgent.match(/AppleWebKit\/(\d+(\.\d+)?)/)[1]);
    Sys.Browser.name = "Safari";
}
else if (navigator.userAgent.indexOf("Opera/") > -1)
    Sys.Browser.agent = Sys.Browser.Opera;
Type.registerNamespace("Sys.UI");
Sys._Debug = function () { };
Sys._Debug.prototype = { _appendConsole: function (a) { if (typeof Debug !== "undefined" && Debug.writeln)
        Debug.writeln(a); if (window.console && window.console.log)
        window.console.log(a); if (window.opera)
        window.opera.postError(a); if (window.debugService)
        window.debugService.trace(a); }, _appendTrace: function (b) { var a = document.getElementById("TraceConsole"); if (a && a.tagName.toUpperCase() === "TEXTAREA")
        a.value += b + "\n"; }, assert: function (c, a, b) { if (!c) {
        a = b && this.assert.caller ? String.format(Sys.Res.assertFailedCaller, a, this.assert.caller) : String.format(Sys.Res.assertFailed, a);
        if (confirm(String.format(Sys.Res.breakIntoDebugger, a)))
            this.fail(a);
    } }, clearTrace: function () { var a = document.getElementById("TraceConsole"); if (a && a.tagName.toUpperCase() === "TEXTAREA")
        a.value = ""; }, fail: function (message) { this._appendConsole(message); if (Sys.Browser.hasDebuggerStatement)
        eval("debugger"); }, trace: function (a) { this._appendConsole(a); this._appendTrace(a); }, traceDump: function (a, b) { var c = this._traceDump(a, b, true); }, _traceDump: function (a, c, f, b, d) { c = c ? c : "traceDump"; b = b ? b : ""; if (a === null) {
        this.trace(b + c + ": null");
        return;
    } switch (typeof a) {
        case "undefined":
            this.trace(b + c + ": Undefined");
            break;
        case "number":
        case "string":
        case "boolean":
            this.trace(b + c + ": " + a);
            break;
        default:
            if (Date.isInstanceOfType(a) || RegExp.isInstanceOfType(a)) {
                this.trace(b + c + ": " + a.toString());
                break;
            }
            if (!d)
                d = [];
            else if (Array.contains(d, a)) {
                this.trace(b + c + ": ...");
                return;
            }
            Array.add(d, a);
            if (a == window || a === document || window.HTMLElement && a instanceof HTMLElement || typeof a.nodeName === "string") {
                var k = a.tagName ? a.tagName : "DomElement";
                if (a.id)
                    k += " - " + a.id;
                this.trace(b + c + " {" + k + "}");
            }
            else {
                var i = Object.getTypeName(a);
                this.trace(b + c + (typeof i === "string" ? " {" + i + "}" : ""));
                if (b === "" || f) {
                    b += "    ";
                    var e, j, l, g, h;
                    if (Array.isInstanceOfType(a)) {
                        j = a.length;
                        for (e = 0; e < j; e++)
                            this._traceDump(a[e], "[" + e + "]", f, b, d);
                    }
                    else
                        for (g in a) {
                            h = a[g];
                            if (!Function.isInstanceOfType(h))
                                this._traceDump(h, g, f, b, d);
                        }
                }
            }
            Array.remove(d, a);
    } } };
Sys._Debug.registerClass("Sys._Debug");
Sys.Debug = new Sys._Debug;
Sys.Debug.isDebug = false;
function Sys$Enum$parse(c, e) { var a, b, i; if (e) {
    a = this.__lowerCaseValues;
    if (!a) {
        this.__lowerCaseValues = a = {};
        var g = this.prototype;
        for (var f in g)
            a[f.toLowerCase()] = g[f];
    }
}
else
    a = this.prototype; if (!this.__flags) {
    i = e ? c.toLowerCase() : c;
    b = a[i.trim()];
    if (typeof b !== "number")
        throw Error.argument("value", String.format(Sys.Res.enumInvalidValue, c, this.__typeName));
    return b;
}
else {
    var h = (e ? c.toLowerCase() : c).split(","), j = 0;
    for (var d = h.length - 1; d >= 0; d--) {
        var k = h[d].trim();
        b = a[k];
        if (typeof b !== "number")
            throw Error.argument("value", String.format(Sys.Res.enumInvalidValue, c.split(",")[d].trim(), this.__typeName));
        j |= b;
    }
    return j;
} }
function Sys$Enum$toString(c) { if (typeof c === "undefined" || c === null)
    return this.__string; var d = this.prototype, a; if (!this.__flags || c === 0) {
    for (a in d)
        if (d[a] === c)
            return a;
}
else {
    var b = this.__sortedValues;
    if (!b) {
        b = [];
        for (a in d)
            b[b.length] = { key: a, value: d[a] };
        b.sort(function (a, b) { return a.value - b.value; });
        this.__sortedValues = b;
    }
    var e = [], g = c;
    for (a = b.length - 1; a >= 0; a--) {
        var h = b[a], f = h.value;
        if (f === 0)
            continue;
        if ((f & c) === f) {
            e[e.length] = h.key;
            g -= f;
            if (g === 0)
                break;
        }
    }
    if (e.length && g === 0)
        return e.reverse().join(", ");
} return ""; }
Type.prototype.registerEnum = function (b, c) { Sys.__upperCaseTypes[b.toUpperCase()] = this; for (var a in this.prototype)
    this[a] = this.prototype[a]; this.__typeName = b; this.parse = Sys$Enum$parse; this.__string = this.toString(); this.toString = Sys$Enum$toString; this.__flags = c; this.__enum = true; };
Type.isEnum = function (a) { if (typeof a === "undefined" || a === null)
    return false; return !!a.__enum; };
Type.isFlags = function (a) { if (typeof a === "undefined" || a === null)
    return false; return !!a.__flags; };
Sys.EventHandlerList = function () { this._list = {}; };
Sys.EventHandlerList.prototype = { addHandler: function (b, a) { Array.add(this._getEvent(b, true), a); }, removeHandler: function (c, b) { var a = this._getEvent(c); if (!a)
        return; Array.remove(a, b); }, getHandler: function (b) { var a = this._getEvent(b); if (!a || a.length === 0)
        return null; a = Array.clone(a); return function (c, d) { for (var b = 0, e = a.length; b < e; b++)
        a[b](c, d); }; }, _getEvent: function (a, b) { if (!this._list[a]) {
        if (!b)
            return null;
        this._list[a] = [];
    } return this._list[a]; } };
Sys.EventHandlerList.registerClass("Sys.EventHandlerList");
Sys.EventArgs = function () { };
Sys.EventArgs.registerClass("Sys.EventArgs");
Sys.EventArgs.Empty = new Sys.EventArgs;
Sys.CancelEventArgs = function () { Sys.CancelEventArgs.initializeBase(this); this._cancel = false; };
Sys.CancelEventArgs.prototype = { get_cancel: function () { return this._cancel; }, set_cancel: function (a) { this._cancel = a; } };
Sys.CancelEventArgs.registerClass("Sys.CancelEventArgs", Sys.EventArgs);
Sys.INotifyPropertyChange = function () { };
Sys.INotifyPropertyChange.prototype = {};
Sys.INotifyPropertyChange.registerInterface("Sys.INotifyPropertyChange");
Sys.PropertyChangedEventArgs = function (a) { Sys.PropertyChangedEventArgs.initializeBase(this); this._propertyName = a; };
Sys.PropertyChangedEventArgs.prototype = { get_propertyName: function () { return this._propertyName; } };
Sys.PropertyChangedEventArgs.registerClass("Sys.PropertyChangedEventArgs", Sys.EventArgs);
Sys.INotifyDisposing = function () { };
Sys.INotifyDisposing.prototype = {};
Sys.INotifyDisposing.registerInterface("Sys.INotifyDisposing");
Sys.Component = function () { if (Sys.Application)
    Sys.Application.registerDisposableObject(this); };
Sys.Component.prototype = { _id: null, _initialized: false, _updating: false, get_events: function () { if (!this._events)
        this._events = new Sys.EventHandlerList; return this._events; }, get_id: function () { return this._id; }, set_id: function (a) { this._id = a; }, get_isInitialized: function () { return this._initialized; }, get_isUpdating: function () { return this._updating; }, add_disposing: function (a) { this.get_events().addHandler("disposing", a); }, remove_disposing: function (a) { this.get_events().removeHandler("disposing", a); }, add_propertyChanged: function (a) { this.get_events().addHandler("propertyChanged", a); }, remove_propertyChanged: function (a) { this.get_events().removeHandler("propertyChanged", a); }, beginUpdate: function () { this._updating = true; }, dispose: function () { if (this._events) {
        var a = this._events.getHandler("disposing");
        if (a)
            a(this, Sys.EventArgs.Empty);
    } delete this._events; Sys.Application.unregisterDisposableObject(this); Sys.Application.removeComponent(this); }, endUpdate: function () { this._updating = false; if (!this._initialized)
        this.initialize(); this.updated(); }, initialize: function () { this._initialized = true; }, raisePropertyChanged: function (b) { if (!this._events)
        return; var a = this._events.getHandler("propertyChanged"); if (a)
        a(this, new Sys.PropertyChangedEventArgs(b)); }, updated: function () { } };
Sys.Component.registerClass("Sys.Component", null, Sys.IDisposable, Sys.INotifyPropertyChange, Sys.INotifyDisposing);
function Sys$Component$_setProperties(a, i) { var d, j = Object.getType(a), e = j === Object || j === Sys.UI.DomElement, h = Sys.Component.isInstanceOfType(a) && !a.get_isUpdating(); if (h)
    a.beginUpdate(); for (var c in i) {
    var b = i[c], f = e ? null : a["get_" + c];
    if (e || typeof f !== "function") {
        var k = a[c];
        if (!b || typeof b !== "object" || e && !k)
            a[c] = b;
        else
            Sys$Component$_setProperties(k, b);
    }
    else {
        var l = a["set_" + c];
        if (typeof l === "function")
            l.apply(a, [b]);
        else if (b instanceof Array) {
            d = f.apply(a);
            for (var g = 0, m = d.length, n = b.length; g < n; g++, m++)
                d[m] = b[g];
        }
        else if (typeof b === "object" && Object.getType(b) === Object) {
            d = f.apply(a);
            Sys$Component$_setProperties(d, b);
        }
    }
} if (h)
    a.endUpdate(); }
function Sys$Component$_setReferences(c, b) { for (var a in b) {
    var e = c["set_" + a], d = $find(b[a]);
    e.apply(c, [d]);
} }
var $create = Sys.Component.create = function (h, f, d, c, g) { var a = g ? new h(g) : new h, b = Sys.Application, i = b.get_isCreatingComponents(); a.beginUpdate(); if (f)
    Sys$Component$_setProperties(a, f); if (d)
    for (var e in d)
        a["add_" + e](d[e]); if (a.get_id())
    b.addComponent(a); if (i) {
    b._createdComponents[b._createdComponents.length] = a;
    if (c)
        b._addComponentToSecondPass(a, c);
    else
        a.endUpdate();
}
else {
    if (c)
        Sys$Component$_setReferences(a, c);
    a.endUpdate();
} return a; };
Sys.UI.MouseButton = function () { throw Error.notImplemented(); };
Sys.UI.MouseButton.prototype = { leftButton: 0, middleButton: 1, rightButton: 2 };
Sys.UI.MouseButton.registerEnum("Sys.UI.MouseButton");
Sys.UI.Key = function () { throw Error.notImplemented(); };
Sys.UI.Key.prototype = { backspace: 8, tab: 9, enter: 13, esc: 27, space: 32, pageUp: 33, pageDown: 34, end: 35, home: 36, left: 37, up: 38, right: 39, down: 40, del: 127 };
Sys.UI.Key.registerEnum("Sys.UI.Key");
Sys.UI.Point = function (a, b) { this.x = a; this.y = b; };
Sys.UI.Point.registerClass("Sys.UI.Point");
Sys.UI.Bounds = function (c, d, b, a) { this.x = c; this.y = d; this.height = a; this.width = b; };
Sys.UI.Bounds.registerClass("Sys.UI.Bounds");
Sys.UI.DomEvent = function (e) { var a = e, b = this.type = a.type.toLowerCase(); this.rawEvent = a; this.altKey = a.altKey; if (typeof a.button !== "undefined")
    this.button = typeof a.which !== "undefined" ? a.button : a.button === 4 ? Sys.UI.MouseButton.middleButton : a.button === 2 ? Sys.UI.MouseButton.rightButton : Sys.UI.MouseButton.leftButton; if (b === "keypress")
    this.charCode = a.charCode || a.keyCode;
else if (a.keyCode && a.keyCode === 46)
    this.keyCode = 127;
else
    this.keyCode = a.keyCode; this.clientX = a.clientX; this.clientY = a.clientY; this.ctrlKey = a.ctrlKey; this.target = a.target ? a.target : a.srcElement; if (!b.startsWith("key"))
    if (typeof a.offsetX !== "undefined" && typeof a.offsetY !== "undefined") {
        this.offsetX = a.offsetX;
        this.offsetY = a.offsetY;
    }
    else if (this.target && this.target.nodeType !== 3 && typeof a.clientX === "number") {
        var c = Sys.UI.DomElement.getLocation(this.target), d = Sys.UI.DomElement._getWindow(this.target);
        this.offsetX = (d.pageXOffset || 0) + a.clientX - c.x;
        this.offsetY = (d.pageYOffset || 0) + a.clientY - c.y;
    } this.screenX = a.screenX; this.screenY = a.screenY; this.shiftKey = a.shiftKey; };
Sys.UI.DomEvent.prototype = { preventDefault: function () { if (this.rawEvent.preventDefault)
        this.rawEvent.preventDefault();
    else if (window.event)
        this.rawEvent.returnValue = false; }, stopPropagation: function () { if (this.rawEvent.stopPropagation)
        this.rawEvent.stopPropagation();
    else if (window.event)
        this.rawEvent.cancelBubble = true; } };
Sys.UI.DomEvent.registerClass("Sys.UI.DomEvent");
var $addHandler = Sys.UI.DomEvent.addHandler = function (a, d, e) { if (!a._events)
    a._events = {}; var c = a._events[d]; if (!c)
    a._events[d] = c = []; var b; if (a.addEventListener) {
    b = function (b) { return e.call(a, new Sys.UI.DomEvent(b)); };
    a.addEventListener(d, b, false);
}
else if (a.attachEvent) {
    b = function () { var b = {}; try {
        b = Sys.UI.DomElement._getWindow(a).event;
    }
    catch (c) { } return e.call(a, new Sys.UI.DomEvent(b)); };
    a.attachEvent("on" + d, b);
} c[c.length] = { handler: e, browserHandler: b }; }, $addHandlers = Sys.UI.DomEvent.addHandlers = function (e, d, c) { for (var b in d) {
    var a = d[b];
    if (c)
        a = Function.createDelegate(c, a);
    $addHandler(e, b, a);
} }, $clearHandlers = Sys.UI.DomEvent.clearHandlers = function (a) { if (a._events) {
    var e = a._events;
    for (var b in e) {
        var d = e[b];
        for (var c = d.length - 1; c >= 0; c--)
            $removeHandler(a, b, d[c].handler);
    }
    a._events = null;
} }, $removeHandler = Sys.UI.DomEvent.removeHandler = function (a, e, f) { var d = null, c = a._events[e]; for (var b = 0, g = c.length; b < g; b++)
    if (c[b].handler === f) {
        d = c[b].browserHandler;
        break;
    } if (a.removeEventListener)
    a.removeEventListener(e, d, false);
else if (a.detachEvent)
    a.detachEvent("on" + e, d); c.splice(b, 1); };
Sys.UI.DomElement = function () { };
Sys.UI.DomElement.registerClass("Sys.UI.DomElement");
Sys.UI.DomElement.addCssClass = function (a, b) { if (!Sys.UI.DomElement.containsCssClass(a, b))
    if (a.className === "")
        a.className = b;
    else
        a.className += " " + b; };
Sys.UI.DomElement.containsCssClass = function (b, a) { return Array.contains(b.className.split(" "), a); };
Sys.UI.DomElement.getBounds = function (a) { var b = Sys.UI.DomElement.getLocation(a); return new Sys.UI.Bounds(b.x, b.y, a.offsetWidth || 0, a.offsetHeight || 0); };
var $get = Sys.UI.DomElement.getElementById = function (f, e) { if (!e)
    return document.getElementById(f); if (e.getElementById)
    return e.getElementById(f); var c = [], d = e.childNodes; for (var b = 0; b < d.length; b++) {
    var a = d[b];
    if (a.nodeType == 1)
        c[c.length] = a;
} while (c.length) {
    a = c.shift();
    if (a.id == f)
        return a;
    d = a.childNodes;
    for (b = 0; b < d.length; b++) {
        a = d[b];
        if (a.nodeType == 1)
            c[c.length] = a;
    }
} return null; };
switch (Sys.Browser.agent) {
    case Sys.Browser.InternetExplorer:
        Sys.UI.DomElement.getLocation = function (a) { if (a.self || a.nodeType === 9)
            return new Sys.UI.Point(0, 0); var b = a.getBoundingClientRect(); if (!b)
            return new Sys.UI.Point(0, 0); var d = a.ownerDocument.documentElement, e = b.left - 2 + d.scrollLeft, f = b.top - 2 + d.scrollTop; try {
            var c = a.ownerDocument.parentWindow.frameElement || null;
            if (c) {
                var g = c.frameBorder === "0" || c.frameBorder === "no" ? 2 : 0;
                e += g;
                f += g;
            }
        }
        catch (h) { } return new Sys.UI.Point(e, f); };
        break;
    case Sys.Browser.Safari:
        Sys.UI.DomElement.getLocation = function (c) { if (c.window && c.window === c || c.nodeType === 9)
            return new Sys.UI.Point(0, 0); var f = 0, g = 0, j = null, e = null, b; for (var a = c; a; j = a, (e = b, a = a.offsetParent)) {
            b = Sys.UI.DomElement._getCurrentStyle(a);
            var d = a.tagName ? a.tagName.toUpperCase() : null;
            if ((a.offsetLeft || a.offsetTop) && (d !== "BODY" || (!e || e.position !== "absolute"))) {
                f += a.offsetLeft;
                g += a.offsetTop;
            }
        } b = Sys.UI.DomElement._getCurrentStyle(c); var h = b ? b.position : null; if (!h || h !== "absolute")
            for (var a = c.parentNode; a; a = a.parentNode) {
                d = a.tagName ? a.tagName.toUpperCase() : null;
                if (d !== "BODY" && d !== "HTML" && (a.scrollLeft || a.scrollTop)) {
                    f -= a.scrollLeft || 0;
                    g -= a.scrollTop || 0;
                }
                b = Sys.UI.DomElement._getCurrentStyle(a);
                var i = b ? b.position : null;
                if (i && i === "absolute")
                    break;
            } return new Sys.UI.Point(f, g); };
        break;
    case Sys.Browser.Opera:
        Sys.UI.DomElement.getLocation = function (b) { if (b.window && b.window === b || b.nodeType === 9)
            return new Sys.UI.Point(0, 0); var d = 0, e = 0, i = null; for (var a = b; a; i = a, a = a.offsetParent) {
            var f = a.tagName;
            d += a.offsetLeft || 0;
            e += a.offsetTop || 0;
        } var g = b.style.position, c = g && g !== "static"; for (var a = b.parentNode; a; a = a.parentNode) {
            f = a.tagName ? a.tagName.toUpperCase() : null;
            if (f !== "BODY" && f !== "HTML" && (a.scrollLeft || a.scrollTop) && (c && (a.style.overflow === "scroll" || a.style.overflow === "auto"))) {
                d -= a.scrollLeft || 0;
                e -= a.scrollTop || 0;
            }
            var h = a && a.style ? a.style.position : null;
            c = c || h && h !== "static";
        } return new Sys.UI.Point(d, e); };
        break;
    default: Sys.UI.DomElement.getLocation = function (d) { if (d.window && d.window === d || d.nodeType === 9)
        return new Sys.UI.Point(0, 0); var e = 0, f = 0, i = null, g = null, b = null; for (var a = d; a; i = a, (g = b, a = a.offsetParent)) {
        var c = a.tagName ? a.tagName.toUpperCase() : null;
        b = Sys.UI.DomElement._getCurrentStyle(a);
        if ((a.offsetLeft || a.offsetTop) && !(c === "BODY" && (!g || g.position !== "absolute"))) {
            e += a.offsetLeft;
            f += a.offsetTop;
        }
        if (i !== null && b) {
            if (c !== "TABLE" && c !== "TD" && c !== "HTML") {
                e += parseInt(b.borderLeftWidth) || 0;
                f += parseInt(b.borderTopWidth) || 0;
            }
            if (c === "TABLE" && (b.position === "relative" || b.position === "absolute")) {
                e += parseInt(b.marginLeft) || 0;
                f += parseInt(b.marginTop) || 0;
            }
        }
    } b = Sys.UI.DomElement._getCurrentStyle(d); var h = b ? b.position : null; if (!h || h !== "absolute")
        for (var a = d.parentNode; a; a = a.parentNode) {
            c = a.tagName ? a.tagName.toUpperCase() : null;
            if (c !== "BODY" && c !== "HTML" && (a.scrollLeft || a.scrollTop)) {
                e -= a.scrollLeft || 0;
                f -= a.scrollTop || 0;
                b = Sys.UI.DomElement._getCurrentStyle(a);
                if (b) {
                    e += parseInt(b.borderLeftWidth) || 0;
                    f += parseInt(b.borderTopWidth) || 0;
                }
            }
        } return new Sys.UI.Point(e, f); };
}
Sys.UI.DomElement.removeCssClass = function (d, c) { var a = " " + d.className + " ", b = a.indexOf(" " + c + " "); if (b >= 0)
    d.className = (a.substr(0, b) + " " + a.substring(b + c.length + 1, a.length)).trim(); };
Sys.UI.DomElement.setLocation = function (b, c, d) { var a = b.style; a.position = "absolute"; a.left = c + "px"; a.top = d + "px"; };
Sys.UI.DomElement.toggleCssClass = function (b, a) { if (Sys.UI.DomElement.containsCssClass(b, a))
    Sys.UI.DomElement.removeCssClass(b, a);
else
    Sys.UI.DomElement.addCssClass(b, a); };
Sys.UI.DomElement.getVisibilityMode = function (a) { return a._visibilityMode === Sys.UI.VisibilityMode.hide ? Sys.UI.VisibilityMode.hide : Sys.UI.VisibilityMode.collapse; };
Sys.UI.DomElement.setVisibilityMode = function (a, b) { Sys.UI.DomElement._ensureOldDisplayMode(a); if (a._visibilityMode !== b) {
    a._visibilityMode = b;
    if (Sys.UI.DomElement.getVisible(a) === false)
        if (a._visibilityMode === Sys.UI.VisibilityMode.hide)
            a.style.display = a._oldDisplayMode;
        else
            a.style.display = "none";
    a._visibilityMode = b;
} };
Sys.UI.DomElement.getVisible = function (b) { var a = b.currentStyle || Sys.UI.DomElement._getCurrentStyle(b); if (!a)
    return true; return a.visibility !== "hidden" && a.display !== "none"; };
Sys.UI.DomElement.setVisible = function (a, b) { if (b !== Sys.UI.DomElement.getVisible(a)) {
    Sys.UI.DomElement._ensureOldDisplayMode(a);
    a.style.visibility = b ? "visible" : "hidden";
    if (b || a._visibilityMode === Sys.UI.VisibilityMode.hide)
        a.style.display = a._oldDisplayMode;
    else
        a.style.display = "none";
} };
Sys.UI.DomElement._ensureOldDisplayMode = function (a) { if (!a._oldDisplayMode) {
    var b = a.currentStyle || Sys.UI.DomElement._getCurrentStyle(a);
    a._oldDisplayMode = b ? b.display : null;
    if (!a._oldDisplayMode || a._oldDisplayMode === "none")
        switch (a.tagName.toUpperCase()) {
            case "DIV":
            case "P":
            case "ADDRESS":
            case "BLOCKQUOTE":
            case "BODY":
            case "COL":
            case "COLGROUP":
            case "DD":
            case "DL":
            case "DT":
            case "FIELDSET":
            case "FORM":
            case "H1":
            case "H2":
            case "H3":
            case "H4":
            case "H5":
            case "H6":
            case "HR":
            case "IFRAME":
            case "LEGEND":
            case "OL":
            case "PRE":
            case "TABLE":
            case "TD":
            case "TH":
            case "TR":
            case "UL":
                a._oldDisplayMode = "block";
                break;
            case "LI":
                a._oldDisplayMode = "list-item";
                break;
            default: a._oldDisplayMode = "inline";
        }
} };
Sys.UI.DomElement._getWindow = function (a) { var b = a.ownerDocument || a.document || a; return b.defaultView || b.parentWindow; };
Sys.UI.DomElement._getCurrentStyle = function (a) { if (a.nodeType === 3)
    return null; var c = Sys.UI.DomElement._getWindow(a); if (a.documentElement)
    a = a.documentElement; var b = c && a !== c && c.getComputedStyle ? c.getComputedStyle(a, null) : a.currentStyle || a.style; if (!b && Sys.Browser.agent === Sys.Browser.Safari && a.style) {
    var g = a.style.display, f = a.style.position;
    a.style.position = "absolute";
    a.style.display = "block";
    var e = c.getComputedStyle(a, null);
    a.style.display = g;
    a.style.position = f;
    b = {};
    for (var d in e)
        b[d] = e[d];
    b.display = "none";
} return b; };
Sys.IContainer = function () { };
Sys.IContainer.prototype = {};
Sys.IContainer.registerInterface("Sys.IContainer");
Sys._ScriptLoader = function () { this._scriptsToLoad = null; this._sessions = []; this._scriptLoadedDelegate = Function.createDelegate(this, this._scriptLoadedHandler); };
Sys._ScriptLoader.prototype = { dispose: function () { this._stopSession(); this._loading = false; if (this._events)
        delete this._events; this._sessions = null; this._currentSession = null; this._scriptLoadedDelegate = null; }, loadScripts: function (d, b, c, a) { var e = { allScriptsLoadedCallback: b, scriptLoadFailedCallback: c, scriptLoadTimeoutCallback: a, scriptsToLoad: this._scriptsToLoad, scriptTimeout: d }; this._scriptsToLoad = null; this._sessions[this._sessions.length] = e; if (!this._loading)
        this._nextSession(); }, notifyScriptLoaded: function () { if (!this._loading)
        return; this._currentTask._notified++; if (Sys.Browser.agent === Sys.Browser.Safari)
        if (this._currentTask._notified === 1)
            window.setTimeout(Function.createDelegate(this, function () { this._scriptLoadedHandler(this._currentTask.get_scriptElement(), true); }), 0); }, queueCustomScriptTag: function (a) { if (!this._scriptsToLoad)
        this._scriptsToLoad = []; Array.add(this._scriptsToLoad, a); }, queueScriptBlock: function (a) { if (!this._scriptsToLoad)
        this._scriptsToLoad = []; Array.add(this._scriptsToLoad, { text: a }); }, queueScriptReference: function (a) { if (!this._scriptsToLoad)
        this._scriptsToLoad = []; Array.add(this._scriptsToLoad, { src: a }); }, _createScriptElement: function (c) { var a = document.createElement("script"); a.type = "text/javascript"; for (var b in c)
        a[b] = c[b]; return a; }, _loadScriptsInternal: function () { var b = this._currentSession; if (b.scriptsToLoad && b.scriptsToLoad.length > 0) {
        var c = Array.dequeue(b.scriptsToLoad), a = this._createScriptElement(c);
        if (a.text && Sys.Browser.agent === Sys.Browser.Safari) {
            a.innerHTML = a.text;
            delete a.text;
        }
        if (typeof c.src === "string") {
            this._currentTask = new Sys._ScriptLoaderTask(a, this._scriptLoadedDelegate);
            this._currentTask.execute();
        }
        else {
            document.getElementsByTagName("head")[0].appendChild(a);
            Sys._ScriptLoader._clearScript(a);
            this._loadScriptsInternal();
        }
    }
    else {
        this._stopSession();
        var d = b.allScriptsLoadedCallback;
        if (d)
            d(this);
        this._nextSession();
    } }, _nextSession: function () { if (this._sessions.length === 0) {
        this._loading = false;
        this._currentSession = null;
        return;
    } this._loading = true; var a = Array.dequeue(this._sessions); this._currentSession = a; if (a.scriptTimeout > 0)
        this._timeoutCookie = window.setTimeout(Function.createDelegate(this, this._scriptLoadTimeoutHandler), a.scriptTimeout * 1000); this._loadScriptsInternal(); }, _raiseError: function (a) { var c = this._currentSession.scriptLoadFailedCallback, b = this._currentTask.get_scriptElement(); this._stopSession(); if (c) {
        c(this, b, a);
        this._nextSession();
    }
    else {
        this._loading = false;
        throw Sys._ScriptLoader._errorScriptLoadFailed(b.src, a);
    } }, _scriptLoadedHandler: function (a, b) { if (b && this._currentTask._notified)
        if (this._currentTask._notified > 1)
            this._raiseError(true);
        else {
            Array.add(Sys._ScriptLoader._getLoadedScripts(), a.src);
            this._currentTask.dispose();
            this._currentTask = null;
            this._loadScriptsInternal();
        }
    else
        this._raiseError(false); }, _scriptLoadTimeoutHandler: function () { var a = this._currentSession.scriptLoadTimeoutCallback; this._stopSession(); if (a)
        a(this); this._nextSession(); }, _stopSession: function () { if (this._timeoutCookie) {
        window.clearTimeout(this._timeoutCookie);
        this._timeoutCookie = null;
    } if (this._currentTask) {
        this._currentTask.dispose();
        this._currentTask = null;
    } } };
Sys._ScriptLoader.registerClass("Sys._ScriptLoader", null, Sys.IDisposable);
Sys._ScriptLoader.getInstance = function () { var a = Sys._ScriptLoader._activeInstance; if (!a)
    a = Sys._ScriptLoader._activeInstance = new Sys._ScriptLoader; return a; };
Sys._ScriptLoader.isScriptLoaded = function (b) { var a = document.createElement("script"); a.src = b; return Array.contains(Sys._ScriptLoader._getLoadedScripts(), a.src); };
Sys._ScriptLoader.readLoadedScripts = function () { if (!Sys._ScriptLoader._referencedScripts) {
    var b = Sys._ScriptLoader._referencedScripts = [], c = document.getElementsByTagName("script");
    for (i = c.length - 1; i >= 0; i--) {
        var d = c[i], a = d.src;
        if (a.length)
            if (!Array.contains(b, a))
                Array.add(b, a);
    }
} };
Sys._ScriptLoader._clearScript = function (a) { if (!Sys.Debug.isDebug)
    a.parentNode.removeChild(a); };
Sys._ScriptLoader._errorScriptLoadFailed = function (b, d) { var a; if (d)
    a = Sys.Res.scriptLoadMultipleCallbacks;
else
    a = Sys.Res.scriptLoadFailed; var e = "Sys.ScriptLoadFailedException: " + String.format(a, b), c = Error.create(e, { name: "Sys.ScriptLoadFailedException", "scriptUrl": b }); c.popStackFrame(); return c; };
Sys._ScriptLoader._getLoadedScripts = function () { if (!Sys._ScriptLoader._referencedScripts) {
    Sys._ScriptLoader._referencedScripts = [];
    Sys._ScriptLoader.readLoadedScripts();
} return Sys._ScriptLoader._referencedScripts; };
Sys._ScriptLoaderTask = function (b, a) { this._scriptElement = b; this._completedCallback = a; this._notified = 0; };
Sys._ScriptLoaderTask.prototype = { get_scriptElement: function () { return this._scriptElement; }, dispose: function () { if (this._disposed)
        return; this._disposed = true; this._removeScriptElementHandlers(); Sys._ScriptLoader._clearScript(this._scriptElement); this._scriptElement = null; }, execute: function () { this._addScriptElementHandlers(); document.getElementsByTagName("head")[0].appendChild(this._scriptElement); }, _addScriptElementHandlers: function () { this._scriptLoadDelegate = Function.createDelegate(this, this._scriptLoadHandler); if (Sys.Browser.agent !== Sys.Browser.InternetExplorer) {
        this._scriptElement.readyState = "loaded";
        $addHandler(this._scriptElement, "load", this._scriptLoadDelegate);
    }
    else
        $addHandler(this._scriptElement, "readystatechange", this._scriptLoadDelegate); if (this._scriptElement.addEventListener) {
        this._scriptErrorDelegate = Function.createDelegate(this, this._scriptErrorHandler);
        this._scriptElement.addEventListener("error", this._scriptErrorDelegate, false);
    } }, _removeScriptElementHandlers: function () { if (this._scriptLoadDelegate) {
        var a = this.get_scriptElement();
        if (Sys.Browser.agent !== Sys.Browser.InternetExplorer)
            $removeHandler(a, "load", this._scriptLoadDelegate);
        else
            $removeHandler(a, "readystatechange", this._scriptLoadDelegate);
        if (this._scriptErrorDelegate) {
            this._scriptElement.removeEventListener("error", this._scriptErrorDelegate, false);
            this._scriptErrorDelegate = null;
        }
        this._scriptLoadDelegate = null;
    } }, _scriptErrorHandler: function () { if (this._disposed)
        return; this._completedCallback(this.get_scriptElement(), false); }, _scriptLoadHandler: function () { if (this._disposed)
        return; var a = this.get_scriptElement(); if (a.readyState !== "loaded" && a.readyState !== "complete")
        return; var b = this; window.setTimeout(function () { b._completedCallback(a, true); }, 0); } };
Sys._ScriptLoaderTask.registerClass("Sys._ScriptLoaderTask", null, Sys.IDisposable);
Sys.ApplicationLoadEventArgs = function (b, a) { Sys.ApplicationLoadEventArgs.initializeBase(this); this._components = b; this._isPartialLoad = a; };
Sys.ApplicationLoadEventArgs.prototype = { get_components: function () { return this._components; }, get_isPartialLoad: function () { return this._isPartialLoad; } };
Sys.ApplicationLoadEventArgs.registerClass("Sys.ApplicationLoadEventArgs", Sys.EventArgs);
Sys.HistoryEventArgs = function (a) { Sys.HistoryEventArgs.initializeBase(this); this._state = a; };
Sys.HistoryEventArgs.prototype = { get_state: function () { return this._state; } };
Sys.HistoryEventArgs.registerClass("Sys.HistoryEventArgs", Sys.EventArgs);
Sys._Application = function () { Sys._Application.initializeBase(this); this._disposableObjects = []; this._components = {}; this._createdComponents = []; this._secondPassComponents = []; this._appLoadHandler = null; this._beginRequestHandler = null; this._clientId = null; this._currentEntry = ""; this._endRequestHandler = null; this._history = null; this._enableHistory = false; this._historyFrame = null; this._historyInitialized = false; this._historyInitialLength = 0; this._historyLength = 0; this._historyPointIsNew = false; this._ignoreTimer = false; this._initialState = null; this._state = {}; this._timerCookie = 0; this._timerHandler = null; this._uniqueId = null; this._unloadHandlerDelegate = Function.createDelegate(this, this._unloadHandler); this._loadHandlerDelegate = Function.createDelegate(this, this._loadHandler); Sys.UI.DomEvent.addHandler(window, "unload", this._unloadHandlerDelegate); Sys.UI.DomEvent.addHandler(window, "load", this._loadHandlerDelegate); };
Sys._Application.prototype = { _creatingComponents: false, _disposing: false, get_isCreatingComponents: function () { return this._creatingComponents; }, get_stateString: function () { var a = window.location.hash; if (this._isSafari2()) {
        var b = this._getHistory();
        if (b)
            a = b[window.history.length - this._historyInitialLength];
    } if (a.length > 0 && a.charAt(0) === "#")
        a = a.substring(1); if (Sys.Browser.agent === Sys.Browser.Firefox)
        a = this._serializeState(this._deserializeState(a, true)); return a; }, get_enableHistory: function () { return this._enableHistory; }, set_enableHistory: function (a) { this._enableHistory = a; }, add_init: function (a) { if (this._initialized)
        a(this, Sys.EventArgs.Empty);
    else
        this.get_events().addHandler("init", a); }, remove_init: function (a) { this.get_events().removeHandler("init", a); }, add_load: function (a) { this.get_events().addHandler("load", a); }, remove_load: function (a) { this.get_events().removeHandler("load", a); }, add_navigate: function (a) { this.get_events().addHandler("navigate", a); }, remove_navigate: function (a) { this.get_events().removeHandler("navigate", a); }, add_unload: function (a) { this.get_events().addHandler("unload", a); }, remove_unload: function (a) { this.get_events().removeHandler("unload", a); }, addComponent: function (a) { this._components[a.get_id()] = a; }, addHistoryPoint: function (c, f) { this._ensureHistory(); var b = this._state; for (var a in c) {
        var d = c[a];
        if (d === null) {
            if (typeof b[a] !== "undefined")
                delete b[a];
        }
        else
            b[a] = d;
    } var e = this._serializeState(b); this._historyPointIsNew = true; this._setState(e, f); this._raiseNavigate(); }, beginCreateComponents: function () { this._creatingComponents = true; }, dispose: function () { if (!this._disposing) {
        this._disposing = true;
        if (this._timerCookie) {
            window.clearTimeout(this._timerCookie);
            delete this._timerCookie;
        }
        if (this._endRequestHandler) {
            Sys.WebForms.PageRequestManager.getInstance().remove_endRequest(this._endRequestHandler);
            delete this._endRequestHandler;
        }
        if (this._beginRequestHandler) {
            Sys.WebForms.PageRequestManager.getInstance().remove_beginRequest(this._beginRequestHandler);
            delete this._beginRequestHandler;
        }
        if (window.pageUnload)
            window.pageUnload(this, Sys.EventArgs.Empty);
        var c = this.get_events().getHandler("unload");
        if (c)
            c(this, Sys.EventArgs.Empty);
        var b = Array.clone(this._disposableObjects);
        for (var a = 0, e = b.length; a < e; a++)
            b[a].dispose();
        Array.clear(this._disposableObjects);
        Sys.UI.DomEvent.removeHandler(window, "unload", this._unloadHandlerDelegate);
        if (this._loadHandlerDelegate) {
            Sys.UI.DomEvent.removeHandler(window, "load", this._loadHandlerDelegate);
            this._loadHandlerDelegate = null;
        }
        var d = Sys._ScriptLoader.getInstance();
        if (d)
            d.dispose();
        Sys._Application.callBaseMethod(this, "dispose");
    } }, endCreateComponents: function () { var b = this._secondPassComponents; for (var a = 0, d = b.length; a < d; a++) {
        var c = b[a].component;
        Sys$Component$_setReferences(c, b[a].references);
        c.endUpdate();
    } this._secondPassComponents = []; this._creatingComponents = false; }, findComponent: function (b, a) { return a ? Sys.IContainer.isInstanceOfType(a) ? a.findComponent(b) : a[b] || null : Sys.Application._components[b] || null; }, getComponents: function () { var a = [], b = this._components; for (var c in b)
        a[a.length] = b[c]; return a; }, initialize: function () { if (!this._initialized && !this._initializing) {
        this._initializing = true;
        window.setTimeout(Function.createDelegate(this, this._doInitialize), 0);
    } }, notifyScriptLoaded: function () { var a = Sys._ScriptLoader.getInstance(); if (a)
        a.notifyScriptLoaded(); }, registerDisposableObject: function (a) { if (!this._disposing)
        this._disposableObjects[this._disposableObjects.length] = a; }, raiseLoad: function () { var b = this.get_events().getHandler("load"), a = new Sys.ApplicationLoadEventArgs(Array.clone(this._createdComponents), !this._initializing); if (b)
        b(this, a); if (window.pageLoad)
        window.pageLoad(this, a); this._createdComponents = []; }, removeComponent: function (b) { var a = b.get_id(); if (a)
        delete this._components[a]; }, setServerId: function (a, b) { this._clientId = a; this._uniqueId = b; }, setServerState: function (a) { this._ensureHistory(); this._state.__s = a; this._updateHiddenField(a); }, unregisterDisposableObject: function (a) { if (!this._disposing)
        Array.remove(this._disposableObjects, a); }, _addComponentToSecondPass: function (b, a) { this._secondPassComponents[this._secondPassComponents.length] = { component: b, references: a }; }, _deserializeState: function (a, i) { var e = {}; a = a || ""; var b = a.indexOf("&&"); if (b !== -1 && b + 2 < a.length) {
        e.__s = a.substr(b + 2);
        a = a.substr(0, b);
    } var g = a.split("&"); for (var f = 0, k = g.length; f < k; f++) {
        var d = g[f], c = d.indexOf("=");
        if (c !== -1 && c + 1 < d.length) {
            var j = d.substr(0, c), h = d.substr(c + 1);
            e[j] = i ? h : decodeURIComponent(h);
        }
    } return e; }, _doInitialize: function () { Sys._Application.callBaseMethod(this, "initialize"); var b = this.get_events().getHandler("init"); if (b) {
        this.beginCreateComponents();
        b(this, Sys.EventArgs.Empty);
        this.endCreateComponents();
    } if (Sys.WebForms) {
        this._beginRequestHandler = Function.createDelegate(this, this._onPageRequestManagerBeginRequest);
        Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(this._beginRequestHandler);
        this._endRequestHandler = Function.createDelegate(this, this._onPageRequestManagerEndRequest);
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(this._endRequestHandler);
    } var a = this.get_stateString(); if (a !== this._currentEntry)
        this._navigate(a); this.raiseLoad(); this._initializing = false; }, _enableHistoryInScriptManager: function () { this._enableHistory = true; }, _ensureHistory: function () { if (!this._historyInitialized && this._enableHistory) {
        if (Sys.Browser.agent === Sys.Browser.InternetExplorer && Sys.Browser.documentMode < 8) {
            this._historyFrame = document.getElementById("__historyFrame");
            this._ignoreIFrame = true;
        }
        if (this._isSafari2()) {
            var a = document.getElementById("__history");
            this._setHistory([window.location.hash]);
            this._historyInitialLength = window.history.length;
        }
        this._timerHandler = Function.createDelegate(this, this._onIdle);
        this._timerCookie = window.setTimeout(this._timerHandler, 100);
        try {
            this._initialState = this._deserializeState(this.get_stateString());
        }
        catch (b) { }
        this._historyInitialized = true;
    } }, _getHistory: function () { var a = document.getElementById("__history"); if (!a)
        return ""; var b = a.value; return b ? Sys.Serialization.JavaScriptSerializer.deserialize(b, true) : ""; }, _isSafari2: function () { return Sys.Browser.agent === Sys.Browser.Safari && Sys.Browser.version <= 419.3; }, _loadHandler: function () { if (this._loadHandlerDelegate) {
        Sys.UI.DomEvent.removeHandler(window, "load", this._loadHandlerDelegate);
        this._loadHandlerDelegate = null;
    } this.initialize(); }, _navigate: function (c) { this._ensureHistory(); var b = this._deserializeState(c); if (this._uniqueId) {
        var d = this._state.__s || "", a = b.__s || "";
        if (a !== d) {
            this._updateHiddenField(a);
            __doPostBack(this._uniqueId, a);
            this._state = b;
            return;
        }
    } this._setState(c); this._state = b; this._raiseNavigate(); }, _onIdle: function () { delete this._timerCookie; var a = this.get_stateString(); if (a !== this._currentEntry) {
        if (!this._ignoreTimer) {
            this._historyPointIsNew = false;
            this._navigate(a);
            this._historyLength = window.history.length;
        }
    }
    else
        this._ignoreTimer = false; this._timerCookie = window.setTimeout(this._timerHandler, 100); }, _onIFrameLoad: function (a) { this._ensureHistory(); if (!this._ignoreIFrame) {
        this._historyPointIsNew = false;
        this._navigate(a);
    } this._ignoreIFrame = false; }, _onPageRequestManagerBeginRequest: function () { this._ignoreTimer = true; }, _onPageRequestManagerEndRequest: function (e, d) { var b = d.get_dataItems()[this._clientId], a = document.getElementById("__EVENTTARGET"); if (a && a.value === this._uniqueId)
        a.value = ""; if (typeof b !== "undefined") {
        this.setServerState(b);
        this._historyPointIsNew = true;
    }
    else
        this._ignoreTimer = false; var c = this._serializeState(this._state); if (c !== this._currentEntry) {
        this._ignoreTimer = true;
        this._setState(c);
        this._raiseNavigate();
    } }, _raiseNavigate: function () { var c = this.get_events().getHandler("navigate"), b = {}; for (var a in this._state)
        if (a !== "__s")
            b[a] = this._state[a]; var d = new Sys.HistoryEventArgs(b); if (c)
        c(this, d); }, _serializeState: function (d) { var b = []; for (var a in d) {
        var e = d[a];
        if (a === "__s")
            var c = e;
        else
            b[b.length] = a + "=" + encodeURIComponent(e);
    } return b.join("&") + (c ? "&&" + c : ""); }, _setHistory: function (b) { var a = document.getElementById("__history"); if (a)
        a.value = Sys.Serialization.JavaScriptSerializer.serialize(b); }, _setState: function (a, c) { a = a || ""; if (a !== this._currentEntry) {
        if (window.theForm) {
            var e = window.theForm.action, f = e.indexOf("#");
            window.theForm.action = (f !== -1 ? e.substring(0, f) : e) + "#" + a;
        }
        if (this._historyFrame && this._historyPointIsNew) {
            this._ignoreIFrame = true;
            this._historyPointIsNew = false;
            var d = this._historyFrame.contentWindow.document;
            d.open("javascript:'<html></html>'");
            d.write("<html><head><title>" + (c || document.title) + "</title><scri" + 'pt type="text/javascript">parent.Sys.Application._onIFrameLoad(\'' + a + "');</scri" + "pt></head><body></body></html>");
            d.close();
        }
        this._ignoreTimer = false;
        var h = this.get_stateString();
        this._currentEntry = a;
        if (a !== h) {
            if (this._isSafari2()) {
                var g = this._getHistory();
                g[window.history.length - this._historyInitialLength + 1] = a;
                this._setHistory(g);
                this._historyLength = window.history.length + 1;
                var b = document.createElement("form");
                b.method = "get";
                b.action = "#" + a;
                document.appendChild(b);
                b.submit();
                document.removeChild(b);
            }
            else
                window.location.hash = a;
            if (typeof c !== "undefined" && c !== null)
                document.title = c;
        }
    } }, _unloadHandler: function () { this.dispose(); }, _updateHiddenField: function (b) { if (this._clientId) {
        var a = document.getElementById(this._clientId);
        if (a)
            a.value = b;
    } } };
Sys._Application.registerClass("Sys._Application", Sys.Component, Sys.IContainer);
Sys.Application = new Sys._Application;
var $find = Sys.Application.findComponent;
Type.registerNamespace("Sys.Net");
Sys.Net.WebRequestExecutor = function () { this._webRequest = null; this._resultObject = null; };
Sys.Net.WebRequestExecutor.prototype = { get_webRequest: function () { return this._webRequest; }, _set_webRequest: function (a) { this._webRequest = a; }, get_started: function () { throw Error.notImplemented(); }, get_responseAvailable: function () { throw Error.notImplemented(); }, get_timedOut: function () { throw Error.notImplemented(); }, get_aborted: function () { throw Error.notImplemented(); }, get_responseData: function () { throw Error.notImplemented(); }, get_statusCode: function () { throw Error.notImplemented(); }, get_statusText: function () { throw Error.notImplemented(); }, get_xml: function () { throw Error.notImplemented(); }, get_object: function () { if (!this._resultObject)
        this._resultObject = Sys.Serialization.JavaScriptSerializer.deserialize(this.get_responseData()); return this._resultObject; }, executeRequest: function () { throw Error.notImplemented(); }, abort: function () { throw Error.notImplemented(); }, getResponseHeader: function () { throw Error.notImplemented(); }, getAllResponseHeaders: function () { throw Error.notImplemented(); } };
Sys.Net.WebRequestExecutor.registerClass("Sys.Net.WebRequestExecutor");
Sys.Net.XMLDOM = function (d) { if (!window.DOMParser) {
    var c = ["Msxml2.DOMDocument.3.0", "Msxml2.DOMDocument"];
    for (var b = 0, f = c.length; b < f; b++)
        try {
            var a = new ActiveXObject(c[b]);
            a.async = false;
            a.loadXML(d);
            a.setProperty("SelectionLanguage", "XPath");
            return a;
        }
        catch (g) { }
}
else
    try {
        var e = new window.DOMParser;
        return e.parseFromString(d, "text/xml");
    }
    catch (g) { } return null; };
Sys.Net.XMLHttpExecutor = function () { Sys.Net.XMLHttpExecutor.initializeBase(this); var a = this; this._xmlHttpRequest = null; this._webRequest = null; this._responseAvailable = false; this._timedOut = false; this._timer = null; this._aborted = false; this._started = false; this._onReadyStateChange = function () { if (a._xmlHttpRequest.readyState === 4) {
    try {
        if (typeof a._xmlHttpRequest.status === "undefined")
            return;
    }
    catch (b) {
        return;
    }
    a._clearTimer();
    a._responseAvailable = true;
    try {
        a._webRequest.completed(Sys.EventArgs.Empty);
    }
    finally {
        if (a._xmlHttpRequest != null) {
            a._xmlHttpRequest.onreadystatechange = Function.emptyMethod;
            a._xmlHttpRequest = null;
        }
    }
} }; this._clearTimer = function () { if (a._timer != null) {
    window.clearTimeout(a._timer);
    a._timer = null;
} }; this._onTimeout = function () { if (!a._responseAvailable) {
    a._clearTimer();
    a._timedOut = true;
    a._xmlHttpRequest.onreadystatechange = Function.emptyMethod;
    a._xmlHttpRequest.abort();
    a._webRequest.completed(Sys.EventArgs.Empty);
    a._xmlHttpRequest = null;
} }; };
Sys.Net.XMLHttpExecutor.prototype = { get_timedOut: function () { return this._timedOut; }, get_started: function () { return this._started; }, get_responseAvailable: function () { return this._responseAvailable; }, get_aborted: function () { return this._aborted; }, executeRequest: function () { this._webRequest = this.get_webRequest(); var c = this._webRequest.get_body(), a = this._webRequest.get_headers(); this._xmlHttpRequest = new XMLHttpRequest; this._xmlHttpRequest.onreadystatechange = this._onReadyStateChange; var e = this._webRequest.get_httpVerb(); this._xmlHttpRequest.open(e, this._webRequest.getResolvedUrl(), true); if (a)
        for (var b in a) {
            var f = a[b];
            if (typeof f !== "function")
                this._xmlHttpRequest.setRequestHeader(b, f);
        } if (e.toLowerCase() === "post") {
        if (a === null || !a["Content-Type"])
            this._xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        if (!c)
            c = "";
    } var d = this._webRequest.get_timeout(); if (d > 0)
        this._timer = window.setTimeout(Function.createDelegate(this, this._onTimeout), d); this._xmlHttpRequest.send(c); this._started = true; }, getResponseHeader: function (b) { var a; try {
        a = this._xmlHttpRequest.getResponseHeader(b);
    }
    catch (c) { } if (!a)
        a = ""; return a; }, getAllResponseHeaders: function () { return this._xmlHttpRequest.getAllResponseHeaders(); }, get_responseData: function () { return this._xmlHttpRequest.responseText; }, get_statusCode: function () { var a = 0; try {
        a = this._xmlHttpRequest.status;
    }
    catch (b) { } return a; }, get_statusText: function () { return this._xmlHttpRequest.statusText; }, get_xml: function () { var a = this._xmlHttpRequest.responseXML; if (!a || !a.documentElement) {
        a = Sys.Net.XMLDOM(this._xmlHttpRequest.responseText);
        if (!a || !a.documentElement)
            return null;
    }
    else if (navigator.userAgent.indexOf("MSIE") !== -1)
        a.setProperty("SelectionLanguage", "XPath"); if (a.documentElement.namespaceURI === "http://www.mozilla.org/newlayout/xml/parsererror.xml" && a.documentElement.tagName === "parsererror")
        return null; if (a.documentElement.firstChild && a.documentElement.firstChild.tagName === "parsererror")
        return null; return a; }, abort: function () { if (this._aborted || this._responseAvailable || this._timedOut)
        return; this._aborted = true; this._clearTimer(); if (this._xmlHttpRequest && !this._responseAvailable) {
        this._xmlHttpRequest.onreadystatechange = Function.emptyMethod;
        this._xmlHttpRequest.abort();
        this._xmlHttpRequest = null;
        this._webRequest.completed(Sys.EventArgs.Empty);
    } } };
Sys.Net.XMLHttpExecutor.registerClass("Sys.Net.XMLHttpExecutor", Sys.Net.WebRequestExecutor);
Sys.Net._WebRequestManager = function () { this._defaultTimeout = 0; this._defaultExecutorType = "Sys.Net.XMLHttpExecutor"; };
Sys.Net._WebRequestManager.prototype = { add_invokingRequest: function (a) { this._get_eventHandlerList().addHandler("invokingRequest", a); }, remove_invokingRequest: function (a) { this._get_eventHandlerList().removeHandler("invokingRequest", a); }, add_completedRequest: function (a) { this._get_eventHandlerList().addHandler("completedRequest", a); }, remove_completedRequest: function (a) { this._get_eventHandlerList().removeHandler("completedRequest", a); }, _get_eventHandlerList: function () { if (!this._events)
        this._events = new Sys.EventHandlerList; return this._events; }, get_defaultTimeout: function () { return this._defaultTimeout; }, set_defaultTimeout: function (a) { this._defaultTimeout = a; }, get_defaultExecutorType: function () { return this._defaultExecutorType; }, set_defaultExecutorType: function (a) { this._defaultExecutorType = a; }, executeRequest: function (webRequest) { var executor = webRequest.get_executor(); if (!executor) {
        var failed = false;
        try {
            var executorType = eval(this._defaultExecutorType);
            executor = new executorType;
        }
        catch (a) {
            failed = true;
        }
        webRequest.set_executor(executor);
    } if (executor.get_aborted())
        return; var evArgs = new Sys.Net.NetworkRequestEventArgs(webRequest), handler = this._get_eventHandlerList().getHandler("invokingRequest"); if (handler)
        handler(this, evArgs); if (!evArgs.get_cancel())
        executor.executeRequest(); } };
Sys.Net._WebRequestManager.registerClass("Sys.Net._WebRequestManager");
Sys.Net.WebRequestManager = new Sys.Net._WebRequestManager;
Sys.Net.NetworkRequestEventArgs = function (a) { Sys.Net.NetworkRequestEventArgs.initializeBase(this); this._webRequest = a; };
Sys.Net.NetworkRequestEventArgs.prototype = { get_webRequest: function () { return this._webRequest; } };
Sys.Net.NetworkRequestEventArgs.registerClass("Sys.Net.NetworkRequestEventArgs", Sys.CancelEventArgs);
Sys.Net.WebRequest = function () { this._url = ""; this._headers = {}; this._body = null; this._userContext = null; this._httpVerb = null; this._executor = null; this._invokeCalled = false; this._timeout = 0; };
Sys.Net.WebRequest.prototype = { add_completed: function (a) { this._get_eventHandlerList().addHandler("completed", a); }, remove_completed: function (a) { this._get_eventHandlerList().removeHandler("completed", a); }, completed: function (b) { var a = Sys.Net.WebRequestManager._get_eventHandlerList().getHandler("completedRequest"); if (a)
        a(this._executor, b); a = this._get_eventHandlerList().getHandler("completed"); if (a)
        a(this._executor, b); }, _get_eventHandlerList: function () { if (!this._events)
        this._events = new Sys.EventHandlerList; return this._events; }, get_url: function () { return this._url; }, set_url: function (a) { this._url = a; }, get_headers: function () { return this._headers; }, get_httpVerb: function () { if (this._httpVerb === null) {
        if (this._body === null)
            return "GET";
        return "POST";
    } return this._httpVerb; }, set_httpVerb: function (a) { this._httpVerb = a; }, get_body: function () { return this._body; }, set_body: function (a) { this._body = a; }, get_userContext: function () { return this._userContext; }, set_userContext: function (a) { this._userContext = a; }, get_executor: function () { return this._executor; }, set_executor: function (a) { this._executor = a; this._executor._set_webRequest(this); }, get_timeout: function () { if (this._timeout === 0)
        return Sys.Net.WebRequestManager.get_defaultTimeout(); return this._timeout; }, set_timeout: function (a) { this._timeout = a; }, getResolvedUrl: function () { return Sys.Net.WebRequest._resolveUrl(this._url); }, invoke: function () { Sys.Net.WebRequestManager.executeRequest(this); this._invokeCalled = true; } };
Sys.Net.WebRequest._resolveUrl = function (b, a) { if (b && b.indexOf("://") !== -1)
    return b; if (!a || a.length === 0) {
    var d = document.getElementsByTagName("base")[0];
    if (d && d.href && d.href.length > 0)
        a = d.href;
    else
        a = document.URL;
} var c = a.indexOf("?"); if (c !== -1)
    a = a.substr(0, c); c = a.indexOf("#"); if (c !== -1)
    a = a.substr(0, c); a = a.substr(0, a.lastIndexOf("/") + 1); if (!b || b.length === 0)
    return a; if (b.charAt(0) === "/") {
    var e = a.indexOf("://"), g = a.indexOf("/", e + 3);
    return a.substr(0, g) + b;
}
else {
    var f = a.lastIndexOf("/");
    return a.substr(0, f + 1) + b;
} };
Sys.Net.WebRequest._createQueryString = function (d, b) { if (!b)
    b = encodeURIComponent; var a = new Sys.StringBuilder, f = 0; for (var c in d) {
    var e = d[c];
    if (typeof e === "function")
        continue;
    var g = Sys.Serialization.JavaScriptSerializer.serialize(e);
    if (f !== 0)
        a.append("&");
    a.append(c);
    a.append("=");
    a.append(b(g));
    f++;
} return a.toString(); };
Sys.Net.WebRequest._createUrl = function (a, b) { if (!b)
    return a; var d = Sys.Net.WebRequest._createQueryString(b); if (d.length > 0) {
    var c = "?";
    if (a && a.indexOf("?") !== -1)
        c = "&";
    return a + c + d;
}
else
    return a; };
Sys.Net.WebRequest.registerClass("Sys.Net.WebRequest");
Sys.Net.WebServiceProxy = function () { };
Sys.Net.WebServiceProxy.prototype = { get_timeout: function () { return this._timeout; }, set_timeout: function (a) { if (a < 0)
        throw Error.argumentOutOfRange("value", a, Sys.Res.invalidTimeout); this._timeout = a; }, get_defaultUserContext: function () { return this._userContext; }, set_defaultUserContext: function (a) { this._userContext = a; }, get_defaultSucceededCallback: function () { return this._succeeded; }, set_defaultSucceededCallback: function (a) { this._succeeded = a; }, get_defaultFailedCallback: function () { return this._failed; }, set_defaultFailedCallback: function (a) { this._failed = a; }, get_path: function () { return this._path; }, set_path: function (a) { this._path = a; }, _invoke: function (d, e, g, f, c, b, a) { if (c === null || typeof c === "undefined")
        c = this.get_defaultSucceededCallback(); if (b === null || typeof b === "undefined")
        b = this.get_defaultFailedCallback(); if (a === null || typeof a === "undefined")
        a = this.get_defaultUserContext(); return Sys.Net.WebServiceProxy.invoke(d, e, g, f, c, b, a, this.get_timeout()); } };
Sys.Net.WebServiceProxy.registerClass("Sys.Net.WebServiceProxy");
Sys.Net.WebServiceProxy.invoke = function (k, a, j, d, i, c, f, h) { var b = new Sys.Net.WebRequest; b.get_headers()["Content-Type"] = "application/json; charset=utf-8"; if (!d)
    d = {}; var g = d; if (!j || !g)
    g = {}; b.set_url(Sys.Net.WebRequest._createUrl(k + "/" + encodeURIComponent(a), g)); var e = null; if (!j) {
    e = Sys.Serialization.JavaScriptSerializer.serialize(d);
    if (e === "{}")
        e = "";
} b.set_body(e); b.add_completed(l); if (h && h > 0)
    b.set_timeout(h); b.invoke(); function l(d) { if (d.get_responseAvailable()) {
    var g = d.get_statusCode(), b = null;
    try {
        var e = d.getResponseHeader("Content-Type");
        if (e.startsWith("application/json"))
            b = d.get_object();
        else if (e.startsWith("text/xml"))
            b = d.get_xml();
        else
            b = d.get_responseData();
    }
    catch (m) { }
    var k = d.getResponseHeader("jsonerror"), h = k === "true";
    if (h) {
        if (b)
            b = new Sys.Net.WebServiceError(false, b.Message, b.StackTrace, b.ExceptionType);
    }
    else if (e.startsWith("application/json"))
        b = b.d;
    if (g < 200 || g >= 300 || h) {
        if (c) {
            if (!b || !h)
                b = new Sys.Net.WebServiceError(false, String.format(Sys.Res.webServiceFailedNoMsg, a), "", "");
            b._statusCode = g;
            c(b, f, a);
        }
    }
    else if (i)
        i(b, f, a);
}
else {
    var j;
    if (d.get_timedOut())
        j = String.format(Sys.Res.webServiceTimedOut, a);
    else
        j = String.format(Sys.Res.webServiceFailedNoMsg, a);
    if (c)
        c(new Sys.Net.WebServiceError(d.get_timedOut(), j, "", ""), f, a);
} } return b; };
Sys.Net.WebServiceProxy._generateTypedConstructor = function (a) { return function (b) { if (b)
    for (var c in b)
        this[c] = b[c]; this.__type = a; }; };
Sys.Net.WebServiceError = function (c, d, b, a) { this._timedOut = c; this._message = d; this._stackTrace = b; this._exceptionType = a; this._statusCode = -1; };
Sys.Net.WebServiceError.prototype = { get_timedOut: function () { return this._timedOut; }, get_statusCode: function () { return this._statusCode; }, get_message: function () { return this._message; }, get_stackTrace: function () { return this._stackTrace; }, get_exceptionType: function () { return this._exceptionType; } };
Sys.Net.WebServiceError.registerClass("Sys.Net.WebServiceError");
Type.registerNamespace("Sys.Services");
Sys.Services._ProfileService = function () { Sys.Services._ProfileService.initializeBase(this); this.properties = {}; };
Sys.Services._ProfileService.DefaultWebServicePath = "";
Sys.Services._ProfileService.prototype = { _defaultLoadCompletedCallback: null, _defaultSaveCompletedCallback: null, _path: "", _timeout: 0, get_defaultLoadCompletedCallback: function () { return this._defaultLoadCompletedCallback; }, set_defaultLoadCompletedCallback: function (a) { this._defaultLoadCompletedCallback = a; }, get_defaultSaveCompletedCallback: function () { return this._defaultSaveCompletedCallback; }, set_defaultSaveCompletedCallback: function (a) { this._defaultSaveCompletedCallback = a; }, get_path: function () { return this._path || ""; }, load: function (c, d, e, f) { var b, a; if (!c) {
        a = "GetAllPropertiesForCurrentUser";
        b = { authenticatedUserOnly: false };
    }
    else {
        a = "GetPropertiesForCurrentUser";
        b = { properties: this._clonePropertyNames(c), authenticatedUserOnly: false };
    } this._invoke(this._get_path(), a, false, b, Function.createDelegate(this, this._onLoadComplete), Function.createDelegate(this, this._onLoadFailed), [d, e, f]); }, save: function (d, b, c, e) { var a = this._flattenProperties(d, this.properties); this._invoke(this._get_path(), "SetPropertiesForCurrentUser", false, { values: a.value, authenticatedUserOnly: false }, Function.createDelegate(this, this._onSaveComplete), Function.createDelegate(this, this._onSaveFailed), [b, c, e, a.count]); }, _clonePropertyNames: function (e) { var c = [], d = {}; for (var b = 0; b < e.length; b++) {
        var a = e[b];
        if (!d[a]) {
            Array.add(c, a);
            d[a] = true;
        }
    } return c; }, _flattenProperties: function (a, i, j) { var b = {}, e, d, g = 0; if (a && a.length === 0)
        return { value: b, count: 0 }; for (var c in i) {
        e = i[c];
        d = j ? j + "." + c : c;
        if (Sys.Services.ProfileGroup.isInstanceOfType(e)) {
            var k = this._flattenProperties(a, e, d), h = k.value;
            g += k.count;
            for (var f in h) {
                var l = h[f];
                b[f] = l;
            }
        }
        else if (!a || Array.indexOf(a, d) !== -1) {
            b[d] = e;
            g++;
        }
    } return { value: b, count: g }; }, _get_path: function () { var a = this.get_path(); if (!a.length)
        a = Sys.Services._ProfileService.DefaultWebServicePath; if (!a || !a.length)
        throw Error.invalidOperation(Sys.Res.servicePathNotSet); return a; }, _onLoadComplete: function (a, e, g) { if (typeof a !== "object")
        throw Error.invalidOperation(String.format(Sys.Res.webServiceInvalidReturnType, g, "Object")); var c = this._unflattenProperties(a); for (var b in c)
        this.properties[b] = c[b]; var d = e[0] || this.get_defaultLoadCompletedCallback() || this.get_defaultSucceededCallback(); if (d) {
        var f = e[2] || this.get_defaultUserContext();
        d(a.length, f, "Sys.Services.ProfileService.load");
    } }, _onLoadFailed: function (d, b) { var a = b[1] || this.get_defaultFailedCallback(); if (a) {
        var c = b[2] || this.get_defaultUserContext();
        a(d, c, "Sys.Services.ProfileService.load");
    } }, _onSaveComplete: function (a, b, f) { var c = b[3]; if (a !== null)
        if (a instanceof Array)
            c -= a.length;
        else if (typeof a === "number")
            c = a;
        else
            throw Error.invalidOperation(String.format(Sys.Res.webServiceInvalidReturnType, f, "Array")); var d = b[0] || this.get_defaultSaveCompletedCallback() || this.get_defaultSucceededCallback(); if (d) {
        var e = b[2] || this.get_defaultUserContext();
        d(c, e, "Sys.Services.ProfileService.save");
    } }, _onSaveFailed: function (d, b) { var a = b[1] || this.get_defaultFailedCallback(); if (a) {
        var c = b[2] || this.get_defaultUserContext();
        a(d, c, "Sys.Services.ProfileService.save");
    } }, _unflattenProperties: function (e) { var c = {}, d, f, h = 0; for (var a in e) {
        h++;
        f = e[a];
        d = a.indexOf(".");
        if (d !== -1) {
            var g = a.substr(0, d);
            a = a.substr(d + 1);
            var b = c[g];
            if (!b || !Sys.Services.ProfileGroup.isInstanceOfType(b)) {
                b = new Sys.Services.ProfileGroup;
                c[g] = b;
            }
            b[a] = f;
        }
        else
            c[a] = f;
    } e.length = h; return c; } };
Sys.Services._ProfileService.registerClass("Sys.Services._ProfileService", Sys.Net.WebServiceProxy);
Sys.Services.ProfileService = new Sys.Services._ProfileService;
Sys.Services.ProfileGroup = function (a) { if (a)
    for (var b in a)
        this[b] = a[b]; };
Sys.Services.ProfileGroup.registerClass("Sys.Services.ProfileGroup");
Sys.Services._AuthenticationService = function () { Sys.Services._AuthenticationService.initializeBase(this); };
Sys.Services._AuthenticationService.DefaultWebServicePath = "";
Sys.Services._AuthenticationService.prototype = { _defaultLoginCompletedCallback: null, _defaultLogoutCompletedCallback: null, _path: "", _timeout: 0, _authenticated: false, get_defaultLoginCompletedCallback: function () { return this._defaultLoginCompletedCallback; }, set_defaultLoginCompletedCallback: function (a) { this._defaultLoginCompletedCallback = a; }, get_defaultLogoutCompletedCallback: function () { return this._defaultLogoutCompletedCallback; }, set_defaultLogoutCompletedCallback: function (a) { this._defaultLogoutCompletedCallback = a; }, get_isLoggedIn: function () { return this._authenticated; }, get_path: function () { return this._path || ""; }, login: function (c, b, a, h, f, d, e, g) { this._invoke(this._get_path(), "Login", false, { userName: c, password: b, createPersistentCookie: a }, Function.createDelegate(this, this._onLoginComplete), Function.createDelegate(this, this._onLoginFailed), [c, b, a, h, f, d, e, g]); }, logout: function (c, a, b, d) { this._invoke(this._get_path(), "Logout", false, {}, Function.createDelegate(this, this._onLogoutComplete), Function.createDelegate(this, this._onLogoutFailed), [c, a, b, d]); }, _get_path: function () { var a = this.get_path(); if (!a.length)
        a = Sys.Services._AuthenticationService.DefaultWebServicePath; if (!a || !a.length)
        throw Error.invalidOperation(Sys.Res.servicePathNotSet); return a; }, _onLoginComplete: function (e, c, f) { if (typeof e !== "boolean")
        throw Error.invalidOperation(String.format(Sys.Res.webServiceInvalidReturnType, f, "Boolean")); var b = c[4], d = c[7] || this.get_defaultUserContext(), a = c[5] || this.get_defaultLoginCompletedCallback() || this.get_defaultSucceededCallback(); if (e) {
        this._authenticated = true;
        if (a)
            a(true, d, "Sys.Services.AuthenticationService.login");
        if (typeof b !== "undefined" && b !== null)
            window.location.href = b;
    }
    else if (a)
        a(false, d, "Sys.Services.AuthenticationService.login"); }, _onLoginFailed: function (d, b) { var a = b[6] || this.get_defaultFailedCallback(); if (a) {
        var c = b[7] || this.get_defaultUserContext();
        a(d, c, "Sys.Services.AuthenticationService.login");
    } }, _onLogoutComplete: function (f, a, e) { if (f !== null)
        throw Error.invalidOperation(String.format(Sys.Res.webServiceInvalidReturnType, e, "null")); var b = a[0], d = a[3] || this.get_defaultUserContext(), c = a[1] || this.get_defaultLogoutCompletedCallback() || this.get_defaultSucceededCallback(); this._authenticated = false; if (c)
        c(null, d, "Sys.Services.AuthenticationService.logout"); if (!b)
        window.location.reload();
    else
        window.location.href = b; }, _onLogoutFailed: function (c, b) { var a = b[2] || this.get_defaultFailedCallback(); if (a)
        a(c, b[3], "Sys.Services.AuthenticationService.logout"); }, _setAuthenticated: function (a) { this._authenticated = a; } };
Sys.Services._AuthenticationService.registerClass("Sys.Services._AuthenticationService", Sys.Net.WebServiceProxy);
Sys.Services.AuthenticationService = new Sys.Services._AuthenticationService;
Sys.Services._RoleService = function () { Sys.Services._RoleService.initializeBase(this); this._roles = []; };
Sys.Services._RoleService.DefaultWebServicePath = "";
Sys.Services._RoleService.prototype = { _defaultLoadCompletedCallback: null, _rolesIndex: null, _timeout: 0, _path: "", get_defaultLoadCompletedCallback: function () { return this._defaultLoadCompletedCallback; }, set_defaultLoadCompletedCallback: function (a) { this._defaultLoadCompletedCallback = a; }, get_path: function () { return this._path || ""; }, get_roles: function () { return Array.clone(this._roles); }, isUserInRole: function (a) { var b = this._get_rolesIndex()[a.trim().toLowerCase()]; return !!b; }, load: function (a, b, c) { Sys.Net.WebServiceProxy.invoke(this._get_path(), "GetRolesForCurrentUser", false, {}, Function.createDelegate(this, this._onLoadComplete), Function.createDelegate(this, this._onLoadFailed), [a, b, c], this.get_timeout()); }, _get_path: function () { var a = this.get_path(); if (!a || !a.length)
        a = Sys.Services._RoleService.DefaultWebServicePath; if (!a || !a.length)
        throw Error.invalidOperation(Sys.Res.servicePathNotSet); return a; }, _get_rolesIndex: function () { if (!this._rolesIndex) {
        var b = {};
        for (var a = 0; a < this._roles.length; a++)
            b[this._roles[a].toLowerCase()] = true;
        this._rolesIndex = b;
    } return this._rolesIndex; }, _onLoadComplete: function (a, c, f) { if (a && !(a instanceof Array))
        throw Error.invalidOperation(String.format(Sys.Res.webServiceInvalidReturnType, f, "Array")); this._roles = a; this._rolesIndex = null; var b = c[0] || this.get_defaultLoadCompletedCallback() || this.get_defaultSucceededCallback(); if (b) {
        var e = c[2] || this.get_defaultUserContext(), d = Array.clone(a);
        b(d, e, "Sys.Services.RoleService.load");
    } }, _onLoadFailed: function (d, b) { var a = b[1] || this.get_defaultFailedCallback(); if (a) {
        var c = b[2] || this.get_defaultUserContext();
        a(d, c, "Sys.Services.RoleService.load");
    } } };
Sys.Services._RoleService.registerClass("Sys.Services._RoleService", Sys.Net.WebServiceProxy);
Sys.Services.RoleService = new Sys.Services._RoleService;
Type.registerNamespace("Sys.Serialization");
Sys.Serialization.JavaScriptSerializer = function () { };
Sys.Serialization.JavaScriptSerializer.registerClass("Sys.Serialization.JavaScriptSerializer");
Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs = [];
Sys.Serialization.JavaScriptSerializer._charsToEscape = [];
Sys.Serialization.JavaScriptSerializer._dateRegEx = new RegExp('(^|[^\\\\])\\"\\\\/Date\\((-?[0-9]+)(?:[a-zA-Z]|(?:\\+|-)[0-9]{4})?\\)\\\\/\\"', "g");
Sys.Serialization.JavaScriptSerializer._escapeChars = {};
Sys.Serialization.JavaScriptSerializer._escapeRegEx = new RegExp('["\\\\\\x00-\\x1F]', "i");
Sys.Serialization.JavaScriptSerializer._escapeRegExGlobal = new RegExp('["\\\\\\x00-\\x1F]', "g");
Sys.Serialization.JavaScriptSerializer._jsonRegEx = new RegExp("[^,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t]", "g");
Sys.Serialization.JavaScriptSerializer._jsonStringRegEx = new RegExp('"(\\\\.|[^"\\\\])*"', "g");
Sys.Serialization.JavaScriptSerializer._serverTypeFieldName = "__type";
Sys.Serialization.JavaScriptSerializer._init = function () { var c = ["\\u0000", "\\u0001", "\\u0002", "\\u0003", "\\u0004", "\\u0005", "\\u0006", "\\u0007", "\\b", "\\t", "\\n", "\\u000b", "\\f", "\\r", "\\u000e", "\\u000f", "\\u0010", "\\u0011", "\\u0012", "\\u0013", "\\u0014", "\\u0015", "\\u0016", "\\u0017", "\\u0018", "\\u0019", "\\u001a", "\\u001b", "\\u001c", "\\u001d", "\\u001e", "\\u001f"]; Sys.Serialization.JavaScriptSerializer._charsToEscape[0] = "\\"; Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs["\\"] = new RegExp("\\\\", "g"); Sys.Serialization.JavaScriptSerializer._escapeChars["\\"] = "\\\\"; Sys.Serialization.JavaScriptSerializer._charsToEscape[1] = '"'; Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs['"'] = new RegExp('"', "g"); Sys.Serialization.JavaScriptSerializer._escapeChars['"'] = '\\"'; for (var a = 0; a < 32; a++) {
    var b = String.fromCharCode(a);
    Sys.Serialization.JavaScriptSerializer._charsToEscape[a + 2] = b;
    Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs[b] = new RegExp(b, "g");
    Sys.Serialization.JavaScriptSerializer._escapeChars[b] = c[a];
} };
Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder = function (b, a) { a.append(b.toString()); };
Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder = function (a, b) { if (isFinite(a))
    b.append(String(a));
else
    throw Error.invalidOperation(Sys.Res.cannotSerializeNonFiniteNumbers); };
Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder = function (a, c) { c.append('"'); if (Sys.Serialization.JavaScriptSerializer._escapeRegEx.test(a)) {
    if (Sys.Serialization.JavaScriptSerializer._charsToEscape.length === 0)
        Sys.Serialization.JavaScriptSerializer._init();
    if (a.length < 128)
        a = a.replace(Sys.Serialization.JavaScriptSerializer._escapeRegExGlobal, function (a) { return Sys.Serialization.JavaScriptSerializer._escapeChars[a]; });
    else
        for (var d = 0; d < 34; d++) {
            var b = Sys.Serialization.JavaScriptSerializer._charsToEscape[d];
            if (a.indexOf(b) !== -1)
                if (Sys.Browser.agent === Sys.Browser.Opera || Sys.Browser.agent === Sys.Browser.FireFox)
                    a = a.split(b).join(Sys.Serialization.JavaScriptSerializer._escapeChars[b]);
                else
                    a = a.replace(Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs[b], Sys.Serialization.JavaScriptSerializer._escapeChars[b]);
        }
} c.append(a); c.append('"'); };
Sys.Serialization.JavaScriptSerializer._serializeWithBuilder = function (b, a, i, g) { var c; switch (typeof b) {
    case "object":
        if (b)
            if (Number.isInstanceOfType(b))
                Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder(b, a);
            else if (Boolean.isInstanceOfType(b))
                Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder(b, a);
            else if (String.isInstanceOfType(b))
                Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder(b, a);
            else if (Array.isInstanceOfType(b)) {
                a.append("[");
                for (c = 0; c < b.length; ++c) {
                    if (c > 0)
                        a.append(",");
                    Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(b[c], a, false, g);
                }
                a.append("]");
            }
            else {
                if (Date.isInstanceOfType(b)) {
                    a.append('"\\/Date(');
                    a.append(b.getTime());
                    a.append(')\\/"');
                    break;
                }
                var d = [], f = 0;
                for (var e in b) {
                    if (e.startsWith("$"))
                        continue;
                    if (e === Sys.Serialization.JavaScriptSerializer._serverTypeFieldName && f !== 0) {
                        d[f++] = d[0];
                        d[0] = e;
                    }
                    else
                        d[f++] = e;
                }
                if (i)
                    d.sort();
                a.append("{");
                var j = false;
                for (c = 0; c < f; c++) {
                    var h = b[d[c]];
                    if (typeof h !== "undefined" && typeof h !== "function") {
                        if (j)
                            a.append(",");
                        else
                            j = true;
                        Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(d[c], a, i, g);
                        a.append(":");
                        Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(h, a, i, g);
                    }
                }
                a.append("}");
            }
        else
            a.append("null");
        break;
    case "number":
        Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder(b, a);
        break;
    case "string":
        Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder(b, a);
        break;
    case "boolean":
        Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder(b, a);
        break;
    default: a.append("null");
} };
Sys.Serialization.JavaScriptSerializer.serialize = function (b) { var a = new Sys.StringBuilder; Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(b, a, false); return a.toString(); };
Sys.Serialization.JavaScriptSerializer.deserialize = function (data, secure) { if (data.length === 0)
    throw Error.argument("data", Sys.Res.cannotDeserializeEmptyString); try {
    var exp = data.replace(Sys.Serialization.JavaScriptSerializer._dateRegEx, "$1new Date($2)");
    if (secure && Sys.Serialization.JavaScriptSerializer._jsonRegEx.test(exp.replace(Sys.Serialization.JavaScriptSerializer._jsonStringRegEx, "")))
        throw null;
    return eval("(" + exp + ")");
}
catch (a) {
    throw Error.argument("data", Sys.Res.cannotDeserializeInvalidJson);
} };
Sys.CultureInfo = function (c, b, a) { this.name = c; this.numberFormat = b; this.dateTimeFormat = a; };
Sys.CultureInfo.prototype = { _getDateTimeFormats: function () { if (!this._dateTimeFormats) {
        var a = this.dateTimeFormat;
        this._dateTimeFormats = [a.MonthDayPattern, a.YearMonthPattern, a.ShortDatePattern, a.ShortTimePattern, a.LongDatePattern, a.LongTimePattern, a.FullDateTimePattern, a.RFC1123Pattern, a.SortableDateTimePattern, a.UniversalSortableDateTimePattern];
    } return this._dateTimeFormats; }, _getMonthIndex: function (a) { if (!this._upperMonths)
        this._upperMonths = this._toUpperArray(this.dateTimeFormat.MonthNames); return Array.indexOf(this._upperMonths, this._toUpper(a)); }, _getAbbrMonthIndex: function (a) { if (!this._upperAbbrMonths)
        this._upperAbbrMonths = this._toUpperArray(this.dateTimeFormat.AbbreviatedMonthNames); return Array.indexOf(this._upperAbbrMonths, this._toUpper(a)); }, _getDayIndex: function (a) { if (!this._upperDays)
        this._upperDays = this._toUpperArray(this.dateTimeFormat.DayNames); return Array.indexOf(this._upperDays, this._toUpper(a)); }, _getAbbrDayIndex: function (a) { if (!this._upperAbbrDays)
        this._upperAbbrDays = this._toUpperArray(this.dateTimeFormat.AbbreviatedDayNames); return Array.indexOf(this._upperAbbrDays, this._toUpper(a)); }, _toUpperArray: function (c) { var b = []; for (var a = 0, d = c.length; a < d; a++)
        b[a] = this._toUpper(c[a]); return b; }, _toUpper: function (a) { return a.split("\u00a0").join(" ").toUpperCase(); } };
Sys.CultureInfo._parse = function (b) { var a = Sys.Serialization.JavaScriptSerializer.deserialize(b); return new Sys.CultureInfo(a.name, a.numberFormat, a.dateTimeFormat); };
Sys.CultureInfo.registerClass("Sys.CultureInfo");
Sys.CultureInfo.InvariantCulture = Sys.CultureInfo._parse('{"name":"","numberFormat":{"CurrencyDecimalDigits":2,"CurrencyDecimalSeparator":".","IsReadOnly":true,"CurrencyGroupSizes":[3],"NumberGroupSizes":[3],"PercentGroupSizes":[3],"CurrencyGroupSeparator":",","CurrencySymbol":"\u00a4","NaNSymbol":"NaN","CurrencyNegativePattern":0,"NumberNegativePattern":1,"PercentPositivePattern":0,"PercentNegativePattern":0,"NegativeInfinitySymbol":"-Infinity","NegativeSign":"-","NumberDecimalDigits":2,"NumberDecimalSeparator":".","NumberGroupSeparator":",","CurrencyPositivePattern":0,"PositiveInfinitySymbol":"Infinity","PositiveSign":"+","PercentDecimalDigits":2,"PercentDecimalSeparator":".","PercentGroupSeparator":",","PercentSymbol":"%","PerMilleSymbol":"\u2030","NativeDigits":["0","1","2","3","4","5","6","7","8","9"],"DigitSubstitution":1},"dateTimeFormat":{"AMDesignator":"AM","Calendar":{"MinSupportedDateTime":"@-62135568000000@","MaxSupportedDateTime":"@253402300799999@","AlgorithmType":1,"CalendarType":1,"Eras":[1],"TwoDigitYearMax":2029,"IsReadOnly":true},"DateSeparator":"/","FirstDayOfWeek":0,"CalendarWeekRule":0,"FullDateTimePattern":"dddd, dd MMMM yyyy HH:mm:ss","LongDatePattern":"dddd, dd MMMM yyyy","LongTimePattern":"HH:mm:ss","MonthDayPattern":"MMMM dd","PMDesignator":"PM","RFC1123Pattern":"ddd, dd MMM yyyy HH\':\'mm\':\'ss \'GMT\'","ShortDatePattern":"MM/dd/yyyy","ShortTimePattern":"HH:mm","SortableDateTimePattern":"yyyy\'-\'MM\'-\'dd\'T\'HH\':\'mm\':\'ss","TimeSeparator":":","UniversalSortableDateTimePattern":"yyyy\'-\'MM\'-\'dd HH\':\'mm\':\'ss\'Z\'","YearMonthPattern":"yyyy MMMM","AbbreviatedDayNames":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"ShortestDayNames":["Su","Mo","Tu","We","Th","Fr","Sa"],"DayNames":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"AbbreviatedMonthNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthNames":["January","February","March","April","May","June","July","August","September","October","November","December",""],"IsReadOnly":true,"NativeCalendarName":"Gregorian Calendar","AbbreviatedMonthGenitiveNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthGenitiveNames":["January","February","March","April","May","June","July","August","September","October","November","December",""]}}');
if (typeof __cultureInfo === "undefined")
    var __cultureInfo = '{"name":"en-US","numberFormat":{"CurrencyDecimalDigits":2,"CurrencyDecimalSeparator":".","IsReadOnly":false,"CurrencyGroupSizes":[3],"NumberGroupSizes":[3],"PercentGroupSizes":[3],"CurrencyGroupSeparator":",","CurrencySymbol":"$","NaNSymbol":"NaN","CurrencyNegativePattern":0,"NumberNegativePattern":1,"PercentPositivePattern":0,"PercentNegativePattern":0,"NegativeInfinitySymbol":"-Infinity","NegativeSign":"-","NumberDecimalDigits":2,"NumberDecimalSeparator":".","NumberGroupSeparator":",","CurrencyPositivePattern":0,"PositiveInfinitySymbol":"Infinity","PositiveSign":"+","PercentDecimalDigits":2,"PercentDecimalSeparator":".","PercentGroupSeparator":",","PercentSymbol":"%","PerMilleSymbol":"\u2030","NativeDigits":["0","1","2","3","4","5","6","7","8","9"],"DigitSubstitution":1},"dateTimeFormat":{"AMDesignator":"AM","Calendar":{"MinSupportedDateTime":"@-62135568000000@","MaxSupportedDateTime":"@253402300799999@","AlgorithmType":1,"CalendarType":1,"Eras":[1],"TwoDigitYearMax":2029,"IsReadOnly":false},"DateSeparator":"/","FirstDayOfWeek":0,"CalendarWeekRule":0,"FullDateTimePattern":"dddd, MMMM dd, yyyy h:mm:ss tt","LongDatePattern":"dddd, MMMM dd, yyyy","LongTimePattern":"h:mm:ss tt","MonthDayPattern":"MMMM dd","PMDesignator":"PM","RFC1123Pattern":"ddd, dd MMM yyyy HH\':\'mm\':\'ss \'GMT\'","ShortDatePattern":"M/d/yyyy","ShortTimePattern":"h:mm tt","SortableDateTimePattern":"yyyy\'-\'MM\'-\'dd\'T\'HH\':\'mm\':\'ss","TimeSeparator":":","UniversalSortableDateTimePattern":"yyyy\'-\'MM\'-\'dd HH\':\'mm\':\'ss\'Z\'","YearMonthPattern":"MMMM, yyyy","AbbreviatedDayNames":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"ShortestDayNames":["Su","Mo","Tu","We","Th","Fr","Sa"],"DayNames":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"AbbreviatedMonthNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthNames":["January","February","March","April","May","June","July","August","September","October","November","December",""],"IsReadOnly":false,"NativeCalendarName":"Gregorian Calendar","AbbreviatedMonthGenitiveNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthGenitiveNames":["January","February","March","April","May","June","July","August","September","October","November","December",""]}}';
Sys.CultureInfo.CurrentCulture = Sys.CultureInfo._parse(__cultureInfo);
delete __cultureInfo;
Sys.UI.Behavior = function (b) { Sys.UI.Behavior.initializeBase(this); this._element = b; var a = b._behaviors; if (!a)
    b._behaviors = [this];
else
    a[a.length] = this; };
Sys.UI.Behavior.prototype = { _name: null, get_element: function () { return this._element; }, get_id: function () { var a = Sys.UI.Behavior.callBaseMethod(this, "get_id"); if (a)
        return a; if (!this._element || !this._element.id)
        return ""; return this._element.id + "$" + this.get_name(); }, get_name: function () { if (this._name)
        return this._name; var a = Object.getTypeName(this), b = a.lastIndexOf("."); if (b != -1)
        a = a.substr(b + 1); if (!this.get_isInitialized())
        this._name = a; return a; }, set_name: function (a) { this._name = a; }, initialize: function () { Sys.UI.Behavior.callBaseMethod(this, "initialize"); var a = this.get_name(); if (a)
        this._element[a] = this; }, dispose: function () { Sys.UI.Behavior.callBaseMethod(this, "dispose"); if (this._element) {
        var a = this.get_name();
        if (a)
            this._element[a] = null;
        Array.remove(this._element._behaviors, this);
        delete this._element;
    } } };
Sys.UI.Behavior.registerClass("Sys.UI.Behavior", Sys.Component);
Sys.UI.Behavior.getBehaviorByName = function (b, c) { var a = b[c]; return a && Sys.UI.Behavior.isInstanceOfType(a) ? a : null; };
Sys.UI.Behavior.getBehaviors = function (a) { if (!a._behaviors)
    return []; return Array.clone(a._behaviors); };
Sys.UI.Behavior.getBehaviorsByType = function (d, e) { var a = d._behaviors, c = []; if (a)
    for (var b = 0, f = a.length; b < f; b++)
        if (e.isInstanceOfType(a[b]))
            c[c.length] = a[b]; return c; };
Sys.UI.VisibilityMode = function () { throw Error.notImplemented(); };
Sys.UI.VisibilityMode.prototype = { hide: 0, collapse: 1 };
Sys.UI.VisibilityMode.registerEnum("Sys.UI.VisibilityMode");
Sys.UI.Control = function (a) { Sys.UI.Control.initializeBase(this); this._element = a; a.control = this; };
Sys.UI.Control.prototype = { _parent: null, _visibilityMode: Sys.UI.VisibilityMode.hide, get_element: function () { return this._element; }, get_id: function () { if (!this._element)
        return ""; return this._element.id; }, set_id: function () { throw Error.invalidOperation(Sys.Res.cantSetId); }, get_parent: function () { if (this._parent)
        return this._parent; if (!this._element)
        return null; var a = this._element.parentNode; while (a) {
        if (a.control)
            return a.control;
        a = a.parentNode;
    } return null; }, set_parent: function (a) { this._parent = a; }, get_visibilityMode: function () { return Sys.UI.DomElement.getVisibilityMode(this._element); }, set_visibilityMode: function (a) { Sys.UI.DomElement.setVisibilityMode(this._element, a); }, get_visible: function () { return Sys.UI.DomElement.getVisible(this._element); }, set_visible: function (a) { Sys.UI.DomElement.setVisible(this._element, a); }, addCssClass: function (a) { Sys.UI.DomElement.addCssClass(this._element, a); }, dispose: function () { Sys.UI.Control.callBaseMethod(this, "dispose"); if (this._element) {
        this._element.control = undefined;
        delete this._element;
    } if (this._parent)
        delete this._parent; }, onBubbleEvent: function () { return false; }, raiseBubbleEvent: function (b, c) { var a = this.get_parent(); while (a) {
        if (a.onBubbleEvent(b, c))
            return;
        a = a.get_parent();
    } }, removeCssClass: function (a) { Sys.UI.DomElement.removeCssClass(this._element, a); }, toggleCssClass: function (a) { Sys.UI.DomElement.toggleCssClass(this._element, a); } };
Sys.UI.Control.registerClass("Sys.UI.Control", Sys.Component);
Type.registerNamespace('Sys');
Sys.Res = { 'argumentInteger': 'Value must be an integer.', 'scriptLoadMultipleCallbacks': 'The script \'{0}\' contains multiple calls to Sys.Application.notifyScriptLoaded(). Only one is allowed.', 'invokeCalledTwice': 'Cannot call invoke more than once.', 'webServiceFailed': 'The server method \'{0}\' failed with the following error: {1}', 'webServiceInvalidJsonWrapper': 'The server method \'{0}\' returned invalid data. The \'d\' property is missing from the JSON wrapper.', 'argumentType': 'Object cannot be converted to the required type.', 'argumentNull': 'Value cannot be null.', 'controlCantSetId': 'The id property can\'t be set on a control.', 'formatBadFormatSpecifier': 'Format specifier was invalid.', 'webServiceFailedNoMsg': 'The server method \'{0}\' failed.', 'argumentDomElement': 'Value must be a DOM element.', 'invalidExecutorType': 'Could not create a valid Sys.Net.WebRequestExecutor from: {0}.', 'cannotCallBeforeResponse': 'Cannot call {0} when responseAvailable is false.', 'actualValue': 'Actual value was {0}.', 'enumInvalidValue': '\'{0}\' is not a valid value for enum {1}.', 'scriptLoadFailed': 'The script \'{0}\' could not be loaded.', 'parameterCount': 'Parameter count mismatch.', 'cannotDeserializeEmptyString': 'Cannot deserialize empty string.', 'formatInvalidString': 'Input string was not in a correct format.', 'invalidTimeout': 'Value must be greater than or equal to zero.', 'cannotAbortBeforeStart': 'Cannot abort when executor has not started.', 'argument': 'Value does not fall within the expected range.', 'cannotDeserializeInvalidJson': 'Cannot deserialize. The data does not correspond to valid JSON.', 'invalidHttpVerb': 'httpVerb cannot be set to an empty or null string.', 'nullWebRequest': 'Cannot call executeRequest with a null webRequest.', 'eventHandlerInvalid': 'Handler was not added through the Sys.UI.DomEvent.addHandler method.', 'cannotSerializeNonFiniteNumbers': 'Cannot serialize non finite numbers.', 'argumentUndefined': 'Value cannot be undefined.', 'webServiceInvalidReturnType': 'The server method \'{0}\' returned an invalid type. Expected type: {1}', 'servicePathNotSet': 'The path to the web service has not been set.', 'argumentTypeWithTypes': 'Object of type \'{0}\' cannot be converted to type \'{1}\'.', 'cannotCallOnceStarted': 'Cannot call {0} once started.', 'badBaseUrl1': 'Base URL does not contain ://.', 'badBaseUrl2': 'Base URL does not contain another /.', 'badBaseUrl3': 'Cannot find last / in base URL.', 'setExecutorAfterActive': 'Cannot set executor after it has become active.', 'paramName': 'Parameter name: {0}', 'cannotCallOutsideHandler': 'Cannot call {0} outside of a completed event handler.', 'cannotSerializeObjectWithCycle': 'Cannot serialize object with cyclic reference within child properties.', 'format': 'One of the identified items was in an invalid format.', 'assertFailedCaller': 'Assertion Failed: {0}\r\nat {1}', 'argumentOutOfRange': 'Specified argument was out of the range of valid values.', 'webServiceTimedOut': 'The server method \'{0}\' timed out.', 'notImplemented': 'The method or operation is not implemented.', 'assertFailed': 'Assertion Failed: {0}', 'invalidOperation': 'Operation is not valid due to the current state of the object.', 'breakIntoDebugger': '{0}\r\n\r\nBreak into debugger?' };
if (typeof (Sys) !== 'undefined')
    Sys.Application.notifyScriptLoaded();
