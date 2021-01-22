//To get slots: cookie is required

courseIds = [8945, 8806, 8944, 8810, 8943, 8946, 8947, 8948, 8926, 9067];
courseSlots = {};
slotIdx = 0

document.getElementById("btn3").onclick = () => {
    courseSlots = {};

    // // console.log("here me");
    // for (let i = 0; i < courseIds.length; i++) {
    //     getSlotCds(courseIds[i]);
    //     // console.log(`here me in ${courseIds[i]}`);
    // }     

    getSlotCds(slotIdx)
}

function getSlotCds(slotIdx) {
    const courseId = courseIds[slotIdx];

  fetch(`https://aims.iith.ac.in/aims/deptCourse/viewStudRCrs/${courseId}`, {
    "method": "GET",
    "headers": {
      "cookie": cookie
    },
  })
    .then((res) => res.text())
    .then((html) => {
    //   console.log(`${courseId}: Start`);
        
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");

    if (!doc) return;

    let scripts = doc.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
        let idx = scripts[i].innerText.search("segmentDtlsById");
        if (idx == -1) continue;

        idx = scripts[i].innerText.search("courseSlotCd");

        let cd = scripts[i].innerText.substring(idx + 15, idx + 25).split("_")[0].trim();

        courseSlots[courseId] = cd;
        console.log(`${courseId}: ${cd}`);
    }

        if (slotIdx == (courseIds.length - 1)) {
            console.log(courseSlots);
        } else {
            slotIdx++;
            getSlotCds(slotIdx);
        }
    });
}
