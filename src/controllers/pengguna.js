// const { Costumers } = require("../models");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const CostumersController = {
//   login: async (req, res) => {
//     const { user_name, password } = req.body;

//     try {
//       const customer = await Costumers.findOne({
//         where: {
//           user_name: user_name,
//         },
//       });

//       if (!customer)
//         return res.status(404).json({
//           status: "failed",
//           message: "Customer not found",
//         });

//       const validPassword = await bcrypt.compare(password, customer.password);

//       if (!validPassword)
//         return res.status(401).json({
//           status: "failed",
//           message: "Invalid password",
//         });

//       const token = jwt.sign(
//         { user_name: customer.user_name },
//         process.env.JWT_SECRET,
//         { expiresIn: process.env.JWT_EXPIRES_IN }
//       );

//       res.status(200).json({
//         status: "success",
//         message: "Login successful",
//         data: {
//           user_name: customer.user_name,
//           email: customer.email,
//           token: token,
//         },
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "Error login" });
//     }
//   },

//   register: async (req, res) => {
//     const { user_name, password, email } = req.body;

//     try {
//       const validateUserName = await Costumers.findOne({
//         where: {
//           user_name,
//         },
//       });

//       if (validateUserName)
//         return res.status(409).json({
//           status: "failed",
//           message: "Customer already exists",
//         });

//       const customer = await Costumers.create({
//         user_name,
//         password: bcrypt.hashSync(password, 10),
//         email,
//       });

//       if (!customer)
//         return res.status(500).json({
//           status: "failed",
//           message: "Error creating customer",
//         });

//       const token = jwt.sign(
//         { user_name: customer.user_name },
//         process.env.JWT_SECRET,
//         { expiresIn: process.env.JWT_EXPIRES_IN }
//       );

//       res.status(201).json({
//         status: "success",
//         message: "Customer created successfully",
//         data: {
//           user_name: customer.user_name,
//           email: customer.email,
//           token,
//         },
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: "Error creating customer" });
//     }
//   },

//   detail: async (req, res) => {
//     const { user_name } = req.user;
//     try {
//       const customer = await Costumers.findOne({
//         where: {
//           user_name,
//         },
//         attributes: {
//           exclude: ["password"],
//         },
//       });
//       if (!customer)
//         return res.status(500).json({
//           status: "failed",
//           message: "Error getting customer",
//         });

//       res.status(200).json({
//         status: "success",
//         message: "Customer retrieved successfully",
//         data: {
//           user_name: customer.user_name,
//           email: customer.email,
//         },
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: "Error getting customer" });
//     }
//   },

//   update: async (req, res) => {
//     const { password, email } = req.body;
//     const { user_name } = req.user;
//     try {
//       const customer = await Costumers.update(
//         {
//           ...(password && { password: bcrypt.hashSync(password, 10) }),
//           ...(email && { email }),
//         },
//         {
//           where: {
//             user_name,
//           },
//         }
//       ).then(() => Costumers.findOne({ where: { user_name } }));

//       if (!customer)
//         return res.status(500).json({
//           status: "failed",
//           message: "Error updating customer",
//         });

//       res.status(200).json({
//         status: "success",
//         message: "Customer updated successfully",
//         data: {
//           user_name: customer.user_name,
//           email: customer.email,
//         },
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: "Error updating customer" });
//     }
//   },

//   delete: async (req, res) => {
//     const { user_name } = req.user;
//     try {
//       const customer = await Costumers.destroy({
//         where: {
//           user_name,
//         },
//       });
//       if (!customer)
//         return res.status(500).json({
//           status: "failed",
//           message: "Error deleting customer",
//         });

//       res.status(200).json({
//         status: "success",
//         message: "Customer deleted successfully",
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: "Error deleting customer" });
//     }
//   },
// };

// module.exports = CostumersController;

const { Costumers } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const CostumersController = {
  login: async (req, res) => {
    const { user_name, password } = req.body;

    try {
      const customer = await Costumers.findOne({
        where: {
          user_name: user_name,
        },
      });

      if (!customer)
        return res.status(404).json({
          status: "failed",
          message: "Customer not found",
        });

      const validPassword = await bcrypt.compare(password, customer.password);

      if (!validPassword)
        return res.status(401).json({
          status: "failed",
          message: "Invalid password",
        });

      const token = jwt.sign(
        { user_name: customer.user_name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: {
          user_name: customer.user_name,
          email: customer.email,
          token: token,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error login" });
    }
  },

  register: async (req, res) => {
    const { user_name, password, email } = req.body;

    try {
      const validateUserName = await Costumers.findOne({
        where: {
          user_name,
        },
      });

      if (validateUserName)
        return res.status(409).json({
          status: "failed",
          message: "Customer already exists",
        });

      const customer = await Costumers.create({
        user_name,
        password: bcrypt.hashSync(password, 10),
        email,
      });

      if (!customer)
        return res.status(500).json({
          status: "failed",
          message: "Error creating customer",
        });

      const token = jwt.sign(
        { user_id: customer.user_id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.status(201).json({
        status: "success",
        message: "Customer created successfully",
        data: {
          user_id: customer.user_id,
          email: customer.email,
          token,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error creating customer" });
    }
  },

  detail: async (req, res) => {
    const { user_id } = req.user;
    try {
      const customer = await Costumers.findOne({
        where: {
          user_id,
        },
        attributes: {
          exclude: ["password"],
        },
      });
      if (!customer)
        return res.status(500).json({
          status: "failed",
          message: "Error getting customer",
        });

      res.status(200).json({
        status: "success",
        message: "Customer retrieved successfully",
        data: {
          user_id: customer.user_id,
          email: customer.email,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error getting customer" });
    }
  },

  update: async (req, res) => {
    const { password, email } = req.body;
    const { user_id } = req.user;
    try {
      const customer = await Costumers.update(
        {
          ...(password && { password: bcrypt.hashSync(password, 10) }),
          ...(email && { email }),
        },
        {
          where: {
            user_id,
          },
        }
      ).then(() => Costumers.findOne({ where: { user_id } }));

      if (!customer)
        return res.status(500).json({
          status: "failed",
          message: "Error updating customer",
        });

      res.status(200).json({
        status: "success",
        message: "Customer updated successfully",
        data: {
          user_id: customer.user_id,
          email: customer.email,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error updating customer" });
    }
  },

  delete: async (req, res) => {
    const { user_id } = req.user;
    try {
      const customer = await Costumers.destroy({
        where: {
          user_id,
        },
      });
      if (!customer)
        return res.status(500).json({
          status: "failed",
          message: "Error deleting customer",
        });

      res.status(200).json({
        status: "success",
        message: "Customer deleted successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error deleting customer" });
    }
  },
};

module.exports = CostumersController;


