// Parse command line arguments using yargs
var argv = require("yargs")
	.command("master", "Load DB", function (yargs) { })
	.help("help").argv;
var command = argv._[0];
var Excel = require("exceljs");
var db  = require("../src/models");
const { registerUser } =require('../src/helpers/userHelper')

const loadMasterTable = () => {
	return new Promise(async (resolve, reject) => {
		try {
            let workbook = new Excel.Workbook();
			await workbook.xlsx.readFile('./data/brandsonmove_app.xlsx')
			console.log("\n================== Master tables started loading ====================\n");
			let postRoles = await loadRoles(workbook);
			console.log(postRoles);
			let postUsers = await loadUsers(workbook);
			console.log(postUsers);
			let postMeetingLinks = await loadMeetingLinks(workbook);
			console.log(postMeetingLinks);
			let postContactInfo = await loadContactInfo(workbook);
			console.log(postContactInfo);
			console.log("==================Master tables loaded====================");
			resolve("Success");
			process.exit(0);
		} catch (error) {
			reject("Error ==> " + error);
		}
    });
}

const loadRoles = (workbook) => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("userRole");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let roleArray = [];
		let existRoleData = 0;
		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let roleObj = {};
					roleObj.code = row.getCell(2).value;
					roleObj.name = row.getCell(1).value;
					roleObj.status = row.getCell(3).value;
					roleArray.push(roleObj);
					if (row === lastRow) {
						if (!isRejected === true) {
							for (let role of roleArray) {
								let fetchRole = await db.Role.findOne({
									where: {
										code: role.code
									}
								})
								if (fetchRole === null) {
									await db.Role.create({
                                        name: role.name,
										code: role.code,
										status: role.status,
									});
								}else{
									existRoleData = (existRoleData+1);	
								}
							}
							let message = existRoleData === roleArray.length ? "Role data already exist" : existRoleData === 0 ? "Role data loaded successfully" : `${(roleArray.length - existRoleData)}/${roleArray.length} Role data loaded successfully`
							resolve(message);
						}
					}
				}
			});
		} catch (error) {
			console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!===> " + error);
		}
	});
};

const loadUsers = (workbook) => {
    return new Promise((resolve, reject) => {
        let worksheet = workbook.getWorksheet('users');
        let lastRow = worksheet.lastRow;
        let isRejected = false;
        let userArray = [];
        try {
            worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
                if (rowNumber > 1) {
                    let userObj = {};
                    userObj.name = row.getCell(1).value;
                    userObj.phone_number = row.getCell(2).value;
                    userObj.email = row.getCell(3).value;
                    userObj.password = row.getCell(4).value;
                    userObj.user_type = row.getCell(5).value;
					userObj.status = row.getCell(6).value;
                    userArray.push(userObj);
                    if (row === lastRow) {
                        if (!isRejected === true) {
                            for (let user of  userArray) {
									let newUser = await registerUser(user);                            
                            }
                            resolve("User table loaded successfully");
                        }
                    }
                }
            });
        } catch (error) {
            resolve("Error while loading User Table")
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!===> " + error)
        }
    });
}

const loadMeetingLinks = (workbook) => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("meetinglinks");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let meetingLinkArray = [];
		let existMeetingLinkData = 0;
		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let meetingLinkObj = {};
					meetingLinkObj.meeting_type = row.getCell(1).value;
					meetingLinkObj.link = row.getCell(2).value;
					meetingLinkObj.pass_code = row.getCell(3).value;
					meetingLinkArray.push(meetingLinkObj);
					if (row === lastRow) {
						if (!isRejected === true) {
							for (let meetingLinkObj of meetingLinkArray) {
								await db.MeetingLink.create({
									meeting_type:meetingLinkObj.meeting_type,
									link: meetingLinkObj.link,
									pass_code: meetingLinkObj.pass_code,
								});
							}
							let message = existMeetingLinkData === meetingLinkArray.length ? "meetingLinkArray data already exist" : existMeetingLinkData === 0 ? "Meeting link data loaded successfully" : `${(meetingLinkArray.length - existMeetingLinkData)}/${meetingLinkArray.length} Meeting link data loaded successfully`
							resolve(message);
						}
					}
				}
			});
		} catch (error) {
			console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!===> " + error);
		}
	});
};

const loadContactInfo = (workbook) => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("managecontactinfos");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let contactInfoArray = [];
		let exitContactInfoData = 0;
		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let contactInfoObj = {};
					contactInfoObj.phone_number = row.getCell(1).value;
					contactInfoObj.alternate_phone_number = row.getCell(2).value;
					contactInfoObj.email = row.getCell(3).value;
					contactInfoObj.address= row.getCell(4).value;
					contactInfoArray.push(contactInfoObj);
					if (row === lastRow) {
						if (!isRejected === true) {
							for (let contactInfoObj of contactInfoArray) {
								await db.ManageContactInfo.create({
									phone_number:contactInfoObj.phone_number,
									alternate_phone_number: contactInfoObj.alternate_phone_number,
									email: contactInfoObj.email,
									address: contactInfoObj.address,
								});
							}
							let message = exitContactInfoData === contactInfoArray.length ? "contactInfo data already exist" : exitContactInfoData === 0 ? "Contact info data loaded successfully" : `${(contactInfoArray.length - exitContactInfoData)}/${contactInfoArray.length} Meeting link data loaded successfully`
							resolve(message);
						}
					}
				}
			});
		} catch (error) {
			console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!===> " + error);
		}
	});
};

if (command === "master") {
	try {
		loadMasterTable().then((result) => {
			// console.log('Finished Loading');
			process.exit();
		});
	} catch (error) {
		console.log("Unable to master table");
	}
}
