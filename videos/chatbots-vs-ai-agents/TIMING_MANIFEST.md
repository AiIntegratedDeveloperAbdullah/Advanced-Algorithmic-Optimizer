# Chatbots vs AI Agents — scene & timing manifest

Timing master: `assets/voiceover.mp3` (ElevenLabs "Alex Vale", 41.25 s, 44.1 kHz mono MP3, used unmodified).
Phrase timings were measured by pause detection (`ffmpeg silencedetect`, −35 dB, 0.12 s and 0.03 s passes) and matched to the script; speech-to-text models could not be downloaded in the build environment.

| Scene | Window (s) | Narration | Key visual events (s) |
|---|---|---|---|
| 1 Hook | 0.00–4.05 | Chatbots answer questions. / AI agents get the work done. | CHATBOTS ANSWER 0.12 · divider slice + AGENTS 1.85–1.98 · step chain 2.75 |
| 2 Chatbot | 3.95–7.45 | A chatbot waits for your prompt, / replies, / and stops. | prompt 4.35 · typing 5.0 · reply 5.78 · stop 6.58 |
| 3 Agent goal | 7.45–10.0 | An agent takes a goal, / and keeps going. | GOAL 7.62 · steps 8.5/9.2/9.6 · "keeps going" 9.1 |
| 4 System | 9.95–18.3 | It breaks the goal into steps, / picks the right tools, / like a browser, a calendar, or code, / checks its own results, / and fixes mistakes along the way. | tasks 10.75 · browser 12.97 · calendar 13.92 · code 14.68 · VERIFY 15.5 · loop-back 16.65 · fixed 17.8 |
| 5 Travel | 18.35–27.95 | Ask a chatbot about a trip… / Ask an agent to plan it… | idea list 20.25 · agent panel 21.7 · compare 23.38 · itinerary 24.66 · DRAFT awaiting approval 25.95 |
| 6 Oversight | 27.95–34.3 | But agents aren't magic. / They still make mistakes, / so the best setups keep a human in charge… | headline 28.2 · issue flag 29.9 · review gate 31.2 · HUMAN APPROVAL 32.0 · Approve focus 33.1 (not clicked) |
| 7 Conclusion | 34.25–38.8 | The shift is simple: / from AI that talks, / to AI that works. | AI THAT TALKS 36.0 · AI THAT WORKS 37.45 |
| 8 CTA | 38.75–41.25 | Follow for tech, explained fast. | core orb 38.8 · Follow 39.05 · tagline 40.05 |

Captions: 26 phrase cues in `index.html` (`CAPS` array), each entering on its measured phrase start.
