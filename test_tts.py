import asyncio
import edge_tts
from edge_tts.drm import DRM

async def test():
    print("Initial skew:", DRM.clock_skew_seconds)
    # First call list_voices to see if it succeeds or sets skew
    voices = await edge_tts.list_voices()
    print("Voices count:", len(voices), "Skew after list_voices:", DRM.clock_skew_seconds)
    comm = edge_tts.Communicate("Amplificadora.", "fr-FR-VivienneMultilingualNeural")
    await comm.save("test_out.mp3")
    print("Saved test_out.mp3!")

asyncio.run(test())
