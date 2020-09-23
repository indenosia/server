// this file for read decorator inside class
//
// its same with path route, example you
// have route
// - /example GET
//
// you just to create
//
// class Example {
//    @GET("/example")
//    example(){
//    
//    }
// }
//
// see https://www.typescriptlang.org/docs/handbook/decorators.html
// for documentation decorator typscript

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
