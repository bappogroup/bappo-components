// @flow

import * as React from 'react';
import { throttle } from 'lodash';
import styled from 'styled-components';
import View from '../View';

type Props = {
  children?: React.Node,
  className?: string,
  /**
   * Fires at most once per frame during scrolling. The frequency of the events can be controlled
   * using the scrollEventThrottle prop.
   */
  onScroll?: ?({ x: number, y: number }) => void,
  /**
   * This controls how often the scroll event will be fired while scrolling (as a time interval in
   * ms). A lower number yields better accuracy for code that is tracking the scroll position, but
   * can lead to scroll performance problems due to the volume of information being send over the
   * bridge. You will not notice a difference between values set between 1-16 as the JS run loop is
   * synced to the screen refresh rate. If you do not need precise scroll position tracking, set
   * this value higher to limit the information being sent across the bridge. The default value is
   * zero, which results in the scroll event being sent only once each time the view is scrolled.
   */
  scrollEventThrottle?: number,
  // TODO
  style?: any,
};

class ScrollView extends React.Component<Props> {
  props: Props;

  scrollTo = (options: { x?: number, y?: number }) => {
    const { x, y } = options;

    if (this._scrollableNode) {
      if (typeof x === 'number') {
        this._scrollableNode.scrollLeft = x;
      }
      if (typeof y === 'number') {
        this._scrollableNode.scrollTop = y;
      }
    }
  };

  scrollToEnd = () => {
    if (this._scrollableNode) {
      this._scrollableNode.scrollTop = this._scrollableNode.scrollHeight;
    }
  };

  static defaultProps = {
    scrollEventThrottle: 16, // Fire at 60fps
  };

  static displayName = 'ScrollView';

  render() {
    const {
      children,
      className,
      style,
    } = this.props;

    const styleProps = {
      className,
      style,
    };

    return (
      <Div
        {...styleProps}
        innerRef={this._captureScrollableNodeRef}
        onScroll={this._onScroll}
      >
        <View>
          {children}
        </View>
      </Div>
    );
  }

  _scrollableNode: ?HTMLDivElement;

  _captureScrollableNodeRef = (ref) => {
    this._scrollableNode = ref;
  };

  _onScroll = throttle((event: SyntheticWheelEvent<HTMLDivElement>) => {
    const { onScroll } = this.props;

    onScroll && onScroll({
      x: event.currentTarget.scrollLeft,
      y: event.currentTarget.scrollTop,
    });
  }, this.props.scrollEventThrottle);
}

export default ScrollView;

const Div = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transform: translateZ(0);
`;
