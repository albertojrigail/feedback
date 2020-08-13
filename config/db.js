const user = 'nemobotuser';
const password = 'dxPJB8aW3d0h63gp';
const dbname = 'feedback';
const url = 'mongodb+srv://' + user + ':' + password +'@cluster0.aj1mo.gcp.mongodb.net/' + dbname + '?retryWrites=true&w=majority';
module.exports = {
    url : url,
};