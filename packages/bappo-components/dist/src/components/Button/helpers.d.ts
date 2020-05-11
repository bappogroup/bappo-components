import { ButtonContainerStyleProps } from './types';
export declare const getFocusedBackgroundColor: ({ type, }: Pick<ButtonContainerStyleProps, "type">) => string;
export declare const getBackgroundColor: ({ hasDisabledStyle, loading, type, }: Pick<ButtonContainerStyleProps, "type" | "loading" | "hasDisabledStyle">) => string;
export declare const getFocusedBorderColor: ({ type, }: Pick<ButtonContainerStyleProps, "type">) => string;
export declare const getBorderColor: ({ hasDisabledStyle, loading, type, }: Pick<ButtonContainerStyleProps, "type" | "loading" | "hasDisabledStyle">) => string;
export declare const getTextColor: ({ hasDisabledStyle, type, }: Pick<ButtonContainerStyleProps, "type" | "hasDisabledStyle">) => string;
export declare const getFocusedTextColor: ({ hasDisabledStyle, type, }: Pick<ButtonContainerStyleProps, "type" | "hasDisabledStyle">) => string;
export declare const getActiveBackgroundColor: ({ type, }: Pick<ButtonContainerStyleProps, "type">) => string;
export declare const getActiveBorderColor: ({ type, }: Pick<ButtonContainerStyleProps, "type">) => string;
export declare const getActiveTextColor: ({ type, }: Pick<ButtonContainerStyleProps, "type">) => string;
