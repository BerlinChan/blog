---
title: 10+ 条使用 TypeScript 的专业提示(在 React 中)
date: 2019-11-22T10:46:37.121Z
template: post
featured_top: false
featured_media: ./featured_media.png
draft: true
slug: /2019/11/TypeScript-Pro-tips-with-React
categories: 
    - 前端
tags:
    - 翻译
    - 提示
    - TypeScript
description: 
---

<!-- endExcerpt -->

这是一篇翻译。  
原文：[10++ TypeScript Pro tips/patterns with (or without) React](https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680)  
作者：[Martin Hochel](https://medium.com/@martin_hotell)  
翻译：陈柏林

---

> 🎒 本文使用以下库版本:

```json
{
  "@types/react": "16.4.16",
  "@types/react-dom": "16.0.9",
  "typescript": "3.1.3",
  "react": "16.5.2",
  "react-dom": "16.5.2"
}
```

> 🎮 [源码见作者的 Github](https://github.com/Hotell/blogposts/tree/master/2018-10/ten-ts-pro-tips-with-react)

* * *

**TypeScript 绝对是当下 JavaScript 最好的版本。**

不幸的是，对于熟悉 Java/C# 的开发者而言，我不能给出相同的评价。👀😳🌀⏱

> 为什么 🤨?

好吧，它的确使熟悉 Java/C# 的开发者感觉像在家一样，让 JavaScript 具备强类型(这太神奇了！)，
然而，这引入的非标准 JavaScript 语言特性，容易令人对 TypeScript 产生错误的偏见，认为它是一门全新的语言。
但以我浅见，非也。

我一直尽量避免使用多种 TS 特性(出于 👉本文谈到的充分理由)，以便尽可能符合 JavaScript 惯用/标准。

本文介绍了我在使用 TypeScript 和 React 构建 UI 时，"发明/学习"到的各种模式与技巧。

> **备注：**  
> 最初，此博客文章仅有 10 个提示，在回顾本文期间，我又添加了其他 8个 💪。  
> 随着 React/TS 的变化、改进、发展，将来我可能会添加其他提示。  
> 一定要不时查看这篇文章的更新哦 😎

## 更新：

> **26.1.2019** 更新
> 9. 👉 使用 type inference 定义组件的 State 或 DefaultProps
> 
> **23.1.2019** 添加
> 19. 👉 使用 type 别名而不是 interface 声明 Props/State
> 20. 👉 不要用 `FunctionComponent<P>` 定义函数组件

整篇文章的编写方式很像"风格指南"，每个技巧提示/模式都有 3个小节，其中包括：

* **_Don’t_** 🚨 (代码示例你**不**应该这么做)
* **_Do_** ✅ or **_Good/Better/Consider_** (代码示例你**应该**这么做)
* **_Why_** 🧐 (原因与解释)

有了这些内容，让我们进入 10+ 条使用 TypeScript 的专业提示(在 React 中)。

* * *

# 1. 不要在类上使用 `public` 修饰符

**_Don’t:_**

![](./0_aw05SupahLjLgNhM.png)

**_Do:_**

![](./0_FslMKpSggpqv13j_.png)

**_Why?_**

默认情况下，类中所有成员都是 `public` 的(并且在运行时始终是 public，TS 中的 private/protected 仅在编译时才"隐藏"特定的类属性/方法)。
不要给你的代码库引入额外的混乱。修饰符 `public` 也不是"有效/惯用的 javascript"

# 2. 不要在 Component class 上使用 `private` 修饰符

**_Don’t:_**

![](./0_d2ukQqnm742BWHlB.png)

**_Good:_**

![](./0_14yiB1kycpSNm7oh.png)

**_Better:_**

![](./0_YKn44QMpDM5KGrFR.png)

**_Why:_**

修饰符 `private` 不会在运行时将属性/方法设置为私有，这只是 TypeScript 在编译时的模拟。
也不要天真地，使用众所周知的把戏来设置"私有"，比如：

* name starting with underscore 👉 `_someProp`
* or if you really wanna make those properties private use `Symbol` for defining those. ( [real runtime private properties are coming to ECMAscript](https://github.com/bloomberg/TypeScript/pull/6) )

In reality, you should almost never need to work directly with React Component instance nor accessing its class properties.

# 3. Don’t use `protected` accessor within Component class

**_Don’t:_**
![](./0_fSJeOPAJb2V6SaW6.png)

**_Do:_**
![](./0_mWYzXZigm-BfswMF.png)

**_Why:_**

Using `protected` is an immediate "RED ALERT" 🚨🚨🚨 in terms of functional patterns leverage with React. There are more effective patterns like this for extending behaviour of some component. You can use:

*   just extract the logic to separate component and use it as seen above
*   **HoC** (high order function) and **functional composition**.
*   **CaaF** ( children as a function )

# 4. Don’t use `enum`

**_Don’t:_**

![](./0_Jd1KyHV4EsG1CXhe.png)

**_Good:_**

If you need to support runtime enums use following pattern:

![](./0_S4WZZK9aNBu3AE0-.png)

**_Better:_**

If you don’t need to support runtime enums, all you need to use are type literals:

![](./0_G8utY7zNyhDjBwAj.png)

**_Why?:_**

To use `enum` within TypeScript might be very tempting, especially if you're coming from language like C# or Java. But there are better ways how to interpret both with well known JS idiomatic patterns or as can be seen in "Better" example just by using compile time type literals.

*   Enums compiled output generates unnecessary boilerplate (which can be mitigated with `const enum` though. Also string enums are better in this one)

![](./0_yJDtcFMPbfBaYOgN.png)

*   Non string Enums don’t narrow to proper number type literal, which can introduce unhandled bug within your app

![](./0_H0k0oMAedTpvytMt.png)

*   It’s not standard/idiomatic JavaScript (although `enum` is reserved word in ECMA standard)
*   Cannot be used with [babel for transpiling](https://babeljs.io/docs/en/babel-plugin-transform-typescript) 👀

## 🙇‍Enum helper

In our “Good” example, you might think like, ugh that’s a lot of boilerplate dude! I hear you my friends. Loud and clear 🙏

If you need to support runtime enums for various reasons, you can leverage small utility function from [**rex-tils** library](https://github.com/Hotell/rex-tils) like showcased here:

## 

<div class="bf ld be fa le fc">Hotell/rex-tils</div>

### 

<div class="bf ld be fa le fc">Type safe utils for redux actions, epics, effects, react/preact default props, various type guards and TypeScript…</div>

#### 


[](https://github.com/Hotell/rex-tils?source=post_page-----5799488d6680----------------------)

![](./0_UI7jYPmEmo_YmN9R.png)

# 5. Don’t use `constructor` for class Components

**_Don’t:_**

![](./0_KgbbvDlCjW2887V0.png)

**_Do:_**

![](./0_OKQ-h5NIfbiH8OQD.png)

**_Why:_**

There is really no need to use constructor within React Component.

If you do so, you need to provide more code boilerplate and also need to call `super` with provided props ( if you forget to pass props to your super, your component will contain bugs as props will not be _propagated correctly)._

> **But… but… hey ! React official docs use constructor!**
> 
> 👉 That’s fine (React team uses current version of JS to showcase stuff)
> 
> **But… but…, class properties are not standard JavaScript!**
> 
> 👉 Class fields are in [Stage 3](https://github.com/tc39/proposal-class-fields#consensus-in-tc39), which means they are gonna be implemented in JS soon

## Initializing state with some logic

Of course you may ask, what if I need to introduce some logic to initialize component state, or even to initialize the state from some dependant values, like props for example.

Answer to your question is rather straightforward.

Just define a pure function outside the component with your custom logic (as a “side effect” you’ll get easily tested code as well 👌).
![](./0_4BzHqtQANnDa6SxB.png)

# 6. Don’t use decorators for class Components

**_Don’t:_**

![](./0_I-Rmpzl6PD3pqQH-.png)

**_Good:_**

![](./0_46OfZaXO2t8fNiii.png)

**_Better:_**

![](./0_M9e7qCHHYTIKeP3i.png)

**_Why:_**

Decorators are parasitic 🐛 👀 🤢

*   You won’t be able to get original/clean version of your class.
*   TypeScript uses old version of decorator proposal which isn’t gonna be implemented in ECMAscript standard 🚨.
*   It adds additional runtime code and processing time execution to your app.
*   What is most important though, in terms of type checking within JSX, is, that decorators don’t extend class type definition. That means (in our example), that our Container component, will have absolutely no type information for consumer about added/removed props.

# 7. Use lookup types for accessing component State/Props types

> 🙇‍ [lookup types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types)

**_Don’t:_**

![](./0_7AeVyIGXsM2Hjrci.png)

**_Do:_**

![](./0_alQomDRlTvFT1sy_.png)

**_Why:_**

*   Exporting Props or State from your component implementation is making your API surface bigger.
*   You should always ask a question, why consumers of your component should be able to import explicit State/Props type? If they really need that, they can always access it via type lookup functionality. So cleaner API but type information is still there for everyone. Win Win 💪
*   If you need to provide a complex Props type though, it should be extracted to `models/types` file exported as Public API.

# 8. Always provide explicit type for `children` Props

**_Don’t:_**

![](./0_317jNiOyOrw4zVQ8.png)

**_Do:_**

![](./0__bcKItGUN6Yrjmo0.png)

Why:

*   `children` prop is annotated as optional within both Component and Functional Component in `react.d.ts` which just mirrors the implementation how React handles children. While that's ok and everything, I prefer to be explicit with component API.
*   if you plan to use `children` for content projection, make sure to explicit annotate it with type of your choosing and in opposite, if your component doesn't use it, prevent it's usage with `never` type.

## Children type constraint 🚸

> Hey, mister Skateboarder ! I have a question ✋:

What types can be used for `children` annotation in TypeScript ? I mean, can I constraint children to be only a particular type of Component ([like is possible with Flow](https://flow.org/en/docs/react/children/#toc-only-allowing-a-specific-element-type-as-children)) ? Something like `Tab` within `Tabs` `children: Tab[]` ?

Unfortunately not 🙃, as TypeScript isn’t able to “parse” output of `JSX.factory` 👉 `React.createElement` which returns `JSX.Element` from global namespace, which `extends React.ReactElement<any>` so what compiler gets is an object type, with type checking turned off (WARNING:every time you `any` a kitten dies 🙀😅)

Or as stated in TypeScript docs 👀:

> “By default the result of a JSX expression is typed as `any`. You can customize the type by specifying the JSX.Element interface. However, it is not possible to retrieve type information about the element, attributes or children of the JSX from this interface. It is a black box ⬛️ 📦."
> 
> **_NOTE:_**
> 
> TS 2.8 introduced [locally scoped JSX namespaces](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#locally-scoped-jsx-namespaces), which may help to resolve this feature in the future. Watch this space!

We can use following types for annotating `children`:

*   `ReactNode` | `ReactChild` | `ReactElement`
*   `object` | `{[key:string]:unknown}` | `MyModel`
*   primitives `string` | `number` | `boolean`
*   `Array<T>` where T can be any of former
*   `never` | `null` | `undefined` ( null and undefined doesn't make much sense though )

# 9. Use type inference for defining Component State or DefaultProps

**_Don’t:_**

![](./0_bxW6EaOWIzAuqgh4.png)

**_Good:_**

![](./0_nIERm4oLNn4DBHyy.png)

**_Better:_**

By making freezing initialState/defaultProps, type system will infer correct `readonly` types (when someone would accidentally set some value, he would get compile error). Also marking both `static defaultProps` and `state` as `readonly` within the class, is a nice touch, to prevent us from making any runtime errors when incorrectly setting state via `this.state = {...}`

![](./0_Pi__bGpv1hAjdzso.png)

**_Why:_**

*   Type information is always synced with implementation as source of truth is only one thing 👉 **THE IMPLEMENTATION!** 💙
*   Less type boilerplate
*   More readable code
*   by adding readonly modifier and freezing the object, any mutation within your component will immediately end with compile error, which will prevent any runtime error = happy consumers of your app!

## What if I wanna use more complicated type within state or default props?

Use `as` operator to cast your properties within the constant.

_Example:_

![](./0_dX-rKTwl41WBs7yT.png)

# How to infer state type if I wanna use derived state from props?

Easy 😎… We will use pattern introduced in tip no. 5 with power of conditional types _(in particular, standard_ `_lib.d.ts_``_ReturnType_`_mapped type, which infers return type of any function ✌️)_

![](./0_zIpRuqxseB9Iwwvz.png)

# 10. When using function factories instead of classes for models/entities, leverage declaration merging by exporting both type and implementation

**_Don’t:_**

![](./0_u7HjFTOlUrmr01Lo.png)

**_Do:_**

![](./0_hh_u9ydg91Tpmsdi.png)

**_Why:_**

*   Less Boilerplate
*   One token for both type and implementation / Smaller API
*   Both type and implementation are in sync and most importantly, implementation is the source of truth

# 11. Use default import to import `React`

**Don’t:**

![](./0_HTmX9LNZqFaZI5qb.png)

**Do:**

![](./0_VbsDVTw5LVIAzjHj.png)

To support recommended behaviour you need to set following config within your _tsconfig.json_ file:

```json
{  
  "compilerOptions": {
    /*
       Enables emit interoperability between CommonJS and ES Modules
       via creation of namespace objects for all imports.
       Implies 'allowSyntheticDefaultImports'.
    */
    "esModuleInterop": true // highlight-line
  }
}
```

**Consider:**

![](./0_scHceQwh9cqJLVkl.png)

> **NOTE:**
> 
> - With this style, syntax sugar for using Fragments 👉 `<></>` won't work. You need to import them explicitly and use via `<Fragment>...</Fragment>`.
> 
> - I like this approach more as it’s explicit and I can add `key` whenever I want without introducing "too much" changes while doing refactoring.

If you wanna use the “consider section pattern” in whole project without defining jsx pragma per file, you need to set following config within your tsconfig.json file:

```json
{  
  "compilerOptions": {  
    /*   
      Specify the JSX factory function to use   
      when targeting 'react' JSX emit,   
      e.g. 'React.createElement' or 'h'.   
    */  
    "jsxFactory": "createElement"  // highlight-line
  }  
}
```

**Why:**

*   It’s confusing to import all contents from react library when you’re not using them.
*   It’s more aligned to “idiomatic JS”
*   You don’t need to import types defined on `React` namespace like you have to do with `Flow` as TS support declaration merging 👌
*   The “consider” example is even more explicit what is used within your module and may improve tree-shaking during compile time.

# 12. Don’t use `namespace`

**Don’t:**

![](./0_f_Au9Ca8yzXVdg-T.png)

**Do:**

![](./0_oHwCQux9LEVURS6O.png)

**Why:**

*   `namespace` was kinda useful in pre ES2015 modules era. We don't need it anymore.
*   Cannot be used with [babel for transpiling](https://babeljs.io/docs/en/babel-plugin-transform-typescript) 👀

If you really need some kind of namespacing within your module, just use idiomatic JavaScript, like in following example:

![](./0_8YwUI-Na5lWmEYj5.png)

# 13. Don’t use ES2015 module imports when importing types without any run-time code

**Don’t:**

![](./0_m7FgLLs6We5ltLNO.png)

**Do:**

![](./0_35EZ6CGFo95RIobt.png)

> **NOTE:**
> 
> If you’re having many duplicate imports, consider to aliasing them to local type 👉 type `State = import('./counter').Counter['state']`
> 
> 👉 Beware that if you wanna create local type alias from generic type import, you need to mirror that generic type as well, e.g.: 👉 `type ReactElement<T=any> = import('React').ReactElement<T>`

**Why:**

*   Your code is explicit for both human and machine. If you don’t use any run-time code, annotate your code via only via `import('path')`
*   [check this great post from David East](https://davidea.st/articles/typescript-2-9-import-types) to learn more

# 14. Don’t use camelCase/PascalCase for file names

**Don’t:**

<pre class="ga gb gc gd ge hl hm hn">
<span id="cd6b" class="ho hp co at hq b bl hr hs r ht">SkaterBoy.tsx</span>
<span id="e4f6" class="ho hp co at hq b bl of og oh oi oj hs r ht">userAccessHandlers.ts</span>
</pre>

**Do:**

<pre class="ga gb gc gd ge hl hm hn">
<span id="2fdd" class="ho hp co at hq b bl hr hs r ht">**skater-boy.tsx**</span>
<span id="ebfb" class="ho hp co at hq b bl of og oh oi oj hs r ht">**user-access-handlers.ts**</span>
</pre>

**Why:**

*   readable file names. e.g `MyHalfFixedDedupedDirResolver` vs `my-half-fixed-deduped-dir-resolver` 👀
*   no more weird git conflicts when renaming/deleting/adding files on various OS file systems (case-sensitive/insensitive)
*   consistency (I don’t have to think if this file is component or some helper or service. `tsx` extension tells me that)
*   nicely maps to component implementation name `skater-boy.tsx` 👉 `const SkaterBoy = () => {}`

# 15. Declare types before run-time implementation

**Don’t:**

![](./0_pHSvsCY3-_4UeXpi.png)

**Do:**

![](./0_FDI6P3sWKYxyXz6P.png)

**Why:**

*   first lines of document clearly state what kind of types are used within current module. Also those types are compile only code
*   run-time and compile time declarations are clearly separated
*   in component user immediately knows what the component “API” looks like without scrolling

> **NOTE:**
> 
> If you’re leveraging declaration merging as part of your API, define type after implementation:

![](./0_QFqSLhVmBmxf9hOu.png)

# 16. Don’t use method declaration within interface/type alias

**Don’t:**

![](./0_Jv_hPkemEysaOjn3.png)

**Do:**

![](./0_uHxLB63QjcPeVQI6.png)

**Why:**

*   `--strictFunctionTypes` enforces stronger type checks when comparing function types, but does not apply to methods. [Check TS wiki to learn more](https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#strict-function-types)
*   [explanation from TS issue](https://github.com/Microsoft/TypeScript/issues/25296#issuecomment-401517062)
*   consistency, all members of type/interface are defined via same syntax

# 17. Don’t use `_number_` for indexable type key

**Don’t:**

![](./0_D8P6ME4BpmvxlEkI.png)

**Do:**

![](./0_ftKU11Ebb_aoJGUI.png)

**Why:**

*   In JavaScript object properties are always typeof `string`! don't create false type predicates within your apps!
*   Annotating keys with `number` is OK for arrays (array definition from standard .d.ts lib 👉 `[n: number]: T;`), although in real life you should rarely come into situation that you wanna define "custom" array implementation

# 18. Don’t use `JSX.Element` to annotate function/component return type or children/props

**Don’t:**

![](./0_5tRg3YegJVEfnBMH.png)

**Do:**

![](./0_NxaXaT9M472vPZpF.png)

**Why:**

*   globals are bad ☝️💥
*   TypeScript supports locally scoped JSX to be able to support various JSX factory types and proper JSX type checking per factory. While current react types use still global JSX namespace, it’s gonna change in the future.
*   explicit types over generalized ones

# 19. Use type alias instead of interface for declaring Props/State

**Don’t:**

![](./0_fi4eRHgSDpb2C8RK.png)

**Do:**

![](./0_T89MMvY43QBcaqqY.png)

**Why:**

*   consistency/clearness. Let’s say we use tip no.8 (defining state type from implementation). If you would like to use interface with this pattern, you’re out of luck, as that’s not allowed within TypeScript.

<span id="734f" class="ho hp co at hq b bl hr hs r ht">// $ExpectError ❌  
interface State extends typeof initialState {}</span>
<span id="be8f" class="ho hp co at hq b bl of og oh oi oj hs r ht">const initialState = {  
  counter: 0  
}</span>

*   interface cannot be extended by types created via union or intersection, so you would need to refactor your State/Props interface to type alias in that case.
*   interfaces can be extended globally via declaration merging, if you wanna provide that kind of capabilities to your users you’re doing it wrong (exposing “private” API)

# 20. Don’t use `FunctionComponent<P>`/`FC<P>` to define a function component

**Don’t:**

![](./0_ocDGBGka8_fnuKGc.png)

**Do:**

![](./0_2fjN9AaU4NJH4wLj.png)

**Why:**

*   consistency/simplicity (always prefer familiar vanilla JavaScript patterns without too much type noise/magic)
*   `FC` defines optional `children` on props, which is not what your API may support as explained in **_tip no 8_**. API should be explicit!
*   `FC` breaks `defaultProps` type resolution (introduced in TS 3.1) and unfortunately all other "static" props as well 👉(`propTypes`,`contextTypes`,`displayName`)

**_How FC breaks defaultProps and friends ?_**

```typescript jsx
type Props = {
  who: string
} & typeof defaultProps

const defaultProps = {
  greeting: 'Hello',
}

const Greeter: FC<Props> = (props) => (
  <div>
    {props.greeting} {props.who}!
  </div>
)

// 🚨 This won't work. 
// Greeter components API will not mark `greeting` as optional</span><span id="12de" class="ho hp co at hq b bl of og oh oi oj hs r ht">Greeter.defaultProps = defaultProps

const Test = () => (
  <>
    {/**
      ExpectError ❌
      Property 'greeting' is missing
    */}
    <Greeter who="Martin" />
  </>  
)
```

> To fix this you would have to re-define default props, which makes your code a mess… 🤒 Look for yourself! 👉

```typescript jsx
const Greeter: FC<Props> & { defaultProps: typeof defaultProps } = ( props ) => {
  /*...*/
}
```

*   `FC` cannot be used to define a generic component

> while we can define generic functional component(because it’s just a function):

```typescript jsx
type Props<T extends object> = {
  data: T
  when: Date
}

const GenericComponent = <T extends object>(props: Props<T>) => {
  return (
    <div>
      At {props.when} : {JSON.stringify(props.data)}
    </div>
  )
}
```

> following won’t work and we’ll get compiler error:

```typescript jsx
type Props<T extends object> = {  
  data: T  
  when: Date  
}

// $ExpectError ❌
// 🚨 FC cannot set generic Props type.
// We got TS error as T (generic), cannot be possibly defined/inferred
const GenericComponent: FC<Props<T extends object>> = (props) => {
  return (
    <div>
      At {props.when} : {JSON.stringify(props.data)}
    </div>
  )
}
```

* * *

# Summary

That’s it for today! Hope you gonna apply those patterns sooner than later within your code base or even better use them as part of your project style guide. If you do please lemme know how it goes ! 😎

> [And remember. ☝ Respect, is everything! 😅](https://www.youtube.com/watch?v=EloDnA1_XEU)

* * *

As always, don’t hesitate to ping me if you have any questions here or on Twitter (my handle [@martin_hotell](https://twitter.com/martin_hotell)) and besides that, happy type checking folks and ‘till next time! Cheers! 🖖 🌊 🏄


*   [JavaScript](/tag/javascript)
*   [Typescript](/tag/typescript)
*   [React](/tag/react)
*   [React Native](/tag/react-native)
*   [Patterns](/tag/patterns)
