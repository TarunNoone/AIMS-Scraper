let coursesInfo3 = {};
let studentId;
let cookieValue;

// needs the studentId and cookie
fetch(`https://aims.iith.ac.in/aims/courseReg/loadMyCoursesHistroy?studentId=${studentId}&courseCd=&courseName=&orderBy=1&degreeIds=&acadPeriodIds=&regTypeIds=&gradeIds=&resultIds=&isGradeIds=`, {
    "headers": {
        "cookie": `JSESSIONID=${cookieValue}`
    },
    "method": "GET"
    // set mode cors if required
    // "mode": "cors"
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
