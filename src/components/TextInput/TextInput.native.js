// @flow

import * as React from 'react';
import styled from 'styled-components/native';
import type {
  BlurEvent,
  FocusEvent,
} from '../../events.js.flow';

type Props = {
  /**
   * If true, focuses the input on componentDidMount. The default value is false.
   */
  autoFocus: ?boolean,
  /**
   * Provides an initial value that will change when the user starts typing. Useful for simple
   * use-cases where you do not want to deal with listening to events and updating the value prop to
   * keep the controlled state in sync.
   */
  defaultValue?: string,
  /**
   * Limits the maximum number of characters that can be entered.
   */
  maxLength?: number,
  /**
   * If true, the text input can be multiple lines. The default value is false.
   */
  multiline: ?boolean,
  /**
   * Callback that is called when the text input is blurred.
   */
  onBlur?: ?(event: BlurEvent) => void,
  /**
   * Callback that is called when the text input is focused.
   */
  onFocus?: ?(event: FocusEvent) => void,
  /**
   * Callback that is called when the text input's text changes. Changed text is passed as an
   * argument to the callback handler.
   */
  onValueChange?: ?(value: string) => void,
  /**
   * The string that will be rendered before text input has been entered.
   */
  placeholder: string,
  /**
   * If true, text is not editable. The default value is false.
   */
  readOnly: ?boolean,
  // TODO
  style?: any,
  /**
   * Input type. Only works with `multiline={false}`.
   */
  type: 'email' | 'password' | 'text',
  /**
   * The value to show for the text input. TextInput is a controlled component, which means the
   * native value will be forced to match this value prop if provided.
   */
  value?: string,
};

class TextInput extends React.Component<Props> {
  static defaultProps = {
    autoFocus: false,
    multiline: false,
    placeholder: '',
    readOnly: false,
    type: 'text',
  };

  static displayName = 'TextInput';

  props: Props;

  blur = () => {
    this._input && this._input.blur();
  };

  clear = () => {
    this._input && this._input.clear();
  };

  focus = () => {
    this._input && this._input.focus();
  };

  render() {
    const {
      autoFocus,
      defaultValue,
      maxLength,
      multiline,
      onValueChange,
      placeholder,
      readOnly,
      style,
      type,
      value,
    } = this.props;

    const props: Object = {
      autoFocus,
      defaultValue,
      editable: !readOnly,
      innerRef: this._captureInputRef,
      maxLength,
      multiline,
      onChangeText: onValueChange,
      onEndEditing: this._createBlurEventHandler(),
      onFocus: this._createFocusEventHandler(),
      placeholder,
      style,
      value,
      underlineColorAndroid: 'rgba(0, 0, 0, 0)',
    };

    // type specific props
    switch (type) {
      case 'email':
        Object.assign(props, {
          autoCapitalize: 'none',
          autoCorrect: false,
          keyboardType: 'email-address',
        });
        break;
      case 'password':
        Object.assign(props, {
          autoCapitalize: 'none',
          autoCorrect: false,
          secureTextEntry: true,
        });
        break;
      default:
        break;
    }

    return (
      <StyledTextInput
        {...props}
      />
    );
  }

  _input = (null: any);

  _captureInputRef = (ref) => {
    this._input = ref;
  };

  _createBlurEventHandler = () => {
    const {
      onBlur,
    } = this.props;

    if (onBlur) {
      return (event) => {
        // eslint-disable-next-line no-param-reassign
        event.nativeEvent = {
          text: event.nativeEvent.text,
        };
        onBlur(event);
      };
    }
    return onBlur;
  };

  _createFocusEventHandler = () => {
    const {
      onFocus,
    } = this.props;

    if (onFocus) {
      return (event) => {
        // eslint-disable-next-line no-param-reassign
        event.nativeEvent = {
          text: event.nativeEvent.text,
        };
        onFocus(event);
      };
    }
    return onFocus;
  };
}

export default TextInput;

const StyledTextInput = styled.TextInput`
  font-size: 14px;
  height: ${({ multiline }) => (multiline ? '36' : '18')}px;
  margin: 0;
  padding: 0;
`;
