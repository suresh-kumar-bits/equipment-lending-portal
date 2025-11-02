import React, { useState } from 'react';

/**
 * RequestsManagement Page
 * 
 * This page allows admins to:
 * - View all borrowing requests
 * - Filter by status (pending, approved, rejected, returned)
 * - Search by student name or equipment name
 * - Approve/Reject requests with notes
 * - Mark equipment as returned
 * 
 * Props:
 * - user: Current logged-in user object (admin)
 * 
 * Future Integration with Backend:
 * - GET /api/requests
 * - POST /api/requests/:id/approve
 * - POST /api/requests/:id/reject
 * - POST /api/requests/:id/return
 */

const RequestsManagement = ({ user }) => {
  // Mock requests data
  const mockRequestsData = [
    {
      id: 1,
      studentName: 'John Student',
      studentId: 'STU001',
      studentEmail: 'student@example.com',
      equipmentName: 'Basketball Set',
      equipmentId: 1,
      requestedDate: '2025-11-02',
      borrowFromDate: '2025-11-05',
      borrowToDate: '2025-11-10',
      purpose: 'Sports practice and tournament',
      status: 'pending',
      approvedBy: null,
      approvalDate: null,
      notes: null,
    },
    {
      id: 2,
      studentName: 'Jane Doe',
      studentId: 'STU002',
      studentEmail: 'jane@example.com',
      equipmentName: 'Microscope',
      equipmentId: 2,
      requestedDate: '2025-11-02',
      borrowFromDate: '2025-11-06',
      borrowToDate: '2025-11-08',
      purpose: 'Biology lab experiment',
      status: 'pending',
      approvedBy: null,
      approvalDate: null,
      notes: null,
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      studentId: 'STU003',
      studentEmail: 'mike@example.com',
      equipmentName: 'Digital Camera',
      equipmentId: 3,
      requestedDate: '2025-11-01',
      borrowFromDate: '2025-11-03',
      borrowToDate: '2025-11-05',
      purpose: 'Photography project',
      status: 'approved',
      approvedBy: 'Admin User',
      approvalDate: '2025-11-01',
      notes: 'Approved - return in good condition',
    },
    {
      id: 4,
      studentName: 'Sarah Smith',
      studentId: 'STU004',
      studentEmail: 'sarah@example.com',
      equipmentName: 'Laptop',
      equipmentId: 5,
      requestedDate: '2025-11-01',
      borrowFromDate: '2025-11-02',
      borrowToDate: '2025-11-04',
      purpose: 'Programming assignment',
      status: 'returned',
      approvedBy: 'Admin User',
      approvalDate: '2025-11-01',
      notes: 'Returned in good condition',
    },
    {
      id: 5,
      studentName: 'Tom Wilson',
      studentId: 'STU005',
      studentEmail: 'tom@example.com',
      equipmentName: 'Guitar',
      equipmentId: 4,
      requestedDate: '2025-10-31',
      borrowFromDate: '2025-11-01',
      borrowToDate: '2025-11-03',
      purpose: 'Musical practice',
      status: 'rejected',
      approvedBy: 'Admin User',
      approvalDate: '2025-10-31',
      notes: 'Equipment damaged - not available',
    },
  ];

  // State management
  const [requests, setRequests] = useState(mockRequestsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [actionModal, setActionModal] = useState(null);
  const [actionNotes, setActionNotes] = useState('');
  const [viewDetails, setViewDetails] = useState(null);

  /**
   * Filter requests based on search and status
   */
  const getFilteredRequests = () => {
    let filtered = requests;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (req) =>
          req.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter((req) => req.status === filterStatus);
    }

    return filtered;
  };

  /**
   * Get status badge styling
   */
  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: { bg: 'bg-warning', icon: 'fa-hourglass-half', text: 'Pending' },
      approved: { bg: 'bg-success', icon: 'fa-check-circle', text: 'Approved' },
      returned: { bg: 'bg-info', icon: 'fa-check-double', text: 'Returned' },
      rejected: { bg: 'bg-danger', icon: 'fa-times-circle', text: 'Rejected' },
    };
    return statusStyles[status] || statusStyles.pending;
  };

  /**
   * Handle approve request
   */
  const handleApprove = (requestId) => {
    setRequests(
      requests.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: 'approved',
              approvedBy: user.name,
              approvalDate: new Date().toISOString().split('T')[0],
              notes: actionNotes,
            }
          : req
      )
    );
    setActionModal(null);
    setActionNotes('');
    alert('Request approved successfully!');
  };

  /**
   * Handle reject request
   */
  const handleReject = (requestId) => {
    setRequests(
      requests.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: 'rejected',
              approvedBy: user.name,
              approvalDate: new Date().toISOString().split('T')[0],
              notes: actionNotes,
            }
          : req
      )
    );
    setActionModal(null);
    setActionNotes('');
    alert('Request rejected successfully!');
  };

  /**
   * Handle mark as returned
   */
  const handleMarkReturned = (requestId) => {
    setRequests(
      requests.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: 'returned',
              notes: actionNotes || req.notes,
            }
          : req
      )
    );
    setActionModal(null);
    setActionNotes('');
    alert('Equipment marked as returned!');
  };

  /**
   * Get request count by status
   */
  const getStatusCount = (status) => {
    return requests.filter((req) => req.status === status).length;
  };

  const filteredRequests = getFilteredRequests();

  return (
    <div className="container-fluid py-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="h3 fw-bold text-dark">
            <i className="fa fa-list me-2 text-primary"></i>Manage Requests
          </h1>
          <p className="text-muted">Review and manage all borrowing requests</p>
        </div>
      </div>

      {/* Status Summary */}
      <div className="row mb-4 g-3">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-light">
            <div className="card-body">
              <p className="text-muted small mb-1">
                <i className="fa fa-hourglass-half me-1 text-warning"></i>Pending
              </p>
              <h4 className="fw-bold text-warning mb-0">{getStatusCount('pending')}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-light">
            <div className="card-body">
              <p className="text-muted small mb-1">
                <i className="fa fa-check-circle me-1 text-success"></i>Approved
              </p>
              <h4 className="fw-bold text-success mb-0">{getStatusCount('approved')}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-light">
            <div className="card-body">
              <p className="text-muted small mb-1">
                <i className="fa fa-check-double me-1 text-info"></i>Returned
              </p>
              <h4 className="fw-bold text-info mb-0">{getStatusCount('returned')}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-light">
            <div className="card-body">
              <p className="text-muted small mb-1">
                <i className="fa fa-times-circle me-1 text-danger"></i>Rejected
              </p>
              <h4 className="fw-bold text-danger mb-0">{getStatusCount('rejected')}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="row mb-4">
        <div className="col-md-8">
          <label className="form-label fw-600 text-dark">
            <i className="fa fa-search me-2"></i>Search
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Search by student name, student ID, or equipment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label fw-600 text-dark">
            <i className="fa fa-filter me-2"></i>Filter by Status
          </label>
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="returned">Returned</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Results Counter */}
      <div className="row mb-3">
        <div className="col-12">
          <p className="text-muted small">
            Showing <strong>{filteredRequests.length}</strong> of{' '}
            <strong>{requests.length}</strong> requests
          </p>
        </div>
      </div>

      {/* Requests Table */}
      {filteredRequests.length > 0 ? (
        <div className="row mb-4">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-hover border">
                <thead className="table-light">
                  <tr>
                    <th className="fw-600 text-dark">
                      <i className="fa fa-user me-2"></i>Student
                    </th>
                    <th className="fw-600 text-dark">
                      <i className="fa fa-box me-2"></i>Equipment
                    </th>
                    <th className="fw-600 text-dark">
                      <i className="fa fa-calendar me-2"></i>Borrow Dates
                    </th>
                    <th className="fw-600 text-dark">
                      <i className="fa fa-info-circle me-2"></i>Status
                    </th>
                    <th className="fw-600 text-dark text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => {
                    const status = getStatusBadge(request.status);
                    return (
                      <tr key={request.id}>
                        <td>
                          <div>
                            <p className="fw-600 text-dark mb-1">{request.studentName}</p>
                            <small className="text-muted">{request.studentId}</small>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark">
                            {request.equipmentName}
                          </span>
                        </td>
                        <td className="text-muted">
                          <small>
                            {request.borrowFromDate} to {request.borrowToDate}
                          </small>
                        </td>
                        <td>
                          <span className={`badge ${status.bg}`}>
                            <i className={`fa ${status.icon} me-1`}></i>
                            {status.text}
                          </span>
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => setViewDetails(request)}
                            title="View details"
                          >
                            <i className="fa fa-eye"></i>
                          </button>

                          {request.status === 'pending' && (
                            <>
                              <button
                                className="btn btn-sm btn-success me-2"
                                onClick={() =>
                                  setActionModal({ id: request.id, action: 'approve' })
                                }
                                title="Approve"
                              >
                                <i className="fa fa-check"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  setActionModal({ id: request.id, action: 'reject' })
                                }
                                title="Reject"
                              >
                                <i className="fa fa-times"></i>
                              </button>
                            </>
                          )}

                          {request.status === 'approved' && (
                            <button
                              className="btn btn-sm btn-info"
                              onClick={() =>
                                setActionModal({ id: request.id, action: 'return' })
                              }
                              title="Mark as returned"
                            >
                              <i className="fa fa-arrow-left me-1"></i>Returned
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-5">
          <i className="fa fa-inbox fa-3x text-muted mb-3 d-block"></i>
          <h5 className="text-muted">No requests found</h5>
          <p className="text-muted small">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Details Modal */}
      {viewDetails && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-light border-bottom">
                <h5 className="modal-title fw-bold">
                  <i className="fa fa-info-circle me-2 text-primary"></i>Request Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setViewDetails(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <h6 className="fw-600 text-dark mb-2">Student Information</h6>
                  <p className="mb-1">
                    <strong>{viewDetails.studentName}</strong>
                  </p>
                  <p className="mb-1 small text-muted">ID: {viewDetails.studentId}</p>
                  <p className="small text-muted">{viewDetails.studentEmail}</p>
                </div>

                <hr />

                <div className="mb-3">
                  <h6 className="fw-600 text-dark mb-2">Equipment</h6>
                  <p className="mb-0">{viewDetails.equipmentName}</p>
                </div>

                <hr />

                <div className="mb-3">
                  <h6 className="fw-600 text-dark mb-2">Dates</h6>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Requested:</span>
                    <strong>{viewDetails.requestedDate}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">From:</span>
                    <strong>{viewDetails.borrowFromDate}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">To:</span>
                    <strong>{viewDetails.borrowToDate}</strong>
                  </div>
                </div>

                <hr />

                <div className="mb-3">
                  <h6 className="fw-600 text-dark mb-2">Purpose</h6>
                  <p className="text-muted mb-0">{viewDetails.purpose}</p>
                </div>

                <hr />

                <div className="mb-0">
                  <h6 className="fw-600 text-dark mb-2">Status</h6>
                  <span className={`badge ${getStatusBadge(viewDetails.status).bg}`}>
                    {getStatusBadge(viewDetails.status).text}
                  </span>
                  {viewDetails.notes && (
                    <p className="small text-muted mt-2 mb-0">Notes: {viewDetails.notes}</p>
                  )}
                </div>
              </div>
              <div className="modal-footer border-top">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setViewDetails(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Modal */}
      {actionModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-light border-bottom">
                <h5 className="modal-title fw-bold">
                  {actionModal.action === 'approve' ? (
                    <>
                      <i className="fa fa-check-circle me-2 text-success"></i>Approve Request
                    </>
                  ) : actionModal.action === 'reject' ? (
                    <>
                      <i className="fa fa-times-circle me-2 text-danger"></i>Reject Request
                    </>
                  ) : (
                    <>
                      <i className="fa fa-arrow-left me-2 text-info"></i>Mark as Returned
                    </>
                  )}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setActionModal(null)}
                ></button>
              </div>
              <div className="modal-body">
                <label className="form-label fw-600 text-dark">
                  {actionModal.action === 'approve'
                    ? 'Approval Notes'
                    : actionModal.action === 'reject'
                    ? 'Rejection Reason'
                    : 'Return Notes'}
                </label>
                <textarea
                  className="form-control"
                  value={actionNotes}
                  onChange={(e) => setActionNotes(e.target.value)}
                  placeholder={
                    actionModal.action === 'approve'
                      ? 'Add approval notes...'
                      : actionModal.action === 'reject'
                      ? 'Explain why you are rejecting this request...'
                      : 'Add return notes (condition, etc.)...'
                  }
                  rows="4"
                ></textarea>
              </div>
              <div className="modal-footer border-top">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setActionModal(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`btn ${
                    actionModal.action === 'approve'
                      ? 'btn-success'
                      : actionModal.action === 'reject'
                      ? 'btn-danger'
                      : 'btn-info'
                  }`}
                  onClick={() =>
                    actionModal.action === 'approve'
                      ? handleApprove(actionModal.id)
                      : actionModal.action === 'reject'
                      ? handleReject(actionModal.id)
                      : handleMarkReturned(actionModal.id)
                  }
                >
                  {actionModal.action === 'approve'
                    ? 'Approve'
                    : actionModal.action === 'reject'
                    ? 'Reject'
                    : 'Mark Returned'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestsManagement;