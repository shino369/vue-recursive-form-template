import { createFetch } from '@vueuse/core'

const useCustomFetch = createFetch({
  baseUrl: '/hqdemo/rest_api/tms/',
  options: {
    async beforeFetch({ url: _url, options, cancel: _cancel }) {
      // const myToken = await getMyToken()
      // options.headers.Authorization = `Bearer ${myToken}`
      return { options }
    },
    afterFetch(ctx) {
      // ctx.data
      return ctx
    },
    onFetchError(ctx) {
      // ctx.data can be null when 5xx response
      // if (ctx.data === null)
      //   ctx.data = { title: 'Hunter x Hunter' } // Modifies the response data

      // ctx.error = new Error('API Error') // Modifies the error
      return ctx
    }
  },
  fetchOptions: {
    mode: 'cors'
  }
})

type RequestParams<T> = T & Record<string, any>

export const fetchAPI = <T = Record<string, any>>(url: string, params: RequestParams<T>) => {
  // console.log(params)
  const reducedParams = Object.entries(params).reduce(
    (accu, [key, value]) => ({
      ...accu,
      ...(value !== null && value !== undefined
        ? {
            [key]: value
          }
        : {})
    }),
    {}
  )
  const paramStr = new URLSearchParams(reducedParams).toString()
  // console.log(reducedParams)
  const concatedUrl = url + (paramStr ? '?' + paramStr : paramStr)
  return useCustomFetch(concatedUrl)
}

// export default { fetchAPI }
