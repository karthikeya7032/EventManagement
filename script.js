

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
// script.js
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
    const packageSlider = document.getElementById("packageSelect");
    const selectedPackage = document.getElementById("selectedPackage");
    const phoneNumber = document.getElementById("phoneNumber");
    const marriageTradition = document.getElementById("marriageTradition");
    const guestCount = document.getElementById("guestCount");

    const packageLabels = ["Basic", "Premium", "Luxury"];

    // Set min date
    const today = new Date().toISOString().split('T')[0];
    marriageDate.setAttribute("min", today);

    // Input validation
    groomName.addEventListener("input", () => groomName.value = groomName.value.replace(/[^a-zA-Z\s]/g, ""));
    brideName.addEventListener("input", () => brideName.value = brideName.value.replace(/[^a-zA-Z\s]/g, ""));
    groomAadhaar.addEventListener("input", () => groomAadhaar.value = groomAadhaar.value.replace(/\D/g, "").slice(0, 12));
    brideAadhaar.addEventListener("input", () => brideAadhaar.value = brideAadhaar.value.replace(/\D/g, "").slice(0, 12));
    phoneNumber.addEventListener("input", () => phoneNumber.value = phoneNumber.value.replace(/\D/g, "").slice(0, 10));
    guestCount.addEventListener("input", () => guestCount.value = guestCount.value.replace(/\D/g, "").slice(0, 4));

    // Age dropdowns
    function populateAgeDropdown(select, min, max) {
        select.innerHTML = "";
        select.innerHTML = '<option value="" disabled selected>Select Age</option>';
        for (let age = min; age <= max; age++) {
            const option = document.createElement("option");
            option.value = age;
            option.textContent = age;
            select.appendChild(option);
        }
    }
    populateAgeDropdown(groomAgeSelect, 21, 100);
    populateAgeDropdown(brideAgeSelect, 18, 100);

    // Update package label
    packageSlider.addEventListener("input", () => {
        selectedPackage.textContent = packageLabels[parseInt(packageSlider.value)];
        validateForm();
    });

    // Show submit only if form is valid
    function validateForm() {
        submitBtn.style.display = form.checkValidity() ? "block" : "none";
    }
    form.addEventListener("input", validateForm);

    // Form submit
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
            packageSelect: packageLabels[parseInt(packageSlider.value)],
            phoneNumber: phoneNumber.value.trim(),
            religion: marriageTradition.value,
            numberOfGuests: parseInt(guestCount.value) || 0
        };

        try {
            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting...";

            // Send full registration to /submit-form (includes prediction)
            const regResponse = await fetch("/submit-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!regResponse.ok) {
                const result = await regResponse.json();
                throw new Error(result.message || "Submission failed");
            }

            const result = await regResponse.json();
            alert(`✅ Wedding cost estimated: ₹${result.predictedCost.toFixed(2)}`);
            window.location.href = result.redirectUrl;

        } catch (error) {
            alert("🚫 Error: " + error.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Registration";
        }
    });
});