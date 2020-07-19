import { MetaData } from '../metadata/index.ts';

export const GET = (url?: string) => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    MetaData.addMethod(target.constructor.name, url || '', descriptor.value);
  };
};
