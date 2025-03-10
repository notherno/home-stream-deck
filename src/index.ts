import { openStreamDeck, listStreamDecks } from "@elgato-stream-deck/node";
import jpegJS from "jpeg-js";
import { readFile } from "fs/promises";
import path from 'path'

async function main() {
  const streamDecks = await listStreamDecks();
  if (streamDecks.length === 0) {
    console.log("No Stream Decks connected");
    return;
  }

  const primaryStreamDeck = await openStreamDeck(streamDecks[0].path);

  const helloImg = await readFile(path.resolve(__dirname, '..', 'assets', "hello.jpeg"));

  primaryStreamDeck.fillLcd(0, jpegJS.decode(helloImg).data, { format: "rgba" });
  primaryStreamDeck.fillKeyColor(8, 56, 200, 56)
  primaryStreamDeck.fillKeyColor(9, 56, 56, 200)
  primaryStreamDeck.on('up', d => console.log({ event: 'up', d }))
  primaryStreamDeck.on('down', console.log)
  primaryStreamDeck.on('lcdSwipe', console.log)
  primaryStreamDeck.on('lcdShortPress', console.log)
  primaryStreamDeck.on('lcdLongPress', console.log)
}

void main();
