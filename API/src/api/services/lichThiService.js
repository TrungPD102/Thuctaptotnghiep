const db = require("../models");
const createError = require("http-errors");
const { Op } = require('sequelize');

const lichThiService = {
  createLichThi: async (lichThi) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Lich_Thi.create({
          ...lichThi,
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create LichThi successfully!"
            : "Error while creating LichThi",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllLichThi: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Lich_Thi.findAll({});
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get list of LichThi successfully"
            : "Error while getting list of LichThi",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllByQueryLichThi: async (query) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Lich_Thi.findAll({
          where: {
            ...query,
          },
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get list of LichThi successfully by query"
            : "Error while getting list of LichThi by query",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIdLichThi: async (lichThiId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Lich_Thi.findOne({
          where: {
            id: lichThiId,
          },
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get LichThi by ID successfully"
            : "Error while getting LichThi by ID",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getLichThiByUserId: async (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Tìm kiếm sinh viên với ID được cung cấp và bao gồm thông tin lịch thi
        const user = await db.Users.findOne({
          where: {
            id: userId,
          },
          attributes: ["MSV", "FULLNAME"],
          include: [
            {
              model: db.Lich_Thi,
            },
          ],
        });
        if (!user) {
          return resolve({
            status: 404,
            message: "User not found",
            elements: [],
          });
        }
        console.log(user.Lich_Thi)
        resolve({
          status: 200,
          message: "Get LichThi by User ID successfully",
          elements: {
            userInfo: {
              FULLNAME: user.FULLNAME,
              MSV: user.MSV,
            },
            lichThi: user.Lich_This, // Array of Lich_Thi records
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateLichThi: async (lichThi, lichThiId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Lich_Thi.update(
          {
            ...lichThi,
          },
          {
            where: {
              id: lichThiId,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Update LichThi successfully"
            : "Error while updating LichThi",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  // Thêm phương thức này để cập nhật nhiều bản ghi cùng một lúc
  updateMultipleLichThi: async (ids, lichThiData) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!Array.isArray(ids) || ids.length === 0) {
          throw new Error("IDs must be a non-empty array");
        }

        if (typeof lichThiData !== 'object' || Array.isArray(lichThiData)) {
          throw new Error("lichThiData must be an object");
        }

        // Cập nhật tất cả các ID với cùng một dữ liệu
        const response = await db.Lich_Thi.update(
          { ...lichThiData },
          {
            where: {
              id: {
                [db.Sequelize.Op.in]: ids,
              },
            },
          }
        );

        resolve({
          status: response[0] > 0 ? 200 : 404,
          message: response[0] > 0
            ? `Updated ${response[0]} LichThi(s) successfully`
            : "No LichThi(s) found to update",
        });
      } catch (error) {
        reject({
          status: 500,
          message: error.message,
        });
      }
    });
  },

  deleteLichThi: async (lichThiId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Lich_Thi.destroy({
          where: {
            id: lichThiId,
          },
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Delete LichThi successfully"
            : "Error while deleting LichThi",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = lichThiService;
