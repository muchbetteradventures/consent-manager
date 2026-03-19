import React from 'react'
import cookies from 'js-cookie'
import { Pane, Heading, Button } from 'evergreen-ui'
import { ConsentManager, openConsentManager, loadPreferences, onPreferencesSaved } from '../src'
import { storiesOf } from '@storybook/react'
import { CloseBehavior, CloseBehaviorFunction } from '../src/consent-manager/container'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { Preferences } from '../src/types'
import CookieView from './components/CookieView'
import {
  bannerContent,
  bannerSubContent,
  preferencesDialogTitle,
  preferencesDialogContent,
  privacyPolicyLinkHref,
  privacyPolicyLinkText,
  cookiePolicyLinkHref,
  cookiePolicyLinkText
} from './components/common-react'

const ConsentManagerExample = (props: { closeBehavior: CloseBehavior | CloseBehaviorFunction }) => {
  const [prefs, updatePrefs] = React.useState<Preferences>(loadPreferences())

  const cleanup = onPreferencesSaved(preferences => {
    updatePrefs(preferences)
  })

  React.useEffect(() => {
    return () => {
      cleanup()
    }
  })

  return (
    <Pane>
      <ConsentManager
        writeKey="tYQQPcY78Hc3T1hXUYk0n4xcbEHnN7r0"
        otherWriteKeys={['vMRS7xbsjH97Bb2PeKbEKvYDvgMm5T3l']}
        bannerContent={bannerContent}
        bannerSubContent={bannerSubContent}
        privacyPolicyLinkHref={privacyPolicyLinkHref}
        privacyPolicyLinkText={privacyPolicyLinkText}
        cookiePolicyLinkHref={cookiePolicyLinkHref}
        cookiePolicyLinkText={cookiePolicyLinkText}
        preferencesDialogTitle={preferencesDialogTitle}
        preferencesDialogContent={preferencesDialogContent}
        closeBehavior={props.closeBehavior}
      />

      <Pane marginX={100} marginTop={20}>
        <Heading> Your website content </Heading>
        <Pane display="flex">
          <iframe
            src="https://source.unsplash.com/random/500x600"
            width="480"
            height="480"
            frameBorder="0"
          />

          <iframe
            src="https://source.unsplash.com/random/500x600"
            width="398"
            height="480"
            frameBorder="0"
          />
        </Pane>

        <p>
          <div>
            <Heading>Current Preferences</Heading>
            <SyntaxHighlighter language="json" style={docco}>
              {JSON.stringify(prefs, null, 2)}
            </SyntaxHighlighter>
          </div>
          <Button marginRight={20} onClick={openConsentManager}>
            Change Cookie Preferences
          </Button>
          <Button
            onClick={() => {
              cookies.remove('tracking-preferences')
              window.location.reload()
            }}
          >
            Clear
          </Button>
        </p>
      </Pane>
      <CookieView />
    </Pane>
  )
}

storiesOf('React Component / OnClose interactions', module)
  .add(`Dismiss`, () => <ConsentManagerExample closeBehavior={CloseBehavior.DISMISS} />)
  .add(`Accept`, () => <ConsentManagerExample closeBehavior={CloseBehavior.ACCEPT} />)
  .add(`Deny`, () => <ConsentManagerExample closeBehavior={CloseBehavior.DENY} />)
  .add(`Custom Close Behavior`, () => (
    <ConsentManagerExample
      closeBehavior={categories => ({
        ...categories,
        advertising: false
      })}
    />
  ))
