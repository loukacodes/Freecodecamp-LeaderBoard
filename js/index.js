"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var names = undefined,
    avatar = undefined,
    recentPoint = undefined,
    allTimePoint = undefined,
    rank = undefined;

var url1 = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
var url2 = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";

var Camper = function (_React$Component) {
  _inherits(Camper, _React$Component);

  function Camper(props) {
    _classCallCheck(this, Camper);

    return _possibleConstructorReturn(this, _React$Component.call(this, props));
  }

  Camper.prototype.render = function render() {
    rank = this.props.data.map(function (x, i) {
      return i + 1;
    });
    avatar = this.props.data.map(function (x) {
      return x.img;
    });
    names = this.props.data.map(function (x) {
      return x.username;
    });
    recentPoint = this.props.data.map(function (x) {
      return x.recent;
    });
    allTimePoint = this.props.data.map(function (x) {
      return x.alltime;
    });
    return React.createElement(
      "tbody",
      null,
      rank.map(function (item, i) {
        return React.createElement(
          "tr",
          { key: i },
          React.createElement(
            "td",
            { className: "rank" },
            item
          ),
          React.createElement(
            "td",
            { className: "name" },
            React.createElement(
              "a",
              { href: "https://www.freecodecamp.com/" + names[i], target: "_blank" },
              React.createElement("img", { src: avatar[i], className: "avatar" }),
              React.createElement(
                "p",
                null,
                names[i]
              )
            )
          ),
          React.createElement(
            "td",
            { className: "recent" },
            recentPoint[i]
          ),
          React.createElement(
            "td",
            { className: "alltime" },
            allTimePoint[i]
          )
        );
      })
    );
  };

  return Camper;
}(React.Component);

var LeaderBoard = function (_React$Component2) {
  _inherits(LeaderBoard, _React$Component2);

  function LeaderBoard(props) {
    _classCallCheck(this, LeaderBoard);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.state = {
      data: [],
      url: url1
    };
    _this2.thirtyDayBoard = _this2.thirtyDayBoard.bind(_this2);
    _this2.alltimeBoard = _this2.alltimeBoard.bind(_this2);
    _this2.loadData = _this2.loadData.bind(_this2);
    return _this2;
  }

  LeaderBoard.prototype.thirtyDayBoard = function thirtyDayBoard() {
    this.setState({
      url: url1
    }, this.loadData);
  };

  LeaderBoard.prototype.alltimeBoard = function alltimeBoard() {
    this.setState({
      url: url2
    }, this.loadData);
  };

  LeaderBoard.prototype.loadData = function loadData() {
    $.ajax({
      url: this.state.url,
      dataType: 'json',
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('#GET Error', status, err.toString());
      }.bind(this)
    });
  };

  LeaderBoard.prototype.componentDidMount = function componentDidMount() {
    this.loadData();
  };

  LeaderBoard.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "LeaderBoard"
      ),
      React.createElement("div", null),
      React.createElement(
        "table",
        null,
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement(
              "th",
              null,
              "Rank"
            ),
            React.createElement(
              "th",
              null,
              "Camper Name"
            ),
            React.createElement(
              "th",
              { onClick: this.thirtyDayBoard },
              "Points in past 30 days"
            ),
            React.createElement(
              "th",
              { onClick: this.alltimeBoard },
              "All time points"
            )
          )
        ),
        React.createElement(Camper, { data: this.state.data })
      )
    );
  };

  return LeaderBoard;
}(React.Component);

ReactDOM.render(React.createElement(LeaderBoard, null), document.getElementById('react'));