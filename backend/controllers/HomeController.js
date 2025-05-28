
const dataTeam = require('../Data/team-portfolio.json');
const dataProject = require('../Data/projects-modal.json');


async function HomePortfolioController(req, res){
  
  res.send(dataTeam);
}

 async function HomeProjectController(req, res){ 
  return res.send(dataProject);
}

module.exports = {HomePortfolioController, HomeProjectController} 
