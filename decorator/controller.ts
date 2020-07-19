import { MetaData } from '../metadata.ts';

export const Controller = (url?: string) => {
  return (constructor: Function) => {
    MetaData.addController(constructor.name, url || '', constructor);
  };
};
