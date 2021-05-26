(async function getDescriptionFromApi() {
    try {
        const response = await fetch("/api/description");
        const result = await response.json();

        const descriptionDiv = document.getElementById("description");
        
        result.description.map(description => {
        const description = document.createElement("div");
            

            const courseTitle = document.createElement("h3");
            courseTitle.classList.add("courseTitle");
            courseTitle.innerText = description.courseTitle;

            const courseDescription = document.createElement("p");
            courseDescription.classList.add("courseDescription");
            courseDescription.innerText = description.courseDescription;

            const courseType = document.createElement("p");
            courseType.classList.add("courseType");
            courseType.innerText = description.courseType;

            const courseTech = document.createElement('p');
            courseTech.classList.add('courseTech');

            let lengthForTech = 0;
            for (tech in description.courseTech) {
                lengthForTech++;
            }

            let techUsed = "";
            for (tech in description.courseTech) {
                techUsed += description.courseTech[tech];
                lengthForTech--;

                if (lengthForTech > 0) {
                    techUsed += " , ";
                }
            }
            courseTech.innerText = techUsed;

            descriptionDiv.appendChild(courseTitle);
            descriptionDiv.appendChild(courseDescription);
            descriptionDiv.appendChild(courseType);
            descriptionDiv.appendChild(courseTech);
            descriptionDiv.appendChild(descriptionDiv);
        });
        

    } catch (error) {
        console.log(error);
    }
})();