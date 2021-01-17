cookieId = null;
formData = null;
sz = 0;
coursesInfo1 = {};

callback = details => {
    const data = details.requestBody;
    formData = data.formData.dataObj[0];
    // console.log(formData);
};

filter = {
    urls: ["https://aims.iith.ac.in/*"]
};

extraInfoSpec = ["requestBody"];

document.getElementById("btn1").onclick = () => {
    chrome.cookies.getAll({}, (cookie) => {
        if (cookie) {
            cookieId = cookie[0].value;
            console.log("cookie found");
        } else {
            console.log("cookie doesn't exist");
        }
    });

    chrome.webRequest.onBeforeRequest.addListener(callback, filter, extraInfoSpec);

    chrome.tabs.executeScript(null, {
        file: "/scripts/getCount.js",
    }, result => { 
            console.log(result[0]);
            sz = result[0];

            coursesInfo1 = {};

            extractCourseIds();
    });

    btn2Clicked();
};

function extractCourseIds(depth = 0) { 
    if (sz === null) return;
    if (depth == sz) {
        // collected info for all courses
        console.log(coursesInfo1);
        return;
    }

    // console.log("startCode started");

    chrome.tabs.executeScript(null, {
        // click next timetable
        code: `timeTabIcons[${depth}].click();`,
    }, result => { 
            console.log(depth);
            
            // disable the listener, because "processFormData" is using a fetch.
            chrome.webRequest.onBeforeRequest.removeListener(callback);
            processFormData();
            chrome.webRequest.onBeforeRequest.addListener(callback, filter, extraInfoSpec);

            if (depth < sz) {
                extractCourseIds(++depth);
            }
    });

    return;
}

function urlEncode(data1) {
    return encodeURIComponent(data1).replace(/'/g, "%27").replace(/"/g, "%22");
}


function processFormData() {
    let body = "dataObj=" + urlEncode(formData);
    let cookie = "JSESSIONID=" + cookieId;

    // console.log(body, cookie);

    fetch("https://aims.iith.ac.in/aims/courseReg/getStdntRngCrsTimeTableDtls", {
        "headers": {
        "accept": "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "cookie": cookie
    },
        "referrer": "https://aims.iith.ac.in/aims/courseReg/studentRegForm/46",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": "POST",
        "mode": "cors"
    }).then((res) => res.json()).then((data) => {
        // console.log(data);

        let courseInfo = {};
        try {
            courseInfo.courseSlotCd = data[0].courseSlotCd.split("_")[0];
        } catch (error) { 
            //ignore
            courseInfo.courseSlotCd = "Unavaiable";
        }

        try {
            courseInfo.courseId = data[0].runningCourseId;
        } catch (error) { 
            //ignore
            courseInfo.courseId = "Unavaiable";
        }

        try {
            courseInfo.segName = data[0].segName;
        } catch (error) { 
            //ignore
            courseInfo.courseSlotCd = "Unavaiable";
        }

        coursesInfo1[courseInfo.courseId] = courseInfo;
    });
}