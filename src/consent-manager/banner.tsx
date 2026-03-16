import React, { PureComponent } from 'react'
import styled from 'react-emotion'
import { PrimaryButton, SecondaryButton, TertiaryButton } from './buttons'
import { CloseBehavior, CloseBehaviorFunction } from './container'
import fontStyles from './font-styles'

const Overlay = styled('div')`
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1250;
  display: grid;
  place-items: center;
`

const Title = styled('h4')`
  margin-top: 0;
  margin-bottom: 0.7em;
  text-transform: uppercase;
`

const Root = styled<{ backgroundColor: string; textColor: string }, 'div'>('div')`
  ${fontStyles}
  border-radius: 4px;
  margin: 8px;
  max-width: 500px;
  padding: 16px;
  background: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  font-size: 14px;
  line-height: 1.3;
  outline: none;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 600px) {
    margin: 16px;
    max-width: calc(100% - 32px);
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

const PolicyLinkContainer = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
`

const PolicyLink = styled('a')`
  display: block;
  margin-top: 10px;
  font-size: 12px;
  text-align: left;
  color: inherit;
  opacity: 0.8;
  text-decoration: underline;
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
  privacyPolicyLinkHref: string
  privacyPolicyLinkText?: string
  cookiePolicyLinkHref: string
  cookiePolicyLinkText?: string
}

export default class Banner extends PureComponent<Props> {
  static displayName = 'Banner'

  componentDidMount() {
    const element = document.querySelector('[role="dialog"]')
    if (element instanceof HTMLElement) {
      element.focus()
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
      privacyPolicyLinkHref,
      privacyPolicyLinkText,
      cookiePolicyLinkHref,
      cookiePolicyLinkText
    } = this.props

    return (
      <Overlay>
        <Root
          innerRef={innerRef}
          backgroundColor={backgroundColor}
          textColor={textColor}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          <Content>
            <Title>Cookies &amp; Your Privacy</Title>
            <P>{content}</P>
          </Content>
          <Actions>
            <TertiaryButton
              className="preferences"
              type="button"
              title="Preferences"
              aria-label="Manage cookie preferences"
              tabIndex={0}
              onClick={onChangePreferences}
            >
              Manage
            </TertiaryButton>
            {showRejectAll && (
              <SecondaryButton
                type="button"
                title="Reject"
                aria-label="Reject all cookies"
                tabIndex={0}
                onClick={() => onClose(CloseBehavior.DENY)}
              >
                Reject All
              </SecondaryButton>
            )}
            <PrimaryButton
              type="button"
              title="Accept"
              aria-label="Accept all cookies"
              tabIndex={0}
              onClick={() => onClose(CloseBehavior.ACCEPT)}
            >
              Accept All
            </PrimaryButton>
          </Actions>
          <PolicyLinkContainer>
            <PolicyLink href={privacyPolicyLinkHref} target="_blank" rel="noopener noreferrer">
              {privacyPolicyLinkText ?? 'Privacy policy'}
            </PolicyLink>
            <PolicyLink href={cookiePolicyLinkHref} target="_blank" rel="noopener noreferrer">
              {cookiePolicyLinkText ?? 'Cookie policy'}
            </PolicyLink>
          </PolicyLinkContainer>
        </Root>
      </Overlay>
    )
  }
}
