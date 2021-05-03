/* eslint-disable max-len*/

export default {
  'name': 'Sample App (Signal)',
  'url': '<canonical url where this json can be obtained from',
  'description': 'Sample app to test signals',
  'long_description': 'Use this app to test how to send signals',
  'homepage': 'https://example.com',
  'tags': [
    'example.com',
  ],
  // this url can be relative to the location of this json
  'logo_url': 'logo.png',
  'hero_images': [
    // optional hero image to show in the marketplace app page,
    // typically a screenshot of animated gif showing a preview of this app in action,
    // this can also be a youtube video to embed.
    'https://example.com/assets/hero.gif',
  ],
  // primary domain of the company maintaining this marketplace app
  // (must match a scorecard in our platform).
  // Note this can match the source of the signal data or not.
  'developer': 'example.com',
  // optional, if scorecard signals are provided,
  // this is a url where users can be taken to submit a refute
  'refute_url': 'https://example.com/signals/refute_form',
  // optional, a webhook url where we'd send POSTs on events
  // like "app installed" (everytime a user installs this app) (add events list)
  // "hook_url: "https://example.com/hooks",
  'signals': [
    {
      // app namespace must be unique, and prefix all signals provided by this app
      'id': 'app_namespace.signal_type',
      'name': 'Readable Signal Name',
      // currently only "info" or "positive" are allowed
      'severity': 'info',
      // key of one of our factors listed here https://api.securityscorecard.io/metadata/factors
      'factor': 'leaked_information',
      'long_description': 'this is a long description, describes the nature of this signal, how they get detected, etc.',
      'recommendation': 'how to remediate this signal (applies only if not positive)',
      'sent_by': '<username authorized to send these signals, ideally the uuid of a bot user>',
      // optional, if true, these signals are only visible when the user is on her own organization's scorecard (eg. leaked PII)
      // "my_scorecard_only": false,
      'references': [
        {
          'link': 'https://example.com/more-info/',
          'text': 'Caption for this Link',
        },
      ],
    },
  ],
};
