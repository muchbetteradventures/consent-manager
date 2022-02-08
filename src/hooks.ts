/**
 * A hook to force the HubSpot integration to use the EU Data Center
 * This can be removed when Segment update the web admin UI to allow
 * this to be set there instead of having to set it on the client.
 * It will only apply it IF the HubSpot integration is set to be true.
 */
const applyHubSpotEuropeanDataCenterFix = integrations => {
  if (integrations.HubSpot) {
    integrations.HubSpot = {
      enableEuropeanDataCenter: true
    }
  }

  return integrations
}

export const applyIntegrationHooks = integrations => {
  return applyHubSpotEuropeanDataCenterFix(integrations)
}
