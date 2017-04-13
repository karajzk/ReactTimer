var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({
    getInitialState: function () {
        return {count: 0, countdownStatus: 'stopped'};
    },
    componentWillUnmount: function () {
        clearInterval(this.timer);
        this.timer = undefined;

    },
    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.countdownStatus !== prevState.countdownStatus) {
            switch (this.state.countdownStatus) {
                case 'started':
                    this.timer = setInterval(() => {
                        var newCount = this.state.count + 1;
                        this.setState({count: newCount});
                    }, 1000);
                    break;
                case 'stopped':
                    this.setState({count: 0});
                case 'paused':
                    clearInterval(this.timer);
                    this.timer = undefined;
                    break;
            }
        }

    },
    handleStatuschange(newStatus) {
        this.setState({countdownStatus: newStatus});
    },
    render: function () {
        var {count, countdownStatus} = this.state;
        var renderControls = () => {
            return <Controls
                countdownStatus={countdownStatus}
                onStatusChange={this.handleStatuschange}/>;
        };
        return (
            <div>
                <h1 className="page-title">Timer App</h1>
                <Clock totalSeconds={count}/> {renderControls()}
            </div>
        );
    }
});

module.exports = Timer;