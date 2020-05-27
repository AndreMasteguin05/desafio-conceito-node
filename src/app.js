const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body


  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repositorie);

  return response.json(repositorie);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params

  const { title, url, techs } = request.body

  const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id === id)

  if (repositoriesIndex === -1) {
    return response.status(400).json({ error: "Repositorie not found." })
  }

  const repositorie = repositories[repositoriesIndex]

  const newRep = {
    ...repositorie,
    title,
    url,
    techs
  }

  repositories[repositoriesIndex] = newRep;

  return response.json(newRep)


});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params

  const { title, url, techs } = request.body

  const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id === id)


  if (repositoriesIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found." })
  }

  repositories.splice(repositoriesIndex, 1);

  return response.status(204).send();



});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id, like } = request.params

  const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id === id)

  if (repositoriesIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found." })
  }


  const repositorie = repositories[repositoriesIndex]

  const newrepo = {
    ...repositorie,
    likes: repositorie.likes + 1
  }

  repositories[repositoriesIndex] = newrepo


  return response.json(newrepo)


});

module.exports = app;
