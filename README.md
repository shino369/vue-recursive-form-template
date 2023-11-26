# Vue.js Recursive Form Section
Simple project showcase of recursively generated form section with i18n

<a href="https://shino369.github.io/vue-recursive-form-template/">preview in github page</a>

## Project Depedencies
- router:
  - [x] vue router
- store:
  - [x] pinia
- API: 
  - [x] axios
  - [x] usefetch in vueuse
- form control:
  - [x] vee-Validate
- utils functions:
  - [x] moment
  - [x] lodash
  - [x] vueuse
- translation:
  - [x] vue-i18n (v9)
- UI Lib
  - [x] tailwindcss
- css
  - [x] postcss (tailwind)


---
## Recursive Form Section
The online reservation is generally constructed recursively.

```html
App.vue
<!-- 
	form section (recursion)
	- sections[] (layout) -> elements[] (component)
	- create a file to add hashmap / Object map to component by key || a stupid way: hardcode the component by if else 
-->

<Recursive></Recursive>
```

Recursive.vue
```html
<template>
	<!-- some logic-->
	...
	<div v-if="nestedArr">

		<div v-for="(nested, index) in nestedArr" :key="index">
			<Recursive :props="nested"></Recursive>
		</div>
	</div>
	...
	<div v-if="isChildElement">
		<component :is="componentMap[elementKey]" :props="props"></component>
	</div>
</template>
```

Field and value is directly access throught the store `formStore.ts`. Still under design. But you should be able to do something like:
```ts
<script setup lang="ts">
......
const { fieldBind } = useFormStore()
const { errors } = storeToRefs(useFormStore())
</script>
<template>
  <div class="wrapper tms-m-2 tms-border-blue-50 tms-border-2"></div>
  <input v-bind="fieldBind[element.id as keyof typeof fieldBind]" :placeholder="element[`name_l${locale.LangKey}`]" />
  <div class="tms-text-red-500">{{ errors[element.id as keyof typeof errors] }}</div>
</template>
```

changing the value will directly set the form store and do validation.

---
