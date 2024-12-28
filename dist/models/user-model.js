"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = toUserResponse;
exports.toGetUserResponse = toGetUserResponse;
function toUserResponse(user) {
    var _a;
    return {
        token: (_a = user.token) !== null && _a !== void 0 ? _a : "",
        username: user.username
    };
}
function toGetUserResponse(user) {
    var _a;
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: (_a = user.profilePicture) !== null && _a !== void 0 ? _a : ""
    };
}
