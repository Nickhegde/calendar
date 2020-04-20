"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Cells;

var _react = _interopRequireWildcard(require("react"));

var _dateFns = require("date-fns");

var _consts = require("lib/consts");

require("./Cells.scss");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Cells(_ref) {
  var _ref$currentDate = _ref.currentDate,
      currentDate = _ref$currentDate.currentDate,
      setCurrentDate = _ref$currentDate.setCurrentDate,
      _ref$selectDate = _ref.selectDate,
      selectedDate = _ref$selectDate.selectedDate,
      setSelectedDate = _ref$selectDate.setSelectedDate,
      _ref$check = _ref.check,
      blockPast = _ref$check.blockPast,
      blockFuture = _ref$check.blockFuture,
      _ref$monthCheck = _ref.monthCheck,
      nextMonthCheck = _ref$monthCheck.nextMonthCheck,
      prevMonthCheck = _ref$monthCheck.prevMonthCheck,
      themeColor = _ref.themeColor,
      onDateChange = _ref.onDateChange;
  (0, _react.useEffect)(function () {
    var newId = "day-".concat((0, _dateFns.format)(selectedDate, _consts.STRINGS.MONTH_FORMAT), "-").concat((0, _dateFns.format)(selectedDate, _consts.STRINGS.DATE_FORMAT));
    document.getElementById(newId).focus();
  }, [selectedDate, currentDate]);

  var onDateClick = function onDateClick(cloneDay) {
    setSelectedDate(cloneDay);
    onDateChange(cloneDay);
  };

  var onArrowKeyPress = function onArrowKeyPress(e, date) {
    var key = e.keyCode,
        id = e.target.id,
        idArray = id.split('-');
    var nextId, element, newDate;

    switch (key) {
      case 9:
        e.preventDefault();
        return;

      case 37:
        newDate = (0, _dateFns.subDays)(selectedDate, 1);
        if (!(0, _dateFns.isSameMonth)(newDate, selectedDate) && prevMonthCheck) return;
        nextId = Number(idArray[2]) - 1;
        break;

      case 38:
        newDate = (0, _dateFns.subDays)(selectedDate, 7);
        if (!(0, _dateFns.isSameMonth)(newDate, selectedDate) && prevMonthCheck) return;
        nextId = Number(idArray[2]) - 7;
        break;

      case 39:
        newDate = (0, _dateFns.addDays)(selectedDate, 1);
        if (!(0, _dateFns.isSameMonth)(newDate, selectedDate) && nextMonthCheck) return;
        nextId = Number(idArray[2]) + 1;
        break;

      case 40:
        newDate = (0, _dateFns.addDays)(selectedDate, 7);
        if (!(0, _dateFns.isSameMonth)(newDate, selectedDate) && nextMonthCheck) return;
        nextId = Number(idArray[2]) + 7;
        break;

      default:
        return;
    }

    if (37 <= key <= 40) {
      element = document.getElementById("".concat(idArray[0], "-").concat(idArray[1], "-").concat(nextId));
      if (element && element.classList.contains('disabled')) return;
      setSelectedDate(newDate);
    }
  };

  var cells = function cells() {
    var monthStart = (0, _dateFns.startOfMonth)(selectedDate);
    var monthEnd = (0, _dateFns.endOfMonth)(monthStart);
    var startDate = (0, _dateFns.startOfWeek)(monthStart);
    var endDate = (0, _dateFns.endOfWeek)(monthEnd);
    var rows = [];
    var days = [];
    var day = startDate;
    var formattedDate = '';

    while (day <= endDate) {
      var _loop = function _loop(i) {
        formattedDate = (0, _dateFns.format)(day, _consts.STRINGS.DATE_FORMAT);
        var cloneDay = day;
        var disableFuture = blockFuture && (0, _dateFns.isAfter)(new Date(cloneDay), blockFuture) && !(0, _dateFns.isToday)(new Date(cloneDay)),
            disablePast = (0, _dateFns.isBefore)(new Date(cloneDay), blockPast) && !(0, _dateFns.isToday)(new Date(cloneDay));
        days.push( /*#__PURE__*/_react.default.createElement("button", {
          className: "day-cell ".concat(disableFuture || disablePast ? 'disabled' : (0, _dateFns.isSameDay)(day, selectedDate) ? 'selected' : '', " ").concat((0, _dateFns.format)(selectedDate, _consts.STRINGS.COMPARE_DATE_FORMAT) === (0, _dateFns.format)(cloneDay, _consts.STRINGS.COMPARE_DATE_FORMAT) ? 'focus' : '', "\n                ").concat((0, _dateFns.format)(currentDate, _consts.STRINGS.COMPARE_DATE_FORMAT) === (0, _dateFns.format)(cloneDay, _consts.STRINGS.COMPARE_DATE_FORMAT) ? 'highlight-date' : '', "\n                "),
          style: {
            backgroundColor: "".concat((0, _dateFns.format)(selectedDate, _consts.STRINGS.COMPARE_DATE_FORMAT) === (0, _dateFns.format)(cloneDay, _consts.STRINGS.COMPARE_DATE_FORMAT) ? themeColor : '')
          },
          key: day,
          id: "day-".concat((0, _dateFns.format)(day, _consts.STRINGS.MONTH_FORMAT), "-").concat(formattedDate),
          onClick: disableFuture || disablePast ? function () {} : function () {
            return onDateClick(cloneDay);
          },
          onKeyDown: function onKeyDown(e, cloneDay) {
            onArrowKeyPress(e, cloneDay);
          },
          "aria-label": (0, _dateFns.format)(day, _consts.STRINGS.ARIA_LABEL_DATE_FORMAT)
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "date",
          id: "date-".concat(formattedDate)
        }, formattedDate >= 10 ? formattedDate : "0".concat(formattedDate))));
        day = (0, _dateFns.addDays)(day, 1);
      };

      for (var i = 0; i < 7; i++) {
        _loop(i);
      }

      rows.push( /*#__PURE__*/_react.default.createElement("div", {
        className: "week-row flex-container",
        key: day
      }, " ", days, " "));
      days = [];
    }

    return rows;
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "cell-container",
    tabIndex: "0",
    role: "application"
  }, cells().map(function (week, index) {
    return week;
  }));
}