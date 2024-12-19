import React, { useState } from 'react';
import '../styles/BankForm.css';
const BankForm = () => {
    const [formData, setFormData] = useState({
        customerName: '',
        dob: '',
        fatherName: '',
        motherMaidenName: '',
        residenceAddress: '',
        mobileNo: '',
        telephoneNo: '',
        yearsAtAddress: '',
        yearsInCity: '',
        married: false,
        dependents: 0,
        permanentAddress: '',
        monthlyRent: '',
        spouseName: '',
        spouseDob: '',
        companyName: '',
        companyAddress: '',
        officePhone: '',
        yearsAtJob: '',
        totalJobExperience: '',
        officeEmail: '',
        personalEmail: '',
        educationQualification: '',
        previousCompany: '',
        netSalary: '',
        designation: '',
        relativeName: '',
        relativeMobile: '',
        relativeAddress: '',
        friendName: '',
        friendMobile: '',
        friendAddress: '',
        bankDetails: '',
        loanAmount: '',
        loanTenure: '',
        existingLoans: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
    
        // For file inputs, handle file selection
        if (type === 'file') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: files, // Store the FileList object directly
            }));
        } else {
            // For text, checkbox, and other inputs
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Log form data to console for debugging
        console.log('Form Data Submitted:', formData);
    
        try {
            // Create FormData object for file uploads and other data
            const submissionData = new FormData();
            Object.keys(formData).forEach((key) => {
                if (formData[key] instanceof FileList) {
                    // Append each file from the FileList
                    Array.from(formData[key]).forEach((file) => {
                        submissionData.append(key, file);
                    });
                } else {
                    submissionData.append(key, formData[key]);
                }
            });
    
            // Send form data to the backend
            const response = await fetch('http://localhost:5000/api/submit-form', {
                method: 'POST',
                body: submissionData,
            });
    
            // Handle response
            if (response.ok) {
                const result = await response.json();
                console.log('Form submitted successfully:', result);
                alert('Form submitted successfully!');
            } else {
                console.error('Form submission failed:', response.statusText);
                alert('Failed to submit the form. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form. Please try again later.');
        }
    };
    

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Bank Customer Form</h2>
            <h2 className="mb-2">Personal Information</h2>
            <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                
                <div className="mb-3">
                    <label className="form-label">Customer Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Father's Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mother's Maiden Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="motherMaidenName"
                        value={formData.motherMaidenName}
                        onChange={handleChange}
                    />
                </div>

                {/* Address Information */}
                <h4>Address Information</h4>
                <div className="mb-3">
                    <label className="form-label">Residence Address</label>
                    <textarea
                        className="form-control"
                        name="residenceAddress"
                        value={formData.residenceAddress}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Permanent Address</label>
                    <textarea
                        className="form-control"
                        name="permanentAddress"
                        value={formData.permanentAddress}
                        onChange={handleChange}
                    ></textarea>
                </div>

                {/* Contact Information */}
                <h4>Contact Information</h4>
                <div className="mb-3">
                    <label className="form-label">Mobile Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Telephone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="telephoneNo"
                        value={formData.telephoneNo}
                        onChange={handleChange}
                    />
                </div>

                {/* Employment Information */}
                <h4>Employment Information</h4>
                <div className="mb-3">
                    <label className="form-label">Company Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Company Address</label>
                    <textarea
                        className="form-control"
                        name="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleChange}
                    ></textarea>
                </div>

                {/* Loan Information */}
                <h4>Loan Information</h4>
                <div className="mb-3">
                    <label className="form-label">Loan Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        name="loanAmount"
                        value={formData.loanAmount}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Loan Tenure (in years)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="loanTenure"
                        value={formData.loanTenure}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Existing Loans</label>
                    <textarea
                        className="form-control"
                        name="existingLoans"
                        value={formData.existingLoans}
                        onChange={handleChange}
                    ></textarea>
                </div>

 {/* Nominee Details */}
 <h4>Nominee Details</h4>
                <div className="mb-3">
                    <label className="form-label">Nominee Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nomineeName"
                        value={formData.nomineeName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Relationship with Applicant</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nomineeRelationship"
                        value={formData.nomineeRelationship}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nominee Date of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        name="nomineeDob"
                        value={formData.nomineeDob}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nominee Contact Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nomineeContact"
                        value={formData.nomineeContact}
                        onChange={handleChange}
                    />
                </div>

                {/* Account Preferences */}
                <h4>Account Preferences</h4>
                <div className="mb-3">
                    <label className="form-label">Type of Account</label>
                    <select
                        className="form-control"
                        name="accountType"
                        value={formData.accountType}
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option value="savings">Savings</option>
                        <option value="current">Current</option>
                        <option value="fixed">Fixed Deposit</option>
                    </select>
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="internetBanking"
                        checked={formData.internetBanking}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Internet Banking</label>
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="debitCard"
                        checked={formData.debitCard}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Debit Card Required</label>
                </div>

                {/* Income Details */}
                <h4>Income Details</h4>
                <div className="mb-3">
                    <label className="form-label">Monthly Income</label>
                    <input
                        type="number"
                        className="form-control"
                        name="monthlyIncome"
                        value={formData.monthlyIncome}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Other Income Sources</label>
                    <textarea
                        className="form-control"
                        name="otherIncomeSources"
                        value={formData.otherIncomeSources}
                        onChange={handleChange}
                    ></textarea>
                </div>

                {/* Document Upload */}
                <h4>Document Upload</h4>
                <div className="mb-3">
                    <label className="form-label">ID Proof</label>
                    <input
                        type="file"
                        className="form-control"
                        name="documentIdProof"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address Proof</label>
                    <input
                        type="file"
                        className="form-control"
                        name="documentAddressProof"
                        onChange={handleChange}
                    />
                </div>

                {/* Terms and Conditions */}
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                        required
                    />
                    <label className="form-check-label">
                        I agree to the terms and conditions
                    </label>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default BankForm;