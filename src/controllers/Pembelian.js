const { Pembelian } = require("../models");

const PembelianController = {
  create: async (req, res) => {
    const { user_id, product_id, quantity, total_price } = req.body;

    try {
      const pembelian = await Pembelian.create({
        user_id,
        product_id,
        quantity,
        total_price,
      });

      res.status(201).json({
        status: "success",
        message: "Pembelian created successfully",
        data: pembelian,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error creating pembelian" });
    }
  },

  list: async (req, res) => {
    try {
      const pembelians = await Pembelian.findAll();

      res.status(200).json({
        status: "success",
        message: "Pembelians retrieved successfully",
        data: pembelians,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error getting pembelians" });
    }
  },

  detail: async (req, res) => {
    const { pembelian_id } = req.params;

    try {
      const pembelian = await Pembelian.findOne({
        where: {
          pembelian_id,
        },
      });

      if (!pembelian)
        return res.status(404).json({
          status: "failed",
          message: "Pembelian not found",
        });

      res.status(200).json({
        status: "success",
        message: "Pembelian retrieved successfully",
        data: pembelian,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error getting pembelian" });
    }
  },

  update: async (req, res) => {
    const { pembelian_id } = req.params;
    const { user_id, product_id, quantity, total_price } = req.body;

    try {
      const pembelianToUpdate = await Pembelian.findOne({
        where: {
          pembelian_id,
        },
      });

      if (!pembelianToUpdate)
        return res.status(404).json({
          status: "failed",
          message: "Pembelian not found",
        });

      await pembelianToUpdate.update({
        user_id,
        product_id,
        quantity,
        total_price,
      });

      res.status(200).json({
        status: "success",
        message: "Pembelian updated successfully",
        data: pembelianToUpdate,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error updating pembelian" });
    }
  },

  delete: async (req, res) => {
    const { pembelian_id } = req.params;

    try {
      const pembelianToDelete = await Pembelian.findOne({
        where: {
          pembelian_id,
        },
      });

      if (!pembelianToDelete)
        return res.status(404).json({
          status: "failed",
          message: "Pembelian not found",
        });

      await pembelianToDelete.destroy();

      res.status(200).json({
        status: "success",
        message: "Pembelian deleted successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error deleting pembelian" });
    }
  },
};

module.exports = PembelianController;
