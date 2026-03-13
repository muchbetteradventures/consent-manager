import styled, { css, injectGlobal } from 'react-emotion'
import fontStyles from './font-styles'

// Inject Rubik font from Google Fonts
injectGlobal`
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap');
`

const baseStyles = css`
  ${fontStyles};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;
  text-transform: none;
  margin-left: 8px;
  transition: background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
`

// Primary button - MBA Green variant
// Used for Accept All and Save actions
// Figma: bg #a0cc3d, text #2a2d2c, padding 14px 16px, font 500/18px, border-radius 4px
export const PrimaryButton = styled('button')`
  ${baseStyles};
  background-color: #a0cc3d;
  color: #2a2d2c;
  padding: 14px 16px;
  font-size: 18px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.36px;
  &:hover {
    opacity: 0.9;
  }
  &:focus {
    outline: 2px solid #a0cc3d;
    outline-offset: 2px;
  }
`

// Secondary button - outlined style with lime border
// Used for Reject All action
// Figma: bg #f4f4f4, border #a0cc3d, text #2a2d2c, padding 14px 16px, font 500/18px
export const SecondaryButton = styled('button')`
  ${baseStyles};
  background-color: #f4f4f4;
  color: #2a2d2c;
  border: 1px solid #a0cc3d;
  padding: 14px 16px;
  font-size: 18px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.36px;
  &:hover {
    background-color: #e8e8e8;
  }
  &:focus {
    outline: 2px solid #a0cc3d;
    outline-offset: 2px;
  }
`

// Tertiary button - text only, no border
// Used for Manage preferences action
// Figma: no bg, text #2a2d2c, padding 14px 16px, font 700/12px
export const TertiaryButton = styled('button')`
  ${baseStyles};
  background-color: transparent;
  color: #2a2d2c;
  padding: 14px 16px;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: -0.24px;
  margin-left: 0;
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    outline: 2px solid #2a2d2c;
    outline-offset: 2px;
  }
`
