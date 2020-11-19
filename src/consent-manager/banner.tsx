import React, { PureComponent } from 'react'
import styled from 'react-emotion'
import { DefaultButton, GreenButton } from './buttons'
import { CloseBehavior, CloseBehaviorFunction } from './container'

const Overlay = styled('div')`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: grid;
  place-items: center;
`

const Root = styled<{ backgroundColor: string; textColor: string }, 'div'>('div')`
  border-radius: 4px;
  margin: 8px;
  max-width: 500px;
  padding: 20px;
  background: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  font-size: 14px;
  line-height: 1.3;
`

const Content = styled('div')`
  a,
  button {
    display: inline;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    font: inherit;
    text-decoration: underline;
    cursor: pointer;
  }
  margin-bottom: 1em;
`

const P = styled('p')`
  margin: 0;
  &:not(:last-child) {
    margin-bottom: 6px;
  }
`

const Actions = styled('div')`
  text-align: right;
  @media screen and (max-width: 400px) {
    button {
      margin-top: 4px;
      float: right;
      clear: both;
    }
  }
`

interface Props {
  innerRef: (node: HTMLElement | null) => void
  onClose: (forceCloseBehaviour?: CloseBehavior | CloseBehaviorFunction) => void
  onChangePreferences: () => void
  content: React.ReactNode
  subContent: React.ReactNode
  backgroundColor: string
  textColor: string
}

export default class Banner extends PureComponent<Props> {
  static displayName = 'Banner'

  render() {
    const {
      innerRef,
      onClose,
      onChangePreferences,
      content,
      backgroundColor,
      textColor
    } = this.props

    return (
      <>
        <Overlay>
          <Root innerRef={innerRef} backgroundColor={backgroundColor} textColor={textColor}>
            <Content>
              <img
                src="https://lagrave.muchbetteradventures.com/seekr2/img/muchbetteradventures.svg"
                alt="Much Better Adventures Logo"
                height="32"
              />
              <h4>Cookies &amp; Your Privacy</h4>
              <P>{content}</P>
            </Content>
            <Actions>
              <DefaultButton
                type="button"
                title="Preferences"
                aria-label="Close"
                onClick={onChangePreferences}
              >
                Preferences
              </DefaultButton>
              <DefaultButton
                type="button"
                title="Reject"
                aria-label="Close"
                onClick={() => onClose(CloseBehavior.DENY)}
              >
                Reject All
              </DefaultButton>
              <GreenButton
                type="button"
                title="Accept"
                aria-label="Close"
                onClick={() => onClose(CloseBehavior.ACCEPT)}
              >
                Accept All
              </GreenButton>
            </Actions>
          </Root>
        </Overlay>
      </>
    )
  }
}
