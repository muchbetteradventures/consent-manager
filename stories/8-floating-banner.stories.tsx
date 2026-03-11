import React from 'react'
import cookies from 'js-cookie'
import { Pane, Heading, Button, Paragraph } from 'evergreen-ui'
import { ConsentManager, openConsentManager, loadPreferences, onPreferencesSaved } from '../src'
import { storiesOf } from '@storybook/react'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { Preferences } from '../src/types'
import CookieView from './components/CookieView'

const bannerContent = (
  <span>
    We use cookies (and other similar technologies) to collect data to improve your experience on
    our site. By using our website, you're agreeing to the collection of data as described in our{' '}
    <a
      href="https://segment.com/docs/legal/website-data-collection-policy/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Website Data Collection Policy
    </a>
    .
  </span>
)
const bannerSubContent = 'You can manage your preferences here!'
const preferencesDialogTitle = 'Website Data Collection Preferences'
const preferencesDialogContent = (
  <div>
    <p>
      Segment uses data collected by cookies and JavaScript libraries to improve your browsing
      experience, analyze site traffic, deliver personalized advertisements, and increase the
      overall performance of our site.
    </p>
    <p>
      By using our website, you're agreeing to our{' '}
      <a
        href="https://segment.com/docs/legal/website-data-collection-policy/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Website Data Collection Policy
      </a>
      .
    </p>
    <p>
      The table below outlines how we use this data by category. To opt out of a category of data
      collection, select "No" and save your preferences.
    </p>
  </div>
)

const FloatingBannerExample = () => {
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
        preferencesDialogTitle={preferencesDialogTitle}
        preferencesDialogContent={preferencesDialogContent}
        bannerMode="floating"
      />

      <Pane marginX={100} marginTop={20}>
        <Heading size={600} marginBottom={16}>
          Floating Banner Mode Demo
        </Heading>
        <Paragraph marginBottom={16}>
          This demonstrates the non-blocking floating banner mode. Users can interact with the page
          while the consent banner is visible. The banner appears in the bottom-right corner on
          desktop, and as a bottom bar on mobile.
        </Paragraph>
        <Paragraph marginBottom={16}>
          <strong>Note:</strong> No tracking occurs until the user explicitly accepts or rejects
          cookies. This is the GDPR-compliant default behaviour.
        </Paragraph>

        <Heading size={500} marginTop={24} marginBottom={16}>
          Try scrolling and clicking around!
        </Heading>

        <Pane display="flex" gap={16}>
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

        <Pane marginTop={24}>
          <Heading size={400}>Current Preferences</Heading>
          <SyntaxHighlighter language="json" style={docco}>
            {JSON.stringify(prefs, null, 2)}
          </SyntaxHighlighter>
        </Pane>

        <Pane marginTop={16}>
          <Button marginRight={20} onClick={openConsentManager}>
            Change Cookie Preferences
          </Button>
          <Button
            onClick={() => {
              cookies.remove('tracking-preferences')
              window.location.reload()
            }}
          >
            Clear Preferences
          </Button>
        </Pane>

        {/* Extra content to demonstrate scrolling */}
        <Pane marginTop={40}>
          <Heading size={500} marginBottom={16}>
            More Content Below
          </Heading>
          {[1, 2, 3, 4, 5].map(i => (
            <Paragraph key={i} marginBottom={16}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </Paragraph>
          ))}
        </Pane>
      </Pane>
      <CookieView />
    </Pane>
  )
}

storiesOf('React Component / Banner Mode', module)
  .add('Floating Banner', () => <FloatingBannerExample />)
  .add('Blocking Banner (Default)', () => (
    <Pane>
      <ConsentManager
        writeKey="tYQQPcY78Hc3T1hXUYk0n4xcbEHnN7r0"
        bannerContent={bannerContent}
        bannerSubContent={bannerSubContent}
        preferencesDialogTitle={preferencesDialogTitle}
        preferencesDialogContent={preferencesDialogContent}
        bannerMode="blocking"
      />
      <Pane marginX={100} marginTop={20}>
        <Heading>Blocking Banner Mode (Default)</Heading>
        <Paragraph>
          This is the default blocking mode where users must interact with the banner before
          accessing the site.
        </Paragraph>
      </Pane>
    </Pane>
  ))
