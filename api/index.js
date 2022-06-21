//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { user, ticket } = require ("./data/capdMock.js");
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { User, Ticket } = require("./src/db");
const {createProject, createUserHistory, createTicket, createUser} = require("./data/mockFunctions.js")

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  /* try {
    const companies = await company.forEach(async (e) => {
      await Company.findOrCreate({
        where: {
          name: e.name,
          nit: e.nit,
          phone: e.phone,
          address: e.address,
          email: e.email,
          image: e.image
        }
      })
    }); 
  } catch (error) {
    console.log(error)
  } */
  try{
    const users = await user.forEach(async (e) => {
      await User.findOrCreate({
        where: {
          name: e.name,
          lastName: e.lastName,
          email: e.email,
          password: e.password,
        }
      })
    })
  }catch (error) {
    console.log(error)
  }

  /* try{
    const projects = await project.map((e) => createProject(e));
  }catch (error) {
    console.log(error)
  } */

  /* try{
    const userHistories = await userHistory.map((e) => createUserHistory(e));
  }catch (error) {
    console.log(error)
  } */

  try{
    const tickets = await ticket.map((e) => createTicket(e));
  }catch (error) {
    console.log(error)
  }

  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
