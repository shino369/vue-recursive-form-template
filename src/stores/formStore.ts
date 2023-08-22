import { defineStore } from 'pinia'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm, configure} from 'vee-validate'
// Default values

const validateObj = {
  email: z
    .string({
      required_error: 'required!'
    })
    .email().min(1),
  time: z
    .string({
      required_error: 'required!'
    })
    .datetime(),
  children: z.number().max(10).min(0),
  adults: z.number().max(10).min(0),
  outlet_name: z.string({
    required_error: 'required!'
  }).min(1),
  date_input: z
    .string({
      required_error: 'required!'
    })
    .datetime(),
  salutation: z.string({
    required_error: 'required!'
  }),
  last_name: z.string({
    required_error: 'required!'
  }),
  first_name: z.string({
    required_error: 'required!'
  }),
  extra_preference: z.string({
    required_error: 'required!'
  }).min(1),
  contact_type_contact_number: z
    .string()
    .regex(
      new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
      'Invalid Number!'
    ),
  member_subscription: z.boolean({
    required_error: 'required!'
  }),
  header: z.string({
    required_error: 'required!'
  }),
  special_request: z.string({
    required_error: 'required!'
  }),
}

// type Keys = keyof typeof validateObj
type ReturnKeys = {
  [key:string]: any
}
const schema = toTypedSchema(z.object(validateObj))

// ignore this type error, module bug cannot fix
/**
 *
 * Exported variable 'useFormStore' has or is using name 'BaseInputBinds' from external module "c:/Users/anthony_wong/Documents/GitHub/tms-online-reservation-vue-revamp/revamp/tmsOnlineResvRevamp/node_modules/vee-validate/dist/vee-validate" but cannot be named.ts(4023)
 *
 */
export const useFormStore = defineStore('formStore', () => {
  configure({
    validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
    validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
    validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
    // validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
  });
  const { errors, values, defineInputBinds, handleSubmit, setValues } = useForm({
    validationSchema: schema,
  })

  const fieldBind: ReturnKeys = Object.keys(validateObj).reduce(
    (accu, key) => ({
      ...accu,
      [key]: defineInputBinds(key as keyof typeof validateObj)
    }),
    {}
  ) as ReturnKeys

  // const fieldBind = {
  //   email: defineInputBinds('email'),
  //   password: defineInputBinds('password'),
  //   adults: defineInputBinds('adults')

  // }

  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2))
  })

  return {
    fieldBind,
    values,
    errors,
    setValues,
    onSubmit
  }
})
