import { useEffect, useState,useCallback } from "react"

type AsyncState<T> = {
    loading: boolean;
    error?: any;
    value?: T;
    execute: (...params: any[]) => Promise<T>;
  };
  
type AsyncFn<T> = (...params: any[]) => Promise<T>;

// We use this function we make call to the Post page from post list page so 
//so that we can get the loading state to display
export const useAsync= <T>(func: AsyncFn<T>, dependencies: any[] = [])=>{

    const {execute,...state} = useAsyncInternal(func,dependencies,true);

    useEffect(()=>{
        execute()
    },[execute]);

    return state;

}

//We call this function on the post page when we add a new comment
export const useAsyncFn= <T>(func:AsyncFn<T>, dependencies = [])=>{
    return useAsyncInternal(func,dependencies,false);
}

//This is a custom Hook made , to initiate the process of making request to the server
// and then we get 3 parameters the loading state , error and the value 
export const useAsyncInternal= <T>(func:AsyncFn<T>, 
        dependencies: Array<any>,
        initialLoading = false): AsyncState<T>=>{

        const [loading,setLoading] = useState<boolean>(initialLoading);
        const [error,setError]= useState<any>();
        const [value,setValue]= useState<T>();

        const execute =useCallback(
            (...params: any[])=>{
                setLoading(true);
                return func(...params).then(
                    data =>{
                        setValue(data);
                        setError(undefined);
                        return data;
                    }
                ).catch(
                    error =>{
                        setError(error);
                        setValue(undefined);    
                        return Promise.reject(error);
                    }
                ).finally(()=>{
                    setLoading(false)
                });
            },dependencies) ;

            return {loading,error,value,execute};
}
