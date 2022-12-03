import React from "react";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalRead: false,
      modalEdit: false,
      modalDelete: false,

      nameEdit: "",
      descriptionEdit: "",
      priceEdit: "",
    };

    this.productRead = {};
  }

  // Read
  read = (e) => {
    this.setState({ modalRead: true });
    const i = e.target.getAttribute("read-key");
    this.productRead.name = this.props.products[i].name;
    this.productRead.description = this.props.products[i].description;
    this.productRead.price = this.props.products[i].price;
  };
  readClose = () => {
    this.setState({ modalRead: false });
  };

  // Edit
  changeValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  edit = (e) => {
    this.setState({ modalEdit: true });
    const i = e.target.getAttribute("edit-key");
    this.setState({ nameEdit: this.props.products[i].name });
    this.setState({ descriptionEdit: this.props.products[i].description });
    this.setState({ priceEdit: this.props.products[i].price });
    this.i = i;
  };
  editSubmit = (e) => {
    this.setState({ modalEdit: false });
    this.props.products[this.i].name = this.state.nameEdit;
    this.props.products[this.i].description = this.state.descriptionEdit;
    this.props.products[this.i].price = this.state.priceEdit;
  };
  editClose = () => {
    this.setState({ modalEdit: false });
  };

  // Delete
  delete = (e) => {
    let i = e.target.getAttribute("delete-key");
    this.props.products.splice(i, 1);
    this.setState({ modalDelete: true });
  };

  render() {
    return (
      <table>
        <tr>
          <th className="border-[1px] w-[70px] h-[50px] border-red-900">ID</th>
          <th className="border-[1px] w-[300px] h-[50px] border-red-900">
            Name
          </th>
          <th className="border-[1px] w-[400px] h-[50px] border-red-900">
            Description
          </th>
          <th className="border-[1px] w-[100px] border-red-900">Price</th>
          <th className="border-[1px] w-[400px] h-[50px] border-red-900">
            Action
          </th>
        </tr>
        {this.props.table().map((product, i) => {
          const id = i + 1 + this.props.currentPage * 5;
          return (
            <tr>
              <td className="border-[1px] w-[50px] h-[50px] border-red-900 text-center">
                {id}
              </td>
              <td className="border-[1px] w-[300px] h-[50px] border-red-900">
                {product.name}
              </td>
              <td className="border-[1px] w-[400px] h-[50px] border-red-900">
                {product.description}
              </td>
              <td className="border-[1px] w-[100px] h-[50px] border-red-900">
                ${product.price}
              </td>
              <td className="border-[1px] w-[400px] h-[50px] border-red-900">
                <div className="flex justify-center space-x-2 text-white font-medium">
                  <button
                    read-key={i + this.props.currentPage * 5}
                    onClick={this.read}
                    className="bg-cyan-600 w-[80px] py-1 px-3 rounded-lg"
                  >
                    Read
                  </button>
                  <button
                    edit-key={i + this.props.currentPage * 5}
                    onClick={this.edit}
                    className="bg-blue-600 w-[80px] py-1 px-3 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    delete-key={i + this.props.currentPage * 5}
                    onClick={this.delete}
                    className="bg-red-600 w-[80px] py-1 px-3 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          );
        })}

        {/* Read */}
        {this.state.modalRead && (
          <div>
            <div
              onClick={this.readClose}
              className="absolute top-0 bg-white w-full h-full opacity-50"
            ></div>
            <div className="flex justify-center absolute bg-slate-300 opacity-100 left-[30vw] right-[30vw] top-48 mx-[8vw] w-[600px] min-w-[450px] py-5 border-2 rounded-full border-green-500">
              <div className="space-y-2">
                <h3 className="text-3xl text-red-700 mx-[3vw]">
                  {this.productRead.name}
                </h3>
                <p className="text-xl text-blue-600">
                  Description:{" "}
                  <a className="text-black font-normal">
                    {this.productRead.description}
                  </a>
                </p>
                <p className="text-xl text-blue-600">
                  Price:{" "}
                  <a className="text-red-500">${this.productRead.price}</a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Edit */}
        {this.state.modalEdit && (
          <div>
            <div
              onClick={this.editClose}
              className="absolute top-0 bg-white w-full h-full opacity-50"
            ></div>
            <div className="flex justify-center absolute bg-slate-300 opacity-100 left-[30vw] right-[30vw] top-48 mx-[8vw] w-[700px] min-w-[600px] py-5 border-2 rounded-lg border-green-500">
              <div className="space-y-2">
                <h3 className="text-3xl text-red-700 mx-[3vw]">
                  <a className="text-black">New Name: </a> {this.state.nameEdit}
                </h3>
                <div className="flex space-x-2">
                  <div className="flex flex-col justify-center space-y-1">
                    <label className="text-xl text-blue-600">Name:</label>
                    <label className="text-xl text-blue-600">
                      Description:
                    </label>
                    <label className="text-xl text-blue-600">Price:</label>
                  </div>
                  <div className="flex flex-col justify-center space-y-1">
                    <input
                      placeholder=" Enter new name..."
                      type="text"
                      name="nameEdit"
                      value={this.state.nameEdit}
                      onChange={this.changeValue}
                      className="h-[30px] placeholder:italic rounded-md border-[1px] border-gray-400 min-w-[300px] placeholder:font-normal placeholder:text-gray-400"
                    />
                    <input
                      placeholder=" Enter new description..."
                      type="text"
                      name="descriptionEdit"
                      value={this.state.descriptionEdit}
                      onChange={this.changeValue}
                      className="h-[30px] placeholder:italic rounded-md border-[1px] border-gray-400 min-w-[300px] placeholder:font-normal placeholder:text-gray-400"
                    />
                    <input
                      placeholder=" Enter new price..."
                      type="text"
                      name="priceEdit"
                      value={this.state.priceEdit}
                      onChange={this.changeValue}
                      className="h-[30px] placeholder:italic rounded-md border-[1px] border-gray-400 min-w-[300px] placeholder:font-normal placeholder:text-gray-400"
                    />
                  </div>
                  <div className="flex items-center justfy-center pl-[0.2vw]">
                    <button
                      onClick={this.editSubmit}
                      className="bg-blue-500 text-white px-5 rounded-lg h-full"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </table>
    );
  }
}

export default Table;
