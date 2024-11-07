# WavTools 🎵📊

WavTools is a comprehensive JavaScript library for browser-based audio recording, streaming, and analysis. It provides powerful tools for capturing audio input, managing playback streams, and extracting frequency domain data, making it ideal for developers working on real-time audio applications. This is a fork of wavtools originally created by Keith Horwood - while the original repository is no longer available, the code was discovered in the openai/openai-realtime-console repository.

[![npm version](https://badge.fury.io/js/wavtools.svg)](https://badge.fury.io/js/wavtools)



## Features

- 🔍 **Frequency Domain Analysis**: Extract and analyze frequency data from audio inputs.
- 🎧 **Support for HTMLAudioElement**: Seamlessly integrate with HTML audio elements for real-time analysis.
- 📊 **Flexible Frequency Parsing**: Customize frequency parsing to suit your application's needs.
- 🎼 **Music and Voice Analysis Modes**: Switch between different modes optimized for music and voice data.

## Installation

Install WavTools using npm:

```bash
npm install wavtools
```

## Documentation

There is no documentation yet. But you can see an exmaple of usage in the next section.


### Importing

You can import the necessary classes from `wavtools`:

```javascript
import { WavRecorder, WavStreamPlayer } from 'wavtools';
```

### WavRecorder

The WavRecorder class provides functionality for recording audio from the browser's microphone input. Key capabilities include:

- Recording PCM audio data at configurable sample rates
- Pausing and resuming recordings
- Real-time frequency analysis during recording
- Saving recordings as WAV files
- Chunked processing of audio data
- Device management (listing/selecting input devices)
- Permission handling for microphone access

The recorder provides both raw PCM data and a processed mono channel, making it suitable for both audio storage and real-time analysis.

The `WavRecorder` class is used for recording audio. Here's how you can use it:

1. **Initialization**: Create an instance of `WavRecorder` with a specified sample rate.

    ```javascript
    const wavRecorder = new WavRecorder({ sampleRate: 24000 });
    ```

2. **Begin Recording**: Start the recording process.

    ```javascript
    await wavRecorder.begin(deviceId); // Pass the device ID if needed
    ```

    To find the device ID, you can use the following code:
    ```javascript
    navigator.mediaDevices.enumerateDevices()
    .then(devices => {
        devices.forEach(device => {
        console.log(`${device.kind}: ${device.label} (ID: ${device.deviceId})`);
        });
    })
    .catch(error => {
        console.error('Error accessing media devices:', error);
    });
    ```

3. **Recording Audio**: Record audio data. You can provide a callback to handle the recorded audio data.

    ```javascript
    await wavRecorder.record((data) => {
        // Handle the recorded audio data
        console.log(data.mono); // Access mono channel data
    });
    ```

4. **Pause/End Recording**: Pause or end the recording session.

    ```javascript
    await wavRecorder.pause(); // To pause
    await wavRecorder.end();   // To end
    ```

5. **Get Frequencies**: Retrieve frequency data from the recording.

    ```javascript
    const frequencies = wavRecorder.getFrequencies('voice').values;
    ```

### WavStreamPlayer

The WavStreamPlayer class handles playback of audio streams, specifically designed for PCM data. Features include:

- Streaming playback of 16-bit PCM audio data
- Support for multiple audio tracks
- Real-time frequency analysis during playback
- Track position tracking and interruption
- Sample rate conversion
- Automatic audio context management

The player is optimized for low-latency streaming scenarios where audio data arrives in chunks, making it ideal for applications like real-time audio communication or streaming playback.

The `WavStreamPlayer` class is used for playing audio streams. Here's how you can use it:

1. **Initialization**: Create an instance of `WavStreamPlayer` with a specified sample rate.

    ```javascript
    const wavStreamPlayer = new WavStreamPlayer({ sampleRate: 24000 });
    ```

2. **Connect**: Connect the player to start playing audio.

    ```javascript
    await wavStreamPlayer.connect();
    ```

3. **Add Audio Data**: Add audio data to the player for playback.

    ```javascript
    wavStreamPlayer.add16BitPCM(audioData, trackId);
    ```

4. **Interrupt Playback**: Interrupt the current playback.

    ```javascript
    const trackSampleOffset = await wavStreamPlayer.interrupt();
    ```

5. **Get Frequencies**: Retrieve frequency data from the playback.

    ```javascript
    const frequencies = wavStreamPlayer.getFrequencies('voice').values;
    ```

### Example Usage

Here's a simple example of how you might use `wavtools` in a React component:

```javascript
import React, { useRef } from 'react';
import { WavRecorder, WavStreamPlayer } from 'wavtools';

const AudioComponent = () => {
  const wavRecorderRef = useRef(new WavRecorder({ sampleRate: 24000 }));
  const wavStreamPlayerRef = useRef(new WavStreamPlayer({ sampleRate: 24000 }));

  const startRecording = async () => {
    const wavRecorder = wavRecorderRef.current;
    await wavRecorder.begin();
    await wavRecorder.record((data) => {
      console.log('Recording data:', data.mono);
    });
  };

  const stopRecording = async () => {
    const wavRecorder = wavRecorderRef.current;
    await wavRecorder.end();
  };

  const playAudio = async (audioData) => {
    const wavStreamPlayer = wavStreamPlayerRef.current;
    await wavStreamPlayer.connect();
    wavStreamPlayer.add16BitPCM(audioData, 'trackId');
  };

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <button onClick={() => playAudio(someAudioData)}>Play Audio</button>
    </div>
  );
};

export default AudioComponent;
```

This example demonstrates basic recording and playback functionality using `wavtools`. You can expand upon this by integrating it with other parts of your application, such as handling audio input devices or managing audio sessions.

## Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

Please ensure your PR description clearly describes the changes and their benefits. Follow existing code style and include tests if applicable.

## License

WavTools is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.