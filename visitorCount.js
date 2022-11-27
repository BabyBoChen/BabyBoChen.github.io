async function addVisitorMain(){
    const ipapi = 'https://ipapi.co/json/';
    const endpoint = "https://bblj-my-dart.azurewebsites.net";
    let userIp = await getUserIp(ipapi);
    await addVisitor(userIp, endpoint);
}

async function getUserIp(ipapi){
    let userIp = await fetch(ipapi, {
        method: 'GET',
    }).then(function(resp){
        return resp.json();
    }).then(function(ipInfo){
        let data = {
            'countryCode' : ipInfo.country_code,
            'region' : ipInfo.region_code,
            'query' : ipInfo.ip,
        };
        return data;
    })
    .catch(function(err){
        console.log(err);
        return {"countryCode":'', "region":'', "query":''};
    });
    return userIp;
}

async function addVisitor(userIp, endpoint){
    let data = userIp;
    await fetch(endpoint, {
        method:'POST',
        body:JSON.stringify(data),
    }).then(function(resp){
        return resp;
    }).catch(function(err){
        console.log(err);
        return '0|Fail';
    });
}

async function getVisitorCt(endpoint){
    let visitorCt = await fetch(endpoint+'/counter', {
        method: 'GET',
    }).then(function(resp){
        return resp.json();
    }).catch(function(err){
        visitorCt = -1;
        console.log(err);
    });
    return visitorCt.visitorCt;
}

addVisitorMain();