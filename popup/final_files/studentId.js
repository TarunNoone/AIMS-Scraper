async function getStudentId() {
    let studentId = null;

    await fetch("https://aims.iith.ac.in/aims/courseReg/studentReg?dbTbNm=mn&isMnDb=true", {
        "method": "GET"
    })
        .then((res) => res.text())
        .then((html) => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, "text/html");

            const elemns = doc.getElementsByTagName("a");

            for (let i = 0; i < elemns.length; i++) {
                studentId = elemns[i].getAttribute("studentId");
                if (Number.isInteger(studentId)) break;
            }

        });
    
    // console.log(studentId);
    return studentId;
}