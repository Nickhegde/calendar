"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Days;

var _react = _interopRequireDefault(require("react"));

var _dateFns = require("date-fns");

var _consts = require("lib/consts");

require("./Days.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Days(_ref) {
  var _ref$currentDate = _ref.currentDate,
      currentDate = _ref$currentDate.currentDate,
      setCurrentDate = _ref$currentDate.setCurrentDate,
      _ref$selectDate = _ref.selectDate,
      selectedDate = _ref$selectDate.selectedDate,
      setSelectedDate = _ref$selectDate.setSelectedDate,
      _ref$themeColor = _ref.themeColor,
      themeColor = _ref$themeColor === void 0 ? {
    themeColor: themeColor
  } : _ref$themeColor;

  var getDays = function getDays() {
    var days = [];
    var startDate = (0, _dateFns.startOfWeek)(currentDate);

    for (var i = 0; i < 7; i++) {
      days.push( /*#__PURE__*/_react.default.createElement("div", {
        className: "week-days",
        key: i,
        id: "day-".concat(i)
      }, (0, _dateFns.format)((0, _dateFns.addDays)(startDate, i), _consts.STRINGS.DAY_FORMAT)));
    }

    return days;
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "days-container flex-container",
    style: {
      backgroundColor: themeColor
    }
  }, getDays().map(function (day) {
    return day;
  }));
}