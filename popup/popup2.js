coursesInfo2 = {};
// cookie = null;

// document.getElementById("btn2").onclick = () => {
//     chrome.cookies.getAll({}, (cookie) => {
//         if (cookie) {
//             cookies = cookie[0].value;
//         }
//     });

//     btn2Clicked();
// }

function btn2Clicked() { 
    coursesInfo2 = {};

    fetch("https://aims.iith.ac.in/aims/courseReg/courseRegDetails/46/3", {
        "headers": {
        "accept": "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "cookie": cookieId
    },
        "referrer": "https://aims.iith.ac.in/aims/courseReg/studentRegForm/46",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors"
    }).then(res => res.json()).then(data => { 

        for (let i = 0; i < data.length; i++) { 
            const item = data[i];

            let courseInfo = {};
            

            courseInfo.runningCourseId = item.runningCourseId;
            courseInfo.courseName = item.courseName;
            courseInfo.courseType = item.courseElectiveTypeDesc;
            courseInfo.courseCd = item.courseCd;
            courseInfo.credits = item.credits;

            coursesInfo2[item.runningCourseId] = courseInfo;
        }

        console.log(coursesInfo2);
    });
}