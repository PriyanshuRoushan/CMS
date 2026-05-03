// import express from "express";

// import {
//     createUsers,
//     getUsers,
//     getLoggedInUsers,
//     updateUser,
//     activateDeactivateUser,
//     resetUserPassword,
//     changePassword,
//     deleteUser,
//     searchUsers,
//     handlePagination,
//     getUserState,
//     restoreUser
// } from "../controller/user.controller.js";

// import { verifyToken, authorize } from "../middleware/auth.middleware.js";

// const router = express.Router();

// //create user && get users
// router.post(
//     "/", 
//     verifyToken, 
//     authorize("admin"), 
//     createUsers, getUsers
// );

// //get logged in user
// router.get(
//     "/me", 
//     verifyToken, 
//     getLoggedInUsers
// );

// // update user (self || admin)
// router.put(
//     "/:id", 
//     verifyToken, 
//     authorizeSelfOrAdmin,
//     updateUser
// );

// // change passowrd (self || admin)
// // router.put(
// //     "/change-password",
// //     verifyToken,
// //     authorizeSelfOrAdmin,
// //     changePassword
// // );

// //reset password (admin)
// router.put(
//     "/:id/reset-password",
//     verifyToken,
//     authorize("admin"),
//     resetUserPassword
// );

// //Activate or Deactivate user (Admin only)
// router.put(
//     "/:id/status",
//     verifyToken,
//     authorize("admin"),
//     activateDeactivateUser
// );

// //Restore user (Admin only)
// router.put(
//     "/:id/restore",
//     verifyToken,
//     authorize("admin"),
//     restoreUser
// );

// //delete user
// router.delete(
//     "/:id",
//     verifyToken,
//     authorize("admin"),
//     deleteUser
// );

// // search users
// router.get(
//     "/search",
//     verifyToken,
//     authorize("admin"),
//     searchUsers
// );  

// // pagination
// router.get(
//     "/pagination",
//     verifyToken,
//     authorize("admin"),
//     handlePagination
// );

// // user state (Count)
// router.get(
//     "/state",
//     verifyToken,
//     authorize("admin"),
//     getUserState
// );  


// export default router;


import express from "express";

import {
    createUsers,
    getUsers,
    getLoggedInUsers,
    updateUser,
    activateDeactivateUser,
    resetUserPassword,
    changePassword,
    deleteUser,
    searchUsers,
    handlePagination,
    getUserState,
    restoreUser
} from "../controller/user.controller.js";

import {
    verifyToken,
    authorize,
    authorizeSelfOrAdmin
} from "../middleware/auth.middleware.js";

const router = express.Router();


// ================================
// CREATE USER (Admin)
// ================================
router.post(
    "/create",
    createUsers
);


// ================================
// GET ALL USERS (Admin)
// ================================
router.get(
    "/",
    verifyToken,
    authorize("admin"),
    getUsers
);


// ================================
// GET LOGGED-IN USER
// ================================
router.get(
    "/me",
    verifyToken,
    getLoggedInUsers
);


// ================================
// UPDATE USER (SELF || ADMIN)
// ================================
router.put(
    "/:id",
    verifyToken,
    authorizeSelfOrAdmin,
    updateUser
);


// ================================
// CHANGE PASSWORD (SELF)
// ================================
router.put(
    "/change-password",
    verifyToken,
    changePassword
);


// ================================
// RESET PASSWORD (ADMIN)
// ================================
router.put(
    "/:id/reset-password",
    verifyToken,
    authorize("admin"),
    resetUserPassword
);


// ================================
// ACTIVATE / DEACTIVATE USER
// ================================
router.put(
    "/:id/status",
    verifyToken,
    authorize("admin"),
    activateDeactivateUser
);


// ================================
// RESTORE USER
// ================================
router.put(
    "/:id/restore",
    verifyToken,
    authorize("admin"),
    restoreUser
);


// ================================
// DELETE USER (SOFT DELETE)
// ================================
router.delete(
    "/:id",
    verifyToken,
    authorize("admin"),
    deleteUser
);


// ================================
// SEARCH USERS
// ================================
router.get(
    "/search",
    verifyToken,
    authorize("admin"),
    searchUsers
);


// ================================
// PAGINATION
// ================================
router.get(
    "/pagination",
    verifyToken,
    authorize("admin"),
    handlePagination
);


// ================================
// USER STATS
// ================================
router.get(
    "/stats",
    verifyToken,
    authorize("admin"),
    getUserState
);


export default router;



// | Method | Route                 | Purpose             |
// | ------ | --------------------- | ------------------- |
// | POST   | `/create`             | Create user         |
// | GET    | `/`                   | Get all users       |
// | GET    | `/me`                 | Current user        |
// | PUT    | `/:id`                | Update user         |
// | PUT    | `/change-password`    | Self password       |
// | PUT    | `/:id/reset-password` | Admin reset         |
// | PUT    | `/:id/status`         | Activate/deactivate |
// | PUT    | `/:id/restore`        | Restore             |
// | DELETE | `/:id`                | Soft delete         |
// | GET    | `/search`             | Search              |
// | GET    | `/pagination`         | Pagination          |
// | GET    | `/stats`              | User stats          |
