// requires cookie 

let studentId = null;
const cookieValue = "put the cookie value here";

fetch("https://aims.iith.ac.in/aims/courseReg/studentReg", {
	"headers": {
		"cookie": `JSESSIONID=${cookieValue}`
	},
	"method": "GET"
	// set cors mode if required
	// "mode": "cors"
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

		console.log(studentId);
	});