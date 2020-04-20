"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Calendar;

var _react = _interopRequireWildcard(require("react"));

var _dateFns = require("date-fns");

var _components = require("./components");

var _consts = require("lib/consts");

require("./Calendar.scss");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Calendar(_ref) {
  var dates = _ref.dates,
      themeColor = _ref.themeColor,
      onDateChange = _ref.onDateChange;

  var _useState = (0, _react.useState)(new Date()),
      _useState2 = _slicedToArray(_useState, 2),
      currentDate = _useState2[0],
      setCurrentDate = _useState2[1],
      _useState3 = (0, _react.useState)(dates.selectedDate),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedDate = _useState4[0],
      setSelectedDate = _useState4[1];

  var nextMonthCheck, prevMonthCheck, blockPast, blockFuture;

  if (dates.min) {
    prevMonthCheck = (0, _dateFns.format)(selectedDate, _consts.STRINGS.MONTH_YEAR_FORMAT) === (0, _dateFns.format)(new Date(dates.min), _consts.STRINGS.MONTH_YEAR_FORMAT);
    blockPast = new Date(dates.min);
  } else {
    prevMonthCheck = (0, _dateFns.format)(selectedDate, _consts.STRINGS.MONTH_YEAR_FORMAT) === (0, _dateFns.format)(currentDate, _consts.STRINGS.MONTH_YEAR_FORMAT);
    blockPast = currentDate;
  }

  if (dates.max) {
    nextMonthCheck = (0, _dateFns.format)(selectedDate, _consts.STRINGS.MONTH_YEAR_FORMAT) === (0, _dateFns.format)(new Date(dates.max), _consts.STRINGS.MONTH_YEAR_FORMAT);
    blockFuture = new Date(dates.max);
  } else {
    nextMonthCheck = false;
    blockFuture = '';
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "calendar-container"
  }, /*#__PURE__*/_react.default.createElement(_components.Header, {
    currentDate: {
      currentDate: currentDate,
      setCurrentDate: setCurrentDate
    },
    selectDate: {
      selectedDate: selectedDate,
      setSelectedDate: setSelectedDate
    },
    check: {
      nextMonthCheck: nextMonthCheck,
      prevMonthCheck: prevMonthCheck
    },
    themeColor: themeColor
  }), /*#__PURE__*/_react.default.createElement(_components.Days, {
    currentDate: {
      currentDate: currentDate,
      setCurrentDate: setCurrentDate
    },
    selectDate: {
      selectedDate: selectedDate,
      setSelectedDate: setSelectedDate
    },
    themeColor: themeColor
  }), /*#__PURE__*/_react.default.createElement(_components.Cells, {
    currentDate: {
      currentDate: currentDate,
      setCurrentDate: setCurrentDate
    },
    selectDate: {
      selectedDate: selectedDate,
      setSelectedDate: setSelectedDate
    },
    check: {
      blockPast: blockPast,
      blockFuture: blockFuture
    },
    monthCheck: {
      nextMonthCheck: nextMonthCheck,
      prevMonthCheck: prevMonthCheck
    },
    themeColor: themeColor,
    onDateChange: onDateChange
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "calendar-triangle"
  }));
}