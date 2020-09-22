// this file for read decorator in class
//
// its same with prefix route example you 
// have route
// - /product/
// - /product/detail
//
// you just to create 
//
// @Controller('/product')
// class Product{
//   @Get()
//    TODO something
//   @Get("/detail")
//    TODO something
// }
//
// see https://www.typescriptlang.org/docs/handbook/decorators.html
// for documentation decorator typescript

import { MetaData } from '../metadata.ts';

export const Controller = (url?: string) => {
  return (constructor: Function) => {
    MetaData.addController(constructor.name, url || '', constructor);
  };
};
