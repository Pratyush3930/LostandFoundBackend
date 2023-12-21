const client = require("../../db");
const queries = require("./queries");
const multer = require("multer");
const fs = require("fs");

//configure multer storage and filter options
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${BASE_DIR}/documents/temp`); // Temporary upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); // Use current timestamp to prevent duplicate filenames
  },
});

// Setting up Multer Filter for file uplaod
const multerFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// create multer instance with specified options
const upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 2024 * 1024 * 5,
  },
  fileFilter: multerFilter,
});

// MiddleWare function to handle multiple file upload
const uploadLostItem = upload.single("file");

const getItems = (req, res) => {
  client.query(queries.getItems, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addItem = async (req, res) => {
  const {
    itemName,
    lost_date,
    location,
    contact,
    ownerName,
    additionalInfo,
    uid,
  } = req.body;

  console.log("here");
  try {
    console.log(req.file)
    const image = req.file; //retrieve the image file from req object

    const lostItemPath = image.path; //retrieve the path of the uploaded image in temp folder
    const permanentFilePath = `/documents/lostItems/${
      Date.now() + image.originalname
    }`; //define a permanent file path for the uploaded file

    client.query(
      queries.addItem,
      [
        itemName,
        location,
        contact,
        ownerName,
        additionalInfo,
        lost_date,
        uid,
        permanentFilePath,
      ],
      (error, results) => {
        // Move uploaded file to permanent location on server
        fs.renameSync(lostItemPath, `${BASE_DIR}${permanentFilePath}`);
        if (error) throw error;
        res.status(201).send("Lost item registered successfully!");
      }
    );
  } catch (error) {
    throw error;
  }
};

// const foundItem = (req, res) => {
//   const id = parseInt(req.params.id);
//   console.log(req.body)
//   const { date_found } = req.body;
//   const Date_found = new Date(date_found);
//   console.log(Date_found);

//   const status = "found";
//   client.query(
//     queries.foundItem,
//     [Date_found, status, id],
//     (error, results) => {
//       if (error) throw error;
//       res
//         .status(200)
//         .send("Please contact the person who lost the item for more details!");
//     }
//   );
// };

const removeItem = (req, res) => {
  const uid = parseInt(req.params.uid);

  client.query(queries.removeItem, [uid], (error, results) => {
    if (error) throw error;
    res.status(200).send("Item deleted successfully!");
  });
};

const updateStatus = (req, res) => {
  try {
    const statusid = (req.body.status);
    // 1 is true and 0 is false
    const lostStatus = (statusid === 0) ? "false" : "true";
    const id = parseInt(req.params.id);
    client.query(queries.updateStatus, [lostStatus, id]);

    // res.status(200).json({hgfh: "lhkjhjk"})
    // json data pathauna lai mathiko
    res.status(200).send("Status changed");
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getItems,
  addItem,
  removeItem,
  uploadLostItem,
  updateStatus
};
