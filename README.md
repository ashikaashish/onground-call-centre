# On-Ground.ai Call Centre app (assignment)

## Run
No build step. `python3 -m http.server 8000` in this folder, open http://localhost:8000 in Chrome (needed so the mic works; `file://` blocks it).
Calling uses PeerJS from a CDN, so you need internet.

## Stack and why
Plain HTML/CSS/JS, no framework. Reason: the whole app is ~5 screens of local state; a tiny `render()` + event delegation keeps it dependency-free and easy to read. I'd move to React once there's a backend. Data lives in `data.js` (mock module, sample data only).

## Done
App shell, Dashboard (KPIs, progress, waiting, earnings, tasks, 7-day charts), Plan (Calls to make with expandable rows + paging, Incoming, Recent with review modal, Practise a call), Calendar (month grid, switcher, Today, event dots), Pulse home, channel chat (pinned "Needs your input" card, send message), Leads modal (ICP, intent, collapsible signals, prev/next), responsive down to phone width, DEMO strip.

## Calling (how it works)
- **Human to human:** WebRTC through PeerJS (free public signalling). Each tab gets an ID; open the app in two tabs/devices, paste the ID, call. Audio flows peer to peer via `getUserMedia`.
- **AI to human:** browser `SpeechSynthesis` (AI voice) + `SpeechRecognition` (hears you) run a scripted shopper conversation (EMI, warranty, quote). Swap the script for an LLM call when a backend exists.
- "Phone call" button opens a `tel:` link.

## Skipped
Charts are CSS bars, not a library. No real telephony (Twilio/Exotel). Speech recognition is Chrome only.

## AI tools used
Claude (Anthropic) generated the first draft. I reviewed and can explain the code. (Edit this list to match what you actually did.)
