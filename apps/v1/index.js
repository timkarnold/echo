module.exports = function (data) {
  /*
    This code is ran in clustered processes and is
    the entry point into your application

    Modify objects within the application scope
    prior to initialization

    data.name: The name of the application
    data.path: The path of the application
    data.gryd: Global application environment variables
    data.app: Express application
    data.log: Bunyan logger
    data.db: Mongoose db connection
    data.config: Application configuration
   */
  /*
  data.app.use(function(req, res, nex){
    var str = req.method + " " + req.headers['x-forwarded-for'];
    str += " " + req.hostname + req.originalUrl;
    data.log.info(str);
    data.log.info(req.body)
  });
  */
};

/*
function getClientIp(req) {
  var ipAddress;
  var forwardedIpsStr = req.header('x-forwarded-for');
  if (forwardedIpsStr)
    ipAddress = forwardedIpsStr.split(',')[0];
  if (!ipAddress)
    ipAddress = req.connection.remoteAddress;
  return ipAddress;
}
  */