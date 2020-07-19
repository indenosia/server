import { MetaData } from '../metadata/index.ts';

export const Controller = (url: string) => {
  return (constructor: Function) => {
    MetaData.addController(constructor.name, url, constructor);
  };
};
