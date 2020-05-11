export interface ButtonProps {
    disabled?: boolean;
    icon?: string;
    iconStyle?: any;
    loading?: boolean;
    onPress?: () => void;
    style?: any;
    testID?: string;
    text?: string;
    textStyle?: any;
    tooltip?: string;
    type: 'primary' | 'secondary' | 'tertiary' | 'destructive';
}
export declare type ButtonContainerStyleProps = Pick<ButtonProps, 'disabled' | 'icon' | 'loading' | 'text' | 'type'> & {
    hasDisabledStyle?: boolean;
};
export declare type ButtonTextStyleProps = Pick<ButtonContainerStyleProps, 'hasDisabledStyle' | 'loading' | 'type'>;
