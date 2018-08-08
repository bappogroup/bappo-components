// @flow

import * as React from 'react';
import styled from 'styled-components';
import type { ViewLayoutEvent } from '../../../events.js.flow';
import ViewBase from '../../../internals/web/ViewBase';
import Overlay from '../../../primitives/Overlay';
import type { ModalProps } from '../types.js.flow';

type Props = ModalProps;
type State = {
  modalContentLayout: null | {
    height: number,
    width: number,
  },
  overlayLayout: null | {
    height: number,
    width: number,
  },
};

class Modal extends React.Component<Props, State> {
  props: Props;

  state = {
    modalContentLayout: null,
    overlayLayout: null,
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props.visible && !prevProps.visible) {
      this._focusContent();
    }
  }

  render() {
    const { children, onRequestClose, visible } = this.props;

    return (
      <Overlay
        onLayout={this._onOverlayLayout}
        onPress={onRequestClose}
        visible={visible}
      >
        <ModalContentContainer
          innerRef={this._modalContentContainerRef}
          layout={this.state.modalContentLayout}
          onLayout={this._onModalContentLayout}
          windowDimensions={this.state.overlayLayout}
        >
          {children}
        </ModalContentContainer>
      </Overlay>
    );
  }

  _modalContentContainerRef = React.createRef();

  _focusContent() {
    this._modalContentContainerRef.current &&
      this._modalContentContainerRef.current.focus();
  }

  _onModalContentLayout = (event: ViewLayoutEvent) => {
    this.setState({ modalContentLayout: event.nativeEvent.layout });
  };

  _onOverlayLayout = (event: ViewLayoutEvent) => {
    this.setState({ overlayLayout: event.nativeEvent.layout });
  };
}

export default Modal;

export const ModalContentContainer = styled(ViewBase).attrs({
  tabIndex: -1,
})`
  background-color: white;
  position: absolute;
  left: 0;
  right: 0;
  border-radius: 4px;
  overflow: hidden;

  &:focus {
    outline: none;
  }

  @media (max-width: 576px) {
    top: 0;
    bottom: 0;
  }

  @media (min-width: 577px) {
    margin: auto;
    max-height: 768px;
    min-height: 384px;
    width: 576px;
    ${({ layout, windowDimensions }) =>
      layout && windowDimensions
        ? `
      top: ${(windowDimensions.height - layout.height) / 2}px;
    `
        : `
      visibility: hidden;
    `};
  }
`;
