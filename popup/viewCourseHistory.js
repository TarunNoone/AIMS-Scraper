let coursesInfo3 = {};
let studentId;
let cookie;

// needs the studentId
fetch(`https://aims.iith.ac.in/aims/courseReg/loadMyCoursesHistroy?studentId=${studentId}&courseCd=&courseName=&orderBy=1&degreeIds=&acadPeriodIds=&regTypeIds=&gradeIds=&resultIds=&isGradeIds=`, {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        //needs a cookie
        "cookie": cookie
    },
    "referrer": "https://aims.iith.ac.in/aims/courseReg/myCrsHistoryPage?dbTbNm=mn&isMnDb=true",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
}).then(res => res.json()).then(data => {
    
    const periodName = data[0].periodName;
    let i = 0;

    do {
        const info = {};

        info.courseId = data[i].runningCourseId;
        info.courseName = data[i].courseName;
        info.courseCd = data[i].courseCd;
        info.instructorName = data[i].instructorName;
        info.courseType = data[i].courseElectiveTypeDesc;
        info.segName = data[i].segment;
        info.credits = data[i].credits;
            
        i++;

        coursesInfo3[info.courseId] = info;

    } while (data[i].periodName == periodName);

    console.log(coursesInfo3);
});
