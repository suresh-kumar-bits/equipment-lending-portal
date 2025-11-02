import React, { useState } from 'react';

/**
 * EquipmentManagement Page
 * 
 * This page allows admins to:
 * - View all equipment in a table
 * - Add new equipment
 * - Edit existing equipment
 * - Delete equipment
 * - Search and filter equipment
 * 
 * Props:
 * - user: Current logged-in user object (admin)
 * 
 * Future Integration with Backend:
 * - Get equipment: GET /api/equipment
 * - Add equipment: POST /api/equipment
 * - Update equipment: PUT /api/equipment/:id
 * - Delete equipment: DELETE /api/equipment/:id
 */

const EquipmentManagement = ({ user }) => {
  // Mock equipment data
  const mockEquipmentData = [
    {
      id: 1,
      name: 'Basketball Set',
      category: 'Sports',
      description: 'Professional basketball set with 5 balls and pump',
      condition: 'Good',
      quantity: 5,
      available: 3,
      location: 'Sports Room A',
    },
    {
      id: 2,
      name: 'Microscope',
      category: 'Lab',
      description: 'Advanced optical microscope for laboratory work',
      condition: 'Excellent',
      quantity: 10,
      available: 8,
      location: 'Lab 1',
    },
    {
      id: 3,
      name: 'Digital Camera',
      category: 'Camera',
      description: '24MP DSLR camera with lenses',
      condition: 'Good',
      quantity: 4,
      available: 2,
      location: 'Media Room',
    },
  ];

  // State management
  const [equipment, setEquipment] = useState(mockEquipmentData);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    category: 'Sports',
    description: '',
    condition: 'Good',
    quantity: '',
    available: '',
    location: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  /**
   * Get unique categories
   */
  const getCategories = () => {
    const categories = [...new Set(equipment.map((item) => item.category))];
    return categories;
  };

  /**
   * Filter equipment
   */
  const getFilteredEquipment = () => {
    let filtered = equipment;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    return filtered;
  };

  /**
   * Open modal for adding new equipment
   */
  const handleAddEquipment = () => {
    setModalMode('add');
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Sports',
      description: '',
      condition: 'Good',
      quantity: '',
      available: '',
      location: '',
    });
    setShowModal(true);
  };

  /**
   * Open modal for editing equipment
   */
  const handleEditEquipment = (item) => {
    setModalMode('edit');
    setEditingId(item.id);
    setFormData({
      name: item.name,
      category: item.category,
      description: item.description,
      condition: item.condition,
      quantity: item.quantity,
      available: item.available,
      location: item.location,
    });
    setShowModal(true);
  };

  /**
   * Handle form input change
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' || name === 'available' ? parseInt(value) || '' : value,
    });
  };

  /**
   * Handle form submission
   * In Phase 2: Will call POST /api/equipment or PUT /api/equipment/:id
   */
  const handleSubmitForm = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.quantity || !formData.available) {
      alert('Please fill in all required fields');
      return;
    }

    if (modalMode === 'add') {
      // Add new equipment
      const newEquipment = {
        id: equipment.length + 1,
        ...formData,
      };
      setEquipment([...equipment, newEquipment]);
      alert('Equipment added successfully!');
    } else {
      // Edit existing equipment
      setEquipment(
        equipment.map((item) =>
          item.id === editingId ? { ...item, ...formData } : item
        )
      );
      alert('Equipment updated successfully!');
    }

    setShowModal(false);
  };

  /**
   * Handle delete equipment
   * In Phase 2: Will call DELETE /api/equipment/:id
   */
  const handleDeleteEquipment = (id) => {
    setEquipment(equipment.filter((item) => item.id !== id));
    setDeleteConfirmId(null);
    alert('Equipment deleted successfully!');
  };

  /**
   * API Documentation entry
   */
  const filteredEquipment = getFilteredEquipment();

  return (
    <div className="container-fluid py-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="h3 fw-bold text-dark">
            <i className="fa fa-toolbox me-2 text-primary"></i>Equipment Management
          </h1>
          <p className="text-muted">Add, edit, or delete equipment from inventory</p>
        </div>
        <div className="col-md-4 text-end">
          <button
            className="btn btn-primary"
            onClick={handleAddEquipment}
          >
            <i className="fa fa-plus-circle me-2"></i>Add New Equipment
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="row mb-4">
        <div className="col-md-8">
          <label className="form-label fw-600 text-dark">
            <i className="fa fa-search me-2"></i>Search Equipment
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Search by equipment name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label fw-600 text-dark">
            <i className="fa fa-filter me-2"></i>Filter by Category
          </label>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {getCategories().map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Counter */}
      <div className="row mb-3">
        <div className="col-12">
          <p className="text-muted small">
            Showing <strong>{filteredEquipment.length}</strong> of{' '}
            <strong>{equipment.length}</strong> items
          </p>
        </div>
      </div>

      {/* Equipment Table */}
      {filteredEquipment.length > 0 ? (
        <div className="row mb-4">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-hover border">
                <thead className="table-light">
                  <tr>
                    <th className="fw-600 text-dark">
                      <i className="fa fa-box me-2"></i>Equipment Name
                    </th>
                    <th className="fw-600 text-dark">
                      <i className="fa fa-tag me-2"></i>Category
                    </th>
                    <th className="fw-600 text-dark">
                      <i className="fa fa-info-circle me-2"></i>Condition
                    </th>
                    <th className="fw-600 text-dark">
                      <i className="fa fa-list me-2"></i>Total Qty
                    </th>
                    <th className="fw-600 text-dark">
                      <i className="fa fa-check-circle me-2"></i>Available
                    </th>
                    <th className="fw-600 text-dark">
                      <i className="fa fa-map-marker me-2"></i>Location
                    </th>
                    <th className="fw-600 text-dark text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEquipment.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong className="text-dark">{item.name}</strong>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark">
                          {item.category}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${
                          item.condition === 'Excellent' ? 'bg-success' :
                          item.condition === 'Good' ? 'bg-info' :
                          item.condition === 'Fair' ? 'bg-warning' :
                          'bg-danger'
                        }`}>
                          {item.condition}
                        </span>
                      </td>
                      <td className="text-muted">{item.quantity}</td>
                      <td>
                        <strong className={item.available > 0 ? 'text-success' : 'text-danger'}>
                          {item.available}
                        </strong>
                      </td>
                      <td className="text-muted">{item.location}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEditEquipment(item)}
                          title="Edit equipment"
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => setDeleteConfirmId(item.id)}
                          title="Delete equipment"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-5">
          <i className="fa fa-inbox fa-3x text-muted mb-3 d-block"></i>
          <h5 className="text-muted">No equipment found</h5>
          <p className="text-muted small">Try adjusting your search filters</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-light border-bottom">
                <h5 className="modal-title fw-bold">
                  <i className={`fa ${modalMode === 'add' ? 'fa-plus-circle' : 'fa-edit'} me-2 text-primary`}></i>
                  {modalMode === 'add' ? 'Add New Equipment' : 'Edit Equipment'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmitForm}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-600 text-dark">Equipment Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter equipment name"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-600 text-dark">Category *</label>
                      <select
                        className="form-select"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        <option value="Sports">Sports</option>
                        <option value="Lab">Lab</option>
                        <option value="Camera">Camera</option>
                        <option value="Musical">Musical</option>
                        <option value="Computing">Computing</option>
                        <option value="Tools">Tools</option>
                      </select>
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label fw-600 text-dark">Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter equipment description"
                        rows="3"
                      ></textarea>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-600 text-dark">Condition</label>
                      <select
                        className="form-select"
                        name="condition"
                        value={formData.condition}
                        onChange={handleInputChange}
                      >
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-600 text-dark">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g., Sports Room A"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-600 text-dark">Total Quantity *</label>
                      <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="Enter total quantity"
                        min="1"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-600 text-dark">Available Quantity *</label>
                      <input
                        type="number"
                        className="form-control"
                        name="available"
                        value={formData.available}
                        onChange={handleInputChange}
                        placeholder="Enter available quantity"
                        min="0"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer border-top">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`btn ${modalMode === 'add' ? 'btn-success' : 'btn-warning'}`}
                  onClick={handleSubmitForm}
                >
                  <i className={`fa ${modalMode === 'add' ? 'fa-plus' : 'fa-save'} me-1`}></i>
                  {modalMode === 'add' ? 'Add Equipment' : 'Update Equipment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-light border-bottom">
                <h5 className="modal-title fw-bold">
                  <i className="fa fa-exclamation-circle me-2 text-danger"></i>Delete Equipment
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setDeleteConfirmId(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-muted">
                  Are you sure you want to delete this equipment? This action cannot be undone.
                </p>
                <div className="alert alert-danger alert-sm">
                  <i className="fa fa-warning me-2"></i>
                  <strong>Warning:</strong> All associated borrowing records will remain.
                </div>
              </div>
              <div className="modal-footer border-top">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setDeleteConfirmId(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteEquipment(deleteConfirmId)}
                >
                  <i className="fa fa-trash me-1"></i>Delete Equipment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentManagement;