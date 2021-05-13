import { Component, createElement } from "react";
import { withNavigation, withNavigationFocus } from "react-navigation";

class NativeNavTrackerUnwrapped extends Component {
    constructor(props) {
        super(props);
        this.state = { shouldFireAction: false };
    }
    componentDidMount() {
        const { isFocused } = this.props;
        if (isFocused) {
            this.setState({
                shouldFireAction: true
            });
        }
    }
    componentDidUpdate(prevProps) {
        const { isFocused } = this.props;
        if (prevProps.isFocused !== isFocused && isFocused) {
            this.setState({
                shouldFireAction: true
            });
        } else if (this.state.shouldFireAction) {
            this._tryFireAction();
        }
    }

    render() {
        return null;
    }

    _tryFireAction() {
        const { navigation, onFocusAction, pageNameAttr } = this.props;
        if (
            onFocusAction &&
            onFocusAction.canExecute &&
            (!pageNameAttr || (pageNameAttr && pageNameAttr.status === "available"))
        ) {
            this.setState({
                shouldFireAction: false
            });
            if (pageNameAttr) {
                pageNameAttr.setValue(navigation.state.params.pageName);
            }
            onFocusAction.execute();
        }
    }
}

const NativeNavTracker = withNavigation(withNavigationFocus(NativeNavTrackerUnwrapped));
export { NativeNavTracker };
