import { MetaData } from '../metadata.ts';

export const GET = (url?: string) => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    MetaData.addMethod('GET', target.constructor.name, url || '', descriptor.value);
  };
};

export const POST = (url?: string) => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    MetaData.addMethod('POST', target.constructor.name, url || '', descriptor.value);
  };
};

export const PUT = (url?: string) => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    MetaData.addMethod('PUT', target.constructor.name, url || '', descriptor.value);
  };
};

export const DELETE = (url?: string) => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    MetaData.addMethod('DELETE', target.constructor.name, url || '', descriptor.value);
  };
};
