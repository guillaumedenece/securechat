//
// Created by Ronan GUIHO on 4/22/16.
// Copyright (c) 2016 Swapcard. All rights reserved.
//

'use strict';

exports[400] = function (res, message) {
    var statusCode = 400;
    res.status(statusCode);
    res.json({
        status: statusCode,
        message: message || "Bad Request"
    });
};

exports[401] = function (res, message) {
    var statusCode = 401;
    res.status(statusCode);
    res.json({
        status: statusCode,
        message: message || "Unauthorized"
    });
};

exports[403] = function (res, message) {
    var statusCode = 403;
    res.status(statusCode);
    res.json({
        status: statusCode,
        message: message || "Forbidden"
    });
};

exports[404] = function (res, message) {
    var statusCode = 404;
    res.status(statusCode);
    res.json({
        status: statusCode,
        message: message || "Not found"
    });
};

exports[500] = function(res, message) {
    var statusCode = 500;
    res.status(statusCode);
    res.json({
        status: statusCode,
        message: message || "Internal server error"
    });
};
