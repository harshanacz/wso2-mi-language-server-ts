// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/tryout/pojo/InvocationInfo.java by the java2ts converter (see tools/java2ts).

export class InvocationInfo {
  static readonly __fields: string[] = ["serviceUrl", "method", "needStepOver", "payload"];

  serviceUrl?: string;

  method?: string;

  needStepOver: boolean = false;

  payload?: string;

  constructor(serviceUrl: string, method: string, payload: string);
  constructor(serviceUrl: string, method: string, payload: string, needStepOver: boolean);
  constructor(...args: any[]) {
    switch (args.length) {
      case 3: {
        const [serviceUrl, method, payload] = args;


                this.serviceUrl = serviceUrl;
                this.method = method;
                this.payload = payload;

        break;
      }
      case 4: {
        const [serviceUrl, method, payload, needStepOver] = args;


                this.serviceUrl = serviceUrl;
                this.method = method;
                this.needStepOver = needStepOver;
                this.payload = payload;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getPayload(): string {
    return this.payload;

  }

  setPayload(payload: string): void {
    this.payload = payload;

  }

  getServiceUrl(): string {
    return this.serviceUrl;

  }

  setServiceUrl(serviceUrl: string): void {
    this.serviceUrl = serviceUrl;

  }

  getMethod(): string {
    return this.method;

  }

  setMethod(method: string): void {
    this.method = method;

  }

  isNeedStepOver(): boolean {
    return this.needStepOver;

  }

  setNeedStepOver(needStepOver: boolean): void {
    this.needStepOver = needStepOver;

  }
}
