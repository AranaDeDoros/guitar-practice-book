import React, { useState, useEffect, useRef , memo} from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "./service/ProductService";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Player } from "./Player";
import { classNames } from "primereact/utils";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";

const List  =  memo(() =>  {
  const [products, setProducts] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const toast = useRef(null);
  const [url, setUrl] = useState("");
  let emptyProduct = {
    id: null,
    name: "",
    image: null,
    description: "",
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: "INSTOCK",
  };
  const [product, setProduct] = useState(emptyProduct);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  useEffect(() => {
    ProductService.getProductsWithOrdersSmall().then((data) =>
      setProducts(data)
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _products = [...products];
      let _product = { ...product };

      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        _product.id = createId();
        _product.image = "product-placeholder.svg";
        _products.push(_product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);

    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));

    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const onCategoryChange = (e) => {
    let _product = { ...product };

    _product["category"] = e.value;
    setProduct(_product);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onRowExpand = (event) => {
    toast.current.show({
      severity: "info",
      summary: "Product Expanded",
      detail: event.data.name,
      life: 3000,
    });
  };

  const onRowCollapse = (event) => {
    toast.current.show({
      severity: "success",
      summary: "Product Collapsed",
      detail: event.data.name,
      life: 3000,
    });
  };

  const expandAll = () => {
    let _expandedRows = {};

    products.forEach((p) => (_expandedRows[`${p.id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(null);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  const amountBodyTemplate = (rowData) => {
    return formatCurrency(rowData.amount);
  };

  const statusOrderBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status.toLowerCase()}
        severity={getOrderSeverity(rowData)}
      ></Tag>
    );
  };

  const searchBodyTemplate = () => {
    return <Button icon="pi pi-search" />;
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`}
        alt={rowData.image}
        width="64px"
        className="shadow-4"
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.inventoryStatus}
        severity={getProductSeverity(rowData)}
      ></Tag>
    );
  };

  const getProductSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const getOrderSeverity = (order) => {
    switch (order.status) {
      case "DELIVERED":
        return "success";

      case "CANCELLED":
        return "danger";

      case "PENDING":
        return "warning";

      case "RETURNED":
        return "info";

      default:
        return null;
    }
  };

  const allowExpansion = (rowData) => {
    return rowData.length > 0;
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-3">
        <h5>Orders for {data.name}</h5>
        <DataTable
          value={data.orders}

        >
          <Column selectionMode="single" exportable={false}></Column>
          <Column field="id" header="Id" sortable></Column>
          <Column field="customer" header="Customer" sortable></Column>
          <Column field="date" header="Date" sortable></Column>
          <Column
            field="amount"
            header="Amount"
            body={amountBodyTemplate}
            sortable
          ></Column>
          <Column
            field="status"
            header="Status"
            body={statusOrderBodyTemplate}
            sortable
          ></Column>
          <Column
            headerStyle={{ width: "4rem" }}
            body={searchBodyTemplate}
          ></Column>
        </DataTable>
      </div>
    );
  };
  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </div>
    );
  };
  const header = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
      <Button
        icon="pi pi-minus"
        label="Collapse All"
        onClick={collapseAll}
        text
      />
    </div>
  );



  const onRowClick = (ev) => {
    setUrl("https://www.youtube.com/embed/R5MOaLXie2k?si=Z09jQzTiTKHuHT_w");
  };

  return (
    <>
      <div className="card">
        {!!url ? <Player url={url} /> : <p>no video loaded</p>}
      </div>

      <div className="card">
        <Toast ref={toast} />
        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

        <DataTable
          value={products}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          onRowExpand={onRowExpand}
          onRowCollapse={onRowCollapse}
          onRowClick={onRowClick}
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="id"
          header={header}
          tableStyle={{ minWidth: "60rem" }}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column expander={true} style={{ width: "25rem" }} />
          <Column field="name" header="Name" sortable />
          <Column header="Image" body={imageBodyTemplate} />
          <Column
            field="price"
            header="Price"
            sortable
            body={priceBodyTemplate}
          />
          <Column field="category" header="Category" sortable />
          <Column
            field="rating"
            header="Reviews"
            sortable
            body={ratingBodyTemplate}
          />
          <Column
            field="inventoryStatus"
            header="Status"
            sortable
            body={statusBodyTemplate}
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
        <Dialog
          visible={productDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Product Details"
          modal
          className="p-fluid"
          footer={productDialogFooter}
          onHide={hideDialog}
        >
          {product.image && (
            <img
              src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
              alt={product.image}
              className="product-image block m-auto pb-3"
            />
          )}
          <div className="field">
            <label htmlFor="name" className="font-bold">
              Name
            </label>
            <InputText
              id="name"
              value={product.name}
              onChange={(e) => onInputChange(e, "name")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !product.name,
              })}
            />
            {submitted && !product.name && (
              <small className="p-error">Name is required.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="description" className="font-bold">
              Description
            </label>
            <InputTextarea
              id="description"
              value={product.description}
              onChange={(e) => onInputChange(e, "description")}
              required
              rows={3}
              cols={20}
            />
          </div>

          <div className="field">
            <label className="mb-3 font-bold">Category</label>
            <div className="formgrid grid">
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category1"
                  name="category"
                  value="Accessories"
                  onChange={onCategoryChange}
                  checked={product.category === "Accessories"}
                />
                <label htmlFor="category1">Accessories</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category2"
                  name="category"
                  value="Clothing"
                  onChange={onCategoryChange}
                  checked={product.category === "Clothing"}
                />
                <label htmlFor="category2">Clothing</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category3"
                  name="category"
                  value="Electronics"
                  onChange={onCategoryChange}
                  checked={product.category === "Electronics"}
                />
                <label htmlFor="category3">Electronics</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category4"
                  name="category"
                  value="Fitness"
                  onChange={onCategoryChange}
                  checked={product.category === "Fitness"}
                />
                <label htmlFor="category4">Fitness</label>
              </div>
            </div>
          </div>

          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="price" className="font-bold">
                Price
              </label>
              <InputNumber
                id="price"
                value={product.price}
                onValueChange={(e) => onInputNumberChange(e, "price")}
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </div>
            <div className="field col">
              <label htmlFor="quantity" className="font-bold">
                Quantity
              </label>
              <InputNumber
                id="quantity"
                value={product.quantity}
                onValueChange={(e) => onInputNumberChange(e, "quantity")}
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          visible={deleteProductDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Confirm"
          modal
          footer={deleteProductDialogFooter}
          onHide={hideDeleteProductDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {product && (
              <span>
                Are you sure you want to delete <b>{product.name}</b>?
              </span>
            )}
          </div>
        </Dialog>

        <Dialog
          visible={deleteProductsDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Confirm"
          modal
          footer={deleteProductsDialogFooter}
          onHide={hideDeleteProductsDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {product && (
              <span>
                Are you sure you want to delete the selected products?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    </>
  );
})

export default List;