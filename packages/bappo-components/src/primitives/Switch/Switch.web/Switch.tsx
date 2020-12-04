import * as React from 'react';
import styled from 'styled-components';

import { DivViewBase } from '../../../internals/web/ViewBase';
import { SwitchProps } from '../types';

type Props = SwitchProps & {
  // Will be removed
  className?: string;
};

const Switch = React.forwardRef(
  (
    {
      accessibilityLabel,
      disabled = false,
      onBlur,
      onFocus,
      onValueChange,
      style,
      testID,
      value = false,
      className,
    }: Props,
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>();

    const [focus, setFocus] = React.useState(false);

    React.useImperativeHandle(ref, () => ({
      focus: () => {
        if (containerRef && containerRef.current) containerRef.current.focus();
      },
      blur: () => {
        if (containerRef && containerRef.current) containerRef.current.blur();
      },
    }));

    const _onBlur = (event: React.FocusEvent<HTMLDivElement>) => {
      setFocus(false);

      onBlur &&
        onBlur({
          nativeEvent: {
            value,
          },
        });
    };

    const _onFocus = (event: React.FocusEvent<HTMLDivElement>) => {
      setFocus(true);

      onFocus &&
        onFocus({
          nativeEvent: {
            value,
          },
        });
    };

    const _onKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const ENTER = 13;
      const SPACE = 32;

      if (event.which === ENTER || event.which === SPACE) {
        event.preventDefault();
        event.stopPropagation();
        _toggle();
      }
    };

    const _toggle = () => {
      !disabled && onValueChange && onValueChange(!value);
    };

    const props = {
      accessibilityLabel,
      onBlur: _onBlur,
      onClick: _toggle,
      onFocus: _onFocus,
      onKeyPress: _onKeyPress,
      testID,
    };

    const styleProps = {
      className,
      style,
      $value: !!value,
    };

    return (
      <SwitchContainer
        $hasFocus={focus}
        ref={containerRef as any}
        {...props}
        {...styleProps}
      >
        <Handle position={value ? 'right' : 'left'} />
      </SwitchContainer>
    );
  },
);

export default Switch;

const SwitchContainer = styled(DivViewBase).attrs<{ $value: boolean }>(
  ({ $value }) => ({
    'aria-checked': $value ? 'true' : 'false',
    role: 'checkbox',
    tabIndex: 0,
  }),
)<{ $value: boolean; $hasFocus: boolean }>`
  flex: none;
  outline: none;
  flex-direction: row;
  background-color: ${({ $value }) => ($value ? '#FF7800' : '#B0ADAB')};
  border-radius: 12px;
  cursor: pointer;
  height: 24px;
  width: 48px;
  border: 1px solid ${({ $hasFocus }) => ($hasFocus ? 'black' : 'transparent')};
`;

const Handle = styled(DivViewBase)<{ position: 'right' | 'left' }>`
  background-color: white;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  position: absolute;
  top: 1px;
  bottom: 1px;
  left: ${({ position }) => (position === 'left' ? 1 : 25)}px;
  transition: left 0.2s;
`;