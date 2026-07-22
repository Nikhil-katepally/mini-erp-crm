const prisma = require("../config/prisma");

// Create Customer
const createCustomer = async (req, res) => {
  try {
    const customer = await prisma.customer.create({
      data: req.body,
    });

    res.status(201).json(customer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Customers
const getCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(customers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Customer By Id
const getCustomerById = async (req, res) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer Not Found",
      });
    }

    res.json(customer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Customer
const updateCustomer = async (req, res) => {
  try {
    const customer = await prisma.customer.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.json(customer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Customer
const deleteCustomer = async (req, res) => {
  try {
    await prisma.customer.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "Customer Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Search Customers
const searchCustomers = async (req, res) => {
  try {
    const { keyword } = req.query;

    const customers = await prisma.customer.findMany({
      where: {
        OR: [
          {
            customerName: {
              contains: keyword,
            },
          },
          {
            businessName: {
              contains: keyword,
            },
          },
          {
            mobileNumber: {
              contains: keyword,
            },
          },
          {
            email: {
              contains: keyword,
            },
          },
        ],
      },
    });

    res.json(customers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add Follow-up Notes
const addFollowUp = async (req, res) => {
  try {
    const { followUpDate, notes } = req.body;

    const customer = await prisma.customer.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        followUpDate,
        notes,
      },
    });

    res.json(customer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  searchCustomers,
  addFollowUp,
};