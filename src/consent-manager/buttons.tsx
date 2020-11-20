import styled, { css } from 'react-emotion'

const baseStyles = css`
  border: none;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  outline: none;
  padding: 6px 16px;
  font-size: 14px;
  min-width: 64px;
  box-sizing: border-box;
  font-weight: 700;
  line-height: 1.75;
  border-radius: 4px;
  border: 0;
  text-transform: none;
  color: white;
  background-color: #98be42;
  margin-left: 4px;
`

export const DefaultButton = styled('button')`
  ${baseStyles};
  color: #428bca;
  border: 1px solid rgba(66, 139, 202, 0.5);
  background-color: #fff;
  margin-left: 4px;
`

export const TextButton = styled('button')`
  ${baseStyles};
  color: #428bca;
  background-color: #fff;
  border: none;
  margin-left: 4px;
`

export const GreenButton = styled('button')`
  ${baseStyles};
  background-color: #98be42;
  color: #fff;
`

export const RedButton = styled('button')`
  ${baseStyles};
  background-color: #98be42;
`
