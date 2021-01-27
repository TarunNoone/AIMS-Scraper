//needs cookie

// courseIds = [8945, 8806, 8944, 8810];
courseIds = [8945];
courseSlots = {};
slotIdx = 0;
cookieValue = "put the cookie value here";

// This function will recursively call itself until it reaches end of courseIds array
// Reason for recursion: No clue how to wait for the fetch to end
// At the end of recursions it console.logs the map

// Alternative method would be to redirect user to each page
// and insert code into each page to extract the slot code.

function getSlotCds(slotIdx) {
    const courseId = courseIds[slotIdx];

    fetch(`https://aims.iith.ac.in/aims/deptCourse/viewStudRCrs/${courseId}`, {
        "headers": {
            "cookie": `JSESSIONID=${cookieValue}`
        },
        "method": "GET",
        // set cors mode if required
        // "mode": "cors"
    })
    .then((res) => res.text())
    .then((html) => {
    //   console.log(`${courseId}: Start`);
        
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");

    if (!doc) return;

    let scripts = doc.getElementsByTagName("script");
      for (let i = 0; i < scripts.length; i++) {
        // to check if it's the script tag required:
        // It has a variable with the following name
        let idx = scripts[i].innerText.search("segmentDtlsById");
        if (idx == -1) continue;

        // If such a variable exists, then search for slot code
        idx = scripts[i].innerText.search("courseSlotCd");

        // For now this is the most fragile part of the code.
        // The slot code starts from idx+15 and ends at an underscore.
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
