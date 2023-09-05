const fileData = {
  fileName: `/lib.es2015.proxy.d.ts`,
  // File text is copyright Microsoft Corporation and is distributed under the Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
  text: '/// <reference no-default-lib="true"/>\ninterface ProxyHandler<T extends object>{apply?(target:T,thisArg:any,argArray:any[]):any;construct?(target:T,argArray:any[],newTarget:Function):object;defineProperty?(target:T,property:string|symbol,attributes:PropertyDescriptor):boolean;deleteProperty?(target:T,p:string|symbol):boolean;get?(target:T,p:string|symbol,receiver:any):any;getOwnPropertyDescriptor?(target:T,p:string|symbol):PropertyDescriptor|undefined;getPrototypeOf?(target:T):object|null;has?(target:T,p:string|symbol):boolean;isExtensible?(target:T):boolean;ownKeys?(target:T):ArrayLike<string|symbol>;preventExtensions?(target:T):boolean;set?(target:T,p:string|symbol,newValue:any,receiver:any):boolean;setPrototypeOf?(target:T,v:object|null):boolean;}interface ProxyConstructor{revocable<T extends object>(target:T,handler:ProxyHandler<T>):{proxy:T;revoke:()=>void;};new<T extends object>(target:T,handler:ProxyHandler<T>):T;}declare var Proxy:ProxyConstructor;',
};

export default fileData;
