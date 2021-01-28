async function getSlot(courseId) {
    let slotInfo = {};

    await fetch(`https://aims.iith.ac.in/aims/deptCourse/viewStudRCrs/${courseId}`, {
        "method": "GET"
        //cookie not required. it works even without it somehow
    })
        .then((res) => res.text())
        .then((html) => {
        
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, "text/html");
            
            const scripts = doc.getElementsByTagName("script");
            let idx = -1;

            for (let i = 0; i < scripts.length; i++) {
                idx = scripts[i].innerHTML.search("segmentDtlsById");
                if (idx == -1) continue;

                let scriptStr = scripts[i].innerHTML.split(";")[3];
                idx = scriptStr.search("=");
                scriptStr = scriptStr.substring(idx + 1);

                let info = JSON.parse(scriptStr);
                // console.log(info[0]);

                info = info[0];
                
                // console.log(info);
                
                try {
                    slotInfo.slotCd = info.courseSlotCd.split("_")[0];
                } catch (error) {
                    slotInfo.slotCd = "Unavaiable";
                }

                try {
                    slotInfo.slotTimings = info.slotPeriodCd.split(",");
                } catch (error) {
                    slotInfo.slotTimings = "Unavaiable";
                }

                try {
                    slotInfo.segmentCd = info.segmentCd;
                } catch (error) {
                    slotInfo.segmentCd = "Unavaiable";;
                }

                slotInfo.courseId = courseId;
            }
        });
    
    return slotInfo;
}