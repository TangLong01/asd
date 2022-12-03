import logo from "./logo.svg";
import "./App.css";
import React from "react";
import iconSearch from "./icon_search.png";
import Table from "./component/Table";
import Paginate from "./component/Paginate";
import CreateModal from "./component/CreateModal";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,

      createModal: false,

      sort: undefined,

      searchValue: "",
      keyPress: false,

      products: [
        {
          name: "Red and White Candy Canes",
          description: "It's a type of candy for Christmas time.",
          price: 16.99,
        },
        {
          name: "D Trash Can 2",
          description: "It will help you maintain cleanliness.",
          price: 25.95,
        },
        {
          name: "Pillow 1",
          description: "Sleeping well is important.",
          price: 8.99,
        },
        {
          name: "A Red and White Candy Canes",
          description: "It's a type of candy for Christmas time.",
          price: 11.99,
        },
        {
          name: "Earphone 1",
          description: "You need this one if you love music.",
          price: 7,
        },
        {
          name: "Mouse 1",
          description: "Very useful if you love your computer.",
          price: 11.35,
        },
        {
          name: "B Mouse 3",
          description: "Very useful if you love your computer.",
          price: 1.35,
        },
        {
          name: "Mouse 2",
          description: "Very useful if you love your computer.",
          price: 14.35,
        },
        {
          name: "B Trash Can",
          description: "It will help you maintain cleanliness.",
          price: 21.95,
        },
        {
          name: "Trash Can 1",
          description: "It will help you maintain cleanliness.",
          price: 3.95,
        },
        {
          name: "Pillow 2",
          description: "Sleeping well is important.",
          price: 5.99,
        },
        {
          name: "Pillow 3",
          description: "Sleeping well is important.",
          price: 4.99,
        },
        {
          name: "Trash Can 3",
          description: "It will help you maintain cleanliness.",
          price: 1.95,
        },
        {
          name: "C Pillow 4",
          description: "Sleeping well is important.",
          price: 8.99,
        },
        {
          name: "Pillow 5",
          description: "Sleeping well is important.",
          price: 9.99,
        },
        {
          name: "Pillow 4",
          description: "Sleeping well is important.",
          price: 0.99,
        },
        {
          name: "Trash Can 2",
          description: "It will help you maintain cleanliness.",
          price: 18.95,
        },
        {
          name: "Trash Can 4",
          description: "It will help you maintain cleanliness.",
          price: 11.65,
        },
      ],
    };
  }

  openModal = () => {
    this.setState({ createModal: true });
  };
  closeModal = () => {
    this.setState({ createModal: false });
  };

  getValue = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  table = () => {
    const { products, searchValue } = this.state;
    const startIndex = this.state.currentPage * 5;
    let productsClone = [];
    for (let x in products) {
      if (products[x].name.toLowerCase().includes(searchValue.toLowerCase())) {
        productsClone.push(products[x]);
      }
    }
    const page = productsClone.slice(startIndex, startIndex + 5);
    return page;
  };
  changePage = (page) => {
    this.setState({ currentPage: page });
  };
  nextPage = (page) => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };
  prevPage = (page) => {
    this.setState({ currentPage: this.state.currentPage - 1 });
  };

  sort = (e) => {
    const { products, sort } = this.state;
    this.setState({ sort: e.target.value });
    if (e.target.value === "a") {
      products.sort((a, b) => {
        let fa = a.name.toLowerCase();
        let fb = b.name.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    } else if (e.target.value === "b") {
      products.sort((a, b) => a.price - b.price);
    } else if (e.target.value === "c") {
      products.sort((a, b) => b.price - a.price);
    }
  };

  render() {
    return (
      <div className="px-[0.5vw] h-[1000px] py-[1vh] bg-yellow-100">
        {this.state.createModal && (
          <CreateModal
            closeModal={this.closeModal}
            products={this.state.products}
          />
        )}
        <h1 className="text-5xl font-bold">Read Product</h1>
        <hr className="mt-10 mb-7 border-red-900" />

        <div className="flex mb-2 space-x-32">
          <button
            onClick={this.openModal}
            className="bg-blue-600 mb-2 w-[250px] h-[50px] text-white font-medium text-xl rounded-lg"
          >
            Create New Product
          </button>
          <div className="flex items-end mb-2">
            <div className="flex border-[1px] border-gray-700">
              <label className="flex items-center justify-center font-medium bg-blue-600 text-white border-r-[1px] w-[70px] h-[30px] border-gray-700">
                Search:
              </label>
              <input
                style={{
                  background: `url(${iconSearch}) no-repeat right`,
                  backgroundSize: "25px",
                }}
                type="text"
                placeholder=" Search by name..."
                value={this.state.searchValue}
                onChange={this.getValue}
                onKeyPress={this.table}
                className="w-[200px] h-[30px] opacity-80 placeholder:italic placeholder:text-gray-500"
              />
            </div>
          </div>
          <div className="flex items-end mb-2 font-medium">
            <select
              onChange={this.sort}
              className="h-[30px] w-[200px] border-[1px] border-gray-700 px-1"
            >
              <option className="font-medium">Sort by: Featured</option>
              <option value="a" className="font-medium">
                Sort by: Name
              </option>
              <option value="b" className="font-medium">
                Price: Low to high
              </option>
              <option value="c" className="font-medium">
                Price: High to low
              </option>
            </select>
          </div>
        </div>
        <Table
          table={this.table}
          currentPage={this.state.currentPage}
          products={this.state.products}
        />
        <Paginate
          currentPage={this.state.currentPage}
          products={this.state.products}
          changePage={this.changePage}
          nextPage={this.nextPage}
          prevPage={this.prevPage}
        />
      </div>
    );
  }
}

export default App;
