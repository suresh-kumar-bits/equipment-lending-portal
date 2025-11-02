import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * BorrowEquipment Page
 * 
 * This page allows students to borrow equipment with:
 * - Equipment selection
 * - Date range selection
 * - Notes/comments
 * - Confirmation before submission
 * 
 * Props:
 * - user: Current logged-in user object
 * 
 * Future Integration with Backend:
 * - GET /api/equipment (available equipment)
 * - POST /api/requests/create (submit borrow request)
 */

const BorrowEquipment = ({ user }) => {
  const navigate = useNavigate();

  // Mock equipment data
  const mockEquipmentData = [
    {
      id: 1,
      name: 'Basketball Set',
      category: 'Sports',
      description: 'Professional basketball set with 5 balls and pump',
      condition: 'Good',
      available: 3,
    },
    {
      id: 2,
      name: 'Microscope',
      category: 'Lab',
      description: 'Advanced optical microscope for laboratory work',
      condition: 'Excellent',
      available: 8,
    },
    {
      id: 3,
      name: 'Digital Camera',
      category: 'Camera',
      description: '24MP DSLR camera with lenses',
      condition: 'Good',
      available: 2,
    },
    {
      id: 4,
      name: 'Guitar',
      category: 'Musical',
      description: 'Acoustic guitar with case and accessories',
      condition: 'Good',
      available: 1,
    },
    {
      id: 5,
      name: 'Laptop',
      category: 'Computing',
      description: 'Intel i7 laptop for project work',
      condition: 'Excellent',
      available: 4,
    },
    {
      id: 7,
      name: 'Projector',
      category: 'Computing',
      description: '4K projector for presentations',
      condition: 'Good',
      available: 2,
    },
  ];

  // State management
  const [equipment, setEquipment] = useState(mockEquipmentData);
  const [formData, setFormData] = useState({
    equipmentId: '',
    equipmentName: '',
    borrowFromDate: '',
    borrowToDate: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle equipment selection
   */
  const handleEquipmentChange = (e) => {
    const selectedId = e.target.value;
    const selectedEquipment = equipment.find((item) => item.id === parseInt(selectedId));

    setFormData({
      ...formData,
      equipmentId: selectedId,
      equipmentName: selectedEquipment ? selectedEquipment.name : '',
    });

    setErrors({ ...errors, equipmentId: '' });
  };

  /**
   * Handle input change
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  /**
   * Validate form
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.equipmentId) {
      newErrors.equipmentId = 'Please select equipment';
    }

    if (!formData.borrowFromDate) {
      newErrors.borrowFromDate = 'Please select a borrow date';
    }

    if (!formData.borrowToDate) {
      newErrors.borrowToDate = 'Please select a return date';
    }

    if (formData.borrowFromDate && formData.borrowToDate) {
      if (new Date(formData.borrowFromDate) >= new Date(formData.borrowToDate)) {
        newErrors.borrowToDate = 'Return date must be after borrow date';
      }
    }

    if (!formData.notes) {
      newErrors.notes = 'Please enter purpose/notes';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setShowConfirmation(true);
  };

  /**
   * Confirm and submit borrow request
   * In Phase 2: Will call POST /api/requests/create
   */
  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock API call success
      alert('Borrow request submitted successfully! An admin will review your request soon.');

      // Reset form
      setFormData({
        equipmentId: '',
        equipmentName: '',
        borrowFromDate: '',
        borrowToDate: '',
        notes: '',
      });

      setShowConfirmation(false);

      // Redirect to borrow history after 1 second
      setTimeout(() => {
        navigate('/borrow-history');
      }, 1000);
    } catch (error) {
      alert('Error submitting request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Get today's date in YYYY-MM-DD format
   */
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const selectedEquipmentItem = equipment.find(
    (item) => item.id === parseInt(formData.equipmentId)
  );

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          {/* Header */}
          <div className="mb-4">
            <h1 className="h3 fw-bold text-dark">
              <i className="fa fa-plus-circle me-2 text-primary"></i>Borrow Equipment
            </h1>
            <p className="text-muted">Submit a request to borrow equipment from our inventory</p>
          </div>

          {/* Form Card */}
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {/* Equipment Selection */}
                <div className="mb-4">
                  <label htmlFor="equipment" className="form-label fw-600 text-dark">
                    <i className="fa fa-box me-2"></i>Select Equipment *
                  </label>
                  <select
                    id="equipment"
                    className={`form-select form-select-lg ${errors.equipmentId ? 'is-invalid' : ''}`}
                    value={formData.equipmentId}
                    onChange={handleEquipmentChange}
                  >
                    <option value="">-- Choose Equipment --</option>
                    {equipment.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} (Available: {item.available})
                      </option>
                    ))}
                  </select>
                  {errors.equipmentId && (
                    <div className="invalid-feedback d-block">{errors.equipmentId}</div>
                  )}
                </div>

                {/* Equipment Details */}
                {selectedEquipmentItem && (
                  <div className="alert alert-info alert-sm mb-4">
                    <div className="row">
                      <div className="col-md-6">
                        <p className="mb-1">
                          <strong>Category:</strong> {selectedEquipmentItem.category}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-1">
                          <strong>Condition:</strong> {selectedEquipmentItem.condition}
                        </p>
                      </div>
                    </div>
                    <p className="mb-0 small text-muted mt-2">
                      {selectedEquipmentItem.description}
                    </p>
                  </div>
                )}

                {/* Borrow From Date */}
                <div className="mb-4">
                  <label htmlFor="borrowFromDate" className="form-label fw-600 text-dark">
                    <i className="fa fa-calendar me-2"></i>Borrow From Date *
                  </label>
                  <input
                    type="date"
                    id="borrowFromDate"
                    className={`form-control form-control-lg ${errors.borrowFromDate ? 'is-invalid' : ''}`}
                    name="borrowFromDate"
                    value={formData.borrowFromDate}
                    onChange={handleInputChange}
                    min={getTodayDate()}
                  />
                  {errors.borrowFromDate && (
                    <div className="invalid-feedback d-block">{errors.borrowFromDate}</div>
                  )}
                </div>

                {/* Return To Date */}
                <div className="mb-4">
                  <label htmlFor="borrowToDate" className="form-label fw-600 text-dark">
                    <i className="fa fa-calendar me-2"></i>Return By Date *
                  </label>
                  <input
                    type="date"
                    id="borrowToDate"
                    className={`form-control form-control-lg ${errors.borrowToDate ? 'is-invalid' : ''}`}
                    name="borrowToDate"
                    value={formData.borrowToDate}
                    onChange={handleInputChange}
                    min={formData.borrowFromDate || getTodayDate()}
                  />
                  {errors.borrowToDate && (
                    <div className="invalid-feedback d-block">{errors.borrowToDate}</div>
                  )}
                </div>

                {/* Purpose/Notes */}
                <div className="mb-4">
                  <label htmlFor="notes" className="form-label fw-600 text-dark">
                    <i className="fa fa-sticky-note me-2"></i>Purpose/Notes *
                  </label>
                  <textarea
                    id="notes"
                    className={`form-control ${errors.notes ? 'is-invalid' : ''}`}
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Explain why you need this equipment"
                    rows="4"
                  ></textarea>
                  <small className="text-muted d-block mt-1">
                    This helps admins understand your request
                  </small>
                  {errors.notes && (
                    <div className="invalid-feedback d-block">{errors.notes}</div>
                  )}
                </div>

                {/* Important Notice */}
                <div className="alert alert-warning alert-sm mb-4">
                  <i className="fa fa-info-circle me-2"></i>
                  <strong>Important:</strong> This is a request. An administrator will review and
                  approve or reject your request. You will be notified via email.
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold">
                  <i className="fa fa-paper-plane me-2"></i>Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-light border-bottom">
                <h5 className="modal-title fw-bold">
                  <i className="fa fa-check-circle me-2 text-success"></i>Confirm Request
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirmation(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="mb-3">Please review your request details:</p>

                <div className="bg-light p-3 rounded mb-3">
                  <div className="mb-2">
                    <p className="text-muted small mb-1">Equipment:</p>
                    <p className="fw-600 text-dark mb-0">{formData.equipmentName}</p>
                  </div>

                  <hr className="my-2" />

                  <div className="mb-2">
                    <p className="text-muted small mb-1">Borrow Period:</p>
                    <p className="fw-600 text-dark mb-0">
                      {formData.borrowFromDate} to {formData.borrowToDate}
                    </p>
                  </div>

                  <hr className="my-2" />

                  <div className="mb-0">
                    <p className="text-muted small mb-1">Purpose:</p>
                    <p className="text-dark mb-0">{formData.notes}</p>
                  </div>
                </div>

                <p className="text-muted small">
                  Once submitted, your request will be reviewed by an administrator.
                </p>
              </div>
              <div className="modal-footer border-top">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmation(false)}
                  disabled={isSubmitting}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleConfirmSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="fa fa-check me-1"></i>Confirm & Submit
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowEquipment;