export  const flatten = (obj,pointsObj) => {
    let data = {point:0,keys:{}};
    for (let key in obj) {
        if (typeof key === "string") {
            data["keys"][key]=0;
            if(pointsObj[key])data["point"]+=pointsObj[key];
        }
        if (typeof obj[key] === "object") {
            const resultObj=flatten(obj[key],pointsObj);
            data["keys"]={...resultObj["keys"],...data["keys"]};
            data["point"]+=resultObj["point"];
        }
    }
    return data;
}