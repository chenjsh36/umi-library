declare module '@alipay/puck-core' {
  export default class Puck {
    constructor(options?: any);
    
    public use: Function;
    public request: Function;
    
  }
}