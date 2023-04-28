class Billing {
    constructor(billing_id, id, billing_amount, status, remark, created_at, created_by, updated_at, updated_by) {
        this.billing_id = billing_id;
        this.id = id;
        this.billing_amount = billing_amount;
        this.status = status;
        this.remark = remark;
        this.created_at = created_at;
        this.created_by = created_by;
        this.updated_at = updated_at;
        this.updated_by = updated_by;
    }
  
    static mapFromRow(row) {
        try {
            return new Billing(
                row.billing_id,
                row.id,
                row.billing_amount,
                row.status,
                row.remark,
                row.created_at,
                row.created_by,
                row.updated_at,
                row.updated_by
            );
        } catch (err) {
            console.error('Error while mapping Billing from row:', err);
            throw err;
        }
    }
  
    static mapFromRows(rows) {
        try {
            return rows.map(row => Billing.mapFromRow(row));
        } catch (err) {
            console.error('Error while mapping Billing from rows:', err);
            throw err;
        }
    }
  }
module.exports = Billing;
  