import React, { useState } from "react";

class CreateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: "",

      invalid: false,
    };
  }

  getValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {
    if (
      this.state.name != "" &&
      this.state.description != "" &&
      this.state.price != ""
    ) {
      const newProduct = {};
      newProduct.name = this.state.name;
      newProduct.description = this.state.description;
      newProduct.price = this.state.price;
      this.props.products.push(newProduct);
      this.props.closeModal();
    } else {
      this.setState({ invalid: true });
    }
    console.log(this.props.products);
  };

  render() {
    return (
      <div>
        <div
          onClick={this.props.closeModal}
          className="fixed bg-yellow-100 w-full h-full opacity-50"
        ></div>
        <div className=" absolute items-center justify-center top-[25vh] right-[30vw] left-[30vw] w-[400px] min-w-[400px] bg-white py-5 px-8 border-2 rounded-lg border-black">
          <div className="flex justify-between px-2">
            <div className="flex flex-col text-lg font-medium space-y-3">
              <label className="h-[30px]">Name: </label>
              <label className="h-[30px]">Description: </label>
              <label className="h-[30px]">Price: </label>
            </div>
            <div className="flex flex-col space-y-3">
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.getValue}
                placeholder=" Enter name..."
                className="border-[2px] border-gray-400 rounded-md h-[30px] placeholder:italic"
              />
              <input
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.getValue}
                placeholder=" Enter description..."
                className="border-[2px] border-gray-400 rounded-md h-[30px] placeholder:italic"
              />
              <input
                type="text"
                name="price"
                value={this.state.price}
                onChange={this.getValue}
                placeholder=" Enter price..."
                className="border-[2px] border-gray-400 rounded-md h-[30px] placeholder:italic"
              />
            </div>
          </div>
          {this.state.invalid && (
            <p className="mt-2 text-center text-lg text-red-500">
              Invalid information! Please try again!
            </p>
          )}
          <div className="flex items-center justify-end mt-4 px-2 space-x-2 text-white text-lg font-medium">
            <button
              onClick={this.onSubmit}
              className="flex items-center justify-center bg-blue-600 w-[80px] h-[30px] rounded-md"
            >
              Create
            </button>
            <button
              onClick={this.props.closeModal}
              className="flex items-center justify-center bg-red-600 w-[80px] h-[30px] rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateModal;
