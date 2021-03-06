import React from 'react';

import IconText from './IconText';
import { GlyphMap, IconProps } from './types';

const createIcon = (
  fontFamily: string,
  fontFileName: string,
  glyphMap: GlyphMap,
) => {
  return function Icon({ className, name, style }: IconProps) {
    let glyph = glyphMap[name] || '?';
    if (typeof glyph === 'number') {
      glyph = String.fromCharCode(glyph);
    }

    const styleProps = {
      className,
      $fontFamilyValue: fontFamily,
      style,
    };

    return <IconText {...styleProps}>{glyph}</IconText>;
  };
};

export default createIcon;
