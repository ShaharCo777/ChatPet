

export const textSearch = (val, arr, type, optin=0) => async dispatch =>{
    const results =[]
    let text =''
    await arr.forEach(item => {
        switch (typeof(type)){
            case 'string':
                text = item[type]
                break
            case 'object':
                text = item 
            for(let i=0 ; i < Object.keys(type).length; i++ ){
                text = text[type[i]]
            }
            break
            default:
                text = item
                break
        }

    if (text.toLowerCase().includes(val.toLowerCase())){
            results.push(item)
          }
        })

        return results

}
