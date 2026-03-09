import React, { PureComponent } from 'react'
import styled from 'react-emotion'
import { DefaultButton, TextButton } from './buttons'
import { CloseBehavior, CloseBehaviorFunction } from './container'
import fontStyles from './font-styles'
import { BannerMode } from '../types'

const BlockingOverlay = styled('div')`
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1250;
  display: grid;
  place-items: center;
  @media screen and (max-width: 600px) {
    place-items: end;
  }
`

const FloatingContainer = styled('div')`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1250;
  max-width: 400px;
  @media screen and (max-width: 600px) {
    bottom: 0;
    right: 0;
    left: 0;
    max-width: 100%;
  }
`

const Title = styled('h4')`
  margin-top: 0;
  margin-bottom: 0.7em;
  text-transform: uppercase;
`

const Root = styled<{ backgroundColor: string; textColor: string; floating?: boolean }, 'div'>(
  'div'
)`
  ${fontStyles}
  border-radius: ${props => (props.floating ? '8px' : '4px')};
  margin: ${props => (props.floating ? '0' : '8px')};
  max-width: ${props => (props.floating ? '100%' : '500px')};
  padding: 16px;
  background: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  font-size: 14px;
  line-height: 1.3;
  outline: none;
  box-shadow: ${props => (props.floating ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none')};
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 600px) {
    margin: 0;
    border-radius: ${props => (props.floating ? '8px 8px 0 0' : '0')};
  }
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
  margin-bottom: 0.7em;
`

const P = styled('p')`
  margin: 0;
  &:not(:last-child) {
    margin-bottom: 6px;
  }
`

const Actions = styled('div')`
  text-align: right;
  button.preferences {
    float: left;
    padding-left: 0;
    padding-right: 0;
    border-radius: 0;
    margin: 0;
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
  showRejectAll: boolean
  bannerMode: BannerMode
}

export default class Banner extends PureComponent<Props> {
  static displayName = 'Banner'

  componentDidMount() {
    // Only auto-focus in blocking mode to avoid interrupting browsing
    if (this.props.bannerMode === 'blocking') {
      const element = document.querySelector('[role="dialog"]')
      if (element instanceof HTMLElement) {
        element.focus()
      }
    }
  }

  render() {
    const {
      innerRef,
      onClose,
      onChangePreferences,
      content,
      backgroundColor,
      textColor,
      showRejectAll,
      bannerMode
    } = this.props

    const isFloating = bannerMode === 'floating'
    const Container = isFloating ? FloatingContainer : BlockingOverlay

    return (
      <Container>
        <Root
          innerRef={innerRef}
          backgroundColor={backgroundColor}
          textColor={textColor}
          floating={isFloating}
          role="dialog"
          aria-modal={!isFloating}
          tabIndex={-1}
        >
          <Content>
            <Title>Cookies &amp; Your Privacy</Title>
            <P>{content}</P>
          </Content>
          <Actions>
            <TextButton
              className="preferences"
              type="button"
              title="Preferences"
              aria-label="Close"
              tabIndex={0}
              onClick={onChangePreferences}
            >
              Manage
            </TextButton>
            {showRejectAll && (
              <DefaultButton
                type="button"
                title="Reject"
                aria-label="Close"
                tabIndex={0}
                onClick={() => onClose(CloseBehavior.DENY)}
              >
                Reject All
              </DefaultButton>
            )}
            <DefaultButton
              type="button"
              title="Accept"
              aria-label="Close"
              tabIndex={0}
              onClick={() => onClose(CloseBehavior.ACCEPT)}
            >
              Accept All
            </DefaultButton>
          </Actions>
        </Root>
      </Container>
    )
  }
}
