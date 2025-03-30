

// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.getElementById("registrationForm");
//     const submitBtn = document.getElementById("submitBtn");
//     const groomName = document.getElementById("groomName");
//     const brideName = document.getElementById("brideName");
//     const groomAadhaar = document.getElementById("groomAadhaar");
//     const brideAadhaar = document.getElementById("brideAadhaar");
//     const groomAgeSelect = document.getElementById("groomAge");
//     const brideAgeSelect = document.getElementById("brideAge");
//     const marriageDate = document.getElementById("marriageDate");
//     const packageSelect = document.getElementById("packageSelect");
//     const selectedPackage = document.getElementById("selectedPackage");
//     const phoneNumber = document.getElementById("phoneNumber");
//     const marriageTradition = document.getElementById("marriageTradition");
  
//     // Set min date to today
//     const today = new Date().toISOString().split('T')[0];
//     marriageDate.setAttribute("min", today);
  
//     // Input sanitization
//     groomName.addEventListener("input", () => groomName.value = groomName.value.replace(/[^a-zA-Z\s]/g, ""));
//     brideName.addEventListener("input", () => brideName.value = brideName.value.replace(/[^a-zA-Z\s]/g, ""));
//     groomAadhaar.addEventListener("input", () => groomAadhaar.value = groomAadhaar.value.replace(/\D/g, "").slice(0, 12));
//     brideAadhaar.addEventListener("input", () => brideAadhaar.value = brideAadhaar.value.replace(/\D/g, "").slice(0, 12));
//     phoneNumber.addEventListener("input", () => phoneNumber.value = phoneNumber.value.replace(/\D/g, "").slice(0, 10));
  
//     // Populate age dropdowns
//     function populateAgeDropdown(selectElement, minAge, maxAge) {
//       selectElement.innerHTML = '<option value="" disabled selected>Select Age</option>';
//       for (let age = minAge; age <= maxAge; age++) {
//         selectElement.innerHTML += `<option value="${age}">${age}</option>`;
//       }
//     }
//     populateAgeDropdown(groomAgeSelect, 21, 100);
//     populateAgeDropdown(brideAgeSelect, 18, 100);
  
//     // Package selection logic
//     const packageLabels = ["Basic", "Premium", "Luxury"];
//     packageSelect.addEventListener("input", function () {
//       selectedPackage.textContent = packageLabels[this.value];
//       validateForm();
//     });
  
//     // Validate form to show submit button
//     function validateForm() {
//       if (form.checkValidity()) {
//         submitBtn.style.display = "block";
//       } else {
//         submitBtn.style.display = "none";
//       }
//     }
//     form.addEventListener("input", validateForm);
  
//     // Form submission
//     form.addEventListener("submit", async function (e) {
//       e.preventDefault();
  
//       const formData = {
//         groomName: groomName.value.trim(),
//         brideName: brideName.value.trim(),
//         groomAadhaar: groomAadhaar.value.trim(),
//         brideAadhaar: brideAadhaar.value.trim(),
//         groomAge: parseInt(groomAgeSelect.value),
//         brideAge: parseInt(brideAgeSelect.value),
//         marriageDate: marriageDate.value,
//         packageSelect: packageLabels[packageSelect.value], // Save package name instead of a number
//         phoneNumber: phoneNumber.value.trim(),
//         religion: marriageTradition.value,
//       };
  
//       try {
//         submitBtn.disabled = true;
//         submitBtn.textContent = "Submitting...";
  
//         const response = await fetch("http://localhost:3000/submit-form", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         });
//         const result = await response.json();
  
//         if (!response.ok) {
//           throw new Error(result.message || "Submission failed");
//         }
  
//         alert(`Registration successful! Your reference ID: ${result.data.registrationId}`);
//         form.reset();
//         submitBtn.style.display = "none";
//       } catch (error) {
//         alert(`Error: ${error.message}`);
//       } finally {
//         submitBtn.disabled = false;
//         submitBtn.textContent = "Submit Registration";
//       }
//     });
//   });
// 
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const submitBtn = document.getElementById("submitBtn");
    const groomName = document.getElementById("groomName");
    const brideName = document.getElementById("brideName");
    const groomAadhaar = document.getElementById("groomAadhaar");
    const brideAadhaar = document.getElementById("brideAadhaar");
    const groomAgeSelect = document.getElementById("groomAge");
    const brideAgeSelect = document.getElementById("brideAge");
    const marriageDate = document.getElementById("marriageDate");
    const packageSelect = document.getElementById("packageSelect");
    const selectedPackage = document.getElementById("selectedPackage");
    const phoneNumber = document.getElementById("phoneNumber");
    const marriageTradition = document.getElementById("marriageTradition");
    const guestCount = document.getElementById("guestCount");

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    marriageDate.setAttribute("min", today);

    // Input sanitization
    groomName.addEventListener("input", () => groomName.value = groomName.value.replace(/[^a-zA-Z\s]/g, ""));
    brideName.addEventListener("input", () => brideName.value = brideName.value.replace(/[^a-zA-Z\s]/g, ""));
    groomAadhaar.addEventListener("input", () => groomAadhaar.value = groomAadhaar.value.replace(/\D/g, "").slice(0, 12));
    brideAadhaar.addEventListener("input", () => brideAadhaar.value = brideAadhaar.value.replace(/\D/g, "").slice(0, 12));
    phoneNumber.addEventListener("input", () => phoneNumber.value = phoneNumber.value.replace(/\D/g, "").slice(0, 10));
    guestCount.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 4); // Allow only numbers
    });

    // Populate age dropdowns correctly
    function populateAgeDropdown(selectElement, minAge, maxAge) {
        selectElement.innerHTML = ""; // Clear previous options
        let defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select Age";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectElement.appendChild(defaultOption);

        for (let age = minAge; age <= maxAge; age++) {
            let option = document.createElement("option");
            option.value = age;
            option.textContent = age;
            selectElement.appendChild(option);
        }
    }
    populateAgeDropdown(groomAgeSelect, 21, 100);
    populateAgeDropdown(brideAgeSelect, 18, 100);

    // Package selection logic
    const packageLabels = ["Basic", "Premium", "Luxury"];
    packageSelect.addEventListener("input", function () {
        let selectedIndex = parseInt(this.value);
        selectedPackage.textContent = packageLabels[selectedIndex] || "Basic"; // Update UI correctly
        validateForm();
    });

    // Validate form to show submit button
    function validateForm() {
        if (form.checkValidity()) {
            submitBtn.style.display = "block";
        } else {
            submitBtn.style.display = "none";
        }
    }
    form.addEventListener("input", validateForm);

    // Form submission
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = {
            groomName: groomName.value.trim(),
            brideName: brideName.value.trim(),
            groomAadhaar: groomAadhaar.value.trim(),
            brideAadhaar: brideAadhaar.value.trim(),
            groomAge: parseInt(groomAgeSelect.value),
            brideAge: parseInt(brideAgeSelect.value),
            marriageDate: marriageDate.value,
            packageSelect: packageLabels[parseInt(packageSelect.value)] || "Basic",
            phoneNumber: phoneNumber.value.trim(),
            religion: marriageTradition.value,
            numberOfGuests: parseInt(guestCount.value) || 0
        };

        try {
            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting...";

            const response = await fetch("http://localhost:3000/submit-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Submission failed");
            }

            alert(`Registration successful! Your reference ID: ${result.data.registrationId}`);
            form.reset();
            submitBtn.style.display = "none";
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Registration";
        }
    });
});
