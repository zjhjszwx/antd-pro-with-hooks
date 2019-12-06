import { useState, useEffect } from 'react';

export type APIFunc<T, P> = (params: P) => Promise<T>

/**
 * @param {api} —api.ts件中封装的接口请求方法
 * @param {defaultData} 页面初始化时接口数据的默认值
 * @param {params} 接口所需要的参数  注意，这里请传入接口需要的完整的参数
 * @param {delay} 当该值为true时，接口不请求
 */
export default function useInitial<T, P>(
  api: APIFunc<T, P>, 
  defaultData: T, 
  _params: P, 
  delay?: boolean
) {
  const [store, setStore] = useState({
    params: _params,
    loading: true,
    data: defaultData,
    errMsg: ''
  });
  const {params, loading, data, errMsg} = store;

  useEffect(() => {
    if (!loading || delay) { return; }
    getData(params);
  }, [loading]);

  function getData(params: P) {
    api(params).then(res => {
      // 这里需要注意，要结合自己团队定义的接口规范返回结果
      let data = res || defaultData;
      setStore({
        ...store,
        errMsg: '',
        loading: false,
        data
      })
    }).catch(e => {
      setStore({
        ...store,
        errMsg: e.message,
        loading: false
      })
    });
  }

  function setParams(params: P, refreshing: boolean) {
    setStore({...store, params});
    refreshing && getData(params);
  }

  return {
    loading,
    data,
    errMsg,
    setParams
  };
}
