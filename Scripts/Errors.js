/* global appInsights */
/* global StackTrace */
/* exported CleanStack */
/* exported getErrorMessage */
/* exported getErrorStack */
/* exported CleanStack */
/* exported isError */
/* exported LogError */
/* exported parseError */
/* exported clearErrors */
/* exported getErrors */

function clearErrors() {
    window.mhaErrors = [];
}

function ensureErrors() {
    window.mhaErrors = window.mhaErrors || [];
}

function getErrors() {
    return window.mhaErrors;
}

function getErrorMessage(error) {
    if (!error) return '';
    if (Object.prototype.toString.call(error) === "[object String]") return error;
    if (Object.prototype.toString.call(error) === "[object Number]") return error.toString();
    if ("message" in error) return error.message;
    if ("description" in error) return error.description;
    return JSON.stringify(error, null, 2);
}

function getErrorStack(error) {
    if (!error) return '';
    if (Object.prototype.toString.call(error) === "[object String]") return "string thrown as error";
    if (!isError(error)) return '';
    if ("stack" in error) return error.stack;
    return '';
}

function isError(error) {
    if (!error) return false;

    // We can't afford to throw while checking if we're processing an error
    // So just swallow any exception and fail.
    try {
        if (Object.prototype.toString.call(error) === "[object Error]") {
            if ("stack" in error) return true;
        }
    }
    catch (e) {
        appInsights.trackEvent("isError exception");
        appInsights.trackEvent("isError exception with error", e);
    }

    return false;
}

// error - an exception object
// message - a string describing the error
// suppressTracking - boolean indicating if we should suppress tracking
function LogError(error, message, suppressTracking) {
    if (error && !suppressTracking) {
        var props = {};
        props["Message"] = message;
        props["Error"] = JSON.stringify(error, null, 2);

        if (isError(error) && error.exception) {
            props["Source"] = "LogErrorException";
            appInsights.trackException(error, props);
        }
        else {
            props["Source"] = "LogErrorEvent";
            if (error.description) props["Error description"] = error.description;
            if (error.message) props["Error message"] = error.message;
            if (error.stack) props["Stack"] = error.stack;

            appInsights.trackEvent(error.description || error.message || props.Message || "Unknown error object", props);
        }
    }

    parseError(error, message, function (eventName, stack) {
        pushError(eventName, stack, suppressTracking);
    });
}

// error - an exception object
// message - a string describing the error
// errorHandler - function to call with parsed error
function parseError(exception, message, errorHandler) {
    var stack;
    var exceptionMessage = getErrorMessage(exception);

    var eventName = joinArray([message, exceptionMessage], ' : ');
    if (!eventName) {
        eventName = "Unknown exception";
    }

    var callback = function (stackframes) {
        stack = FilterStack(stackframes).map(function (sf) {
            return sf.toString();
        });
        errorHandler(eventName, stack);
    };

    var errback = function (err) {
        appInsights.trackEvent("parseError errback");
        stack = [JSON.stringify(exception, null, 2), "Parsing error:", JSON.stringify(err, null, 2)];
        errorHandler(eventName, stack);
    };

    if (!isError(exception)) {
        StackTrace.get().then(callback).catch(errback);
    } else {
        StackTrace.fromError(exception).then(callback).catch(errback);
    }
}

function pushError(eventName, stack, suppressTracking) {
    if (eventName || stack) {
        ensureErrors();
        var stackString = joinArray(stack, "\n");
        window.mhaErrors.push(joinArray([eventName, stackString], "\n"));

        if (!suppressTracking) {
            var props = {};
            props["Stack"] = stackString;
            props["Source"] = "pushError";
            appInsights.trackEvent(eventName, props);
        }
    }
}

// Join an array with char, dropping empty/missing entries
function joinArray(array, char) {
    if (!array) return null;
    return (array.filter(function (item) { return item; })).join(char);
}

// While trying to get our error tracking under control, let's not filter our stacks
function FilterStack(stack) {
    return stack.filter(function (item) {
        if (!item.fileName) return true;
        if (item.fileName.indexOf("stacktrace") !== -1) return false;
        //if (item.functionName === "ShowError") return false;
        //if (item.functionName === "showError") return false;
        //if (item.functionName === "LogError") return false; // Logs with LogError in them usually have location where it was called from - keep those
        //if (item.functionName === "GetStack") return false;
        if (item.functionName === "parseError") return false; // Only ever called from LogError
        if (item.functionName === "isError") return false; // Not called from anywhere interesting
        return true;
    });
}

// Strip stack of rows with unittests.html.
// Only used for unit tests.
function CleanStack(stack) {
    if (!stack) return null;
    return stack.map(function (item) {
        return item.replace(/.*localhost.*/, "")
            .replace(/.*azurewebsites.*/, "")
            .replace(/.*\.\.\/Scripts\/.*/, "")
            .replace(/\n+/, "\n")
            .replace(/^.*?\.(.*)@/, "$1@")
            .replace(/^.*\/<\(\)@http/, "Anonymous function()@http")
            .replace(/{anonymous}/, "Anonymous function")
            .replace(/:\d*$/, "");
    }).filter(function (item) {
        return !!item;
    });
}