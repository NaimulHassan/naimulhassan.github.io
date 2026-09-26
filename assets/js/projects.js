/* ------------------------------------------------------------------
   Detailed content for each project page (paper.html?id=...).
   Each project has affiliations, logos, and a list of sections;
   every section becomes a tab in the page's section bar.

   Block types inside a section:
     { p: "html" }                         paragraph
     { list: ["html", ...] }               bullet list
     { fig: "src", caption: "html" }       figure
     { stats: [[value, label], ...] }      big-number row
     { cards: [[title, html], ...] }       small explainer cards
     { table: { head: [...], rows: [[...]], hi: [rowIndex...], caption } }
     { links: [[label, href], ...] }       buttons
   ------------------------------------------------------------------ */
(function () {
  const OSU = { src: "assets/img/logos/osu.svg", alt: "The Ohio State University" };
  const NSF = { src: "assets/img/logos/nsf.webp", alt: "National Science Foundation" };
  const BUET = { src: "assets/img/logos/buet.png", alt: "Bangladesh University of Engineering and Technology" };
  const CSE = "Department of Computer Science and Engineering, The Ohio State University";
  const CCBS = "Center for Cognitive and Brain Sciences, The Ohio State University";
  const EEE = "Department of Electrical and Electronic Engineering, Bangladesh University of Engineering and Technology";

  window.PROJECTS = {
    /* =============================================================== */
    maestro: {
      authorAff: [[1], [1], [1, 2]],
      affiliations: [CSE, CCBS],
      logos: [OSU, NSF],
      funding: "Supported by the National Science Foundation (IIS-2235228). Computing resources from the Ohio Supercomputer Center.",
      sections: [
        { id: "overview", title: "Overview", blocks: [
          { p: "Auditory attention decoding (AAD) tries to identify which talker a listener is following, with the long-term goal of hearing aids that amplify the voice a person wants to hear. Most AAD research has relied on EEG alone, recorded while participants sit still and fixate on a crosshair. Real listeners do the opposite: they look at the talker they follow, turn their head toward them, and use visual cues to separate competing voices." },
          { p: "MAESTRO records these behaviors alongside EEG. Participants listen to one of four talkers in background noise while their eyes and head move freely, and the dataset captures EEG, eye gaze, pupil size, egocentric video, and head motion in sync. A four-speaker benchmark then shows how much each signal contributes, and that combining brain and behavioral signals decodes attention more accurately than EEG alone." },
          { cards: [
            ["Brain", "32-channel EEG recorded continuously during every trial."],
            ["Behavior", "Binocular gaze, pupil size, egocentric video, and head motion from eye-tracking glasses."],
            ["Speech", "Every loudspeaker stream plus the naturally mixed scene recorded at the listener's position."]
          ] },
          { p: "<b>Abstract.</b> Humans rely on gaze, head movements, and visual cues to attend to speakers in noisy environments, yet auditory attention decoding (AAD) has been studied primarily using electroencephalography (EEG). We introduce the Multimodal Auditory-attention Ego-centric Speech-TRacking Open (MAESTRO) corpus, which simultaneously records EEG, eye gaze, pupillometry, egocentric video, and head inertial measurement unit (IMU) data. MAESTRO includes four competing speakers and background noise across multiple signal-to-noise ratio (SNR) conditions, enabling attention decoding under realistic listening scenarios. Through a four-speaker attention decoding benchmark, we show that combining behavioral and physiological signals improves decoding performance over EEG-only approaches, enabling future advances in multimodal auditory attention decoding." }
        ] },
        { id: "dataset", title: "Dataset", blocks: [
          { stats: [["16", "participants"], ["1,600", "trials"], ["13.3", "hours"], ["4 + 2", "talkers + noise sources"], ["0–18 dB", "attended-speaker SNR"]] },
          { fig: "assets/img/papers/maestro_setup.webp", caption: "Four target loudspeakers sit at ±22.5° and ±67.5° in front of the listener; two noise loudspeakers sit behind at ±135°. All are 4 ft from the listener, who wears an EEG cap and eye-tracking glasses." },
          { p: "<b>Protocol.</b> Each participant completed 5 practice trials and 100 experimental trials of 30 seconds each, in two 25-minute sessions. A screen indicated which of the four talkers to follow, balanced across positions. After every trial, a multiple-choice question about the attended talker checked that the participant was actually listening; mean comprehension accuracy was 83.2%." },
          { p: "<b>Stimuli.</b> Speech comes from LibriSpeech and background noise from CHiME-Home domestic soundscapes: 630 unique audio files from 420 speakers, with no file or speaker repeated. The attended talker's SNR varies from 0 to 18 dB (mean about 12 dB), matching everyday conversation. The room is naturally reverberant." },
          { table: {
            head: ["Stream", "Device", "What it captures"],
            rows: [
              ["EEG", "ANTNeuro eego, 32 channels, 500 Hz", "Cortical tracking of the attended speech"],
              ["Gaze and pupil", "Tobii Pro Glasses 3, ~50 Hz", "Where the listener looks, and listening effort"],
              ["Egocentric video", "Tobii scene camera, 1920×1080, 25 fps", "The listener's first-person view, with its own audio track"],
              ["Head motion", "Tobii IMU, 120.6 Hz", "Head turns and posture (acceleration and angular velocity)"],
              ["Audio", "Loudspeaker streams + scene audio", "Clean talker and noise sources, and the mixture the listener heard"]
            ],
            caption: "All streams share one system clock and are aligned to audio onset; for the benchmark, each is filtered and resampled to 64 Hz."
          } },
          { fig: "assets/img/papers/maestro_gaze.webp", caption: "One trial from the dataset: egocentric frames with gaze points, the gaze trajectory over time, and pupil diameter for both eyes." }
        ] },
        { id: "benchmark", title: "Benchmark", blocks: [
          { p: "The benchmark asks which of four simultaneous talkers the listener is attending to (chance: 25%). It is evaluated two ways: <b>within-subject</b>, with data from all 16 participants pooled and split by trial content, and <b>leave-one-subject-out (LOSO)</b>, where the model is tested on a person it has never seen. Decision windows range from 5 to 30 seconds, and all 15 combinations of EEG, gaze, head motion (IMU), and video are compared." },
          { p: "The baseline is a multi-encoder dilated convolutional network: EEG is matched to each speech envelope by time-centered correlation, and gaze, IMU, and video vote on which speaker position the listener is oriented toward. A single model is trained end-to-end with modality dropout, so no one signal dominates. It is deliberately simple, a lower bound for future methods to beat." },
          { table: {
            head: ["Input", "5 s", "10 s", "15 s", "20 s", "30 s"],
            rows: [
              ["EEG", "43.6", "47.6", "53.2", "53.6", "59.1"],
              ["Gaze", "37.1", "37.6", "40.0", "38.0", "36.0"],
              ["IMU", "38.2", "38.8", "38.8", "34.9", "35.4"],
              ["Video", "43.7", "42.6", "44.3", "43.2", "43.4"],
              ["EEG + Gaze", "51.2", "55.3", "58.0", "59.7", "65.2"],
              ["EEG + Gaze + Video", "55.6", "58.5", "59.6", "62.1", "69.8"],
              ["EEG + Gaze + IMU + Video", "56.6", "58.0", "61.2", "62.8", "67.1"]
            ],
            hi: [5, 6],
            caption: "Within-subject attended-speaker accuracy (%), selected configurations. The full 15-configuration table, with standard deviations and significance tests, is in the paper."
          } },
          { table: {
            head: ["Input", "5 s", "10 s", "15 s", "20 s", "30 s"],
            rows: [
              ["EEG", "43.6", "50.2", "52.4", "55.3", "61.9"],
              ["EEG + Gaze + Video", "53.5", "57.3", "59.6", "61.0", "64.0"],
              ["EEG + IMU + Video", "50.3", "55.9", "59.6", "61.3", "64.3"],
              ["EEG + Gaze + IMU + Video", "54.4", "55.9", "57.3", "59.8", "67.5"]
            ],
            hi: [1, 2, 3],
            caption: "Leave-one-subject-out accuracy (%) on unseen listeners."
          } }
        ] },
        { id: "findings", title: "Findings", blocks: [
          { list: [
            "<b>Behavior complements EEG.</b> Adding gaze, head motion, or video to EEG improves decoding at every window size, by 8.0–13.0 points within-subject and 5.6–10.8 points on unseen listeners.",
            "<b>The gain is biggest when EEG has the least to work with.</b> On unseen listeners, the improvement nearly doubles as the window shrinks from 30 s (+5.6) to 5 s (+10.8).",
            "<b>It helps almost everyone.</b> Across 80 subject-window combinations, the best multimodal configuration beats EEG alone in 75 cases (93.8%).",
            "<b>EEG stays essential.</b> Every best-performing configuration includes EEG, and no purely behavioral combination wins at any window size or SNR level.",
            "<b>Behavior alone carries real information.</b> With no access to the speech, video alone reaches 39.6–44.7% and gaze with video 44.6–47.1% on unseen listeners, well above the 25% chance level.",
            "<b>The gains come from the listener, not the audio.</b> Shuffling listener signals across windows shows the behavioral streams raise the share of accuracy that depends on the listener's own signals, from +11.1 to +25.4 points at 5 s."
          ] },
          { p: "<b>What it means for hearing aids.</b> Eye tracking and head-mounted motion sensors already fit in wearable devices. Because the best combination of signals changes with window length and from person to person, practical systems will likely need adaptive, per-user weighting of modalities rather than one fixed configuration." }
        ] },
        { id: "download", title: "Download", blocks: [
          { p: "The dataset includes all loudspeaker streams, the naturally mixed audio, EEG, gaze, pupil, video, and IMU for every trial, along with per-trial comprehension labels, per-subject gaze-quality statistics, and the official train/test splits for both evaluation settings." },
          { links: [["Dataset on Hugging Face", "https://huggingface.co/datasets/aspire-osu/maestro-eeg-dataset"], ["Code", "https://github.com/ASPIRE-OSU/MAESTRO"]] },
          { p: "<b>Note on the audio.</b> The SNR adjustment clipped the attended talker's channel in the released recordings, which leaves a detectable envelope cue. The benchmark removes it with histogram equalization across the four envelopes; anyone using the raw audio for other tasks should account for it." }
        ] },
        { id: "citation", title: "Citation", blocks: "citation" }
      ]
    },

    /* =============================================================== */
    scans: {
      authorAff: [[1], [1, 2]],
      affiliations: [CSE, CCBS],
      logos: [OSU, NSF],
      funding: "Supported by the National Science Foundation (IIS-2235228). Computing resources from the Ohio Supercomputer Center.",
      sections: [
        { id: "overview", title: "Overview", blocks: [
          { p: "When someone listens to speech, their EEG tracks it with a short delay. SCANS asks a precise version of that question: given a few seconds of EEG, which segment of the speech is it time-locked to? This match–mismatch task is a building block for speech-decoding brain-computer interfaces, for checking speech perception in hearing aids, and for any model that has to relate noisy neural signals to sound." },
          { p: "The hard part is that EEG is noisy and differs a lot from person to person. Earlier models either compare EEG and speech only at the very end, or rely on self-supervised contrastive learning that needs far more data than EEG studies provide. SCANS lets the two streams interact throughout, and uses the labels to shape a shared EEG–speech space, which is what lets it hold up on subjects it has never seen." },
          { p: "<b>Abstract.</b> Aligning non-invasive neural activity with speech stimuli is a foundational challenge in neural speech decoding. The difficulty lies in mapping noisy, high-dimensional electroencephalography (EEG) signals to the temporal dynamics of speech features. We propose SCANS, a supervised contrastive learning framework for neural-speech temporal alignment. We define this as a classification task where, given an EEG segment and multiple non-overlapping candidate segments from the same speech signal, the model must identify the single matching stimulus temporally aligned with the EEG. SCANS utilizes a dilated convolutional frontend and cross-modal attention to extract and fuse features across modalities. To bridge the modality gap, we employ a multi-task objective combining cross-entropy classification with a contrastive loss. Evaluated on the SParrKULee dataset, SCANS demonstrates significant improvement in neural-speech alignment accuracy." }
        ] },
        { id: "method", title: "Method", blocks: [
          { fig: "assets/img/papers/scans.webp", caption: "SCANS architecture: a dilated convolutional frontend (DCF) per modality, symmetric cross-modal attention transformers (CMAT), a shared embedding space trained with a supervised contrastive loss, and a classifier head for the match–mismatch decision." },
          { cards: [
            ["Dilated convolutional frontend", "A spatial convolution projects 64-channel EEG into 128 dimensions; the speech envelope is projected into the same space. Three dilated convolutions (rates 1, 2, 4) widen the temporal context without losing resolution."],
            ["Cross-modal attention", "Two symmetric attention blocks let EEG attend to speech and speech attend to EEG, so each encoder refines its features using the other modality throughout, not just at the end."],
            ["Supervised contrastive objective", "A symmetric InfoNCE loss pulls each EEG segment toward its own speech segment and away from every other pairing in the batch, combined with a cross-entropy loss over the candidates."]
          ] },
          { p: "Because each EEG segment belongs to exactly one speech segment, the contrastive target is a strict identity matrix rather than soft positives. The final loss is <i>L</i> = <i>L</i><sub>CE</sub> + 0.5 · <i>L</i><sub>align</sub>, which keeps the model from overfitting to the specific distractors in each trial." }
        ] },
        { id: "results", title: "Results", blocks: [
          { p: "SCANS is trained and tested on SParrKULee, the dataset behind the ICASSP 2023 and 2024 Auditory EEG Decoding Challenges, using the official splits. The model picks the matching speech segment from <i>N</i> candidates using a <i>t</i>-second window." },
          { table: {
            head: ["Model", "Within-subject accuracy", "Std.", "Unseen-subject accuracy", "Std.", "Total score"],
            rows: [
              ["Accou et al.", "77.59", "7.29", "77.34", "5.66", "77.51"],
              ["Cui et al.", "79.21", "7.52", "78.40", "5.66", "78.94"],
              ["Borsdorf et al.", "79.61", "7.08", "77.93", "7.66", "79.05"],
              ["Thornton et al. (2023 winner)", "82.71", "7.70", "80.98", "5.27", "82.13"],
              ["SCANS", "87.09", "3.75", "84.12", "3.12", "86.10"]
            ],
            hi: [4],
            caption: "ICASSP 2023 challenge setting: 2 candidates, 3-second windows. Mean subject accuracy (%)."
          } },
          { table: {
            head: ["Model", "Unseen-subject accuracy", "Std."],
            rows: [
              ["Accou et al.", "50.74", "12.71"],
              ["Qiu et al.", "59.97", "14.89"],
              ["Wang et al.", "60.29", "15.74"],
              ["Thornton et al.", "62.80", "14.70"],
              ["SCANS", "69.33", "4.60"]
            ],
            hi: [4],
            caption: "ICASSP 2024 challenge setting: 5 candidates, 5-second windows (chance is 20%)."
          } },
          { list: [
            "<b>New state of the art</b> on both challenge settings, including a 6.5-point gain on the harder 5-way task.",
            "<b>Much more consistent across people.</b> Subject-to-subject standard deviation drops to 4.6% on unseen subjects, versus 14.7% for the previous best model.",
            "<b>Longer windows help.</b> Going from 3 to 5 seconds raises 2-way within-subject accuracy from 86.9% to 88.7%, and the drop from seen to unseen subjects is only 1.8 points."
          ] }
        ] },
        { id: "citation", title: "Citation", blocks: "citation" }
      ]
    },

    /* =============================================================== */
    sscednet: {
      authorAff: [[1], [1]],
      affiliations: [EEE],
      logos: [BUET],
      sections: [
        { id: "overview", title: "Overview", blocks: [
          { p: "Coughs are among the clearest symptoms of influenza-like illness, and counting them in places like hospital waiting rooms can help track outbreaks. Two things get in the way. Background speech makes coughs harder to detect, and recording in public spaces captures private conversations." },
          { p: "The usual workaround throws away any segment where speech is detected, which also throws away the coughs inside it. SS+CEDNet separates cough from speech first, then runs detection on the cough channel only, so detection improves and the speech never reaches the detector." },
          { p: "<b>Abstract.</b> Cough is one of the most distinguishable symptoms for Influenza-like-illness (ILI) and Severe Acute Respiratory Infection (SARI). Background speech events make it difficult for algorithms to detect cough events, and the performance of the models drops significantly. At the same time, speech privacy is not preserved in traditional cough detection models. We propose a pipeline, SS+CEDNet, consisting of a Source Separation (SS) and a Cough Event Detection (CED) model. The SS model first separates the cough and speech sources, and the separated cough source is then passed through the CED model to detect cough events. The pipeline preserves speech privacy by separating the sources and also shows better cough detection accuracy." }
        ] },
        { id: "method", title: "Method", blocks: [
          { fig: "assets/img/papers/sscednet.webp", caption: "Mixed audio goes through the source separation model; only the separated cough source is split into 1-second segments and passed to the cough event detector." },
          { cards: [
            ["Source separation", "Wave-U-Net, a U-Net for raw waveforms with 6 downsampling and 6 upsampling blocks, splits each recording into a cough track and a speech track of the same length."],
            ["Cough event detection", "Four detectors are compared: a YAMNet transfer-learning model, plus Random Forest, SVM, and Naive Bayes on 193 hand-crafted features (MFCC, STFT, chroma, spectral contrast, and more)."],
            ["Training data", "2,400 synthetic soundscapes built with Scaper, placing AudioSet coughs over TIMIT and MUSAN speech at SNRs from −10 to 25 dB."]
          ] }
        ] },
        { id: "results", title: "Results", blocks: [
          { table: {
            head: ["Detector", "F1 without separation", "F1 with separation", "Relative gain"],
            rows: [
              ["YAMNet", "87", "99", "13.8%"],
              ["Random Forest", "92", "96", "4.3%"],
              ["SVM", "92", "96", "4.3%"],
              ["Naive Bayes", "85", "89", "4.7%"]
            ],
            hi: [0],
            caption: "Cough detection F1 (%) on 400 test soundscapes containing both speech and coughs."
          } },
          { list: [
            "<b>Every detector improves</b> once speech is separated out, by up to 13.8% relative F1.",
            "<b>Clean separation.</b> Wave-U-Net reaches 13.02 dB SDR on cough, 10.73 dB on speech, and 11.87 dB overall.",
            "<b>Speech stays out of the detector.</b> The separated speech correlates with the true speech at 0.94 on average, so conversation content is removed from the cough channel rather than discarded along with the coughs."
          ] }
        ] },
        { id: "citation", title: "Citation", blocks: "citation" }
      ]
    },

    /* =============================================================== */
    alsnet: {
      authorAff: null,
      affiliations: [EEE],
      logos: [BUET],
      sections: [
        { id: "overview", title: "Overview", blocks: [
          { p: "Amyotrophic lateral sclerosis (ALS) has no single diagnostic test, and it can be hard to tell apart from other neuromuscular diseases. EMG, the electrical activity of muscles, carries signs of the disease, but most automated methods first convert it into hand-crafted features or time-frequency images, which adds computation and design effort." },
          { p: "ALSNet skips that step. It reads raw EMG directly and learns the features itself, which makes it simpler to deploy." },
          { p: "<b>Abstract.</b> " + "Amyotrophic Lateral Sclerosis (ALS) is one of the most common neuromuscular diseases, affecting both lower and upper motor neurons. In this paper, a dilated one-dimensional convolutional neural network, named ALSNet, is proposed for identifying ALS from raw EMG signal. No hand-crafted feature extraction is required; ALSNet takes the raw EMG signal as input and detects EMG signals of ALS subjects, which makes the method more feasible for practical implementation by reducing the computational cost of feature extraction. The performance of ALSNet was evaluated using overall accuracy, sensitivity, specificity, and balanced accuracy and compared with existing methods. The proposed method showed better performance than the other existing methods, with an overall accuracy of 97.74%." }
        ] },
        { id: "method", title: "Method", blocks: [
          { fig: "assets/img/papers/alsnet.webp", caption: "Example segments of normal and ALS EMG signals from the N2001 EMGLAB dataset." },
          { cards: [
            ["Input", "Raw EMG segments from the open N2001 EMGLAB clinical dataset, using the Normal and ALS groups."],
            ["Network", "Three dilated 1-D convolution layers (dilation 1, 2, 3), global max pooling, a 64-unit dense layer, and a sigmoid output for ALS vs. normal."],
            ["No feature engineering", "No MFCCs, wavelets, or spectrograms: the network learns directly from the signal."]
          ] }
        ] },
        { id: "results", title: "Results", blocks: [
          { table: {
            head: ["Method", "Accuracy", "Sensitivity", "Specificity", "Balanced accuracy"],
            rows: [
              ["Misra et al.", "95.00", "93.00", "92.54", "92.75"],
              ["Sengur et al. (2017)", "96.69", "94.24", "97.59", "95.92"],
              ["Sengur et al. (2019)", "96.80", "94.80", "98.80", "96.80"],
              ["ALSNet", "97.74", "96.77", "98.59", "97.68"]
            ],
            hi: [3],
            caption: "Comparison with existing methods (%)."
          } },
          { list: ["<b>97.74% overall accuracy</b> and the best balanced accuracy among the compared methods, from raw signals alone."] }
        ] },
        { id: "citation", title: "Citation", blocks: "citation" }
      ]
    },

    /* =============================================================== */
    braille: {
      authorAff: null,
      affiliations: [EEE],
      logos: [BUET],
      sections: [
        { id: "overview", title: "Overview", blocks: [
          { p: "Braille books are bulky and expensive, and most printed material never gets a Braille version. This project built a low-cost, portable device that gives visually impaired users two things: it reads printed text in English and Bengali, and it tells them what objects are in front of them, with output on a refreshable Braille display." },
          { p: "<b>Abstract.</b> This paper proposes a dual-purpose braille system for visually impaired people. The system has two main features: object detection and optical character recognition. Real-time object detection helps a visually impaired person know about the things around them, and optical character recognition helps them read characters in both English and Bengali. A pre-trained convolutional neural network (AlexNet) classifies objects, and an OCR engine (Tesseract) with basic image processing performs character recognition. A refreshable braille display is also designed to show the braille characters." }
        ] },
        { id: "system", title: "System", blocks: [
          { fig: "assets/img/papers/braille.webp", caption: "The refreshable Braille display prototype." },
          { cards: [
            ["Camera and control unit", "An eyewear-mounted camera sends images to the processor, which switches between object detection and text reading."],
            ["Object detection", "A pre-trained AlexNet, fine-tuned on a hand-built dataset of 9 everyday objects."],
            ["Text reading", "Tesseract OCR for English and Bengali, after median filtering and black-and-white conversion."],
            ["Braille output", "Six solenoids, driven by a microcontroller circuit, raise the pins of each Braille cell."]
          ] }
        ] },
        { id: "results", title: "Results", blocks: [
          { list: [
            "The object classifier reached 100% training accuracy within 10 epochs on the 9-object dataset.",
            "All components fit in a single portable box, and the estimated component cost is low compared with existing refreshable Braille technologies.",
            "The project was national champion and a world finalist at the IEEE YESIST12 Innovation Challenge 2019."
          ] }
        ] },
        { id: "citation", title: "Citation", blocks: "citation" }
      ]
    },

    /* =============================================================== */
    asfnet: {
      authorAff: [[1], [1]],
      affiliations: [EEE],
      logos: [BUET],
      sections: [
        { id: "overview", title: "Overview", blocks: [
          { p: "Detecting sounds like coughs, sneezes, and gasps in hospitals can support diagnosis, patient monitoring, and illness surveillance. Transformers such as the Audio Spectrogram Transformer (AST) are the strongest audio models, but they need large training sets and heavy compute, and medical audio is scarce while hospital devices are often resource-limited." },
          { p: "ASFNet keeps the transformer design but replaces self-attention with a Fourier transform. The result trains better on limited medical data and is smaller at the same time." },
          { p: "<b>Abstract.</b> Sound event detection (SED) in the medical environment can help with many healthcare tasks. Transformer encoders are a promising choice, but two difficulties stand in the way: medical audio data is extremely limited, making it hard to train a transformer effectively, and SED models need to be computationally efficient for resource-limited medical settings, while attention is computationally expensive. We introduce the Audio Spectrogram Fourier Network (ASFNet), an attention-free transformer encoder for sound event detection in medical environments that replaces the attention operation with a simplified Fast Fourier Transform. ASFNet outperforms other methods, achieving an average mAP of 0.474 with a 16.76% relative improvement, with fewer model parameters and a smaller model size." }
        ] },
        { id: "method", title: "Method", blocks: [
          { cards: [
            ["Input", "Audio becomes a 128-bin spectrogram, split into overlapping 16×16 patches and embedded into 768 dimensions, as in AST."],
            ["Fourier sublayer", "Instead of self-attention, each of the 12 encoder layers applies a 2-D FFT across the sequence and hidden dimensions and keeps the real part."],
            ["Why it works", "The FFT mixes information across all patches at O(<i>n</i> log <i>n</i>) cost with no learned attention weights, which suits small datasets."]
          ] },
          { p: "<b>Data.</b> MAudioSet, a medical subset of AudioSet with about 15 hours of multi-label audio across breathing, coughing, gasping, hiccups, sneezing, sniffling, throat-clearing, speech, silence, and other sounds, evaluated with 5-fold cross-validation." }
        ] },
        { id: "results", title: "Results", blocks: [
          { fig: "assets/img/papers/asfnet.webp", caption: "Average mAP, parameter count, and model size for AST and ASFNet variants." },
          { table: {
            head: ["Model", "Mechanism", "Average mAP", "Parameters", "Size"],
            rows: [
              ["PSLA", "CNN + attention", "0.389", "4 M", "16 MB"],
              ["AST-Tiny", "Attention", "0.385", "6 M", "23.0 MB"],
              ["AST", "Attention", "0.401", "87 M", "334.7 MB"],
              ["AST-Ensemble", "Attention", "0.408", "87 M", "334.7 MB"],
              ["ASFNet-Tiny", "FFT", "0.448", "3 M", "13.6 MB"],
              ["ASFNet", "FFT", "0.473", "56 M", "216.4 MB"],
              ["ASFNet-Ensemble", "FFT", "0.474", "56 M", "216.4 MB"]
            ],
            hi: [4, 5, 6],
            caption: "Mean average precision across 5 folds, with model size."
          } },
          { list: [
            "<b>18% relative mAP gain</b> over AST (0.473 vs. 0.401) with 36% fewer parameters.",
            "<b>Even the smallest variant wins.</b> The 3M-parameter ASFNet-Tiny outperforms the full 87M-parameter AST.",
            "<b>Every Fourier layer helps.</b> Replacing attention layers with Fourier layers one at a time raises mAP and shrinks the model steadily, with the fully attention-free model best on both counts."
          ] }
        ] },
        { id: "citation", title: "Citation", blocks: "citation" }
      ]
    },

    /* =============================================================== */
    doanet: {
      authorAff: null,
      affiliations: [EEE],
      logos: [BUET],
      sections: [
        { id: "overview", title: "Overview", blocks: [
          { p: "Drones can search disaster areas where cameras fail, in darkness, smoke, or under debris, by listening for people calling for help. But the drone's own rotors are loud enough to push the speech below the noise floor, which breaks classical localization methods." },
          { p: "DOANet learns to localize the talker directly from raw 8-channel audio recorded on the drone, with no hand-crafted features or separate noise-reduction step. It grew out of the IEEE Signal Processing Cup 2019." },
          { p: "<b>Abstract.</b> Drone-embedded sound source localization (SSL) is promising for search and rescue, where bad lighting or occlusions limit cameras, but severe drone ego-noise can push the recorded signal-to-noise ratio below zero. Using recordings from an 8-channel cube-shaped microphone array on an unmanned aerial vehicle, we compare angular-spectrum TDOA methods, improve them with speed-correlated harmonics cancellation (SCHC), and propose DOANet, an end-to-end one-dimensional dilated CNN that estimates the azimuth and elevation of the target source directly from raw audio. DOANet shows promising results compared with the angular spectrum methods with and without noise cancellation. We also introduce the area under the cumulative histogram of angular deviations as a performance indicator for this problem." }
        ] },
        { id: "method", title: "Method", blocks: [
          { fig: "assets/img/papers/doanet.webp", caption: "Drone-embedded sound source localization for search and rescue." },
          { cards: [
            ["Data", "The DREGON dataset: speech recorded by an 8-microphone cube array under a quadcopter, in static and in-flight conditions."],
            ["Baselines", "Classical angular-spectrum methods (GCC-PHAT, GCC-NONLIN, MVDR, delay-and-sum), with and without rotor-noise cancellation (SCHC)."],
            ["DOANet", "A 1-D dilated CNN on raw multichannel audio that predicts azimuth and elevation, trained on different microphone subsets."]
          ] }
        ] },
        { id: "results", title: "Results", blocks: [
          { table: {
            head: ["Method", "AUC", "AUC (<10°)", "AUC (<20°)"],
            rows: [
              ["Delay-and-sum", "0.788", "0.017", "0.043"],
              ["GCC-PHAT", "0.785", "0.018", "0.045"],
              ["GCC-PHAT + SCHC", "0.791", "0.018", "0.045"],
              ["DOANet (best configuration)", "0.903", "0.004", "0.029"]
            ],
            hi: [3],
            caption: "Static task, great-circle angular distance: area under the cumulative histogram of angular errors (higher is better)."
          } },
          { list: [
            "<b>More consistent localization.</b> DOANet's overall AUC is well above every classical baseline, meaning its errors stay within a much narrower range.",
            "<b>Trade-off at fine precision.</b> The classical methods score slightly higher on the AUC restricted to very small errors, so they are sharper on the samples they get right."
          ] }
        ] },
        { id: "citation", title: "Citation", blocks: "citation" }
      ]
    },

    /* =============================================================== */
    gsc: {
      authorAff: null,
      affiliations: [EEE],
      logos: [BUET],
      sections: [
        { id: "overview", title: "Overview", blocks: [
          { p: "The same search-and-rescue problem as DOANet, approached with signal processing: estimate the rotor noise, simulate it, and filter it out of the recording before localizing the talker from a hovering drone." },
          { p: "<b>Abstract.</b> We propose a method for estimating the direction of a sound source from speech mixed with different levels of noise, recorded by a microphone array embedded in an unmanned aerial vehicle (UAV), using the DREGON dataset (IEEE Signal Processing Cup 2019, static task). A Generalized Sidelobe Canceller (GSC) beamformer extracts the noise along the rotor directions; this noise is simulated to synthesize 8-channel audio with pyroomacoustics and used as the reference for a Wiener filter that removes noise from the recordings. GCC-PHAT and GCC-NONLIN then estimate the elevation and azimuth of the source. The method localizes human speech from recordings with SNR as low as −20 dB; allowing at most 10° of angular error, it reaches an accuracy of almost 91.67%." }
        ] },
        { id: "method", title: "Method", blocks: [
          { fig: "assets/img/papers/gsc.webp", caption: "Microphone array geometry on the UAV." },
          { cards: [
            ["1. Extract rotor noise", "A GSC beamformer steered at each of the four rotors pulls out the noise coming from those directions."],
            ["2. Simulate it", "The extracted noise is rendered into 8-channel audio with pyroomacoustics, matching the array geometry."],
            ["3. Filter and localize", "A Wiener filter uses the simulated noise as a reference, then GCC-PHAT and GCC-NONLIN estimate azimuth and elevation."]
          ] }
        ] },
        { id: "results", title: "Results", blocks: [
          { table: {
            head: ["Method", "Mean angular error", "Std."],
            rows: [
              ["GCC-PHAT (baseline)", "20.36°", "33.18°"],
              ["GCC-NONLIN (baseline)", "19.70°", "32.84°"],
              ["GCC-PHAT + GSC (proposed)", "7.75°", "19.96°"],
              ["GCC-NONLIN + GSC (proposed)", "6.41°", "16.99°"]
            ],
            hi: [2, 3],
            caption: "Static task on 300 DREGON recordings."
          } },
          { list: ["<b>About 3× lower angular error</b> than the baselines, and almost 91.67% of sources localized within 10°, from recordings with SNR as low as −20 dB."] }
        ] },
        { id: "citation", title: "Citation", blocks: "citation" }
      ]
    }
  };
})();
