const fileData = {
    fileName: `/lib.decorators.d.ts`,
    // File text is copyright Microsoft Corporation and is distributed under the Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
    text: '/// <reference no-default-lib="true"/>\ntype ClassMemberDecoratorContext=|ClassMethodDecoratorContext|ClassGetterDecoratorContext|ClassSetterDecoratorContext|ClassFieldDecoratorContext|ClassAccessorDecoratorContext;type DecoratorContext=|ClassDecoratorContext|ClassMemberDecoratorContext;interface ClassDecoratorContext<\nClass extends abstract new(...args:any)=>any=abstract new(...args:any)=>any,>{readonly kind:"class";readonly name:string|undefined;addInitializer(initializer:(this:Class)=>void):void;}interface ClassMethodDecoratorContext<\nThis=unknown,Value extends(this:This,...args:any)=>any=(this:This,...args:any)=>any,>{readonly kind:"method";readonly name:string|symbol;readonly static:boolean;readonly private:boolean;readonly access:{has(object:This):boolean;get(object:This):Value;};addInitializer(initializer:(this:This)=>void):void;}interface ClassGetterDecoratorContext<\nThis=unknown,Value=unknown,>{readonly kind:"getter";readonly name:string|symbol;readonly static:boolean;readonly private:boolean;readonly access:{has(object:This):boolean;get(object:This):Value;};addInitializer(initializer:(this:This)=>void):void;}interface ClassSetterDecoratorContext<\nThis=unknown,Value=unknown,>{readonly kind:"setter";readonly name:string|symbol;readonly static:boolean;readonly private:boolean;readonly access:{has(object:This):boolean;set(object:This,value:Value):void;};addInitializer(initializer:(this:This)=>void):void;}interface ClassAccessorDecoratorContext<\nThis=unknown,Value=unknown,>{readonly kind:"accessor";readonly name:string|symbol;readonly static:boolean;readonly private:boolean;readonly access:{has(object:This):boolean;get(object:This):Value;set(object:This,value:Value):void;};addInitializer(initializer:(this:This)=>void):void;}interface ClassAccessorDecoratorTarget<This,Value>{get(this:This):Value;set(this:This,value:Value):void;}interface ClassAccessorDecoratorResult<This,Value>{get?(this:This):Value;set?(this:This,value:Value):void;init?(this:This,value:Value):Value;}interface ClassFieldDecoratorContext<\nThis=unknown,Value=unknown,>{readonly kind:"field";readonly name:string|symbol;readonly static:boolean;readonly private:boolean;readonly access:{has(object:This):boolean;get(object:This):Value;set(object:This,value:Value):void;};addInitializer(initializer:(this:This)=>void):void;}',
};
export default fileData;
//# sourceMappingURL=lib.decorators.js.map