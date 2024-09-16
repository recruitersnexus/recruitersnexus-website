export const personalData = {
	name: "Joe Doe",
	role: "Software Engineer",
	education: [
		"Bachelor of Science in Computer Science, University of Oxford(2015-2019)",
		"Master of Science in Artificial Intelligence, Imperial College London (2019-2021)",
	],
	contactLinks: [
		"mailto:emailto:time2code@gmail.com",
		"https://twitter.com/time_tocode",
		"https://linkedin.com/aliciarodriguezLi",
		"https://medium.com/@time2code.ali",
	],
};



export async function getData() {

	try {
	  const data = await fetch(process.env.NEXT_PUBLIC_Backend_URL+"/api/hr2", {
		method: "GET",
		cache: "no-cache",
		headers: {
		  "Content-type": "application/json; charset=UTF-8"
		},
	  })
	  return data.json();
  
	} catch (error) {
	  //console.log(error);
  
	}
  
  }
  
export async function getSkills() {
  
	try {
	  const data = await fetch(process.env.NEXT_PUBLIC_Backend_URL+"/api/skills", {
		method: "GET",
		cache: "no-cache",
		headers: {
		  "Content-type": "application/json; charset=UTF-8"
		},
	  })
	  return data.json();
  
	} catch (error) {
	  //console.log(error);
  
	}
  
  }

  export interface myReportsData{
	id:bigint,
	reason:string,
	user_id:string
  }
  
  export interface myJobs {
	id: bigint,
	title:string,
	salary_start: number,
	salary_end: number,
	description: string,
	is_approved: string,
	feature: string,
	created_at: string,
	user_id: string,
	image:string,
	organization:string,
	location:string,
	expiration_date:string,
  }


  export interface myJobSkill {
	sid:bigint,
	skill:string,
	user_id:bigint,
  }
  
  export interface feedbackData{
	id:bigint,
	rating_one: number,
	rating_two: number,
	rating_three:number,
	rating_four:number,
	rating_five:number,
	total_rating:number,
	user_feedback:string,
	candidate_name:string,
	strength:string,
	weakness:string,
	description:string,
	slot:string,
	hr_id:string,
	user_id:string
  }



  export interface serviceData{
	id:bigint,
	service:string,
	slot:string,
	user_id:string,
	category:string,
  }
  
  
//   export interface myData{
// 	id: bigint,
//     username: string,
//     fname: string,
//     lname: string,
//     about: string,
//     service: string,
//     experience: string,
//     certif: string,
//     aoe: string, 
//   }

  export interface userData{
	id: string;
    username: string;
    email: string;
    password:string;
    image:string;
    role: string;
    createdAt: Date;
   
  }

  export interface myInterview{
	id:bigint,
	slot: string,
	is_conducted: string,
	is_confirmed: string,
	hr_id: string,
	user_id:string

  }
  export interface myDataHr{
	id: bigint,
    fname: string,
    lname: string,
    about: string,
	father_name:string,
	dob: string,
	gender: string,
	martial_status: string,
	nic:string,
	nationality:string,
	religion:string,
	is_approve:string,
	user_id:string,
	designation:string,
	phone: string,
  }

  export interface mySkills{
	sid: bigint,
    skill: string,
	user_id:string
  }

  export interface verifyData{
	id: bigint,
	forgot_pass:string,
	reg_code:string,
	verified:string,
	user_id:string
  }
  
  export interface qualificationData{
	id: bigint,
	degree:string,
	speciallization:string,
	cgpa:string,
	passing_year:string,
	institute:string,
	user_id:string
  }

  export interface experienceData{
	id: bigint,
	designation:string,
	from_date:string,
	to_date:string,
	aoe:string,
	organization:string,
	user_id:string,
	image:string,
	address:string,
	total_experience: string
  }

  export const nationalityData = [
    { name: "Afghanistan" },{ name: "Albania" },{ name: "Algeria" },{ name: "Andorra" },{ name: "Angola" },
    { name: "Antigua and Barbuda" },{ name: "Argentina" },{ name: "Armenia" },{ name: "Australia" },{ name: "Austria" },
    { name: "Azerbaijan" },{ name: "Bahamas" },{ name: "Bahrain" },{ name: "Bangladesh" },{ name: "Barbados" },
    { name: "Belarus" },{ name: "Belgium" },{ name: "Belize" },{ name: "Benin" },{ name: "Bhutan" },
    { name: "Bolivia" },{ name: "Bosnia and Herzegovina" },{ name: "Botswana" },{ name: "Brazil" },{ name: "Brunei" },
    { name: "Bulgaria" },{ name: "Burkina Faso" },{ name: "Burundi" },{ name: "Côte d'Ivoire" },{ name: "Cabo Verde" },
    { name: "Cambodia" },{ name: "Cameroon" },{ name: "Canada" },{ name: "Central African Republic" },{ name: "Chad" },
    { name: "Chile" },{ name: "China" },{ name: "Colombia" },{ name: "Comoros" },{ name: "Congo (Congo-Brazzaville)" },
    { name: "Costa Rica" },{ name: "Croatia" },{ name: "Cuba" },{ name: "Cyprus" },{ name: "Czechia (Czech Republic)" },
    { name: "Democratic Republic of the Congo" },{ name: "Denmark" },{ name: "Djibouti" },{ name: "Dominica" },{ name: "Dominican Republic" },
    { name: "Ecuador" },{ name: "Egypt" },{ name: "El Salvador" },{ name: "Equatorial Guinea" },{ name: "Eritrea" },
    { name: "Estonia" },{ name: "Eswatini " },{ name: "Ethiopia" },{ name: "Fiji" },{ name: "Finland" },
    { name: "France" },{ name: "Gabon" },{ name: "Gambia" },{ name: "Georgia" },{ name: "Germany" },
    { name: "Ghana" },{ name: "Greece" },{ name: "Grenada" },{ name: "Guatemala" },{ name: "Guinea" },
    { name: "Guinea-Bissau" },{ name: "Guyana" },{ name: "Haiti" },{ name: "Holy See" },{ name: "Honduras" },
    { name: "Hungary" },{ name: "Iceland" },{ name: "India" },{ name: "Indonesia" },{ name: "Iran" },
    { name: "Iraq" },{ name: "Ireland" },{ name: "Israel" },{ name: "Italy" },{ name: "Jamaica" },
    { name: "Japan" },{ name: "Jordan" },{ name: "Kazakhstan" },{ name: "Kenya" },{ name: "Kiribati" },
    { name: "Kuwait" },{ name: "Kyrgyzstan" },{ name: "Laos" },{ name: "Latvia" },{ name: "Lebanon" },
    { name: "Lesotho" },{ name: "Liberia" },{ name: "Libya" },{ name: "Liechtenstein" },{ name: "Lithuania" },
    { name: "Luxembourg" },{ name: "Madagascar" },{ name: "Malawi" },{ name: "Malaysia" },{ name: "Maldives" },
    { name: "Mali" },{ name: "Malta" },{ name: "Marshall Islands" },{ name: "Mauritania" },{ name: "Mauritius" },
    { name: "Mexico" },{ name: "Micronesia" },{ name: "Moldova" },{ name: "Monaco" },{ name: "Mongolia" },
    { name: "Montenegro" },{ name: "Morocco" },{ name: "Mozambique" },{ name: "Myanmar" },{ name: "Namibia" },
    { name: "Nauru" },{ name: "Nepal" },{ name: "Netherlands" },{ name: "New Zealand" },{ name: "Nicaragua" },
    { name: "Niger" },{ name: "Nigeria" },{ name: "North Korea" },{ name: "North Macedonia" },{ name: "Norway" },
    { name: "Oman" },{ name: "Pakistan" },{ name: "Palau" },{ name: "Palestine State" },{ name: "Panama" },
    { name: "Papua New Guinea" },{ name: "Paraguay" },{ name: "Peru" },{ name: "Philippines" },{ name: "Poland" },
    { name: "Portugal" },{ name: "Qatar" },{ name: "Romania" },{ name: "Russia" },{ name: "Rwanda" },
    { name: "Saint Kitts and Nevis" },{ name: "Saint Lucia" },{ name: "Saint Vincent and the Grenadines" },{ name: "Samoa" },{ name: "San Marino" },
    { name: "Sao Tome and Principe" },{ name: "Saudi Arabia" },{ name: "Senegal" },{ name: "Serbia" },{ name: "Seychelles" },
    { name: "Sierra Leone" },{ name: "Singapore" },{ name: "Slovakia" },{ name: "Slovenia" },{ name: "Solomon Islands" },
    { name: "Somalia" },{ name: "South Africa" },{ name: "South Korea" },{ name: "South Sudan" },{ name: "Spain" },
    { name: "Sri Lanka" },{ name: "Sudan" },{ name: "Suriname" },{ name: "Sweden" },{ name: "Switzerland" },
    { name: "Syria" },{ name: "Tajikistan" },{ name: "Tanzania" },{ name: "Thailand" },{ name: "Timor-Leste" },
    { name: "Togo" },{ name: "Tonga" },{ name: "Trinidad and Tobago" },{ name: "Tunisia" },{ name: "Turkey" },
    { name: "Turkmenistan" },{ name: "Tuvalu" },{ name: "Uganda" },{ name: "Ukraine" },{ name: "United Arab Emirates" },
    { name: "United Kingdom" },{ name: "United States of America" },{ name: "Uruguay" },{ name: "Uzbekistan" },{ name: "Vanuatu" },
    { name: "Venezuela" },{ name: "Vietnam" },{ name: "Yemen" },{ name: "Zambia" },{ name: "Zimbabwe" }
];


//   export interface nationalityType {
// 	name: string[]
//   }

export const aboutMe = {
	title: "About Me",
	body: [
		"As a highly motivated and driven individual with a passion for making a positive impact, I have a unique blend of technical and interpersonal skills, thanks to my background in computer science. I am able to tackle complex problems with ease, and I never lose sight of my ultimate goal, even when facing challenges.",
		"When I'm not working, I love hiking, reading, and spending time with my friends and family. I believe that my determination, can-do attitude, and hard work make me a true asset to any team.",
	],
};

export const skills = {
	soft: [
		{ icon: "👂🏼", text: "Active Listening" },
		{ icon: "💬", text: "Effective Communication" },
		{ icon: "👥", text: "Collaboration" },
		{ icon: "⽓", text: "Teamwork" },
		{ icon: "💡", text: "Creative Problem Solving" },
		{ icon: "⌛️", text: "Time management" },
	],
	hard: [
		{ icon: "💻", text: "Python" },
		{ icon: "ʦ", text: "TypeScript" },
		{ icon: "🚀", text: "React" },
		{ icon: "💾", text: "SQL" },
		{ icon: "💾", text: "noSQL" },
		{ icon: "📈", text: "Data Structures and Algorithms" },
	],
};

export const professionalData = {
	title: "Professional Experience",
	experiences: [
		{
			role: "Data Scientist, Acme Inc. (2021-Present)",
			description:
				"Design and implement machine learning models to analyze large datasets and drive business decisions. Collaborate with cross-functional teams to develop and launch new products and features. Provide technical guidance and mentorship to junior data scientists. Conduct regular presentations to stakeholders on the findings and insights generated from data analysis.",
			current: true,
		},

		{
			role: "Machine Learning Engineer, XYZ Corp. (2019-2021)",
			description:
				"Designed and implemented advanced machine learning algorithms to improve predictive accuracy and performance. Built and maintained scalable machine learning infrastructure using cloud computing platforms. Conducted data exploratory analysis to identify potential use cases and opportunities. Participated in regular code reviews to maintain high quality standards.",
			current: false,
		},
		{
			role: "Machine Learning Engineer, ABX Corp. (2020-2021)",
			description:
				"Designed and implemented advanced machine learning algorithms to improve predictive accuracy and performance. Built and maintained scalable machine learning infrastructure using cloud computing platforms. Conducted data exploratory analysis to identify potential use cases and opportunities. Participated in regular code reviews to maintain high quality standards.",
			current: false,
		},
	],
};