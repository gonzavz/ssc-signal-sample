enum Factors {
  NETWORK_SECURITY='network_security',
  LEAKED_INFORMATION='leaked_information',
  DNS_HEALTH='dns_health',
  SOCIAL_ENGINEERING='social_engineering',
  PATCHING_CADENCE='patching_cadence',
  ENDPOINT_SECURITY='endpoint_security',
  IP_REPUTATION='ip_reputation',
  APPLICATION_SECURITY='application_security',
  CUBIT_SCORE='cubit_score',
  HACKER_CHATTER='hacker_chatter'
}

interface IReference {
  link: string,
  text: string
}

interface ISSCSignal {
  id: string,
  name: string,
  severity: 'info' | 'positive',
  factor: Factors,
  long_description: string,
  recommendation: string,
  sent_by: string,
  my_scorecard_only?: boolean,
  references: IReference
}

interface ISSCAppManifest {
  name: string,
  url: string,
  description: string,
  long_description: string,
  homepage: string,
  tags: string[],
  logo_url: string,
  hero_images: string[],
  developer: string,
  refute_url?: string,
  hook_url?: string,
  signals: ISSCSignal[]
}

interface IManifestServiceConfig {
  filePath?: string;
}

class ManifestService {
  constructor() {
  }

  show(): ISSCAppManifest {

  }
}