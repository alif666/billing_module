//This is product type. 1:M ProductSub and 1:1 ProductExt
class Product {
    constructor(product_id, id, product_name, status, remark, created_at, created_by, updated_at, updated_by) {
        this.product_id = product_id;
        this.id = id;
        this.product_name = product_name;
        this.status = status;
        this.remark = remark;
        this.created_at = created_at;
        this.created_by = created_by;
        this.updated_at = updated_at;
        this.updated_by = updated_by;
    }
  
    static mapFromRow(row) {
        try {
            return new Product(
                row.product_id,
                row.id,
                row.product_name,
                row.status,
                row.remark,
                row.created_at,
                row.created_by,
                row.updated_at,
                row.updated_by
            );
        } catch (err) {
            console.error('Error while mapping Product from row:', err);
            throw err;
        }
    }
  
    static mapFromRows(rows) {
        try {
            return rows.map(row => Product.mapFromRow(row));
        } catch (err) {
            console.error('Error while mapping Product from rows:', err);
            throw err;
        }
    }
  }
  
  module.exports = Product;
  