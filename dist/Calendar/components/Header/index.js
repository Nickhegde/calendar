"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Header;

var _react = _interopRequireDefault(require("react"));

var _dateFns = require("date-fns");

var _consts = require("lib/consts");

var _images = require("lib/assets/images");

require("./Header.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Header(_ref) {
  var _ref$currentDate = _ref.currentDate,
      currentDate = _ref$currentDate.currentDate,
      setCurrentDate = _ref$currentDate.setCurrentDate,
      _ref$selectDate = _ref.selectDate,
      selectedDate = _ref$selectDate.selectedDate,
      setSelectedDate = _ref$selectDate.setSelectedDate,
      _ref$check = _ref.check,
      nextMonthCheck = _ref$check.nextMonthCheck,
      prevMonthCheck = _ref$check.prevMonthCheck,
      themeColor = _ref.themeColor;

  var prevMonth = function prevMonth() {
    setSelectedDate((0, _dateFns.endOfMonth)((0, _dateFns.subMonths)(selectedDate, 1)));
  };

  var nextMonth = function nextMonth() {
    setSelectedDate((0, _dateFns.startOfMonth)((0, _dateFns.addMonths)(selectedDate, 1)));
  };

  var month = (0, _dateFns.format)(selectedDate, _consts.STRINGS.MONTH_YEAR_FORMAT);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "header-container flex-container",
    style: {
      backgroundColor: themeColor
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "left-arrow ".concat(prevMonthCheck ? 'disabled' : ''),
    onClick: prevMonthCheck ? function () {} : prevMonth,
    tabIndex: "0",
    "aria-label": _consts.ARIALABELS.PREV_MONTH_BTN
  }, /*#__PURE__*/_react.default.createElement(_images.LeftArrow, null)), /*#__PURE__*/_react.default.createElement("div", {
    className: "month-year-display",
    tabIndex: "0",
    "aria-label": month
  }, /*#__PURE__*/_react.default.createElement("span", null, month)), /*#__PURE__*/_react.default.createElement("button", {
    className: "right-arrow ".concat(nextMonthCheck ? 'disabled' : ''),
    onClick: nextMonthCheck ? function () {} : nextMonth,
    tabIndex: "0",
    "aria-label": _consts.ARIALABELS.NEXT_MONTH_BTN
  }, /*#__PURE__*/_react.default.createElement(_images.RightArrow, null)));
}