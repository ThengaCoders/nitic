/**
 * Embeddable Event Registration Widget
 * 
 * Reusable, self-contained, and CSS-isolated registration form widget.
 * Uses Shadow DOM for complete styling isolation from the host fest website.
 * 
 * Usage:
 * <div id="event-registration"></div>
 * <script 
 *   src="https://yourplatform.com/widget.js" 
 *   data-event-id="EVENT_ID" 
 *   data-target="event-registration"
 *   data-api-base="https://yourplatform.com/api/public">
 * </script>
 */

(function () {
  'use strict';

  // Prevent multiple executions of the same script file
  if (window.EventRegistrationWidgetLoaded) return;
  window.EventRegistrationWidgetLoaded = true;

  /**
   * Widget Class definition
   */
  class EventRegistrationWidget {
    constructor(config = {}) {
      this.eventId = config.eventId;
      this.targetId = config.target;
      this.apiBase = (config.apiBase || '').replace(/\/$/, '') || '/api/public';
      this.container = null;
      this.shadow = null;
      this.fields = [];
      this.state = {
        loading: true,
        submitting: false,
        error: null,
        validationErrors: {},
        successData: null
      };

      this.init();
    }

    async init() {
      // Find mount point
      this.container = document.getElementById(this.targetId);
      if (!this.container) {
        console.error(`[EventRegistrationWidget] Target container #${this.targetId} not found.`);
        return;
      }

      // Attach Shadow DOM for CSS isolation
      try {
        this.shadow = this.container.attachShadow({ mode: 'open' });
      } catch (e) {
        // Fallback for environments where attachShadow might already be attached or restricted
        this.shadow = this.container;
      }

      this.render();

      if (!this.eventId) {
        this.setError('Missing data-event-id configuration attribute.');
        return;
      }

      // Fetch dynamic fields
      await this.loadRegistrationFields();
    }

    async loadRegistrationFields() {
      this.setState({ loading: true, error: null });
      try {
        const response = await fetch(`${this.apiBase}/events/${encodeURIComponent(this.eventId)}/fields`);
        const json = await response.json();

        if (!response.ok || !json.success) {
          throw new Error(json.message || `Failed to load fields (HTTP ${response.status})`);
        }

        this.fields = Array.isArray(json.data) ? json.data : [];
        this.setState({ loading: false });
      } catch (err) {
        this.setError(err.message || 'Unable to connect to registration server. Please try again later.');
      }
    }

    setState(newState) {
      this.state = { ...this.state, ...newState };
      this.render();
    }

    setError(message) {
      this.setState({ loading: false, submitting: false, error: message });
    }

    clearErrors() {
      this.setState({ error: null, validationErrors: {} });
    }

    /**
     * Client-side validation before submission
     */
    validateForm(formData) {
      const errors = {};
      const name = (formData.get('name') || '').trim();
      const email = (formData.get('email') || '').trim();

      if (!name) {
        errors.name = 'Full name is required.';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        errors.email = 'Email address is required.';
      } else if (!emailRegex.test(email)) {
        errors.email = 'Please enter a valid email address.';
      }

      // Validate dynamic fields
      this.fields.forEach(field => {
        const key = field.key;

        if (field.type === 'MULTI_SELECT') {
          const selected = formData.getAll(`fields[${key}][]`);
          if (field.isRequired && (!selected || selected.length === 0)) {
            errors[key] = `${field.name} is required. Select at least one.`;
          }
        } else if (field.type === 'BOOLEAN') {
          const isChecked = formData.get(`fields[${key}]`) === 'on';
          if (field.isRequired && !isChecked) {
            errors[key] = `You must agree to ${field.name}.`;
          }
        } else {
          const val = (formData.get(`fields[${key}]`) || '').trim();
          if (field.isRequired && !val) {
            errors[key] = `${field.name} is required.`;
            return;
          }

          if (val) {
            if (field.type === 'NUMBER' && isNaN(Number(val))) {
              errors[key] = `${field.name} must be a valid number.`;
            } else if (field.type === 'EMAIL' && !emailRegex.test(val)) {
              errors[key] = `Please enter a valid email address.`;
            } else if (field.type === 'PHONE' && !/^\+?[0-9\s\-()]{7,25}$/.test(val)) {
              errors[key] = `Please enter a valid phone number.`;
            } else if (field.type === 'URL') {
              try {
                const u = new URL(val);
                if (!['http:', 'https:'].includes(u.protocol)) {
                  errors[key] = 'URL must begin with http:// or https://';
                }
              } catch (_) {
                errors[key] = 'Please enter a valid URL.';
              }
            }
          }
        }
      });

      return errors;
    }

    async handleSubmit(e) {
      e.preventDefault();
      this.clearErrors();

      const form = this.shadow.querySelector('form');
      if (!form) return;

      const formData = new FormData(form);
      const errors = this.validateForm(formData);

      if (Object.keys(errors).length > 0) {
        this.setState({ validationErrors: errors });
        // Scroll first invalid field into view inside shadow DOM
        const firstErrorKey = Object.keys(errors)[0];
        const errorEl = this.shadow.querySelector(`[data-field-key="${firstErrorKey}"]`);
        if (errorEl) errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // Construct JSON payload
      const payload = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim().toLowerCase(),
        fields: {}
      };

      this.fields.forEach(field => {
        const key = field.key;
        if (field.type === 'MULTI_SELECT') {
          payload.fields[key] = formData.getAll(`fields[${key}][]`);
        } else if (field.type === 'BOOLEAN') {
          payload.fields[key] = formData.get(`fields[${key}]`) === 'on';
        } else if (field.type === 'NUMBER') {
          const raw = formData.get(`fields[${key}]`);
          payload.fields[key] = raw ? Number(raw) : null;
        } else {
          payload.fields[key] = formData.get(`fields[${key}]`);
        }
      });

      this.setState({ submitting: true, error: null, validationErrors: {} });

      try {
        const response = await fetch(`${this.apiBase}/events/${encodeURIComponent(this.eventId)}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok) {
          // If server returned structured validation errors:
          if (result.errors && Array.isArray(result.errors)) {
            const serverErrors = {};
            result.errors.forEach(err => {
              if (err.field) serverErrors[err.field] = err.message;
            });
            this.setState({
              submitting: false,
              validationErrors: serverErrors,
              error: result.message || 'Validation failed. Please correct highlighted fields.'
            });
            return;
          }
          throw new Error(result.message || `Registration failed (HTTP ${response.status})`);
        }

        // Registration successful
        this.setState({
          submitting: false,
          successData: result
        });
      } catch (err) {
        this.setError(err.message || 'Network error occurred during registration. Please try again.');
      }
    }

    /**
     * Render Methods
     */
    render() {
      if (!this.shadow) return;

      const styles = `
        :host {
          display: block;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #1f2937;
          box-sizing: border-box;
          line-height: 1.5;
        }
        *, *::before, *::after {
          box-sizing: inherit;
        }
        .widget-wrapper {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          max-width: 600px;
          margin: 0 auto;
        }
        .widget-header {
          margin-bottom: 20px;
          border-bottom: 1px solid #f3f4f6;
          padding-bottom: 12px;
        }
        .widget-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 4px 0;
        }
        .widget-subtitle {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }
        .form-group {
          margin-bottom: 18px;
        }
        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
        }
        .required-star {
          color: #ef4444;
          margin-left: 2px;
        }
        .form-control {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.95rem;
          color: #1f2937;
          background-color: #fff;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          outline: none;
        }
        .form-control:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }
        .form-control.has-error {
          border-color: #ef4444;
          background-color: #fef2f2;
        }
        .form-control.has-error:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
        }
        .field-error {
          color: #dc2626;
          font-size: 0.8rem;
          margin-top: 4px;
        }
        .checkbox-group, .radio-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 4px;
        }
        .option-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: #4b5563;
          cursor: pointer;
        }
        .option-label input[type="checkbox"],
        .option-label input[type="radio"] {
          width: 16px;
          height: 16px;
          accent-color: #2563eb;
          cursor: pointer;
        }
        .alert {
          padding: 12px 16px;
          border-radius: 6px;
          margin-bottom: 18px;
          font-size: 0.875rem;
        }
        .alert-error {
          background-color: #fee2e2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }
        .btn-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 12px 18px;
          background-color: #2563eb;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.15s ease, transform 0.05s ease;
        }
        .btn-submit:hover:not(:disabled) {
          background-color: #1d4ed8;
        }
        .btn-submit:active:not(:disabled) {
          transform: translateY(1px);
        }
        .btn-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-right: 8px;
        }
        .loading-skeleton {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px 0;
        }
        .skeleton-bar {
          height: 38px;
          background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 6px;
        }
        .skeleton-title {
          width: 50%;
          height: 24px;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Success Card Styles */
        .success-card {
          text-align: center;
          padding: 24px 12px;
        }
        .success-icon-badge {
          width: 56px;
          height: 56px;
          background-color: #d1fae5;
          color: #059669;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: 16px;
        }
        .payment-icon-badge {
          width: 56px;
          height: 56px;
          background-color: #fef3c7;
          color: #d97706;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: 16px;
        }
        .success-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 8px 0;
        }
        .success-description {
          font-size: 0.95rem;
          color: #4b5563;
          margin: 0 0 20px 0;
        }
        .ticket-box {
          background: #f9fafb;
          border: 2px dashed #d1d5db;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          text-align: left;
        }
        .ticket-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          font-size: 0.9rem;
          border-bottom: 1px solid #f3f4f6;
        }
        .ticket-row:last-child {
          border-bottom: none;
        }
        .ticket-label {
          color: #6b7280;
          font-weight: 500;
        }
        .ticket-value {
          color: #111827;
          font-weight: 600;
          word-break: break-all;
        }
        .qr-mock-box {
          margin-top: 16px;
          padding: 16px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          text-align: center;
        }
        .qr-placeholder-symbol {
          font-size: 42px;
          line-height: 1;
          margin-bottom: 8px;
        }
        .qr-token-label {
          font-family: monospace;
          font-size: 0.85rem;
          color: #374151;
          background: #f3f4f6;
          padding: 4px 8px;
          border-radius: 4px;
          display: inline-block;
          max-width: 100%;
          overflow-wrap: break-word;
        }
        .btn-secondary {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          margin-top: 14px;
        }
        .btn-secondary:hover {
          background: #e5e7eb;
        }
      `;

      let contentHtml = '';

      if (this.state.loading) {
        contentHtml = `
          <div class="loading-skeleton">
            <div class="skeleton-bar skeleton-title"></div>
            <div class="skeleton-bar"></div>
            <div class="skeleton-bar"></div>
            <div class="skeleton-bar"></div>
          </div>
        `;
      } else if (this.state.successData) {
        contentHtml = this.renderSuccessView();
      } else {
        contentHtml = this.renderFormView();
      }

      this.shadow.innerHTML = `
        <style>${styles}</style>
        <div class="widget-wrapper">
          ${contentHtml}
        </div>
      `;

      // Attach event listeners
      if (!this.state.loading && !this.state.successData) {
        const form = this.shadow.querySelector('form');
        if (form) {
          form.addEventListener('submit', this.handleSubmit.bind(this));
        }
      } else if (this.state.successData) {
        const resetBtn = this.shadow.querySelector('#btn-register-another');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            this.setState({ successData: null, error: null, validationErrors: {} });
          });
        }
      }
    }

    renderFormView() {
      const errorBanner = this.state.error
        ? `<div class="alert alert-error">${this.escapeHtml(this.state.error)}</div>`
        : '';

      const dynamicFieldsHtml = this.fields.map(field => this.renderFieldInput(field)).join('');

      return `
        <div class="widget-header">
          <h2 class="widget-title">Event Registration</h2>
          <p class="widget-subtitle">Please fill out the information below to secure your spot.</p>
        </div>

        ${errorBanner}

        <form novalidate>
          <!-- Participant Name -->
          <div class="form-group" data-field-key="name">
            <label class="form-label">
              Full Name <span class="required-star">*</span>
            </label>
            <input 
              type="text" 
              name="name" 
              class="form-control ${this.state.validationErrors.name ? 'has-error' : ''}" 
              placeholder="e.g. Jane Doe"
              required 
            />
            ${this.renderFieldError('name')}
          </div>

          <!-- Participant Email -->
          <div class="form-group" data-field-key="email">
            <label class="form-label">
              Email Address <span class="required-star">*</span>
            </label>
            <input 
              type="email" 
              name="email" 
              class="form-control ${this.state.validationErrors.email ? 'has-error' : ''}" 
              placeholder="e.g. jane@example.com"
              required 
            />
            ${this.renderFieldError('email')}
          </div>

          <!-- Dynamic Registration Fields -->
          ${dynamicFieldsHtml}

          <!-- Submit Button -->
          <button type="submit" class="btn-submit" ${this.state.submitting ? 'disabled' : ''}>
            ${this.state.submitting ? '<div class="spinner"></div> Registering...' : 'Complete Registration'}
          </button>
        </form>
      `;
    }

    renderFieldInput(field) {
      const key = field.key;
      const hasError = Boolean(this.state.validationErrors[key]);
      const requiredStar = field.isRequired ? '<span class="required-star">*</span>' : '';

      let inputMarkup = '';

      switch (field.type) {
        case 'NUMBER':
          inputMarkup = `
            <input 
              type="number" 
              name="fields[${this.escapeHtml(key)}]" 
              class="form-control ${hasError ? 'has-error' : ''}" 
              placeholder="Enter number"
              ${field.isRequired ? 'required' : ''}
            />`;
          break;

        case 'PHONE':
          inputMarkup = `
            <input 
              type="tel" 
              name="fields[${this.escapeHtml(key)}]" 
              class="form-control ${hasError ? 'has-error' : ''}" 
              placeholder="+1234567890"
              ${field.isRequired ? 'required' : ''}
            />`;
          break;

        case 'URL':
          inputMarkup = `
            <input 
              type="url" 
              name="fields[${this.escapeHtml(key)}]" 
              class="form-control ${hasError ? 'has-error' : ''}" 
              placeholder="https://example.com"
              ${field.isRequired ? 'required' : ''}
            />`;
          break;

        case 'DATE':
          inputMarkup = `
            <input 
              type="date" 
              name="fields[${this.escapeHtml(key)}]" 
              class="form-control ${hasError ? 'has-error' : ''}" 
              ${field.isRequired ? 'required' : ''}
            />`;
          break;

        case 'BOOLEAN':
          return `
            <div class="form-group" data-field-key="${this.escapeHtml(key)}">
              <label class="option-label">
                <input 
                  type="checkbox" 
                  name="fields[${this.escapeHtml(key)}]" 
                  ${field.isRequired ? 'required' : ''}
                />
                <span>${this.escapeHtml(field.name)} ${requiredStar}</span>
              </label>
              ${this.renderFieldError(key)}
            </div>
          `;

        case 'SELECT': {
          const options = Array.isArray(field.options) ? field.options : [];
          const optionsHtml = options.map(opt => {
            const val = typeof opt === 'object' && opt !== null ? opt.value : opt;
            const label = typeof opt === 'object' && opt !== null ? opt.label : opt;
            return `<option value="${this.escapeHtml(String(val))}">${this.escapeHtml(String(label))}</option>`;
          }).join('');

          inputMarkup = `
            <select 
              name="fields[${this.escapeHtml(key)}]" 
              class="form-control ${hasError ? 'has-error' : ''}"
              ${field.isRequired ? 'required' : ''}
            >
              <option value="">Select an option...</option>
              ${optionsHtml}
            </select>
          `;
          break;
        }

        case 'MULTI_SELECT': {
          const options = Array.isArray(field.options) ? field.options : [];
          const checkboxesHtml = options.map(opt => {
            const val = typeof opt === 'object' && opt !== null ? opt.value : opt;
            const label = typeof opt === 'object' && opt !== null ? opt.label : opt;
            return `
              <label class="option-label">
                <input 
                  type="checkbox" 
                  name="fields[${this.escapeHtml(key)}][]" 
                  value="${this.escapeHtml(String(val))}" 
                />
                <span>${this.escapeHtml(String(label))}</span>
              </label>
            `;
          }).join('');

          return `
            <div class="form-group" data-field-key="${this.escapeHtml(key)}">
              <label class="form-label">
                ${this.escapeHtml(field.name)} ${requiredStar}
              </label>
              <div class="checkbox-group">
                ${checkboxesHtml}
              </div>
              ${this.renderFieldError(key)}
            </div>
          `;
        }

        case 'TEXT':
        default:
          inputMarkup = `
            <input 
              type="text" 
              name="fields[${this.escapeHtml(key)}]" 
              class="form-control ${hasError ? 'has-error' : ''}" 
              placeholder="Enter ${this.escapeHtml(field.name.toLowerCase())}"
              ${field.isRequired ? 'required' : ''}
            />`;
          break;
      }

      return `
        <div class="form-group" data-field-key="${this.escapeHtml(key)}">
          <label class="form-label">
            ${this.escapeHtml(field.name)} ${requiredStar}
          </label>
          ${inputMarkup}
          ${this.renderFieldError(key)}
        </div>
      `;
    }

    renderFieldError(key) {
      if (!this.state.validationErrors[key]) return '';
      return `<div class="field-error">${this.escapeHtml(this.state.validationErrors[key])}</div>`;
    }

    renderSuccessView() {
      const data = this.state.successData.data || {};
      const isPaymentRequired = Boolean(this.state.successData.paymentRequired);

      if (isPaymentRequired) {
        return `
          <div class="success-card">
            <div class="payment-icon-badge">&#128179;</div>
            <h3 class="success-title">Payment Required</h3>
            <p class="success-description">
              Your registration is reserved! Please proceed with payment to confirm your booking and generate your entry ticket.
            </p>
            <div class="ticket-box">
              <div class="ticket-row">
                <span class="ticket-label">Registration ID</span>
                <span class="ticket-value">${this.escapeHtml(data.registrationId || 'N/A')}</span>
              </div>
              <div class="ticket-row">
                <span class="ticket-label">Status</span>
                <span class="ticket-value" style="color: #d97706;">${this.escapeHtml(data.status || 'PENDING')}</span>
              </div>
              <div class="ticket-row">
                <span class="ticket-label">Registration Fee</span>
                <span class="ticket-value" style="color: #111827; font-size: 1.1rem;">
                  $${Number(data.fee || 0).toFixed(2)}
                </span>
              </div>
            </div>
            <p style="font-size: 0.85rem; color: #6b7280;">
              An email with payment instructions has been sent to your registered email address.
            </p>
            <button id="btn-register-another" class="btn-secondary">Register Another Participant</button>
          </div>
        `;
      }

      // Confirmed Free Registration View
      const ticket = data.ticket || {};
      return `
        <div class="success-card">
          <div class="success-icon-badge">&#10003;</div>
          <h3 class="success-title">Registration Confirmed!</h3>
          <p class="success-description">
            You're all set! Your ticket has been issued and confirmed.
          </p>
          <div class="ticket-box">
            <div class="ticket-row">
              <span class="ticket-label">Registration ID</span>
              <span class="ticket-value">${this.escapeHtml(data.registrationId || 'N/A')}</span>
            </div>
            <div class="ticket-row">
              <span class="ticket-label">Ticket ID</span>
              <span class="ticket-value">${this.escapeHtml(ticket.id || 'N/A')}</span>
            </div>
            <div class="ticket-row">
              <span class="ticket-label">Status</span>
              <span class="ticket-value" style="color: #059669;">${this.escapeHtml(data.status || 'CONFIRMED')}</span>
            </div>
            <div class="ticket-row">
              <span class="ticket-label">Issued At</span>
              <span class="ticket-value">${ticket.issuedAt ? new Date(ticket.issuedAt).toLocaleString() : new Date().toLocaleString()}</span>
            </div>

            <div class="qr-mock-box">
              <div class="qr-placeholder-symbol">&#9638;</div>
              <div style="font-size: 0.8rem; color: #6b7280; margin-bottom: 4px;">Entry QR Token</div>
              <div class="qr-token-label">${this.escapeHtml(ticket.qrToken || 'TOKEN_PLACEHOLDER')}</div>
            </div>
          </div>
          <button id="btn-register-another" class="btn-secondary">Register Another Participant</button>
        </div>
      `;
    }

    escapeHtml(str) {
      if (str === null || str === undefined) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  }

  // Expose global object
  window.EventRegistrationWidget = {
    init: function (config) {
      return new EventRegistrationWidget(config);
    }
  };

  // Auto-initialize when loaded via script tag with data attributes
  function autoInit() {
    const script = document.currentScript || document.querySelector('script[data-event-id]');
    if (script) {
      const eventId = script.getAttribute('data-event-id');
      const target = script.getAttribute('data-target') || 'event-registration';
      const apiBase = script.getAttribute('data-api-base') || '';

      if (eventId && target) {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            window.EventRegistrationWidget.init({ eventId, target, apiBase });
          });
        } else {
          window.EventRegistrationWidget.init({ eventId, target, apiBase });
        }
      }
    }
  }

  autoInit();
})();
