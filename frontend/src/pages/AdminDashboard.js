import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * AdminDashboard Page
 * 
 * This page displays:
 * - Overview statistics (total equipment, pending requests, etc.)
 * - Recent borrowing requests
 * - Quick actions (approve/reject requests)
 * - Links to detailed management pages
 * 
 * Props:
 * - user: Current logged-in user object (admin)
 * 
 * Future Integration with Backend:
 * - Dashboard stats: GET /api/admin/stats
 * - Recent requests: GET /api/requests?limit=10
 * - Approve request: POST /api/requests/:requestId/approve
 * - Reject request: POST /api/requests/:requestId/reject
 */

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  // Mock statistics data
  const mockStats = {
    totalEquipment: 45,
    availableEquipment: 32,
    borrowedEquipment: 13,
    pendingRequests: 7,
    totalUsers: 156,
    activeLoans: 13,
  };

  // Mock recent requests data
  const mockRecentRequests = [
    {
      id: 1,
      studentName: 'John Student',
      studentId: 'STU001',
      equipmentName: 'Basketball Set',
      requestedDate: '2025-11-02',
      status: 'pending',
    },
    {
      id: 2,
      studentName: 'Jane Doe',
      studentId: 'STU002',
      equipmentName: 'Microscope',
      requestedDate: '2025-11-02',
      status: 'pending',
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      studentId: 'STU003',
      equipmentName: 'Digital Camera',
      requestedDate: '2025-11-01',
      status: 'pending',
    },
    {
      id: 4,
      studentName: 'Sarah Smith',
      studentId: 'STU004',
      equipmentName: 'Laptop',
      requestedDate: '2025-11-01',
      status: 'pending',
    },
    {
      id: 5,
      studentName: 'Tom Wilson',
      studentId: 'STU005',
      equipmentName: 'Projector',
      requestedDate: '2025-10-31',
      status: 'pending',
    },
  ];

  // State management
  const [requests, setRequests] = useState(mockRecentRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionModal, setActionModal] = useState(null);

  /**
   * Handle approve request
   * In Phase 2: Will call POST /api/requests/:requestId/approve
   */
  const handleApproveRequest = (requestId) => {
    setRequests(
      requests.map((req) =>
        req.id === requestId ? { ...req, status: 'approved' } : req
      )
    );
    setActionModal(null);
    alert('Request approved successfully!');
  };

  /**
   * Handle reject request
   * In Phase 2: Will call POST /api/requests/:requestId/reject
   */
  const handleRejectRequest = (requestId) => {
    setRequests(
      requests.map((req) =>
        req.id === requestId ? { ...req, status: 'rejected' } : req
      )
    );
    setActionModal(null);
    alert('Request rejected successfully!');
  };

  /**
   * Get pending requests count
   */
  const getPendingRequestsCount = () => {
    return requests.filter((req) => req.status === 'pending').length;
  };

  return (
    <div className="container-fluid py-4">
      {/* Welcome Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="h3 fw-bold text-dark">
            <i className="fa fa-tachometer me-2 text-primary"></i>Admin Dashboard
          </h1>
          <p className="text-muted">Welcome, {user.name}. Manage equipment and handle requests.</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-4 g-3">
        {/* Total Equipment Card */}
        <div className="col-md-4 col-lg-2">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted small mb-1">
                    <i className="fa fa-box me-1"></i>Total Equipment
                  </p>
                  <h4 className="fw-bold text-primary mb-0">{mockStats.totalEquipment}</h4>
                </div>
                <i className="fa fa-cubes fa-2x text-dark"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Available Equipment Card */}
        <div className="col-md-4 col-lg-2">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted small mb-1">
                    <i className="fa fa-check-circle me-1"></i>Available
                  </p>
                  <h4 className="fw-bold text-success mb-0">{mockStats.availableEquipment}</h4>
                </div>
                <i className="fa fa-check-circle fa-2x text-dark"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Borrowed Equipment Card */}
        <div className="col-md-4 col-lg-2">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted small mb-1">
                    <i className="fa fa-arrow-right me-1"></i>Borrowed
                  </p>
                  <h4 className="fw-bold text-info mb-0">{mockStats.borrowedEquipment}</h4>
                </div>
                <i className="fa fa-arrow-right fa-2x text-dark"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Requests Card */}
        <div className="col-md-4 col-lg-2">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted small mb-1">
                    <i className="fa fa-hourglass-half me-1"></i>Pending
                  </p>
                  <h4 className="fw-bold text-warning mb-0">{getPendingRequestsCount()}</h4>
                </div>
                <i className="fa fa-hourglass-half fa-2x text-dark"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Total Users Card */}
        <div className="col-md-4 col-lg-2">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted small mb-1">
                    <i className="fa fa-users me-1"></i>Total Users
                  </p>
                  <h4 className="fw-bold text-secondary mb-0">{mockStats.totalUsers}</h4>
                </div>
                <i className="fa fa-users fa-2x text-dark"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Active Loans Card */}
        <div className="col-md-4 col-lg-2">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted small mb-1">
                    <i className="fa fa-exchange me-1"></i>Active Loans
                  </p>
                  <h4 className="fw-bold text-danger mb-0">{mockStats.activeLoans}</h4>
                </div>
                <i className="fa fa-exchange fa-2x text-dark"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="fw-bold text-dark mb-3">
            <i className="fa fa-bolt me-2 text-warning"></i>Quick Actions
          </h5>
          <div className="d-flex gap-2 flex-wrap">
            <button 
              type="button"
              onClick={() => navigate('/equipment-management')} 
              className="btn btn-outline-primary"
            >
              <i className="fa fa-plus-circle me-1"></i>Add Equipment
            </button>
            <button 
              type="button"
              onClick={() => navigate('/equipment-management')} 
              className="btn btn-outline-secondary"
            >
              <i className="fa fa-edit me-1"></i>Manage Equipment
            </button>
            <button 
              type="button"
              onClick={() => navigate('/requests')} 
              className="btn btn-outline-info"
            >
              <i className="fa fa-list me-1"></i>View All Requests
            </button>
          </div>
        </div>
      </div>

      {/* Pending Requests Section */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light border-bottom">
              <h5 className="fw-bold text-dark mb-0">
                <i className="fa fa-clock-o me-2 text-warning"></i>Pending Requests
                <span className="badge bg-warning ms-2">{getPendingRequestsCount()}</span>
              </h5>
            </div>
            <div className="card-body p-0">
              {requests.filter((req) => req.status === 'pending').length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="fw-600 text-dark">
                          <i className="fa fa-user me-2"></i>Student
                        </th>
                        <th className="fw-600 text-dark">
                          <i className="fa fa-box me-2"></i>Equipment
                        </th>
                        <th className="fw-600 text-dark">
                          <i className="fa fa-calendar me-2"></i>Requested Date
                        </th>
                        <th className="fw-600 text-dark text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests
                        .filter((req) => req.status === 'pending')
                        .map((request) => (
                          <tr key={request.id}>
                            <td>
                              <div>
                                <p className="fw-600 text-dark mb-1">{request.studentName}</p>
                                <small className="text-muted">{request.studentId}</small>
                              </div>
                            </td>
                            <td>
                              <span className="badge bg-light text-dark">
                                <i className="fa fa-box me-1"></i>
                                {request.equipmentName}
                              </span>
                            </td>
                            <td className="text-muted">{request.requestedDate}</td>
                            <td className="text-center">
                              <button
                                className="btn btn-sm btn-success me-2"
                                onClick={() => setActionModal({ id: request.id, action: 'approve' })}
                                title="Approve request"
                              >
                                <i className="fa fa-check me-1"></i>Approve
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => setActionModal({ id: request.id, action: 'reject' })}
                                title="Reject request"
                              >
                                <i className="fa fa-times me-1"></i>Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="fa fa-check-circle fa-2x text-success mb-2 d-block"></i>
                  <p className="text-muted">No pending requests</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Confirmation Modal */}
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
                  ) : (
                    <>
                      <i className="fa fa-times-circle me-2 text-danger"></i>Reject Request
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
                <p className="text-muted">
                  Are you sure you want to{' '}
                  <strong>{actionModal.action === 'approve' ? 'approve' : 'reject'}</strong> this
                  request?
                </p>
                <div className="alert alert-info alert-sm">
                  <i className="fa fa-info-circle me-2"></i>
                  This action will notify the student via email.
                </div>
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
                  className={actionModal.action === 'approve' ? 'btn btn-success' : 'btn btn-danger'}
                  onClick={() =>
                    actionModal.action === 'approve'
                      ? handleApproveRequest(actionModal.id)
                      : handleRejectRequest(actionModal.id)
                  }
                >
                  <i className={`fa ${actionModal.action === 'approve' ? 'fa-check' : 'fa-times'} me-1`}></i>
                  {actionModal.action === 'approve' ? 'Approve' : 'Reject'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;