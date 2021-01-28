async function getCoursesInfo() {
    let coursesInfo = {};

    await fetch(`https://aims.iith.ac.in/aims/courseReg/loadMyCoursesHistroy?studentId=${studentId}&courseCd=&courseName=&orderBy=1&degreeIds=&acadPeriodIds=&regTypeIds=&gradeIds=&resultIds=&isGradeIds=`, {
        "method": "GET"
    }).then(res => res.json()).then(data => {
        
        const periodName = data[0].periodName;
        let i = 0;
        
        do {
            let info = {};
            
            info.courseId = data[i].runningCourseId;
            info.courseName = data[i].courseName;
            info.courseCd = data[i].courseCd;

            try {
                info.instructorName = data[i].instructorName;
            } catch (error) {
                info.instructorName = "Unavailable";
            }

            try {
                info.courseType = data[i].courseElectiveTypeDesc;
            } catch (error) {
                info.courseType = "Unavailable";
            }

            try {
                info.segName = data[i].segment;
            } catch (error) {
                info.segName = "Unavailable";
            }

            try {
                info.credits = data[i].credits;
            } catch (error) {
                info.credits = "Unavailable";
            }
                
            i++;

            coursesInfo[info.courseId] = info;

        } while (data[i].periodName == periodName);

    });

    return coursesInfo;

}