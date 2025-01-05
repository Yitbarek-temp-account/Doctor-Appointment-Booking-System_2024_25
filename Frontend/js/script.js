function updatePlaceholders() {
    const role = document.querySelector('input[name="role"]:checked').value;
    const form = document.getElementById('registration-form');

    if (role === 'patient') {
        form.innerHTML = `
            <div class="input-pair">
                <div class="input-group">
                    <label for="first-name">First Name <span class="required">*</span></label>
                    <input type="text" id="first-name" name="first-name" placeholder="Enter your first name" required>
                </div>
                <div class="input-group">
                    <label for="last-name">Last Name <span class="required">*</span></label>
                    <input type="text" id="last-name" name="last-name" placeholder="Enter your last name" required>
                </div>
            </div>
            <div class="input-pair">
                <div class="input-group">
                    <label for="email">Email <span class="required">*</span></label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required>
                </div>
                <div class="input-group">
                    <label for="password">Password <span class="required">*</span></label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" required>
                </div>
            </div>
            <div class="input-pair">
                <div class="input-group">
                    <label for="dob">Date of Birth></label>
                    <input type="date" id="dob" name="dob" required>
                </div>
                <div class="input-group">
                    <label for="contact-number">Contact Number <span class="required">*</span></label>
                    <input type="tel" id="contact-number" name="contact-number" placeholder="Enter your contact number" required>
                </div>
            </div>
            <div class="input-pair">
                <div class="input-group">
                    <label for="gender">Gender <span class="required">*</span></label>
                    <input type="text" id="gender" name="gender" placeholder="Enter your gender" required>
                </div>
                <div class="input-group">
                    <label for="blood-group">Blood Group <span class="required">*</span></label>
                    <input type="text" id="blood-group" name="blood-group" placeholder="Enter your blood group" required>
                </div>
            </div>
            <div class="input-pair">
                <div class="input-group">
                    <label for="street">Street</label>
                    <input type="text" id="street" name="street" placeholder="Enter your street" required>
                </div>
                <div class="input-group">
                    <label for="city">City</label>
                    <input type="text" id="city" name="city" placeholder="Enter your city" required>
                </div>
            </div>
            <div class="input-pair">
                <div class="input-group">
                    <label for="state">State</label>
                    <input type="text" id="state" name="state" placeholder="Enter your state" required>
                </div>
                <div class="input-group">
                    <label for="postal-code">Postal Code</label>
                    <input type="text" id="postal-code" name="postal-code" placeholder="Enter your postal code" required>
                </div>
            </div>
            <button type="submit" class="submit-btn">Register as Patient</button>`;
    } else if (role === 'doctor') {
        form.innerHTML = `
            <div class="input-pair">
                <div class="input-group">
                    <label for="first-name">First Name <span class="required">*</span></label>
                    <input type="text" id="first-name" name="first-name" placeholder="Enter your first name" required>
                </div>
                <div class="input-group">
                    <label for="last-name">Last Name <span class="required">*</span></label>
                    <input type="text" id="last-name" name="last-name" placeholder="Enter your last name" required>
                </div>
            </div>
            <div class="input-pair">
                <div class="input-group">
                    <label for="email">Email <span class="required">*</span></label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required>
                </div>
                <div class="input-group">
                    <label for="password">Password <span class="required">*</span></label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" required>
                </div>
            </div>
            <div class="input-pair">
                <div class="input-group">
                    <label for="speciality">Speciality</label>
                    <input type="text" id="speciality" name="speciality" placeholder="Enter your speciality" required>
                </div>
                <div class="input-group">
                    <label for="clinic-location">Clinic Location</label>
                    <input type="text" id="clinic-location" name="clinic-location" placeholder="Enter your clinic location" required>
                </div>
            </div>
            <div class="input-pair">
                <div class="input-group">
                    <label for="contact-number">Contact Number</label>
                    <input type="tel" id="contact-number" name="contact-number" placeholder="Enter your contact number" required>
                </div>
                <div class="input-group">
                    <label for="working-hours">Working Hours</label>
                    <input type="text" id="working-hours" name="working-hours" placeholder="Enter your working hours" required>
                </div>
            </div>
            <div class="input-pair">
                <div class="input-group">
                    <label for="about">About <span class="required">*</span></label>
                    <input type="text" id="about" name="about" placeholder="Tell us about yourself" required>
                </div>
            </div>
            <button type="submit" class="submit-btn">Register as Doctor</button>`;
    }
}