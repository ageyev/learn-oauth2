const urlSearchParamsObjToJSON = (urlSearchParamsObj: URLSearchParams) => {
    let json: any = {};

    for (const [key, val] of urlSearchParamsObj.entries()) {
        json[key] = val;
    }

    return json;
}

export default urlSearchParamsObjToJSON;

