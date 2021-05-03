const {NODE_ENV, PORT, SSC_TOKEN} = process.env;

export interface IAppConfig {
  env: string,
  port: number,
  sscToken: string,
};

export default ():IAppConfig => {
  return {
    env: NODE_ENV || 'development',
    port: parseInt(PORT || '3000', 10),
    sscToken: SSC_TOKEN || '',
  }
}