let studentId = null;
let coursesInfo = {};

document.getElementById("btn3").onclick = async () => {
    coursesInfo = {};

    await getStudentId().then(value => { 
        studentId = value;
    });

    await getCoursesInfo().then(value => {
        coursesInfo = value;
    });

    let courseIds = Object.keys(coursesInfo);

    for (let i = 0; i < courseIds.length; i++) {
        const courseId = courseIds[i];

        await getSlot(courseId).then(value => {
            coursesInfo[courseId].slotCd = value.slotCd;
            coursesInfo[courseId].slotTimings = value.slotTimings;
        });
    }

    console.log(coursesInfo);
}