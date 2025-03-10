import { openStreamDeck, listStreamDecks } from '@elgato-stream-deck/node'
import type { StreamDeck, StreamDeckEvents } from '@elgato-stream-deck/core'
import jpegJS from 'jpeg-js'
import { readFile } from 'fs/promises'
import path from 'path'

async function main() {
  const streamDecks = await listStreamDecks()
  if (streamDecks.length === 0) {
    console.log('No Stream Decks connected')
    return
  }

  const primaryStreamDeck = await openStreamDeck(streamDecks[0].path)

  const helloImg = await readFile(
    path.resolve(__dirname, '..', 'assets', 'hello.jpeg')
  )

  // Suppose the device is Stream Deck Neo
  // TODO: Add assertion of Device type

  primaryStreamDeck.fillLcd(
    0,
    jpegJS.decode(helloImg, { formatAsRGBA: false }).data,
    { format: 'rgb' }
  )

  // TODO: Show images on keys
  // primaryStreamDeck.fillKeyBuffer()

  // Set colors of L/R touch buttons of Stream Deck Neo
  primaryStreamDeck.fillKeyColor(8, 56, 200, 56)
  primaryStreamDeck.fillKeyColor(9, 56, 56, 200)

  // Output logs for each Stream Deck Neo event for testing
  ;(
    [
      'up',
      'down',
      'lcdSwipe',
      'lcdShortPress',
      'lcdLongPress',
    ] as (keyof StreamDeckEvents)[]
  ).forEach((eventName) => {
    logEvent(primaryStreamDeck, eventName)
  })
}

function logEvent(device: StreamDeck, eventName: keyof StreamDeckEvents) {
  device.on(eventName, (...args) => {
    console.log({ event: eventName, ...args })
  })
}

void main()
