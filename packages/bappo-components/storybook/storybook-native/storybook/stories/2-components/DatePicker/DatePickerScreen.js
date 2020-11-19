import React from 'react';

import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  WebLink,
  storiesOf,
} from '../../../ui-explorer';
import { url } from '../../../url';
import Minimal from './examples/Minimal';
import PropModal from './examples/PropModal';

const DatePickerScreen = () => (
  <UIExplorer title="DatePicker" url="2-components/DatePicker">
    <WebLink href={`${url}/src/components/DatePicker`} text="Source Code" />

    <Description>
      <AppText>DatePicker is an input that lets you pick a date.</AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="accessibilityLabel?"
        typeInfo="string"
        description="Same as View"
      />

      <DocItem
        name="autoFocus?"
        typeInfo="boolean = false"
        description={
          <AppText>
            If <Code>true</Code>, focuses the input on{' '}
            <Code>componentDidMount</Code>.
          </AppText>
        }
      />

      <DocItem
        name="clearable?"
        typeInfo="boolean = true"
        description={
          <AppText>
            If <Code>true</Code>, the input value can be cleared by pressing a
            button.
          </AppText>
        }
      />

      <DocItem
        name="displayFormat?"
        typeInfo="string = 'YYYY-MM-DD'"
        description={<AppText>Date format of the displayed value.</AppText>}
      />

      <DocItem
        name="onBlur?"
        typeInfo="() => void"
        description="Callback that is called when the input is blurred."
      />

      <DocItem
        name="onFocus?"
        typeInfo="() => void"
        description="Callback that is called when the input is focused."
      />

      <DocItem
        name="onValueChange?"
        typeInfo="(value: Value) => void"
        description="Callback that is called when the input value changes."
      />

      <DocItem
        name="placeholder?"
        typeInfo="string"
        description="The string that will be rendered when there is no value."
      />

      <DocItem
        name="readOnly?"
        typeInfo="boolean = false"
        description={
          <AppText>
            If <Code>true</Code>, the input is not editable.
          </AppText>
        }
      />

      <DocItem
        name="renderDropdownIcon?"
        typeInfo="() => ?React.Element<any>"
        description="Function to render the dropdown icon."
      />

      <DocItem name="style?" typeInfo="style" description="Same as View" />

      <DocItem name="testID?" typeInfo="string" description="Same as View" />

      <DocItem
        name="value?"
        typeInfo="Value"
        description="The value of the date input."
      />

      <DocItem
        name="valueFormat?"
        typeInfo="string = 'YYYY-MM-DD'"
        description={<AppText>Date format of the input value.</AppText>}
      />
      <DocItem
        name="alignRight?"
        typeInfo="string = 0"
        description={
          <AppText>
            Specifying the horizontal position of the calendar box.
          </AppText>
        }
      />
      <DocItem
        name="textColor?"
        typeInfo="string"
        description={<AppText>Specifying the input text color.</AppText>}
      />

      <DocItem
        name="modal?"
        typeInfo="boolean"
        description="Whether to use a modal for the dropdown menu. Use it when the dropdown menu gets cut off due to parent overflow settings. Defaults to false."
        example={{
          render: () => <PropModal />,
        }}
      />
    </Section>

    <Section title="More examples">
      <DocItem
        description="Minimal"
        example={{
          render: () => <Minimal />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('DatePicker', DatePickerScreen);
