import http from "http"
import path from "path"
import express from "express"
import { Request, Response } from 'express';
import { GameState } from 'csgo-gsi-types'
import { GameStateHandler } from "./utils/gameStateHandler";
// @ts-ignore
import Faye from "faye"

const host = process.env["BACKLIGHT_HOST"] || "0.0.0.0"
const port = Number(process.env["BACKLIGHT_PORT"] || 3000)

const app = express()
const server = http.createServer(app)
let gameState: GameState;
const bayeux = new Faye.NodeAdapter({ mount: '/faye' })
bayeux.attach(server)

const gameStateHandler = new GameStateHandler(bayeux)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/overlay.html'))
})

app.post('/', (req: Request, res: Response) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })

  var body = '';
  req.on('data', function (data) {
    body += data;
  });
  req.on('end', function () {
    gameState = JSON.parse(body)
    gameStateHandler.handle(gameState)
    const bombSeconds = gameStateHandler.getBombPlantedSeconds()
    res.end('');
  });
})

server.listen(port, host, () => {
  console.log(`CSGO Backlight Server started on ${host}:${port}`)
})

